var main = async function() {
    console.log('shading..')
    var canvas = document.getElementById('shader-surface');
    // these dimensions match the css which means all pixels should be in frame
    canvas.width = 720;
    canvas.height = 480;
    var gl = canvas.getContext('webgl');
    
    var vertexSource = await getShaderSource('vertex');
    var fragmentSource = await getShaderSource('fragment');

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var positions = [
	-0.5, -0.5,
	0, 0.5,
	0.5, -0.5,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.9, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;

    gl.vertexAttribPointer(
	positionAttributeLocation, size, type, normalize, stride, offset
    );

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;

    gl.drawArrays(primitiveType, offset, count);
}();

async function getShaderSource(type) {
    var shaderSource = await fetch(`http://localhost:8080/glsl/${type}`)
	.then(res => { return res.text() })
	.then(data => { return data }); 

    return shaderSource;
}

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
	return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
	return program;
    }
    
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
