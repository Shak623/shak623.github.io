  'use strict';

  // Global variables that are set and used
  // across the application
  let gl;

  // GLSL programs
  let luxoBallTextureProgram;
  let onlyBallProgram;
  let luxoBallShadedPerVertexProgram;
  let luxoBallShadedPerFragProgram;

  let luxoPerVertexProgram;
  let luxoPerFragProgram;

  let woodFloorProgram;
  let onlyWoodFloorProgram;

  
  // VAOs for the objects
  var texturedLuxoBall = null;
  var onlyTexturedBall = null;
  var luxoBallPerVertex = null;
  var luxoBallPerFrag = null;

  var floor = null;           // Used for wood flooring
  var onlyFloor = null;

  // Vertex shaded
  var myConeVertex = null;    // Used for luxo Jr.
  var vCubeVertex = null;     // Used for luxo Jr.
  var hCubeVertex = null;     // Used for luxo Jr.
  var baseVertex = null;      // Used for luxo Jr.

  // Fragment shaded
  var myConeFrag = null;    // Used for luxo Jr.
  var vCubeFrag = null;     // Used for luxo Jr.
  var hCubeFrag = null;     // Used for luxo Jr.
  var baseFrag = null;      // Used for luxo Jr.

  // textures
  let luxoBallTexture;
  let mahoganyFloorTexture;
  let darkWoodFloorTexture;

  // what is currently showing
  // valid values - "theImage", "ball", "woodFloor"
  let nowShowing = "theImage";

  // Are we using "Vertex" or "Fragment" shading?
  let shading = "Vertex";

  // What texture is being used for the ball and wood floor
  let ballTexture = "textured";       // valid values - "luxo", "shaded"
  let woodTexture = "mahogany";   // valid values - "mahogany", "darkWood";

  // rotation
  var anglesReset = [30.0, 30.0, 0.0];
  var cube_angles = [30.0, 30.0, 0.0];
  var sphere_angles = [180.0, 180.0, 0.0];
  var angleInc = 5.0;
 
