const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
        maxLength: 280
    },
})

// Post = collection name
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
