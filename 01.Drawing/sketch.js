//boolean variables to serve as flags
let check = false
let gunshot = false

//eyebrow function for the face i constructed
function eyebrow(x, y, size, angle = 0) {
  push();
  translate(x, y);   // position
  rotate(radians(angle));          // rotate around its centre

  // white outline
  stroke(255);
  strokeWeight(4);
  fill(0);
  rect(0, 0, size * 1.3, size * 0.25);

  pop();
}

//eye function for the face
function eye(x, y, size) {
  push();
  translate(x, y);
  noStroke();

  //eye whites created with simple shapes
  fill(155);
  triangle(-size - 50, 0, -50, -size, 0, size + 20);
  triangle(size + 50, 0, 50, -size, 0, size + 20);
  triangle(50, -size, -50, -size, 0, size + 20);

  //eye pupil looks at mouse cursor in the bounds of the eye based on the angle and mouse coordinates
  let dx = mouseX - x;
  let dy = mouseY - y;
  let angle = atan2(dy, dx);
  let maxOffset = size * 1.35;
  let dist = min(maxOffset, mag(dx, dy));
  let px = cos(angle) * dist;
  let py = sin(angle) * dist;

  //shakey jittery eyes are created with random added to the coordinates
  let jitter = size * 0.2;         
  px += random(-jitter, jitter);
  py += random(-jitter, jitter);

  //pupil is created
  fill(255);
  rectMode(CENTER);
  rect(px, py, size * 0.7, size);

  fill(255, 0, 0);
  rect(px, py, size * 0.7, size);

  fill(0);
  rect(px, py, size * 0.2, size * 0.8);

  //stopping the pupil from escaping the eye by creating shapes to block certains part of the eye
  fill(0)
  triangle(-size - 50, 0, -100, size+50, 0, size+20);
  triangle(size + 50, 0, 50, size+100, 0, size+20);
  triangle(-size + 100, 100, -100, size+50, 0, size+20);
  rect(size-45, size-150, size+100)
  triangle(-size - 50, 0, -50, -size, -30, size-200);
  triangle(size + 50, 0, 50, -size, 80, size-200);



  pop();
}

//background is created with moving text in a for loop and random where it adds tension
function scream(){
  x = random(-300,400);
  y = random(400,400);

  for(let i = 0; i<15; i++){
  fill(130,30,30);
  textStyle(BOLD)
  textSize(150);
  text("PLEASE DON'T KILL ME", x,y-290+(i*150))
  
  }


}


//cross hair to put in the middle of the character to envoke a sense of danger for the viewer
function crosshair(x, y) {
  push();
  translate(x, y);
  rectMode(CENTER);
  noStroke();
  fill(255, 0, 0);

  //crosshair arms
  rect(-150, 0, 190, 12);
  rect( 150, 0, 190, 12);
  rect(0, -150, 12, 190);
  rect(0,  150, 12, 190);

  //center point
  circle(0,0,30)

  //rings
  noFill();
  stroke(255,0,0)
  strokeWeight(4);
  rect(0, 0, 200, 200);
  rect(0, 0, 260, 260);
  pop();
}
//preloading sound effects
function preload() {
  mp3 = loadSound('assets/static.mp3');
  end = loadSound('assets/death.mp3');
  endMusic = loadSound('assets/music.mp3');
}
//set up canvas
function setup() {
  createCanvas(2000, 1100);
  background(60);
  fill(0);
  //static audio loops
  userStartAudio().then(() => {
    mp3.setVolume(0.4);
    mp3.loop();
    });
  

  

}
//button pressed on the crosshair's circle will trigger events - imitating a gunshot and following death 
function mousePressed() {
  // distance from mouse to circle centre
  if (dist(mouseX, mouseY, width / 2, height / 2 - 300) <= 30) {
    mp3.stop();
    
    //boolean to change scenes
    check = true;
       // silence immediately
  }
}



function draw(){
  //if loop to check if button has been pressed or not
  if(check==false){
  background(50);
  scream();
  rectMode(CENTER)
  fill(30)
  //nlank face and body is created with shapes
  rect(width/2, height/2+200,450,630);
  triangle(300,1000,780,1000,780,700)
  triangle(1700,1000,1225,1000,1225,700)
  rect(width/2, height/2+700,1150,630);
  ellipse(width/2-500, height/2+600, 600, 600)
   ellipse(width/2+500, height/2+600, 600, 600)
  fill(0)
  ellipse(width/2, height/2-200, 630, 700)
  triangle(1300,350,910,780,698,560);
  triangle(1300, 560, 1090, 780, 802, 560);
  rectMode(CENTER)
  noStroke()
  fill(0);
  rect(width/2, height/2-100,600,230);
  rect(width/2, height/2+80,190,300);
  
 




// filling face with facial features made with earlier functions made 
  eye(width/2-180, height/2-100,40)
  eye(width/2+180, height/2-100,40)
  eyebrow(width/2-180, height/2-225,210,-30);
  eyebrow(width/2+180, height/2-225,210,30);
  crosshair(width/2, height/2-300)
  }else{
    // after button press changed scene and play audio. Death is assumed through a gunshot
    if(gunshot==false){
      end.play()
      endMusic.play()
      gunshot = true
    }
    randomX = random(-100, 100);
    randomY = random(-100, 100);
    background(20);
    fill(255,0,0);
    textStyle(BOLD)
    textSize(150);
    //i tried to convey a message that suffering can somehow be beautful in a dark with anticipation of death from both parties 
    text("Suffering is poetic",width/6+randomX, height/2+randomY)
  }

    
  }

  

  
  


