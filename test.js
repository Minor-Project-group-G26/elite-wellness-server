var express = require('express');
// const path = require('path')
var Router = express.Router();
const multer = require('multer');
// const { auth } = require('./middleware/tokenVerify');
// const { storage } = require('./middleware/upload');
// const file = require("./public/upload/img-1622309606829.png")
// const fs = require('fs');
// const { format } = require('path');
let storage = multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, './public/upload')
    },
    filename: (req, file, cd)=>{
        console.log(req.body)
        cd(null, "img"+"-"+Date.now()+"."+file.mimetype.split('/')[1])
    }
})

// Router.use(auth)
// Router.use("/img",express.static(path.join(__dirname, 'public/upload')));


const upload = multer({storage: storage})
// Router.get('/:file',function(req, res, next) {
//     // const file = require(req)
//     // console.log(req.params.file)
//     // const path = "./public/upload/"+req.params.file+".png"
//     const file = require("public\\upload\\img-1622308312753.jpeg")
//     // const file = req.file;
//     console.log(file)
//     // res.sendFile(file)
//     res.send("adad")
// })

// /* GET users listing. */
Router.post('/', upload.single('image'),function(req, res, next) {
    const file = req.file;
    console.log(file)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    res.send("hello")
});

// Router.get('/video',function(req, res, next) {
// //     const path = format(__dirname+'public\\upload\\img-1622309606829.png')
// //   const stat = fs.statSync(path)
// //   const fileSize = stat.size
// //   const range = req.headers.range
// //   if (range) {
// //     const parts = range.replace(/bytes=/, "").split("-")
// //     const start = parseInt(parts[0], 10)
// //     const end = parts[1] 
// //       ? parseInt(parts[1], 10)
// //       : fileSize-1
// //     const chunksize = (end-start)+1
// //     const file = fs.createReadStream(path, {start, end})
// //     const head = {
// //       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
// //       'Accept-Ranges': 'bytes',
// //       'Content-Length': chunksize,
// //       'Content-Type': 'video/mp4',
// //     }
// //     res.writeHead(206, head);
// //     file.pipe(res);
// //   } else {
// //     const head = {
// //       'Content-Length': fileSize,
// //       'Content-Type': 'video/mp4',
// //     }
// //     res.writeHead(200, head)
// //     fs.createReadStream(path).pipe(res)
// //   }
// console.log(file)
//     let file = fs.ReadStream("./public/upload/img-1622309606829.png");
//     console.log(fs.read()) 
//     res.send("assdasd")
// });


// // const UploadVideo= (file)=>{
// //     let loaded = 0;
// //     let chunkSize = 500000;
// //     var total = file.size;
// //     let reader = new FileReader()
// // }



module.exports = Router
// var fs = require('fs');

// var data = '';

// var readStream = fs.createReadStream('sample.mp4',{ highWaterMark: 1 * 1024});
// var writeStream = fs.createWriteStream('sample2.mp4',{flags: 'w'})
// readStream.pipe(writeStream)

// readStream.on('data', function(chunk) {
//     data += chunk;
//     console.log('chunk Data : ')
//     console.log(chunk);// your processing chunk logic will go here


// }).on('end', function() {
//     console.log('###################');
//     console.log(data); 
// // here you see all data processed at end of file
// });