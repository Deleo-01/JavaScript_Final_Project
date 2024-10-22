const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

/*Files which are static to the server*/
app.use(express.static(path.join(__dirname, 'public')));

/*The address for the index */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/*For starting the server*/

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
