const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const host = 'localhost';
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui/index.html'));
});

app.get('/shader.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'shader.js'));
});

app.get('/glsl/:shader_type', (req, res) => {
    const shaderType = req.params.shader_type;
    const filePath = `./${shaderType}.glsl`;

    fs.readFile(filePath, 'utf-8', (err, data) => {
	if (err) {
	    console.error('Error reading file: ', err);
	    return res.status(500).send('Internal Server Error');
	}
	console.log(`[x] sending shader: ${shaderType}..`)
	res.send(data);
    });
});

app.listen(port, host, () => {
    console.log(`[x] server up and running on http://${host}:${port}...`);
});
