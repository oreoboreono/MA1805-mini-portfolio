let img;
function eye(x, y, size) { 
  translate(x, y);
  noStroke(); 
  fill(255)
  triangle(-size, 0, 0, -size, 0, size);
  triangle(size, 0, 0, -size, 0, size);
  fill(0);
  rectMode(CENTER);
  rect(0, 0, size * 0.09, size); 
}

function setup() {
  grainImg = loadImage("C:\Users\Oreo\Downloads\grains.png");
  createCanvas(400, 400);
  background(30);
  fill(0);
  stroke(255);
  strokeWeight(2);
  circle(195, 140, 260);
  eye(120, 100, 40);
  eye(150, 0, 40)
  fill(255);
  textStyle(BOLD)
  textSize(32)
  text("I have no mouth", -200, 230);
  text("I must scream", -190, 270);
  image(grainImg, 0, 0);
}