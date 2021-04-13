  'use strict';

  // Global variables that are set and used
  // across the application
  let gl, program;
  
  // Global declarations of objects that you will be drawing
  var myTeapot = null;
  var myCube = null;
  var myCylinder = null;
  var mySphere = null;
  var myCone = null;


//
// A function that creates shapes to be drawn and creates a VAO for each
//
// We start you out with an example for the teapot.
//
function createShapes() {

    myTeapot = new Teapot();
    myTeapot.VAO = bindVAO (myTeapot);

    myCube = new Cube(2);
    myCube.VAO = bindVAO(myCube);

    myCylinder = new Cylinder(15, 15);
    myCylinder.VAO = bindVAO(myCylinder);

    mySphere = new Sphere(15, 15);
    mySphere.VAO = bindVAO(mySphere);

    myCone = new Cone(5, 5);
    myCone.VAO = bindVAO(myCone);
}


//
// Set up your camera and your projection matrices
//
function setUpCamera() {
    
    // set up your projection
    // defualt is orthographic projection
    let projMatrix = glMatrix.mat4.create();
    //glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
    glMatrix.mat4.perspective(projMatrix, radians(90), 1.0, 1.0, 300.0);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
    // set up your view
    // defaut is at (0,0,-5) looking at the origin
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 3, -10], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);
}


//
// Use this function to draw all of your shapes.
// Recall that VAOs should have been set up the call to createShapes()
// You'll have to provide a Model Matrix for each shape to be drawn that
// places the object in the world.
//
// An example is shown for placing the teapot
//
function drawShapes() {
    
    // Pedestal for teapot - top
    let cubeMatrix = glMatrix.mat4.create();

    glMatrix.mat4.scale(cubeMatrix, cubeMatrix, [1.25, 0.75, 1.25])

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, -0.5, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -2])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //Top of pedestal for circle
    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [7, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -2])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //Top of pedestal for Cone
    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-8, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -2])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    /////////////////////////////
    //Bottom of Pedestal for Cone
    /////////////////////////////
    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [2, -5.75, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -2])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //Bottom of Pedestal for Teapot
    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [7, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -2])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //Bottom of Pedestal for Circle
    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [7, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, 1])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 0, -2])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [-1, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);

    //Cylinder for Sphere
    let cylinderMatrix = glMatrix.mat4.create();

    glMatrix.mat4.scale(cylinderMatrix, cylinderMatrix, [3.5, 3.5, 3.5])
    glMatrix.mat4.translate(cylinderMatrix, cylinderMatrix, [1.83, -0.72, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    //Cylinder for Teapot
    glMatrix.mat4.translate(cylinderMatrix, cylinderMatrix, [-1.83, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    //Cylinder for Cone
    glMatrix.mat4.translate(cylinderMatrix, cylinderMatrix, [-1.83, 0, 0])
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);

    // Teapot
    let teapotMatrix = glMatrix.mat4.create();
    
    glMatrix.mat4.scale(teapotMatrix, teapotMatrix, [1.5,1.5,1.5])
    // drawing the teapot rotating around Y  180 degrees
    glMatrix.mat4.rotateY (teapotMatrix,  teapotMatrix, radians(180.0))
    
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, teapotMatrix);
    gl.bindVertexArray(myTeapot.VAO);
    gl.drawElements(gl.TRIANGLES, myTeapot.indices.length, gl.UNSIGNED_SHORT, 0);

    // Sphere
    let sphereMatrix = glMatrix.mat4.create();

    glMatrix.mat4.scale(sphereMatrix, sphereMatrix, [2.5, 2.5, 2.5])
    glMatrix.mat4.translate(sphereMatrix, sphereMatrix, [2.5, 0.5, 0])
    gl.uniformMatrix4fv (program.uModelT, false, sphereMatrix);
    gl.bindVertexArray(mySphere.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);

    //Cone
    let coneMatrix = glMatrix.mat4.create();

    glMatrix.mat4.scale(coneMatrix, coneMatrix, [2.5, 2.5, 2.5])
    glMatrix.mat4.translate(coneMatrix, coneMatrix, [-2.5, 0.5, 0])
    gl.uniformMatrix4fv (program.uModelT, false, coneMatrix);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
    
}

///////////////////////////////////////////////////////////////////
//
//   You shouldn't have to edit below this line
//
///////////////////////////////////////////////////////////////////

  // Given an id, extract the content's of a shader script
  // from the DOM and return the compiled shader
  function getShader(id) {
    const script = document.getElementById(id);
    const shaderString = script.text.trim();

    // Assign shader depending on the type of shader
    let shader;
    if (script.type === 'x-shader/x-vertex') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (script.type === 'x-shader/x-fragment') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else {
      return null;
    }

    // Compile the shader using the supplied shader code
    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);

    // Ensure the shader is valid
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  // Create a program with the appropriate vertex and fragment shaders
  function initProgram() {
    const vertexShader = getShader('vertex-shader');
    const fragmentShader = getShader('fragment-shader');

    // Create a program
    program = gl.createProgram();
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
    }

    // Use this program instance
    gl.useProgram(program);
    // We attach the location of these shader values to the program instance
    // for easy access later in the code
    program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    program.aBary = gl.getAttribLocation(program, 'bary');
    program.uModelT = gl.getUniformLocation (program, 'modelT');
    program.uViewT = gl.getUniformLocation (program, 'viewT');
    program.uProjT = gl.getUniformLocation (program, 'projT');
  }

  // creates a VAO and returns its ID
  function bindVAO (shape) {
      //create and bind VAO
      let theVAO = gl.createVertexArray();
      gl.bindVertexArray(theVAO);
      
      // create and bind vertex buffer
      let myVertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aVertexPosition);
      gl.vertexAttribPointer(program.aVertexPosition, 4, gl.FLOAT, false, 0, 0);
      
      // create and bind bary buffer
      let myBaryBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(program.aBary);
      gl.vertexAttribPointer(program.aBary, 3, gl.FLOAT, false, 0, 0);
      
      // Setting up the IBO
      let myIndexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

      // Clean
      gl.bindVertexArray(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      
      return theVAO;
    
  }

  
  // We call draw to render to our canvas
  function draw() {
    // Clear the scene
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
    // draw your shapes
    drawShapes();

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

  // Entry point to our application
  function init() {
      
    // Retrieve the canvas
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
      console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
      return null;
    }


    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // Set the clear color to be black
    gl.clearColor(0, 0, 0, 1);
      
    // some GL initialization
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.clearColor(0.0,0.0,0.0,1.0)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)

    // Read, compile, and link your shaders
    initProgram();
    
    // create and bind your current object
    createShapes();
    
    // set up your camera
    setUpCamera();
    
    // do a draw
    draw();
  }
