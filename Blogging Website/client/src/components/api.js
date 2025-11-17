import axios from 'axios';

//axios.create() accepts an object where you can define default settings for all your API calls.

 export const API  = axios.create({
    baseURL : "http://localhost:3000"
})

//Create
export const createBlog = (data) => API.post('/blogs',data);

//Read
export const getAllBlogs = () => API.get('/allblogs');

//Update
export const updateBlog = (id,data) => API.put(`/editblog/${id}`,data);

//Delete
export const deleteBlog = (id) => API.delete(`/deleteblog/${id}`);