//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {

  //Luxo Ball
  texturedLuxoBall = new Sphere (20, 20);
  texturedLuxoBall.VAO = bindTexturedVAO(texturedLuxoBall, luxoBallTextureProgram);

  onlyTexturedBall = new Sphere (20, 20);
  onlyTexturedBall.VAO = bindTexturedVAO(onlyTexturedBall, onlyBallProgram);

  luxoBallPerVertex = new Sphere(20, 20);
  luxoBallPerVertex.VAO = bindVAO(luxoBallPerVertex, luxoBallShadedPerVertexProgram);

  luxoBallPerFrag = new Sphere(20, 20);
  luxoBallPerFrag.VAO = bindVAO(luxoBallPerFrag, luxoBallShadedPerFragProgram);

  //Cube (Used for wood flooring)
  floor = new Cube(20);
  floor.VAO = bindTexturedVAO(floor, woodFloorProgram);

  onlyFloor = new Cube(20);
  onlyFloor.VAO = bindTexturedVAO(onlyFloor, onlyWoodFloorProgram);

  // Cone for luxo Jr.
  myConeVertex = new Cone(20, 20);
  myConeVertex.VAO = bindVAO(myConeVertex, luxoPerVertexProgram);

  myConeFrag = new Cone(20, 20);
  myConeFrag.VAO = bindVAO(myConeFrag, luxoPerFragProgram);

  // Cube for luxo Jr. (Vertical Supports)
  vCubeVertex = new Cube(20);
  vCubeVertex.VAO = bindVAO(vCubeVertex, luxoPerVertexProgram);

  vCubeFrag = new Cube(20);
  vCubeFrag.VAO = bindVAO(vCubeFrag, luxoPerFragProgram);

  // Cube for luxo Jr. (Horizontal Supports)
  hCubeVertex = new Cube(20);
  hCubeVertex.VAO = bindVAO(hCubeVertex, luxoPerVertexProgram);

  hCubeFrag = new Cube(20);
  hCubeFrag.VAO = bindVAO(hCubeFrag, luxoPerFragProgram);

  // Base cylinder for luxo Jr.
  baseVertex = new Cylinder(20, 20);
  baseVertex.VAO = bindVAO(baseVertex, luxoPerVertexProgram);

  baseFrag = new Cylinder(20, 20);
  baseFrag.VAO = bindVAO(baseFrag, luxoPerFragProgram);

  setUpTextures();

}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
    
    gl.useProgram (program);
    
    // set up your projection
    // defualt is orthographic projection
    let projMatrix = glMatrix.mat4.create();
    //glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
    glMatrix.mat4.perspective(projMatrix, radians(90), 1.0, 1.0, 300.0);
    gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

    
    // set up your view
    // defaut is at (0,0,-5) looking at the origin
    let viewMatrix = glMatrix.mat4.create();
    glMatrix.mat4.lookAt(viewMatrix, [0, 0, -20], [0, 0, 0], [0, 1, 0]);
    gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);

}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
    
    // flip Y for WebGL
    gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
    
    if (ballTexture === "textured"){
      // get some texture space from the gpu
      luxoBallTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, luxoBallTexture);
      
      // load the actual image
      var luxoBallImage = document.getElementById ('luxo-ball-texture')
      luxoBallImage.crossOrigin = "";
          
      luxoBallImage.onload = () => {
        // bind the texture so we can perform operations on it
        gl.bindTexture (gl.TEXTURE_2D, luxoBallTexture);
            
        // load the texture data
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, luxoBallImage.width, luxoBallImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, luxoBallImage);
            
        // set texturing parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      }
    }

    // get some texture space from the gpu
    mahoganyFloorTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, mahoganyFloorTexture);
    
    // load the actual image
    var mahoganyFloorImage = document.getElementById ('mahogany-floor-texture')
    mahoganyFloorImage.crossOrigin = "";
        
    mahoganyFloorImage.onload = () => {
      // bind the texture so we can perform operations on it
      gl.bindTexture (gl.TEXTURE_2D, mahoganyFloorTexture);
          
      // load the texture data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, mahoganyFloorImage.width, mahoganyFloorImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, mahoganyFloorImage);
          
      // set texturing parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    }

    // get some texture space from the gpu
    darkWoodFloorTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, darkWoodFloorTexture);
    
    // load the actual image
    var darkWoodFloorImage = document.getElementById ('dark-wood-floor-texture')
    darkWoodFloorImage.crossOrigin = "";
        
    darkWoodFloorImage.onload = () => {
      // bind the texture so we can perform operations on it
      gl.bindTexture (gl.TEXTURE_2D, darkWoodFloorTexture);
          
      // load the texture data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, darkWoodFloorImage.width, darkWoodFloorImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, darkWoodFloorImage);
          
      // set texturing parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    }
}

//
// In this function, you must set up all of the uniform variables
// in the shaders required for the implememtation of the Phong
// Illumination model.
//
function setUpPhong(program) {
  // Recall that you must set the program to be current using
  // the gl useProgram function
  gl.useProgram (program);

  //
  // set values for all your uniform variables
  // including the model transform
  // but not your view and projection transforms as
  // they are set in setUpCamera()
  //
  let ambientLightVec = glMatrix.vec3.fromValues(128/255, 128/255, 128/255);
  gl.uniform3fv(program.ambientLight, ambientLightVec);

  let lightPositionVec = glMatrix.vec3.fromValues(-50, 0, -12);  //world coords
  gl.uniform3fv(program.lightPosition, lightPositionVec);

  let lightColorVec = glMatrix.vec3.fromValues(1, 1, 1);
  gl.uniform3fv(program.lightColor, lightColorVec);

  let baseColorVec = glMatrix.vec3.fromValues(211/255, 211/255, 211/255);   // light grey color
  gl.uniform3fv(program.baseColor, baseColorVec);

  let specHighlightColorVec = glMatrix.vec3.fromValues(211/255, 211/255, 211/255);
  gl.uniform3fv(program.specHighlightColor, specHighlightColorVec);

  gl.uniform1f(program.ka, 1)
  gl.uniform1f(program.kd, 1)
  gl.uniform1f(program.ks, 1)
  gl.uniform1f(program.ke, 20)

}

