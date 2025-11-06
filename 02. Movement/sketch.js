/*My approach to this prompt are through moving to planets spinning and orbiting around the sun. 
Each rotation around the sun is recorded and celebrated*/


// Stores my cheer sound effects in an array to be called
cheers = [];

// Preload my planet images and cheer sound effects
function preload() {
  earthPng = loadImage('assets/Earth.png');
  sunPng = loadImage('assets/Sun.png');
  mercuryPng = loadImage('assets/Mercury.png');
  venusPng = loadImage('assets/Venus.png');
  marsPng = loadImage('assets/Mars.png');

  cheers[0] = loadSound('assets/yay1.mp3');
  cheers[1] = loadSound('assets/yay2.mp3');
  cheers[2] = loadSound('assets/yay3.mp3');
  cheers[3] = loadSound('assets/yay4.mp3');
  cheers[4] = loadSound('assets/yay5.mp3');
  cheers[5] = loadSound('assets/yay6.mp3');
}



function setup() {
  createCanvas(3000, 1500);
  // Initliazing all variables
  radius = 50; // planet radius
  centerX = 1450;// center x and y of screen for planets
  centerY = 700;

  // Angle for each planet orbiting the midpoint 
  angleM = 0; 
  angleV = 0;
  angleE = 0;
  angleMa = 0;

  // Variables for my year counter 
  currentYear = 0;
  yearAngle = 0; // sping my year counter each year

  // Variables forbarrel roll for year counter and sun
  rAngle = 0;
  isSpin = true;
  spinSpeed = 0.3;

  // Spin for each planet
  rollM = 0;
  rollV = 0;
  rollE = 0;
  rollMa = 0;

  // Variables for checking previous cheers so the same cheer does not repeat
  iPrevious = 10;
  iBeforePrevious = 11;

  // Go through all cheers to set their volume
  for (i = 0; i < 6; i++) {
    cheers[i].setVolume(0.5);
  }
}

/*FUNCTIONS---------------------------------------------------------------------------------------------------------------------------*/
/*Planet template to be used for each planet. Before i decided on having a sperate function for each planet but 
consolidating in one function will save on space and make my code more readable*/

function planet(planet, distance, angle, speed, R, G, B, roll) {

  // Store position of planets
  x = centerX + radius + distance * cos(angle);
  y = centerY + radius + distance * sin(angle);

  // Create orbit path with the color inputted to make my scene more like a planetary diagram 
  noFill();
  stroke(R, G, B);
  circle(width / 2, height / 2, radius + (distance * 2 - 50));

  // Make each planet glow underneath to make planets stand out more. I experimented with blending modes for the first time
  blendMode(ADD);
  noStroke();
  
  for (let r = 180; r > 0; r -= 3) { // semi transparent circles emmenate outwards, stacked up to make my glow have soft edges
    fill(R, G, B, 5);
    circle(x, y, r);
  }

  blendMode(BLEND);

  angle += 0.015 * speed; // speed of orbit around sun

  push();
  translate(x, y);
  rotate(roll);
  imageMode(CENTER);
  image(planet, 0, 0, 80, 80); // planet ontop of glow to make the details of the planet not be washed out. 
  pop();

  return angle; // so each planet angle variable can be updated throgh each call of this function
}

// function to cheer each time a year is completed
function yay() {
  randomI = floor(random(cheers.length));

  while (randomI == iPrevious || randomI == iBeforePrevious) { //check for previous cheers so the same cheer is repeated consecutively
    randomI = floor(random(cheers.length));
  }

  cheers[randomI].setVolume(0.5); //get cheer through array and it is played
  cheers[randomI].play();

  iPrevious = randomI;
  iBeforePrevious = iPrevious; // i decided on storing the cheer before the previous cheer to make it less reptitive
}


/*DRAW------------------------------------------------------------------------------------------------------------------------------*/

function draw() {
  background(0); //represents vastness of space contrasting with the celebration of each year

  rollM += 0.4;
  rollV += 0.3;
  rollE += 0.2;
  rollMa += 0.1;
 
  // Planet instances are created. I chose only rocky planets to make it more simplified
  angleM = planet(mercuryPng, 200, angleM, 1.6075, 120, 60, 0, rollM);
  angleV = planet(venusPng, 350, angleV, 1.175, 100, 100, 0, rollV);
  angleE = planet(earthPng, 500, angleE, 1, 80, 80, 185, rollE);
  angleMa = planet(marsPng, 650, angleMa, 0.8085, 110, 0, 0, rollMa);
  /*Orbits around the sun are based on earth's base speed. I decided to use scientificaly accurate multipliers to 
   represent the orbits around the sun*/

  push();
  blendMode(ADD);
  noStroke();
  // Created realistic sun glow with two layers.

  // Larger soft red glow layer
  for (let r = 1000; r > 0; r -= 10) {
    fill(255, 0, 0, 1);
    circle(width / 2, height / 2, r + random(-30, 30));
  }

  // Brighter orange sun glow layer
  for (let r = 500; r > 0; r -= 10) {
    fill(255, 255, 0, 3);
    circle(width / 2, height / 2, r + random(-20, 20));
  }

  pop();


  //Year counter where years is decided on earth creating a full rotation around the sun
  years = floor(angleE / TWO_PI); // earth rotatest 360 degrees based of angle

  textStyle(BOLD);
  textSize(40);
  fill('white');

  if (currentYear !== years && !isSpin) {
    yay();//cheer when year is completed
    isSpin = true; //spin is true for sun and counter
    rAngle = 0;
    currentYear = years; //update years
  }

  if (isSpin) {
    // Spin sun and counter when year is completed through translating and rotation. This acts as a celebration for the year completion.
    push();
    translate(width / 2 - 500, height / 2 - 680);
    rotate(rAngle);
    textAlign(CENTER, CENTER);
    text("Current Year: " + (2025 + years), 0, 0);
    pop();

    push();
    imageMode(CENTER);
    translate(width / 2, height / 2);
    rotate(rAngle);
    image(sunPng, 0, 0, 300, 300);
    pop();

    rAngle += spinSpeed;
    // Stop spin after first spin
    if (rAngle >= TWO_PI) {
      rAngle = 0;
      isSpin = false;
    }

  } else {
    // Static text and image are created when not spinning
    text("Current Year: " + (2025 + years), width / 2 - 680, height / 2 - 680);
    imageMode(CENTER);
    image(sunPng, 1500, 750, 300, 300);
  }
}