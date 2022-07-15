var express = require('express');
const { instructorAuth } = require('../../middleware/instructorVerify');
const User = require('../../models/User');
var Router = express.Router();
const multer = require('multer');
const { storage } = require('../../middleware/upload');
const fs = require('fs');
const Instrector = require('../../models/Instrector');
const Books = require('../../models/Books');
const Courses = require('../../models/Courses');
var cloudinary = require('cloudinary').v2;
const upload = require("../../utils/upload")

Router.use(instructorAuth);

/* GET users listing. */

const uploadBook = multer({
    storage: storage('./public/private/books'),
    
    fileFilter: (req, file, cb)=>{
        // console.log(file);
        if(file.fieldname === 'bookPdf')
          if (file.mimetype == 'application/pdf' ) {
            return cb(null, true);
          } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
          if(file.fieldname === 'bookImage')
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
              return cb(null, true);
            } else {
              cb(null, false);
              return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
          else
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));

    }
})

const uploadCourse= multer({
  storage: storage('./public/CourseImage'),
  fileFilter: (req, file, cd)=>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cd(null, true)
    }
    else{
      cd(Error("File not supported"), false)
    }
  }
})

Router.put('/update', async(req, res, next)=>{
  await User.findByIdAndUpdate(req.headers._id,{$set: req.body},(err)=>{
    res.send(err)
  })
});


Router.post("/course/:id/update", uploadCourse.single("thumbnail"), async (req,res, next)=>{
  const course = await Courses.findById(req.params.id);
  console.log("res", course.id)
  
  if(!course){
    return res.send({status:"failed", msg:"failed to Created"})      
  }
  // if(course.instructor.instructor_id !== req.headers._instructor_id){
  //   return res.send({status:"failed", msg:"Worng Course ID"})      
  // } 

  const {filename, path} = req.file;
  if(!req.file)
  return res.send({status:"failed", msg:"Missing Thumbnail Image "})  
  const resp = await upload(path, "course_banner/"+filename)
  course.image = resp.secure_url;
  if(course.save()){
    console.log("path ", path)
    fs.unlinkSync(path, (err=> console.log("err", err)))
    return res.send({status:"success", msg:"Course Data Updated Successfully"})
  }
  return res.send({status:"failed", msg:"Course Data Updated Failed"})

})



Router.post('/new/book',uploadBook.any(),async(req, res)=>{
    console.log(req.headers)
   try {
    const {desc, title, price, tags,author, category} = req.body;
    console.log(req.headers._id)
    if(!title || !price|| !desc|| !tags || !category)
    return res.send({status:"failed", msg:"failed to Created"})     
    const user = await User.findById(req.headers._id)
    if(!user){
      console.log(user)
    }
     
    console.log(req.headers._instructor_id)
    const instrector = await Instrector.findById(req.headers._instructor_id);
    console.log(instrector);
    const newBook = new Books();
    newBook.publisher= {
        publisher_name: user.name,
        publisher_id: user._id,
        publisher_profession: user.occupation
    };
    newBook.title = title;
    newBook.author = author.split(',');
    newBook.price = price;
    newBook.tags = JSON.parse(tags);
    newBook.description = desc;
    newBook.category = category;
    newBook.book_file = req.files[0].filename
    newBook.book_image = req.files[1].filename

    console.log(newBook.tags[0]);
    if(newBook.save()){
      instrector.books.push({
        book_title: newBook.title,
        book_id: newBook._id
      })
      if(instrector.save()){
        res.send("books saved");
      }
      else{
        newBook.remove()
        req.files.map(file =>{
          fs.unlinkSync(file.path)
        })
        res.send("not saved")
        
      }
    }
    else{
        req.files.map(file =>{
          fs.unlinkSync(file.path)
        })
        res.send("not saved")
    }
   } 
   catch (error) {
      console.error(error)
      req.files.map(file =>{
        fs.unlinkSync(file.path)
      })
   }
})



