const express = require('express');
const router = express.Router();//express ke andar router hota hai
const Notes = require('../models/Post');
const fetch_user = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// Route 1 : Get all the notes using : GET "/api/posts/fetchAllNotes". Login required
router.get('/fetchAllPosts', fetch_user, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Route 2 : Add a new note using : POST "/api/posts/addPosts". Login required
router.post('/addPosts', fetch_user, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;//destructuring
        const note = new Notes({ title, description, tag, user: req.user.id })//new is a method in JS to make an instance of an object or you can say it is a constructor
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Delete a note using : DELETE "/api/posts/deletePosts". Login required
router.delete('/deletePosts/:id', fetch_user, async (req, res) => {//id here is object id not user id
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);//params matlab jo url me id hai vaha se id lunga and check karunga
        if (!note) {
            return res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {// checking the id of the user whose these notes are and the id of the user who is requesting to update the notes
            return res.status(401).send('Not Allowed');
        }
        await Notes.findByIdAndDelete(req.params.id);//will not return anything obviously
        res.json({ 'Success': 'The notes has been deleted.', id: req.params.id, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;