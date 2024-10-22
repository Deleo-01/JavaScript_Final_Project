const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from 'public' and 'data' directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));  // Ensure data folder is served

// Route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
