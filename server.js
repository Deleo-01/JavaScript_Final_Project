const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory (this includes images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the data.json file from the 'data' folder
app.get('/data/data.json', (req, res) => {
    const dataPath = path.join(__dirname, 'data', 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data.json');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Serve index.html on the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
