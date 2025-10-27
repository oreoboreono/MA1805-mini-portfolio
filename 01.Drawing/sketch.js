
function eye(x, y, size) {
  push();
  translate(x, y);
  noStroke();

  //eye shape
  fill(255);
  triangle(-size - 50, 0, -50, -size, 0, size+20);
  triangle(size + 50, 0, 50, -size, 0, size+20);
  triangle(50, -size, -50, -size, 0, size+20);


  

  //pupil
  //where eye to mouse
  let dx = mouseX - x;
  let dy = mouseY - y;
  let angle = atan2(dy, dx);

  // limit eye movement
  let maxOffset = size * 0.85;        
  let dist = min(maxOffset, mag(dx, dy)); 

  //var for the x/y angle of the mouse cursor
  let px = cos(angle) * dist;
  let py = sin(angle) * dist;

  
  //pupil
  fill(255,60,60);
  rectMode(CENTER);
  rect(px, py, size * 0.7, size);   

  fill(255,100,100);
  rectMode(CENTER);
  rect(px, py, size * 0.7, size);   

  fill(0);
  rectMode(CENTER);
  rect(px, py, size * 0.2, size*0.8);

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
  createCanvas(2000, 1100);
  background(30);
  fill(0);
}

function draw(){

  eye(width/2-180, height/2+100,40)
  eye(width/2+180, height/2+100,40)
  // face(width/2, height/2-50, 300, 380);
  // eye(width/2-70, height/2-50, 40);
  // eye(width/2+70, height/2-50, 40);
  
  
}

  // fill(255);
  // textStyle(BOLD)
  // textSize(32)
  // text("I have no mouth", -200, 230);
  // text("I must scream", -190, 270);