function setUpBallPhong(program) {
    

  // Recall that you must set the program to be current using
  // the gl useProgram function
  gl.useProgram (program);
  
  //
  // set values for all your uniform variables
  // including the model transform
  // but not your view and projection transforms as
  // they are set in setUpCamera()
  //
  let ambientLightVec = glMatrix.vec3.fromValues(0.1, 0.1, 0.1);
  gl.uniform3fv(program.ambientLight, ambientLightVec);

  let lightPositionVec = glMatrix.vec3.fromValues(10, -7, -20);  //world coords
  gl.uniform3fv(program.lightPosition, lightPositionVec);

  let lightColorVec = glMatrix.vec3.fromValues(1, 1, 1);
  gl.uniform3fv(program.lightColor, lightColorVec);

  let baseColorVec = glMatrix.vec3.fromValues(1, 0/255, 0);
  gl.uniform3fv(program.baseColor, baseColorVec);

  let specHighlightColorVec = glMatrix.vec3.fromValues(1, 1, 1);
  gl.uniform3fv(program.specHighlightColor, specHighlightColorVec);

  gl.uniform1f(program.ka, 1)
  gl.uniform1f(program.kd, 1)
  gl.uniform1f(program.ks, 1)
  gl.uniform1f(program.ke, 20)
  
  
}


//
//  This function draws all of the shapes required for your scene
//
function drawShapes() {

  var object = null;
  var program = null;

  // Draw the original Image:
  if (nowShowing === "theImage") {
    // Draw luxo Ball
    if (ballTexture === "textured"){
      object = texturedLuxoBall;
      program = luxoBallTextureProgram;

      // set up uniform variables for drawing
      gl.useProgram (program);

      // set up texture uniform & other uniforms that you might
      // have added to the shader
      gl.activeTexture (gl.TEXTURE0);
      gl.bindTexture (gl.TEXTURE_2D, luxoBallTexture);
      gl.uniform1i (program.uTheTexture, 0);
    }
    else if (ballTexture === "shaded" && shading === "Fragment") {
      object = luxoBallPerFrag;
      program = luxoBallShadedPerFragProgram;
    }
    else if (ballTexture === "shaded" && shading === "Vertex") {
      object = luxoBallPerVertex;
      program = luxoBallShadedPerVertexProgram;
    }
    
    drawBall(object, program);

    // Draw wood flooring
    object = floor;
    program = woodFloorProgram;

    // set up uniform variables for drawing
    gl.useProgram (program);

    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    if (woodTexture === "mahogany") {
      gl.bindTexture (gl.TEXTURE_2D, mahoganyFloorTexture);
    }
    else if (woodTexture === "darkWood") {
      gl.bindTexture (gl.TEXTURE_2D, darkWoodFloorTexture);
    }
    gl.uniform1i (program.uTheTexture, 0);

    let woodFloorMatrix = glMatrix.mat4.create();
    //Scale model to make it bigger (times 10)
    glMatrix.mat4.scale(woodFloorMatrix, woodFloorMatrix, [30, 12, 8])
    //Translate the model
    glMatrix.mat4.translate(woodFloorMatrix, woodFloorMatrix, [0, -1, -1.25])
    gl.uniformMatrix4fv (program.uModelT, false, woodFloorMatrix);

    //Bind the VAO and draw
    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

    // Draw Luxo Jr.
    if (shading === "Fragment"){
      // Cylinder Base
      object = baseFrag;
      program = luxoPerFragProgram;

      // set up uniform variables for drawing
      gl.useProgram (program);

      drawBase(object, program);

      // Cube Supports
      // Vertical supports
      object = vCubeFrag;

      drawVertSupports(object, program);
      
      //Horizontal supports
      object = hCubeFrag;

      drawHorizontalSupports(object, program);

      // Cone head
      object = myConeFrag;

      drawConeHead(object, program);
    }
    else if (shading === "Vertex") {
      // Cylinder Base
      object = baseVertex;
      program = luxoPerVertexProgram;

      // set up uniform variables for drawing
      gl.useProgram (program);

      drawBase(object, program);

      // Cube Supports
      // Vertical supports
      object = vCubeVertex;

      drawVertSupports(object, program);
      
      // Cone head
      object = myConeVertex;

      drawConeHead(object, program);

      //Horizontal supports
      object = hCubeVertex;

      drawHorizontalSupports(object, program);

      
    }
  }
  else if (nowShowing === "ball") {           // Display only the texturized luxo ball
    object = onlyTexturedBall;
    program = onlyBallProgram;

    gl.useProgram(program);

    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, luxoBallTexture);
    gl.uniform1i (program.uTheTexture, 0);

    // set up rotation uniform
    gl.uniform3fv (program.uTheta, new Float32Array(sphere_angles));

    //Bind the VAO and draw
    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
  }
  else {                                      // Display only the texturized wood flooring
    console.log(woodTexture);
    object = onlyFloor;
    program = onlyWoodFloorProgram;

    gl.useProgram(program);

    // set up texture uniform & other uniforms that you might
    // have added to the shader
    gl.activeTexture (gl.TEXTURE0);
    if (woodTexture === "mahogany") {
      gl.bindTexture (gl.TEXTURE_2D, mahoganyFloorTexture);
    }
    else if (woodTexture === "darkWood") {
      gl.bindTexture (gl.TEXTURE_2D, darkWoodFloorTexture);
    }
    gl.uniform1i (program.uTheTexture, 0);

    // set up rotation uniform
    gl.uniform3fv (program.uTheta, new Float32Array(cube_angles));

    //Bind the VAO and draw
    gl.bindVertexArray(object.VAO);
    gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
  }

}


