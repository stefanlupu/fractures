const express = require('express');
const path = require('path');

const app = express();

const host = 'localhost';
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui/index.html'));
});

app.listen(port, host, () => {
    console.log(`[x] server up and running on http://${host}:${port}...`);
});

