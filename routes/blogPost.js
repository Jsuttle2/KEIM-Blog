
// routes

// Import necessary modules and middleware at the beginning of the file
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogpost');
const upload = require('../utils/multer');

// Display all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: 'desc' });
    res.render('index', { blogPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Display form for creating a new post
router.get('/new', (req, res) => {
  res.render('new');
});

// Handle form submission for creating a new post
router.post('/new', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file.filename;
    
    // Create a new blog post
    const newBlogPost = new BlogPost({
      title,
      content,
      image,
    });

    // Save the blog post to the database
    await newBlogPost.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// end of routes

module.exports = router;