//
// Helper functions for drawing the image
// (Used to distinguish between per vertex and per fragment shading)
//

//
// Draw the luxo ball
//
function drawBall(object, program) {
  // set up uniform variables for drawing
  gl.useProgram (program);

  let ballMatrix = glMatrix.mat4.create();
  //glMatrix.mat4.scale(ballMatrix, ballMatrix, [3, 3, 3]);
  glMatrix.mat4.translate(ballMatrix, ballMatrix, [-0.5, -2.5, -15]);
  // Rotate model
  glMatrix.mat4.rotateY(ballMatrix, ballMatrix, -Math.PI/2);
  glMatrix.mat4.rotateX(ballMatrix, ballMatrix, 2*Math.PI/3);
  glMatrix.mat4.rotateZ(ballMatrix, ballMatrix, -Math.PI/6);

  gl.uniformMatrix4fv (program.uModelT, false, ballMatrix);

  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}

//
// Draw the cylinder base
//
function drawBase(object, program){

  let baseMatrix = glMatrix.mat4.create();
  glMatrix.mat4.scale(baseMatrix, baseMatrix, [2, 0.25, 1]);
  glMatrix.mat4.translate(baseMatrix, baseMatrix, [0.25, -13, -15]);
  gl.uniformMatrix4fv (program.uModelT, false, baseMatrix);

  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}

