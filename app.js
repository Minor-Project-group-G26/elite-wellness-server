var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const forms = require('multer')
var cloudinary = require('cloudinary').v2;

const AuthRouter = require('./routes/Auth');
const MainRouter = require('./routes/Main'); 
const FileRouter = require('./routes/Main/FileRoute')
const TestRouter = require('./test')
const fs = require("fs");

const app = express();

app.use(cors())

app.use(logger('common', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
app.use(logger("dev"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/img",express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())



app.use(bodyParser.urlencoded({ extended: true }))
// app.use(forms().array())



// parse application/json


const Mongoose = mongoose.connect('mongodb+srv://quill:quill12345@cluster0.29zqe.gcp.mongodb.net/quill?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,  useFindAndModify: false }
    );

Mongoose.then(err=>{
        console.log("Connected to DB");
    }).catch(err=> console.log(err)); 


cloudinary.config({ 
  cloud_name: 'jesnal', 
  api_key: '571473472934223', 
  api_secret: 'vOCwYwus6gNuJcVjz0LyUYXzEgg',
  secure: true
});


app.use('/auth', AuthRouter);
app.use('/sample', TestRouter);
app.use('/file', FileRouter);
app.use('/', MainRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
