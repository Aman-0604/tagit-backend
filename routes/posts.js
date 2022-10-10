const express = require('express');
const router = express.Router();//express ke andar router hota hai
const Posts = require('../models/Post');
const fetch_user = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// Route 1 : Get all the posts using : GET "/api/posts/fetchAllPosts". Login required
router.get('/fetchAllPosts', fetch_user, async (req, res) => {
    try {
        const posts = await Posts.find({ user: req.user.id });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Route 2 : Add a new post using : POST "/api/posts/addPosts". Login required
router.post('/addPosts', fetch_user, [
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),
    body('imgUrl', 'URL must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { description, imgUrl } = req.body;//destructuring
        const post = new Posts({ description, imgUrl, user: req.user.id })//new is a method in JS to make an instance of an object or you can say it is a constructor
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Delete a post using : DELETE "/api/posts/deletePosts". Login required
router.delete('/deletePosts/:id', fetch_user, async (req, res) => {//id here is object id not user id
    try {
        // Find the post to be deleted and delete it
        let post = await Posts.findById(req.params.id);//params matlab jo url me id hai vaha se id lunga and check karunga
        if (!post) {
            return res.status(404).send('Not found');
        }
        if (post.user.toString() !== req.user.id) {// checking the id of the user whose these posts are and the id of the user who is requesting to update the posts
            return res.status(401).send('Not Allowed');
        }
        await Posts.findByIdAndDelete(req.params.id);//will not return anything obviously
        res.json({ 'Success': 'The post has been deleted.', id: req.params.id, post });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;