//
// Draw the vertical supports
//
function drawVertSupports(object, program){

  let vCubeMatrix = glMatrix.mat4.create();
  glMatrix.mat4.scale(vCubeMatrix, vCubeMatrix, [0.1, 1.5, 1]);
  glMatrix.mat4.translate(vCubeMatrix, vCubeMatrix, [12.5, -1.6, -16]);

  gl.uniformMatrix4fv (program.uModelT, false, vCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

  glMatrix.mat4.translate(vCubeMatrix, vCubeMatrix, [-2, 0, 0]);
  gl.uniformMatrix4fv (program.uModelT, false, vCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

  glMatrix.mat4.translate(vCubeMatrix, vCubeMatrix, [0, 1.05, 0]);
  glMatrix.mat4.scale(vCubeMatrix, vCubeMatrix, [1, 2, 1]);
  glMatrix.mat4.rotateX(vCubeMatrix, vCubeMatrix, Math.PI/2.2)
  gl.uniformMatrix4fv (program.uModelT, false, vCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

  glMatrix.mat4.translate(vCubeMatrix, vCubeMatrix, [2, 0, 0]);
  gl.uniformMatrix4fv (program.uModelT, false, vCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

  glMatrix.mat4.translate(vCubeMatrix, vCubeMatrix, [-2, 1.1, 0]);
  glMatrix.mat4.scale(vCubeMatrix, vCubeMatrix, [2, 3, 1]);
  glMatrix.mat4.rotateX(vCubeMatrix, vCubeMatrix, Math.PI/8)
  gl.uniformMatrix4fv (program.uModelT, false, vCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}

//
// Draw the horizontal supports
//
function drawHorizontalSupports(object, program) {
  let hCubeMatrix = glMatrix.mat4.create();

  gl.uniformMatrix4fv (program.uModelT, false, hCubeMatrix);

  glMatrix.mat4.scale(hCubeMatrix, hCubeMatrix, [0.5, 0.1, 0.5]);
  glMatrix.mat4.translate(hCubeMatrix, hCubeMatrix, [3.1, -13.4, -28]);
  gl.uniformMatrix4fv (program.uModelT, false, hCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

  glMatrix.mat4.translate(hCubeMatrix, hCubeMatrix, [-0.7, 8.1, 0]);
  gl.uniformMatrix4fv (program.uModelT, false, hCubeMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}

//
// Draw the cone head
//
function drawConeHead(object, program) {
  let coneMatrix = glMatrix.mat4.create();

  glMatrix.mat4.scale(coneMatrix, coneMatrix, [4, 4, 4]);
  glMatrix.mat4.rotateZ(coneMatrix, coneMatrix, -Math.PI/2);
  gl.uniformMatrix4fv (program.uModelT, false, coneMatrix);
  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}


//
// Use this function to create all the programs that you need
// You can make use of the auxillary function initProgram
// which takes the name of a vertex shader and fragment shader
//
// Note that after successfully obtaining a program using the initProgram
// function, you will beed to assign locations of attribute and unifirm variable
// based on the in variables to the shaders.   This will vary from program
// to program.
//
function initPrograms() {
  //Luxo ball program
  luxoBallTextureProgram = initProgram('texture-V', 'texture-F');

  gl.useProgram (luxoBallTextureProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  luxoBallTextureProgram.aVertexPosition = gl.getAttribLocation(luxoBallTextureProgram, 'aVertexPosition');
  luxoBallTextureProgram.aUV = gl.getAttribLocation(luxoBallTextureProgram, 'aUV');
    
  // uniforms - you will need to add references for any additional
  // uniforms that you add to your shaders
  luxoBallTextureProgram.uModelT = gl.getUniformLocation (luxoBallTextureProgram, 'modelT');
  luxoBallTextureProgram.uViewT = gl.getUniformLocation (luxoBallTextureProgram, 'viewT');
  luxoBallTextureProgram.uProjT = gl.getUniformLocation (luxoBallTextureProgram, 'projT');
  luxoBallTextureProgram.uTheTexture = gl.getUniformLocation (luxoBallTextureProgram, 'theTexture');

  setUpCamera(luxoBallTextureProgram);

  // Only Luxo Ball Program
  onlyBallProgram = initProgram('onlyTexture-V', 'onlyTexture-F');

  gl.useProgram(onlyBallProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  onlyBallProgram.aVertexPosition = gl.getAttribLocation(onlyBallProgram, 'aVertexPosition');
  onlyBallProgram.aUV = gl.getAttribLocation(onlyBallProgram, 'aUV');
    
  // uniforms - you will need to add references for any additional
  // uniforms that you add to your shaders
  onlyBallProgram.uTheTexture = gl.getUniformLocation (onlyBallProgram, 'theTexture');
  onlyBallProgram.uTheta = gl.getUniformLocation (onlyBallProgram, 'theta');


  // Luxo Ball Program shading per fragment
  luxoBallShadedPerFragProgram = initProgram('phong-per-fragment-V', 'phong-per-fragment-F');

  gl.useProgram (luxoBallShadedPerFragProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  luxoBallShadedPerFragProgram.aVertexPosition = gl.getAttribLocation(luxoBallShadedPerFragProgram, 'aVertexPosition');
  luxoBallShadedPerFragProgram.aNormal = gl.getAttribLocation(luxoBallShadedPerFragProgram, 'aNormal');

  // uniforms
  luxoBallShadedPerFragProgram.uModelT = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'modelT');
  luxoBallShadedPerFragProgram.uViewT = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'viewT');
  luxoBallShadedPerFragProgram.uProjT = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'projT');
  luxoBallShadedPerFragProgram.ambientLight = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'ambientLight');
  luxoBallShadedPerFragProgram.lightPosition = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'lightPosition');
  luxoBallShadedPerFragProgram.lightColor = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'lightColor');
  luxoBallShadedPerFragProgram.baseColor = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'baseColor');
  luxoBallShadedPerFragProgram.specHighlightColor = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'specHighlightColor');
  luxoBallShadedPerFragProgram.ka = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'ka');
  luxoBallShadedPerFragProgram.kd = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'kd');
  luxoBallShadedPerFragProgram.ks = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'ks');
  luxoBallShadedPerFragProgram.ke = gl.getUniformLocation (luxoBallShadedPerFragProgram, 'ke');
  setUpBallPhong(luxoBallShadedPerFragProgram);
  setUpCamera(luxoBallShadedPerFragProgram);

  // Luxo Ball Program shading per vertex
  luxoBallShadedPerVertexProgram = initProgram('phong-per-vertex-V', 'phong-per-vertex-F');

  gl.useProgram (luxoBallShadedPerVertexProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  luxoBallShadedPerVertexProgram.aVertexPosition = gl.getAttribLocation(luxoBallShadedPerVertexProgram, 'aVertexPosition');
  luxoBallShadedPerVertexProgram.aNormal = gl.getAttribLocation(luxoBallShadedPerVertexProgram, 'aNormal');

  // uniforms
  luxoBallShadedPerVertexProgram.uModelT = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'modelT');
  luxoBallShadedPerVertexProgram.uViewT = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'viewT');
  luxoBallShadedPerVertexProgram.uProjT = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'projT');
  luxoBallShadedPerVertexProgram.ambientLight = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'ambientLight');
  luxoBallShadedPerVertexProgram.lightPosition = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'lightPosition');
  luxoBallShadedPerVertexProgram.lightColor = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'lightColor');
  luxoBallShadedPerVertexProgram.baseColor = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'baseColor');
  luxoBallShadedPerVertexProgram.specHighlightColor = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'specHighlightColor');
  luxoBallShadedPerVertexProgram.ka = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'ka');
  luxoBallShadedPerVertexProgram.kd = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'kd');
  luxoBallShadedPerVertexProgram.ks = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'ks');
  luxoBallShadedPerVertexProgram.ke = gl.getUniformLocation (luxoBallShadedPerVertexProgram, 'ke');
  setUpBallPhong(luxoBallShadedPerVertexProgram);
  setUpCamera(luxoBallShadedPerVertexProgram);


  //Floor program
  woodFloorProgram = initProgram('texture-V', 'texture-F');

  gl.useProgram (woodFloorProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  woodFloorProgram.aVertexPosition = gl.getAttribLocation(woodFloorProgram, 'aVertexPosition');
  woodFloorProgram.aUV = gl.getAttribLocation(woodFloorProgram, 'aUV');
  woodFloorProgram.aNormal = gl.getAttribLocation(woodFloorProgram, 'aNormal');
    
  // uniforms - you will need to add references for any additional
  // uniforms that you add to your shaders
  woodFloorProgram.uModelT = gl.getUniformLocation (woodFloorProgram, 'modelT');
  woodFloorProgram.uViewT = gl.getUniformLocation (woodFloorProgram, 'viewT');
  woodFloorProgram.uProjT = gl.getUniformLocation (woodFloorProgram, 'projT');
  woodFloorProgram.uTheTexture = gl.getUniformLocation (woodFloorProgram, 'theTexture');

  setUpCamera(woodFloorProgram);

  //Only Floor Program
  onlyWoodFloorProgram = initProgram('onlyTexture-V', 'onlyTexture-F');

  gl.useProgram(onlyWoodFloorProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  onlyWoodFloorProgram.aVertexPosition = gl.getAttribLocation(onlyWoodFloorProgram, 'aVertexPosition');
  onlyWoodFloorProgram.aUV = gl.getAttribLocation(onlyWoodFloorProgram, 'aUV');
    
  // uniforms - you will need to add references for any additional
  // uniforms that you add to your shaders
  onlyWoodFloorProgram.uTheTexture = gl.getUniformLocation (onlyWoodFloorProgram, 'theTexture');
  onlyWoodFloorProgram.uTheta = gl.getUniformLocation (onlyWoodFloorProgram, 'theta');

  // Luxo Jr. Program shading per fragment
  luxoPerFragProgram = initProgram('phong-per-fragment-V', 'phong-per-fragment-F');

  gl.useProgram (luxoPerFragProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  luxoPerFragProgram.aVertexPosition = gl.getAttribLocation(luxoPerFragProgram, 'aVertexPosition');
  luxoPerFragProgram.aNormal = gl.getAttribLocation(luxoPerFragProgram, 'aNormal');
    
  // uniforms
  luxoPerFragProgram.uModelT = gl.getUniformLocation (luxoPerFragProgram, 'modelT');
  luxoPerFragProgram.uViewT = gl.getUniformLocation (luxoPerFragProgram, 'viewT');
  luxoPerFragProgram.uProjT = gl.getUniformLocation (luxoPerFragProgram, 'projT');
  luxoPerFragProgram.ambientLight = gl.getUniformLocation (luxoPerFragProgram, 'ambientLight');
  luxoPerFragProgram.lightPosition = gl.getUniformLocation (luxoPerFragProgram, 'lightPosition');
  luxoPerFragProgram.lightColor = gl.getUniformLocation (luxoPerFragProgram, 'lightColor');
  luxoPerFragProgram.baseColor = gl.getUniformLocation (luxoPerFragProgram, 'baseColor');
  luxoPerFragProgram.specHighlightColor = gl.getUniformLocation (luxoPerFragProgram, 'specHighlightColor');
  luxoPerFragProgram.ka = gl.getUniformLocation (luxoPerFragProgram, 'ka');
  luxoPerFragProgram.kd = gl.getUniformLocation (luxoPerFragProgram, 'kd');
  luxoPerFragProgram.ks = gl.getUniformLocation (luxoPerFragProgram, 'ks');
  luxoPerFragProgram.ke = gl.getUniformLocation (luxoPerFragProgram, 'ke');
  setUpPhong(luxoPerFragProgram);
  setUpCamera(luxoPerFragProgram);

  // Luxo Jr. Program shading per vertex
  luxoPerVertexProgram = initProgram('phong-per-vertex-V', 'phong-per-vertex-F');

  gl.useProgram (luxoPerVertexProgram);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  luxoPerVertexProgram.aVertexPosition = gl.getAttribLocation(luxoPerVertexProgram, 'aVertexPosition');
  luxoPerVertexProgram.aNormal = gl.getAttribLocation(luxoPerVertexProgram, 'aNormal');
    
  // uniforms
  luxoPerVertexProgram.uModelT = gl.getUniformLocation (luxoPerVertexProgram, 'modelT');
  luxoPerVertexProgram.uViewT = gl.getUniformLocation (luxoPerVertexProgram, 'viewT');
  luxoPerVertexProgram.uProjT = gl.getUniformLocation (luxoPerVertexProgram, 'projT');
  luxoPerVertexProgram.ambientLight = gl.getUniformLocation (luxoPerVertexProgram, 'ambientLight');
  luxoPerVertexProgram.lightPosition = gl.getUniformLocation (luxoPerVertexProgram, 'lightPosition');
  luxoPerVertexProgram.lightColor = gl.getUniformLocation (luxoPerVertexProgram, 'lightColor');
  luxoPerVertexProgram.baseColor = gl.getUniformLocation (luxoPerVertexProgram, 'baseColor');
  luxoPerVertexProgram.specHighlightColor = gl.getUniformLocation (luxoPerVertexProgram, 'specHighlightColor');
  luxoPerVertexProgram.ka = gl.getUniformLocation (luxoPerVertexProgram, 'ka');
  luxoPerVertexProgram.kd = gl.getUniformLocation (luxoPerVertexProgram, 'kd');
  luxoPerVertexProgram.ks = gl.getUniformLocation (luxoPerVertexProgram, 'ks');
  luxoPerVertexProgram.ke = gl.getUniformLocation (luxoPerVertexProgram, 'ke');
  setUpPhong(luxoPerVertexProgram);
  setUpCamera(luxoPerVertexProgram);

}

// creates a VAO and returns its ID
function bindTexturedVAO (shape, program) {
  //create and bind VAO
  let theVAO = gl.createVertexArray();
  gl.bindVertexArray(theVAO);
  
  // create and bind vertex buffer
  let myVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aVertexPosition);
  gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
  
  // add code for any additional vertex attribute

  // create, bind, and fill buffer for uv's
  // uvs can be obtained from the uv member of the
  // shape object.  2 floating point values (u,v) per vertex are
  // stored in this array.
  let uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aUV);
  gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);

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

