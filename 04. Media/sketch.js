function preload(){
   mp3 = loadSound('assets/glitch.mp3')
}


function setup() {
  createCanvas(1000, 1000);
  bw = false;
  flag = false;
  select = 0
  rgb =[255,0,0]
  
  capture = createCapture(VIDEO);
  capture.hide();
  
  // Create a button on the left
  bwButton = createButton('DISTRACTION!');
  bwButton.position(10, height / 2 + 100);
  bwButton.style('font-size', '80px');
  bwButton.mousePressed(pause);
}

function pause() {
  bw = !bw;
  bwButton.html(bw ? 'Color (Resume)' : 'Black & White');
  capture.pause();
  bwButton.remove();
}

function draw() {
  background(0);
  let imgH = width * capture.height / capture.width;
  image(capture, 0, 100, width, imgH);
  
  if (bw) {
    filter(GRAY);
    if(select == 0){
    rgb = [255,0,0]
  }else{
    rgb = [0,255,0]
  }
  fill(rgb);


  let i = mouseY;
  while (i<=1200){
    let r = random(30)
    circle(i,i+r,mouseX+r);
    i+=3;

  }
 if (!mp3.isPlaying()) {
      mp3.play();
      
    }

  
  }
}

function mouseClicked(){
  
  if(select==0){
    select = 1;
  }else{
    select = 0;
  }
  
}