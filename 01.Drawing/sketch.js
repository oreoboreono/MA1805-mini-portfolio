/*I approached this prompt through an animated emoji which is seen under distress by the user. The character is created through shapes
in the middle of the screen with a crosshair in the middle of their head.*/ 

// Boolean variables to serve as checks to activate different phases of my emoji
let check = false;
let gunshot = false;

/*FUNCTIONS---------------------------------------------------------------------------------------------------------------------------*/

/* For my emoji, I will be splitting them into different facial features. I felt functions would be reasonable as there 
are multiple of the same features on a face and it would make the code more clear. 
*/
function eyebrow(x, y, size, angle = 0) {
  push();

  translate(x, y);   //translate position of the eyebrow
  rotate(radians(angle));          // rotate around its centre using radians

  // Added white outline to my shape to make it stand out against the rest of my face.
  stroke(255);
  strokeWeight(4);
  fill(0);
  rect(0, 0, size * 1.3, size * 0.25); // eyebrow shape is rectangle

  pop();
}

// Eye function for my face
function eye(x, y, size) {
  push();
  translate(x, y);// translate position of eye
  noStroke();

  /*Eye whites created with simple shapes. Here i decided on three triangles to make the eye shape more realistic.*/
  fill(155);
  triangle(-size - 50, 0, -50, -size, 0, size + 20);
  triangle(size + 50, 0, 50, -size, 0, size + 20);
  triangle(50, -size, -50, -size, 0, size + 20);

  /*Construcing so eye pupil that follows the mouse cursor. Creates a sense of the emoji watching you,
  making it feel more lifelike and creepy. */
  let dx = mouseX - x;
  let dy = mouseY - y;
  let angle = atan2(dy, dx); //makes it so that the eye points towards the cursor from an angle
  let maxOffset = size * 1.35; 
  let dist = min(maxOffset, mag(dx, dy)); //constrain the pupil within the eye using max offset
  let px = cos(angle) * dist;
  let py = sin(angle) * dist;

  /*Shakey jittery eyes are created with random added to the coordinates.
  This makes my emoji character feel more scared and frantic*/
  let jitter = size * 0.2;         
  px += random(-jitter, jitter);
  py += random(-jitter, jitter);

  // Eye pupil shape is created with two rectangles. I decided to use the color red to provoke danger
  fill(255);
  rectMode(CENTER);
  rect(px, py, size * 0.7, size); // rectangles positioned based on vars created earlier so they can follow the mouse

  fill(255, 0, 0);
  rect(px, py, size * 0.7, size);

  fill(0);
  rect(px, py, size * 0.2, size * 0.8);

  /*Using trial and error, I stopped the pupil from escaping the eye by creating shapes to block certains part of the eye.
  This is because the eye was poking through the eye shape and creating trails. 
  The shapes follow the outline of eye whites to make sure it blocks the pupil but not the whites*/
  fill(0)
  triangle(-size - 50, 0, -100, size+50, 0, size+20);
  triangle(size + 50, 0, 50, size+100, 0, size+20);
  triangle(-size + 100, 100, -100, size+50, 0, size+20);
  rect(size-45, size-150, size+100);
  triangle(-size - 50, 0, -50, -size, -30, size-200);
  triangle(size + 50, 0, 50, -size, 80, size-200);

  pop();
}

//background is created with moving text in a for loop and random where it adds tension, using the color red again
function scream(){
  x = random(-300,400); //random vars to be added to make text move
  y = random(400,400);

  for(let i = 0; i<15; i++){ // for loop to make multiple lines of text
  fill(130,30,30);
  textStyle(BOLD);
  textSize(150);
  text("PLEASE DON'T KILL ME", x,y-290+(i*150));// text interpreted as character's pleading
  }
}

/*I created a crosshair aimed at our character from our perspective. This frames my scenario for my emoji character
being under threat by us, the observer. We are aiming down the barrels on the character ready to fire*/

function crosshair(x, y) {
  push();

  translate(x, y);
  rectMode(CENTER);
  noStroke();
  fill(255, 0, 0); // Red is our primary and only color present

  // Crosshair arms created from multiple triangles
  rect(-150, 0, 190, 12);
  rect( 150, 0, 190, 12);
  rect(0, -150, 12, 190);
  rect(0,  150, 12, 190);

  // Center point to where the user will be later be able to press and fire
  circle(0,0,30)

  // Concentric rings around the crosshair
  noFill();
  stroke(255,0,0);
  strokeWeight(4);
  rect(0, 0, 200, 200);
  rect(0, 0, 260, 260);

  pop();
}

// Preloading sound effects to be played for our emoji
function preload() {
  mp3 = loadSound('assets/static.mp3'); // to be played continiously in the background
  end = loadSound('assets/death.mp3'); // sound played after killing the emoji character
  endMusic = loadSound('assets/music.mp3'); // ending music
}

// Set up canvas
function setup() {
  createCanvas(2000, 1100);
  background(60);
  fill(0);

  //static audio loop plays static noise continuosly without overlapping
  userStartAudio().then(() => {
    mp3.setVolume(0.4);
    mp3.loop();
    });
}
//Here, pressing the button on he crosshair's circle will trigger our emoji character's death by us.   
function mousePressed() {
  // distance from mouse to circle centre to check for mouse clicks
  if (dist(mouseX, mouseY, width / 2, height / 2 - 300) <= 30) {
    mp3.stop();
    
    //boolean to change scene to end scene
    check = true;
       // silence out static background noise
  }
}

/*DRAW------------------------------------------------------------------------------------------------------------------------------*/

function draw(){
  // If loop to check if button has been pressed or not
  if(check==false){
  background(50);
  scream(); // text created
  rectMode(CENTER);
  fill(30); // grey color lighter than face creating

  //Body and neck of our emoji is created
  rect(width/2, height/2+200,450,630);
  triangle(300,1000,780,1000,780,700);
  triangle(1700,1000,1225,1000,1225,700);
  rect(width/2, height/2+700,1150,630);

  // Shoulders created here
  ellipse(width/2-500, height/2+600, 600, 600);
   ellipse(width/2+500, height/2+600, 600, 600);
  fill(0);

  // Face created here
  ellipse(width/2, height/2-200, 630, 700);
  triangle(1300,350,910,780,698,560);
  triangle(1300, 560, 1090, 780, 802, 560);
  rectMode(CENTER);
  noStroke();
  fill(0);
  rect(width/2, height/2-100,600,230);
  rect(width/2, height/2+80,190,300);
  
// Fill face with facial features made with earlier functions made 
  eye(width/2-180, height/2-100,40);
  eye(width/2+180, height/2-100,40);

  // Eyebrows tilting down to represent distress
  eyebrow(width/2-180, height/2-225,210,-30);
  eyebrow(width/2+180, height/2-225,210,30);
  crosshair(width/2, height/2-300);
  }else{
    // After button pressed, the character is killed adding to the somber ambience.   Ending scene is played with audio.
    if(gunshot==false){
      end.play()
      endMusic.play()
      gunshot = true;
    }
    //Shake text
    randomX = random(-100, 100);
    randomY = random(-100, 100);
    background(20);
    fill(255,0,0);
    textStyle(BOLD);
    textSize(150);

    // I tried to convey my message that our struggle to survive and persist is admirable but yet a pity 
    text("Suffering is poetic",width/6+randomX, height/2+randomY)
  }

    
  }

  

  
  


