const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image : String,
    title : String,
    description : String 

})
let blogModel = mongoose.model('Blog',blogSchema);
module.exports = blogModel;