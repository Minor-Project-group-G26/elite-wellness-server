const Router = require('express').Router()
const fs = require('fs');
const User = require('../../models/User');

Router.get('/img/user/:image',(req, res)=>{
  image = fs.createReadStream('./public/upload/'+req.params.image)
  image.pipe(res);
})

// Router.get('/:token/:video/trailer', async(req, res)=>{
//     const range = req.headers.range;
//     console.log(range);
//     if (!range) {
//       res.status(400).send("Requires Range header");
//     }
  
//     // get video stats (about 61MB)
//     const videoPath = "./public/private/videos"+req.params.video;
//   //   video start , end and size
//     const videoSize = await fs.statSync(videoPath).size;
  
//     console.log(videoSize)
//     // Parse Range
//     // Example: "bytes=32324-"
//     const CHUNK_SIZE = 10 ** 6; // 1MB
//   //   it's remove other than digit  
//     const start = Number(range.replace(/\D/g, ""));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    
//     // Create headers
//     const contentLength = end - start + 1;
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "video/mp4",
//     };
  
//     // HTTP Status 206 for Partial Content
//     res.writeHead(206, headers);
  
//     // create video read stream for this particular chunk
//     const videoStream = fs.createReadStream(videoPath, { start, end });
  
//     // Stream the video chunk to the client
//     videoStream.pipe(res);
// })

Router.get('/:token/:video', async(req, res)=>{
    const user = User()
    const { err } = user.verifyToken(req.params.token, "1234567890")
    console.log(err)
    if(err) 
    return res.send({error:err})
    const range = req.headers.range;
    console.log(range);
    if (!range) {
      res.status(400).send("Requires Range header");
    }
  
    // get video stats (about 61MB)
    const videoPath = "./public/private/videos/"+req.params.video;
  //   video start , end and size
    const videoSize = await fs.statSync(videoPath).size;
  
    console.log(videoSize)
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
  //   it's remove other than digit  
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);
})

module.exports = Router