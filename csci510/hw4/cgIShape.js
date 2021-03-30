//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    
    // fill in your code here.
    // delete the code below first.
    // For each face either x, y, or z remain constant
    // and must iterate over the coordinates that aren't constant

    var increment = 1/subdivisions;

    //Using Constant Z
    var z = -0.5;
    for(var x = -0.5; x <= 0.5 - (increment/2); x += increment){
        for(var y = -0.5; y <= 0.5 - (increment/2); y += increment){
            // Generates in a clockwise fashion because Z face is negative
            addTriangle(x + increment, y + increment, z, x, y + increment, z, x + increment, y, z);
            addTriangle(x, y + increment, z, x, y, z, x + increment, y, z);
        }
    }

    z = 0.5;
    for(var x = -0.5; x <= 0.5 - (increment/2); x += increment){
        for(var y = -0.5; y <= 0.5 - (increment/2); y += increment){
            // Generates in a counter-clockwise fashion because Z face is positive
            addTriangle(x, y + increment, z, x + increment, y + increment, z, x + increment, y, z);
            addTriangle(x, y + increment, z, x + increment, y, z, x, y, z);
        }
    }


    //Using Constant X
    var x = -0.5;
    for(var y = -0.5; y <= 0.5 - (increment/2); y += increment){
        for(var z = -0.5; z <= 0.5 - (increment/2); z += increment){
            // Generates in a counter-clockwise fashion because X face is negative
            addTriangle(x, y + increment, z, x, y + increment, z + increment, x, y, z + increment);
            addTriangle(x, y + increment, z, x, y, z + increment, x, y, z);
        }
    }

    x = 0.5;
    for(var y = -0.5; y <= 0.5 - (increment/2); y += increment){
        for(var z = -0.5; z <= 0.5 - (increment/2); z += increment){
            // Generates in a clockwise fashion because X face is positive
            addTriangle(x, y + increment, z + increment, x, y + increment, z, x, y, z + increment);
            addTriangle(x, y + increment, z, x, y, z, x, y, z + increment);
        }
    }


    //Using Constant Y
    var y = -0.5;
    for(var x = -0.5; x <= 0.5 - (increment/2); x += increment){
        for(var z = -0.5; z <= 0.5 - (increment/2); z += increment){
            addTriangle(x + increment, y, z + increment, x + increment, y, z, x, y, z + increment);
            addTriangle(x + increment, y, z, x, y, z, x, y, z + increment);
        }
    }

    var y = 0.5;
    for(var x = -0.5; x <= 0.5 - (increment/2); x += increment){
        for(var z = -0.5; z <= 0.5 - (increment/2); z += increment){
            addTriangle(x + increment, y, z, x + increment, y, z + increment, x, y, z + increment);
            addTriangle(x + increment, y, z, x, y, z + increment, x, y, z);
        }
    }

    // addTriangle (-0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5);
    // addTriangle (-0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5);
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    // fill in your code here.
    var radius = 0.5;                   // Diameter = 1 (-0.5 -> 0.5), and raidus = half of diameter
    var fullRotation = radians(360);    // Two Pi
    var hIncr = 1/heightdivision;
    var rIncr = 1/radialdivision;
    
    // Tessellation for top and bottom of cylinder
    for(var i = 0; i <= fullRotation; i += rIncr){
        //Using equations from slides
        addTriangle(radius*Math.cos(i + rIncr), 0.5, radius*Math.sin(i + rIncr), radius*Math.cos(i), 0.5, radius*Math.sin(i), 0, 0.5, 0);       //For top of cylinder
        addTriangle(radius*Math.cos(i), -0.5, radius*Math.sin(i), 0, -0.5, 0, radius*Math.cos(i - rIncr), -0.5, radius*Math.sin(i - rIncr));    //For bottom of cylinder
    }

    // Tessellation for the body of cylinder
    // Interating over two things now -> y coordinate and rotation
    for(var y = -0.5; y <= 0.5 - (hIncr/2); y += hIncr){
        for(var i = 0; i <= fullRotation; i += rIncr){
            //Using equations from slides
            var ax = radius*Math.cos(i + rIncr);
            var az = radius*Math.sin(i + rIncr);
            var bx = radius*Math.cos(i);
            var bz = radius*Math.sin(i);

            addTriangle(ax, y, az, bx, y, bz, bx, y + hIncr, bz);
            addTriangle(ax, y, az, bx, y + hIncr, bz, ax, y + hIncr, az);
        }
    }

}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.

    // A cone tessellation is similar to the cylinder
    // except a cone does not have a top and the body of
    // the cone gradually points to a single point at the top.

    var fullRotation = radians(360);    // Two Pi
    var hIncr = 1/heightdivision;
    var rIncr = 1/radialdivision;
    var bottomRadius = 0.5;             // Radius of the bottom of cone

    // Tessellation for bottom of cone (Similar to Cylinder)
    for (var i = 0; i <= fullRotation; i += rIncr){
        addTriangle(bottomRadius*Math.cos(i), -0.5, bottomRadius*Math.sin(i), 0, -0.5, 0, bottomRadius*Math.cos(i - rIncr), -0.5, bottomRadius*Math.sin(i - rIncr));
    }

    // Tessellation for the body of cone
    var br, tr;                         // Init: Radius for bottom of body and radius for top of body
    var ax, az, bx, bz, cx, cz, dx, dz; // Init: Names of x and z coordinates of points for triangles

    // Loop through y-coordinate and rotation
    for (var y = -0.5; y <= 0.5 - (hIncr/2); y += hIncr){
        for (var i = 0; i <= fullRotation; i += rIncr){
            br = (0.5 - y)/2            // Bottom radius of body depends on our current y position
            tr = (0.5 - y - hIncr)/2    // Top radius of body depends on our current y position and height increment

            //Get the positions to create triangle
            ax = br*Math.cos(i + rIncr);
            az = br*Math.sin(i + rIncr);
            bx = br*Math.cos(i);
            bz = br*Math.sin(i);
            cx = tr*Math.cos(i);
            cz = tr*Math.sin(i);
            dx = tr*Math.cos(i + rIncr);
            dz = tr*Math.sin(i + rIncr);

            //Generate triangles
            addTriangle(ax, y, az, bx, y, bz, cx, y + hIncr, cz);
            addTriangle(ax, y, az, cx, y + hIncr, cz, dx, y + hIncr, dz);
        }
    }
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
    var radius = 0.5                                // Diameter = 1, so radius = 0.5
    var fullRotation = radians(360);                // Two pi
    var halfRotation = radians(180);                // Pi
    var thetaIncr = fullRotation/slices;            // Increment for longitude
    var phiIncr = halfRotation/stacks;              // Increment for latitude

    var ax, ay, bx, by, abz, cx, cy, dx, dy, cdz;   //Init: X, Y, Z coordinates for points A, B, C, D of tessellation
    // Following the algorithm from slides:
    // - Longitude iterates from 0 to two pi
    // - Lattitude iterates from 0 to pi
    // - x = radius*cos(theta)*sin(phi)
    // - y = radius*sin(theta)*sin(phi)
    // - z = radius*cos(phi)
    for (var theta = 0; theta < fullRotation; theta += thetaIncr){
        for (var phi = 0; phi < halfRotation; phi += phiIncr){
            // Create the different points for the triangles
            ax = radius*Math.cos(theta)*Math.sin(phi);
            ay = radius*Math.sin(theta)*Math.sin(phi);
            bx = radius*Math.cos(theta + thetaIncr)*Math.sin(phi);
            by = radius*Math.sin(theta + thetaIncr)*Math.sin(phi);
            abz = radius*Math.cos(phi);                                     // Points A, B have same Z coordinate
            cx = radius*Math.cos(theta)*Math.sin(phi + phiIncr);
            cy = radius*Math.sin(theta)*Math.sin(phi + phiIncr);
            dx = radius*Math.cos(theta + thetaIncr)*Math.sin(phi + phiIncr);
            dy = radius*Math.sin(theta + thetaIncr)*Math.sin(phi + phiIncr);
            cdz = radius*Math.cos(phi + phiIncr);                           // Points C, D have same Z coordiante
            
            //Generate the triangles

            addTriangle(ax, ay, abz, bx, by, abz, dx, dy, cdz);
            addTriangle(ax, ay, abz, dx, dy, cdz, cx, cy, cdz);
        }
    }
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

