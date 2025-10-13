let x;
let y;
function setup() {
  
  createCanvas(500, 500);
}

function scream(){
  x = random(-30,120);
  y = random(200,200);

  for(let i = 0; i<10; i++){
  fill(255,0,0);
  textStyle(BOLD)
  textSize(50);
  text("LET ME SCREAM", x,y+(i*50))
  }


}

function person(){
  //face
   push();
   fill(0,255,0);
   noStroke();
  ellipse(width/2,height/2+10,130,170);
  pop();

  //body
  fill(0,255,0)
  noStroke();
  rect(width/2 -120, (height/2) +160, 250, 350);
  ellipse(width/2 -120, (height/2) +230,130,170);
  ellipse(width/2 +120 , (height/2) +230,130,170);

}


function draw() {
  background(0);
  scream();
  person();

}
