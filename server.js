const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const index = require('./routes/index');
const image = require('./routes/image');

// MongoDB connection
const mongodb_url = 'mongodb://localhost:27017';
const dbName = 'darkroom';

mongoose.connect(`${mongodb_url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.json());                 // For JSON
app.use(express.urlencoded({ extended: true }));  // For form data

// Routes
app.use('/', index);
app.use('/image', image);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http:
