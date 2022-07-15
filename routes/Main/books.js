const express = require('express');
const Books = require('../../models/Books');
const User = require('../../models/User');
const fs = require("fs");

const Router = express.Router()

Router.get('/list/:page', async(req, res,next)=>{
    const books = await Books.find({})
    return res.send({status:'sucess', msg:"Successfuly",data:books.splice(req.params.page*5, 5)})
})

Router.post('/list/:page', async(req, res,next)=>{
    const {category, name, author} = req.body
    let findData = {} 
    if(category)
    findData = {category: category}
    if(name)
    findData = {...findData,name:{ $regex:title}}
    if(author)
    findData = {...findData, publisher:{publisher_name:{ $regex:author}}}
    
    const books = await Books.find(findData)
    res.send({status:'sucess', msg:"Successfuly",data:books.splice(req.params.page*5, 5)})
})


Router.get('/:id', async(req, res,next)=>{
    await Books.findById(req.params.id,(err, book)=>{
        if(err)
        return res.send({status: 'failed', msg:'Book Not Found'})
        return res.send({status: 'success', msg:'Book Found', data:book})
    })
})

Router.post('/buy/:id', async(req, res, next)=>{
    const book = await Books.findById(req.params.id);
    const user = await User.findById(req.headers._id)
    if(!book)
    return res.send({status: 'failed', msg:'Book not found'})
    if(!user)
    return res.send({status: 'failed', msg:'User not found'})
    const {transaction} = req.body;
    if(transaction.length !== 10)
    return res.send({status: 'failed', msg:'Wrong Transaction Id'})
    const alreadyExist = user.books.filter((item)=> item.book_id === book._id)
    console.log("found book",alreadyExist)
    if(alreadyExist.length === 1)
    return res.send({status:"warning", msg:"Already have"}) 
    user.books.push({
        book_title: book.title,
        book_id: book._id
    }) 
    book.buyers.push({
        Buyer_name: user.name,
        Buyer_id: user._id,
        transaction: transaction
    })
    book.no_sales = book.no_sales+1
    if(user.save() && book.save())
    return res.send({status: 'success', msg:'Successfully transaction completed'})
    return res.send({status: 'failed', msg:'Something went wrong'})
})
 
Router.post('/get_pdf/:bookId', async(req, res,next)=>{
    const book = await Books.findById(req.params.bookId)
    console.log(book)
    if(!book)
    return res.status(404).send("Book not found")

    if(book.buyers.filter(buyer=> buyer.Buyer_id === req.headers._id).length === 1)
    return res.status(401).send("Book not found")
    const file = fs.ReadStream('public/private/books/'+req.body.file)
    console.log(file)
    file.pipe(res)
})


Router.get("/img/:image", (req, res, next)=>{

    let exe = req.params.image.split('.');
    exe = exe[exe.length-1]
    console.log('exe', exe)
    let img = "image-not-found.jpg";
    if(( exe ==='jpg' || exe ==='jpeg' || exe ==='png')&&fs.existsSync('public/private/books/'+req.params.image)){
        img = req.params.image
    }
    let file = fs.ReadStream('public/private/books/'+img) 
    // console.log(file)
    console.log(img)
    file.pipe(res)
})


Router.all('*', function(req, res, next) {
    res.status(404).send("Page not found");
});
  


module.exports = Router