// express
const express = require('express');
// express variable
const app = express();
// mongoose
const mongoose = require('mongoose');
// required for .env
require('dotenv').config()
// schema
const Post = require('./models/Post')

// ************************************** MIDDLEWARE
// ------------------------------------------- (MONGOOSE)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('mongo mongo mongo 🦛');
});
// ------------------------------------------- (body parsing?)
app.use(express.json({ extended: false }));

// *************************************** ROUTES / PAGES
// main page
app.get("/", async(req,res) => {
    // res.send('HELLO👋🏼')
    // ********************************** INDEX ROUTE***
    try {
        const allPosts = await Post.find({});
        res.send(allPosts)
    } catch (err) {
        console.error(err);
        res.status(500).send("Read Route Server Error")
    }
})

// ************************************** DELETE
app.delete('/:id', async(req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.send('Post Deleted')
    } catch (err) {
        console.error(err);
        res.status(500).send('Delete Server Error')
    }
})

// ************************************** UPDATE
// UPDATE ROUTE CR[U]D
app.put('/:id', async(req,res) => {
    try {
        // {new:true} helps us output the new data as opposed to old data
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(post)
    } catch (err) {
        console.error(err);
        res.status(500).send("Update Server Error")
    }
})


// create route [C]RUD
app.post('/', async(req,res) => {
    try {
       const post = await Post.create(req.body)
       res.send(post) // this will have an _id
    } catch (err) {
        // console.error(err);
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


// ************************************************* SERVER
app.listen('3000', () => {
    console.log("👽 3000 👽")
})