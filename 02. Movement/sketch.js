cheers = []
function preload(){
  earthPng = loadImage('assets/Earth.png')
  sunPng = loadImage('assets/Sun.png')
  mercuryPng = loadImage('assets/Mercury.png')
  venusPng = loadImage('assets/Venus.png')
  marsPng = loadImage('assets/Mars.png')
  confettis = loadImage('assets/Confetti.gif')
  cheers[0] = loadSound('assets/yay1.mp3');
  cheers[1] = loadSound('assets/yay2.mp3');
  cheers[2] = loadSound('assets/yay3.mp3');
  cheers[3] = loadSound('assets/yay4.mp3');
  cheers[4] = loadSound('assets/yay5.mp3');
  cheers[5] = loadSound('assets/yay6.mp3');
}


function setup() {
  createCanvas(1500, 1500);
  
  radius = 50
  centerX = 700
  centerY = 700
  angleM = 0
  angleV = 0
  angleE = 0
  angleMa = 0
  currentYear = 0
  yearAngle = 0

 rAngle = 0
 isSpin = true
 spinSpeed = 0.3

 rollM = 0
 rollV = 0
 rollE = 0
 rollMa = 0

 iPrevious = 10
 iBeforePrevious = 11

 for(i = 0; i<6;i++){
  cheers[i].setVolume(0.5)
 }
  
}

function planet(planet,distance, angle, speed,R,G,B,roll){

 x = centerX + radius+distance * cos(angle)
 y = centerY + radius+distance * sin(angle)

 noFill()
 stroke(R,G,B)
 circle(width/2,height/2,radius+(distance*2-50))

  blendMode(ADD);
  noStroke()
  for (let r = 180; r > 0; r -= 3) {
    fill(R, G, B, 5)
    circle(x, y, r)
  }
  blendMode(BLEND)

 angle+=0.015*speed

 push()
 translate(x, y)
 rotate(roll)
 imageMode(CENTER)
 image(planet,0,0,80,80)
 pop();

 return angle;

}

function yay(){
  
  randomI = floor(random(cheers.length))
  while(randomI==iPrevious || randomI == iBeforePrevious ){
    randomI = floor(random(cheers.length))
  }
  cheers[randomI].setVolume(0.5)
  cheers[randomI].play()
  iPrevious = randomI
  iBeforePrevious = iPrevious
  

}

function draw() {
  background(0);
  
  rollM += 0.4;
  rollV += 0.3;
  rollE += 0.2;
  rollMa += 0.1;
  
  angleM = planet(mercuryPng,200,angleM,1.6075,120,60,0,rollM)
  angleV = planet(venusPng,350,angleV,1.175,100,100,0,rollV)
  angleE = planet(earthPng,500,angleE,1,80,80,185,rollE)
  angleMa = planet(marsPng,650,angleMa,0.8085,110,0,0,rollMa)
  
  push();
  blendMode(ADD);          
  noStroke();
  
  for (let r = 1000; r > 0; r -= 10) {
    fill(255, 0, 0, 1) 
    circle(width/2, height/2, r+random(-30,30))
  }

  for (let r = 500; r > 0; r -= 10) {
    fill(255, 255, 0, 3) 
    circle(width/2, height/2, r+random(-20,20))
  }
  pop();

years = floor(angleE/TWO_PI)

textStyle(BOLD)
textSize(40)
fill('white')

if(currentYear !== years && !isSpin){
  yay()
  isSpin = true
  rAngle = 0
  currentYear = years
}

if(isSpin){
  push()
  translate(width/2-500, height/2-680)
  rotate(rAngle)
  textAlign(CENTER, CENTER)
  text("Current Year: "+ (2025+years), 0, 0)
  pop()

  push()
  imageMode(CENTER)
  translate(width/2, height/2)
  rotate(rAngle)
  
  image(sunPng,0,0,300,300)
  pop();

  rAngle += spinSpeed
  if (rAngle >= TWO_PI) {
    rAngle = 0
    isSpin = false
  }
} else {
  text("Current Year: "+ (2025+years), width/2-680, height/2-680)
  imageMode(CENTER);
  image(sunPng,height/2,width/2,300,300)
}
}