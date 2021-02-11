


void drawNameWithLines ()
{
  // insert your code here to draw the letters of your name 
  // using only lines()
  //Draw S
  line (20, 40, 20, 60);
  line (40, 40, 40, 60);
  line (60, 40, 60, 60);
  
  line (20, 80, 20, 100);
  line (40, 80, 40, 100);
  line (60, 80, 60, 100);

  line (20, 60, 40, 80);
  line (40, 60, 60, 80);
  
  line (20, 40, 40, 20);
  line (40, 20, 60, 40);
  
  line (20, 100, 40, 120);
  line (40, 120, 60, 100);
  
  //Draw F
  line (100, 40, 100, 100);
  line (100, 40, 140, 40);
  line (100, 70, 120, 70);
  
}

void drawNameWithTriangles ()
{
  // insert your code here to draw the letters of your name 
  // using only ltriangles()
  // Draw S
  triangle (20, 200, 80, 200, 40, 180);
  triangle (80, 200, 80, 220, 70, 200);
  triangle (20, 200, 40, 240, 40, 200);
  
  triangle (40, 240, 40, 220, 80, 240);
  triangle (80, 240, 80, 280, 60, 240);
  
  triangle (80, 280, 70, 260, 30, 280);
  triangle (80, 280, 30, 280, 70, 285);
  triangle (30, 280, 30, 260, 40, 275);
  
  // Draw F
  triangle (105, 200, 105, 280, 95, 240);
  triangle (105, 200, 105, 210, 145, 210);
  triangle (105, 240, 105, 250, 145, 240);
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doLine = false;
boolean doTri = false;
color backgroundColor = color (150, 150, 150);
color lineColor = color (0, 0, 0);
color fillColor = color (255, 0, 0);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  if (doLine) stroke(lineColor); else stroke (backgroundColor);
  drawNameWithLines();
  
  if (doTri) {
     fill(fillColor);
     stroke(fillColor);
  }
  else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

void keyPressed()
{
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
  if (key == 'q') exit();
}
