const express = require('express');

const app = express();

const host = 'localhost';
const port = 8080;

app.get('/', (req, res) => {
    res.send('hello universe');
});

app.listen(port, host, () => {
    console.log(`[x] server up and running on http://${host}:${port}...`);
});

