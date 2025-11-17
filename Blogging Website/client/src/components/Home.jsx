import axios from 'axios';
import { useEffect, useState } from "react";
import { createBlog,getAllBlogs,deleteBlog,updateBlog } from "./api";

export default function Home() {

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);

   // Fetch all blogs
  const fetchBlogs = async () => {
    const res = await getAllBlogs();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePost = async () => {
    const newBlog = { image, title, description };

    if(editId){
      await updateBlog(editId,newBlog);
      setEditId(null);
    }

    else{

      await createBlog(newBlog);
    }

    // Clear inputs
    setImage("");
    setTitle("");
    setDescription("");

    // Fetch updated list
    fetchBlogs();
  };

  //Edit Post
  const handleEdit = (ele)=>{
    setImage(ele.image);
    setTitle(ele.title);
    setDescription(ele.description);
    setEditId(ele._id);
  }


  //Delete Blog

  const handleDelete = async(id) =>{
    await deleteBlog(id);
    fetchBlogs();
  }

  
  return (
    <>
    <div id="header">
    <input placeholder="Enter Image URL" value={image}  onChange={(e) => setImage(e.target.value)}/>
    <input placeholder="Enter Title" value={title}  onChange={(e) => setTitle(e.target.value)}/>
    <input placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
    <button onClick={handlePost}>Post</button>
    </div>

    <div className='box1'>
      {Array.isArray(blogs) &&
  blogs.map((ele, index) => (
    <div key={index}>
      <img src={ele.image} />
      <h2>{ele.title}</h2>
      <p>{ele.description}</p>
      <div className='button'>
        <button onClick={() => handleEdit(ele)}>Edit</button>
        <button onClick={()=>handleDelete(ele._id)}>Delete</button>
      </div>
    </div>
  ))
}
    </div>
    </>
  );
}