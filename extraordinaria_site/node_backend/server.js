const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/extraordinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Node.js Backend is running!');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));