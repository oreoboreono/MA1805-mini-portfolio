function preLoad(){
  earthImg = loadImage('assets/Earth.png');
  sunPng = loadImage('assets/Sun.png');
  mercuryPng = loadImage('assets/Mercury.png');
  venusPng = loadImage('assets/Venus.png');
  marsPng = loadImage('assets/Mars.png');
}


function setup() {
  createCanvas(1000, 1000);
}


function draw() {
  background(0);
  image(mercuryPng,0,0);
}




