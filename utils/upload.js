var cloudinary = require('cloudinary').v2;

const uploadFile = async(path, label)=>{
    try{

        const res = await cloudinary.uploader.upload(path, {
            resource_type: "image",
            public_id: "quill/"+label
        })
        console.log("uploaded data to clould response", res)
        return res;
    }
    catch(err){
        return Error(err)
    }
    
}
    

module.exports = uploadFile