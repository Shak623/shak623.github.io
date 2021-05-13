  'use strict';

  function gotKey (event) {
      
      var key = event.key;
      
      // Do something based on key press
      // change texture
      if (key == '1') {
        ballTexture = "textured";
        woodTexture = "mahogany";
      }
      if (key == '2') {
        woodTexture = "darkWood";
      }
      // if (key == '3') {
      //   ballTexture = "shaded";
      // }

      //Change shading
      if (key == 'v') shading = "Vertex";
      if (key == 'f') shading = "Fragment";

      //Change what is currently showing
      if (key == 'r' || key == 'R') {
        nowShowing = "theImage";
        ballTexture = "textured";
        woodTexture = "mahogany";
      }

      if (key == 's' || key == 'S') nowShowing = "ball";

      if (key == 'c' || key == 'C') nowShowing = "woodFloor";

      //  incremental rotation
      if (key == 'x') {
        sphere_angles[0] -= angleInc;
        cube_angles[0] -= angleInc;
      }
      if (key == 'y') {
        sphere_angles[1] -= angleInc;
        cube_angles[1] -= angleInc;
      }
      if (key == 'z') {
        sphere_angles[2] -= angleInc;
        cube_angles[2] -= angleInc;
      }
      if (key == 'X') {
        sphere_angles[0] += angleInc;
        cube_angles[0] += angleInc;
      }
      if (key == 'Y') {
        sphere_angles[1] += angleInc;
        cube_angles[1] += angleInc;
      }
      if (key == 'Z') {
        sphere_angles[2] += angleInc;
        cube_angles[2] += angleInc;
      }
      
      // create a new shape and do a redo a draw
      draw();
  }
  