// creates a VAO and returns its ID
function bindVAO (shape, program) {
  console.log(shape, program);
  //create and bind VAO
  let theVAO = gl.createVertexArray();
  gl.bindVertexArray(theVAO);
  
  // create and bind vertex buffer
  let myVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aVertexPosition);
  gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
  
  // add code for any additional vertex attribute

  // create, bind, and fill buffer for uv's
  // uvs can be obtained from the uv member of the
  // shape object.  2 floating point values (u,v) per vertex are
  // stored in this array.
  let uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aUV);
  gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);

  // create, bind, and fill buffer for normal values
  // normals can be obtained from the normals member of the
  // shape object.  3 floating point values (x,y,z) per vertex are
  // stored in this array.
  let myNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aNormal);
  gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);  

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


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

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


  //
  // compiles, loads, links and returns a program (vertex/fragment shader pair)
  //
  // takes in the id of the vertex and fragment shaders (as given in the HTML file)
  // and returns a program object.
  //
  // will return null if something went wrong
  //
  function initProgram(vertex_id, fragment_id) {
    const vertexShader = getShader(vertex_id);
    const fragmentShader = getShader(fragment_id);

    // Create a program
    let program = gl.createProgram();
      
    // Attach the shaders to this program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
      return null;
    }
      
    return program;
  }


  //
  // We call draw to render to our canvas
  //
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

    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);

    // Retrieve a WebGL context
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error(`There is no WebGL 2.0 context`);
        return null;
      }
      
    // deal with keypress
    window.addEventListener('keydown', gotKey ,false);
      
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
    initPrograms();
    
    // create and bind your current object
    createShapes();
    
    // do a draw
    draw();
  }
