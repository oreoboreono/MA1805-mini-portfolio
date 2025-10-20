let img;
let rgb = [255,0,0]
let select = 0;

function preload(){
  img = loadImage('assets/grainyImage.png');

}

function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(220);
  image(img, 0, 0, width, height);


  if(select == 0){
    rgb = [255,0,0]
  }else{
    rgb = [0,255,0]
  }
  fill(rgb);


  let i = mouseY;
  while (i<=500){
    let r = random(30)
    circle(i,i+r,mouseX+r);
    i+=3;

  }

  text(select, 100, 100)
  
}

function mouseClicked(){
  if(select==0){
    select = 1;
  }else{
    select = 0;
  }
}