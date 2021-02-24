


void myLine (int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2) 
  // using only calls to point().
  int dE, dNE, x, y, d;
  int dy = y2 - y1, dx = x2 - x1;
  
  if (dy <= dx){
    dE = 2 * dy;
    dNE = 2 * (dy - dx);
    d = dE - dx;
    for (x = x1, y = y1; x <= x2; ++x){
      point (x, y);
      //East is chosen
      if (d <= 0){
        d += dE;
      }
      //North is chosen
      else {
        ++y;
        d += dNE;
      }
    }
  }
  else{
    dE = 2 * dx;
    dNE = 2 * (dx - dy);
    d = dE - dy;
    for (x = x1, y = y1; y <= y2; ++y){
      point (x, y);
      //East is chosen
      if (d <= 0){
        d += dE;
      }
      //North East is chosen
      else {
        d += dNE;
        ++x;
      }
    }
    
  }
      // your code should implement the Midpoint algorithm
}

public class Vertice {
  public int x;
  public int y;
  
  Vertice (int x, int y){
    this.x = x;
    this.y = y;
  }
  
  public int crossProduct(Vertice v1, Vertice v2){
    return (v1.x*v2.y)-(v2.x*v1.y);
  }
}

void myTriangle (int x0, int y0, int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // using only calls to point().
  
  //Barycentric Algorithm
  //Get bounding box of triangle
  int maxX = max(x0, x1, x2);
  int minX = min(x0, x1, x2);
  int maxY = max(y0, y1, y2);
  int minY = min(y0, y1, y2);
  
  //Spanning vectors of edge (v0, v1) and (v0, v2)
  Vertice vs1 = new Vertice(x1-x0, y1-y0);
  Vertice vs2 = new Vertice(x2-x0, y2-y0);
  
  for (int x = minX; x <= maxX; x++){
    for (int y = minY; y <= maxY; y++){
      Vertice q = new Vertice(x-x0, y-y0);
      
      float s = (float) (q.crossProduct(q, vs2) / q.crossProduct(vs1, vs2));
      float t = (float) (q.crossProduct(vs1, q) / q.crossProduct(vs1, vs2));
      
      if ( (s >= 0) && (t >= 0) && (s + t <= 1)){
        //Inside Triangle
        point(x, y);
      }
    }
  }
  // your code should implement the the algorithm presented in the video
}



// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doMine = true;
int scene = 1;
color backgroundColor = color (150, 150, 150);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

void doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

void doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 0);
    myLine (50, 250, 450, 250);
    myLine (250, 50, 250, 450);
    myLine (50, 450, 450, 50);
    myLine (50, 50, 450, 450);
  }
}

void keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
  
  if (key == 'q') exit();
}
