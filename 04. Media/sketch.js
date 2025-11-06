

function setup() {
  createCanvas(1000, 1000);
  bw = false;
  
  capture = createCapture(VIDEO);
  capture.hide();

  skeletonMp4 = createVideo('/assets/skeleton.mp4');
  skeletonMp4.hide();
  skeletonMp4.size(windowWidth+300, windowHeight);

  


  // create a button on the left
  bwButton = createButton('DISTRACTION!');
  bwButton.position(10, height / 2 + 100);
  bwButton.style('font-size', '80px');
  bwButton.mousePressed(pause);
}


function pause() {
  bw = !bw;
  bwButton.html(bw ? 'Color (Resume)' : 'Black & White');
  capture.pause();
  bwButton.remove()
  
}

function draw() {
  background(0);
  let imgH = width * capture.height / capture.width;
  image(capture, 0, 100, width, imgH);

  if (bw) {
    filter(GRAY);
     skeletonMp4.play
     
  }
}

