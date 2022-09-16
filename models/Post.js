const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    user: {// this will link user module to posts module so as to make posts visible to "only" the user of that notes not someone else. This is like a foriegn key in SQL.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const Posts = mongoose.model('Posts', PostsSchema);
module.exports = Posts;