const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const blogPostRoutes = require('./routes/blogPosts');
app.use('/', blogPostRoutes);


// Connect to MongoDB (make sure you have MongoDB installed and running)
mongoose.connect('mongodb://localhost:27017/simple-blog', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Set up session
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// Set up middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Your routes go here...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