Router.post('/new/course',  uploadCourse.single('thumbnail'), async(req, res)=>{
  const {filename, path} = req.file;
  if(!req.file)
  return res.send({status:"failed", msg:"Missing Thumbnail Image "})      

  try {
    const {title, price, desc, tags, level, category} = req.body
    if(!title || !price|| !desc|| !tags|| !level|| !category)
      return res.send({status:"failed", msg:"failed to Created"})      
    const newCourse = new Courses();
    const user = await User.findById(req.headers._id);
    const instructor = await Instrector.findById(req.headers._instructor_id);
    if(!instructor){
      fs.unlink(path)
      return res.send({status:"failed", msg:"instructor not found"})
    }
    newCourse.title = title;
    newCourse.price = price;
    newCourse.description = desc;
    newCourse.tags = JSON.parse(tags);
    newCourse.level = level;
    newCourse.category = category;
    newCourse.instructor={
      instructor_name:user.name,
      instructor_id:user.instructor_id,
      instructor_profession:user.occupation
    }
    if(newCourse.save()){
        instructor.courses.push({
          course_title: newCourse.title,
          course_id: newCourse._id
        })
      if(instructor.save())
      return res.send({status:"success", msg:"Successfully Created"})
      else{
        fs.unlink(path)
        return res.send({status:"failed", msg:"failed to Created"})
      }
    }
    else{
      fs.unlink(path)
      return res.send({status:"failed", msg:"failed to Created"})      
    }
    
  } catch (error) {
    fs.unlink(path)
    return res.send({status:"failed", msg:"failed to Created"})      
  }
})

const uploadCourseVideo= multer({
  storage: storage('./public/private/videos'),
  fileFilter: (req, file, cd)=>{
    if(file.mimetype === 'video/mp4'|| file.mimetype == 'application/pdf' ){
      cd(null, true)
    }
    else{
      cd(Error("File not supported"), false)
    }
  }
})



Router.put('/course/:id/create_week' , async(req, res, next)=>{
  const course = await Courses.findById(req.params.id);
  const {week_no, week_topic} = req.body
  if(!course){
    return res.send({status:"failed", msg:"failed to Created"})      
  }
  if(course.instructor.instructor_id !== req.headers._instructor_id){
    return res.send({status:"failed", msg:"Worng Course ID"})      
  } 
  course.data.push({
    week_no: week_no,
    week_topic : week_topic
  });
  if(course.save()){
    return res.send({status:"success", msg:"Successfully Week Created"})
  }else{
    return res.send({status:"failed", msg:"failed to Created"})      
  }
})

Router.put('/course/:id/:week',uploadCourseVideo.single('file') , async(req, res, next)=>{
  try {
    const course = await Courses.findById(req.params.id);
    if(!course){
      fs.unlink(req.file.path)
      return res.send({status:"failed", msg:"failed to Created"})      
    }
    course.data[req.params.week].week_data.push({
      title: req.body.title,
      file: req.file.filename,
      type:req.body.type
    });
    if(course.save()){
      return res.send({status:"success", msg:"Successfully Added"})
    }else{
      fs.unlink(req.file.path)
      return res.send({status:"failed", msg:"failed to Created"})      
    }
  } catch (error) {
    fs.unlink(req.file.path)
    return res.send({status:"failed", msg:"failed to Created"})   
  }
})

Router.put('/course/:id/:week/assignment',uploadCourseVideo.single('qus_file') , async(req, res, next)=>{
  try {
    const course = await Courses.findById(req.params.id);
    if(!course){
      fs.unlink(req.file.path)
      return res.send({status:"failed", msg:"failed to Created"})      
    }
  
    course.data[req.params.week].assignment.push({
      title: req.body.title,
      question: req.file.filename,
      answare: req.body.answae,
      week: req.params.week,
      type_assignment: req.body.type_assignment
    });
    if(course.save()){
      return res.send({status:"success", msg:"Successfully Added"})
    }else{
      fs.unlink(req.file.path)
      return res.send({status:"failed", msg:"failed to Created"})      
    }
  } catch (error) {
    fs.unlink(req.file.path)
    return res.send({status:"failed", msg:"failed to Created"})   
  }
})

Router.get('/', async(req, res, next)=>{
  console.log(req.headers);
  const user = await User.findById(req.headers._id)
    return res.send(user)
});


Router.all('*', function(req, res, next) {
    res.status(404).send("Page not found");
});
 

module.exports = Router;
