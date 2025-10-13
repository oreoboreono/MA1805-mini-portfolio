
function eye(x, y, size) { 
  push();
  translate(x, y);
  noStroke(); 
  fill(255)
  triangle(-size, 0, 0, -size, 0, size);
  triangle(size, 0, 0, -size, 0, size);
  fill(0);
  rectMode(CENTER);
  rect(0, 0, size * 0.2, size); 
  pop();
}

function face(x,y,wide, tall){
  push();
  noStroke(); 
  strokeWeight(2);
  fill(75,75,75)
  ellipse(x, y, wide, tall );
  pop();
}

function setup() {
  createCanvas(500, 600);
  background(30);
  fill(0);
}

function draw(){


  face(width/2, height/2-50, 300, 380);
  eye(width/2-70, height/2-50, 40);
  eye(width/2+70, height/2-50, 40);
  
  
}

  // fill(255);
  // textStyle(BOLD)
  // textSize(32)
  // text("I have no mouth", -200, 230);
  // text("I must scream", -190, 270);
