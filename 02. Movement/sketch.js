function preload(){
  earthPng = loadImage('assets/Earth.png');
  sunPng = loadImage('assets/Sun.png');
  mercuryPng = loadImage('assets/Mercury.png');
  venusPng = loadImage('assets/Venus.png');
  marsPng = loadImage('assets/Mars.png');
}


function setup() {
  createCanvas(1500, 1500);
  radius = 50;
  centerX = 700;
  centerY = 700;
  angleM = 0;
  angleV = 0;
  angleE = 0;
  angleMa = 0;

}

function mercury(){
  
  let x = centerX + radius+200 * cos(angleM);
  let y = centerY + radius+200 * sin(angleM);
  noFill()
  stroke('orange')
  circle(width/2,height/2,radius+350)
  
  angleM+=0.015*1.6075
  imageMode(CENTER);
  image(mercuryPng,x,y,50,50);

  
}

function venus(){
  
  let x = centerX + radius+350 * cos(angleV);
  let y = centerY + radius+350 * sin(angleV);
  noFill()
  stroke('yellow')
  circle(width/2,height/2,radius+650)
  angleV+=0.015*1.175
  imageMode(CENTER);
  image(venusPng,x,y,50,50);
  
}

function earth(){
  
  let x = centerX + radius+500 * cos(angleE);
  let y = centerY + radius+500 * sin(angleE);
  noFill()
  stroke(150,150,255)
  circle(width/2,height/2,radius+950)
  angleE+=0.015
  imageMode(CENTER);
  image(earthPng,x,y,50,50);
  
}

function mars(){
  
  let x = centerX + radius+670 * cos(angleMa);
  let y = centerY + radius+670 * sin(angleMa);
  noFill()
  stroke('red')
  circle(width/2,height/2,radius+1290)
  angleMa+=0.015*0.8085
  imageMode(CENTER);
  image(marsPng,x,y,50,50);
  
}



function draw() {
  background(0);
  mercury();
  venus();
  earth();
  mars();
  
  
  image(sunPng,width/2,height/2,300,300);
  // imageMode(CENTER);
  // image(mercuryPng,width/2,height/2-200,50,50);
  // image(venusPng,width/2,height/2-350,50,50);
  // image(earthPng,width/2,height/2-500,50,50);
  // image(marsPng,width/2,height/2-650,50,50);
}




