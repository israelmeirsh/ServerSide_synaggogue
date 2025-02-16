const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/synaggogueDB',)
    .then(() => console.log('Connected to MongoDB'))    
    .catch((error) => console.error('Error connecting to MongoDB:', error));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});