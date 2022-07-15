const express = require('express');
const { auth } = require('../../middleware/tokenVerify');
const Router = express.Router();

const UserRouter = require('./users');
const InstructorRouter = require('./instrector');
const BooksRouter = require('./books');
const AdminRouter = require('./admin')
const CourseRouter = require('./courses');
const Category = require('../../models/Category');



Router.use(auth)
/* GET home page. */
Router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});
Router.post('/', function(req, res, next) {
  console.log(req.body)
  res.send(req.body);
});

Router.use('/user', UserRouter);
Router.use('/instructor', InstructorRouter);
Router.use('/books', BooksRouter)
Router.use('/admin', AdminRouter)
Router.use('/courses', CourseRouter)
// Router.use('/admin', AdminRouter)
Router.get('/category_list',(req, res)=>{
  const category = Category;
  res.send({data:category})
})
Router.all('*', function(req, res, next) {
  res.status(404).send("Page not found");
});


module.exports = Router;
