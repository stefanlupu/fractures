var InitCanvas = function() {
    console.log('shading..')
    var canvas = document.getElementById('shader-surface');
    var gl = canvas.getContext('webgl');
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}();
