const multer = require('multer');

exports.storage = (dist) => multer.diskStorage({
    destination: (req, file, cd)=>{
        cd(null, dist)
    },
    filename: (req, file, cd)=>{
        // console.log(req.body)
        cd(null, "img"+"-"+Date.now()+"."+file.mimetype.split('/')[1])
    }
});


