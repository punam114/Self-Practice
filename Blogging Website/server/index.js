const express = require('express');
const connectDB = require('./config/mongoDb');
const blogModel = require('./model/blogSchema');
const cors = require("cors");

const app = express();
app.use(cors());   
app.use(express.json())

connectDB();

app.get('/',(req,res)=>{
  res.send('Hello People');
})

app.post('/blogs',async(req,res)=>{
  try {
    let {image,title,description} = req.body;
    let blogs = await blogModel.create({image,title,description});
    res.status(201).json(blogs);
    console.log(blogs)
  } catch (error) {
    console.log("error")
  }
})

app.get('/allblogs',async(req,res)=>{
  try {
    let blogs = await blogModel.find();
    res.status(200).json(blogs)
  } catch (error) {
    console.log("error");
  }
})

app.delete('/deleteblog/:id',async(req,res)=>{
  try {
    let {id} = req.params;
    let deleteblog = await blogModel.findByIdAndDelete(id);
    res.status(200).json(deleteblog)
   console.log(id);

  } catch (error) {
     console.log(error);
  }
})

app.put('/editblog/:id',async(req,res)=>{
  try {
    let {id} = req.params;
    let editblog = await blogModel.findByIdAndUpdate(id ,req.body ,{new:true});
    res.status(200).json(editblog);
  } catch (error) {
    console.log(error);
  }
})

app.get('/showdetail/:id',async(req,res)=>{
  try {
    let {id} = req.params;
    let showdetail = await blogModel.findById(id);
    res.status(200).json(showdetail);
  } catch (error) {
    console.log(error);
  }
})


app.listen(3000,()=>{
  console.log("Server Running");
})