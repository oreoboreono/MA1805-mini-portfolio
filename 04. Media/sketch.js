/*My approach to this prompt was to represent distraction through a button press which on press pauses and allows you to interact
with the screen, combining multiple forms of media*/

// Pre-load the glitch sound
function preload() {
  mp3 = loadSound('assets/glitch.mp3');
}

function setup() {
  createCanvas(1000, 1000);

  // Color-mode flags
  bw = false;        // black/white filter on/off
  flag = false;      // unused
  select = 0;        // 0 = red circles, 1 = green circles
  rgb = [255, 0, 0]; // starting color (red)

  // Webcam capture
  capture = createCapture(VIDEO);
  capture.hide();

  // Big red distraction button which represents how we are distracted in life
  bwButton = createButton('DISTRACTION!');
  bwButton.position(10, height / 2 + 100);
  bwButton.style('font-size', '80px');
  bwButton.mousePressed(pause); // click toggles glitch mode
}

// Toggle black/white filter and start glitch, decided on glitch sound effect to represent the feeling of being distracted
function pause() {
  bw = !bw;
  bwButton.html(bw ? 'Color (Resume)' : 'Black & White');
  capture.pause(); // Pause to indicate how other needs are put on pause when you are distracted
  bwButton.remove(); // button only needed once
}

function draw() {
  background(0);

  // Draw webcam feed
  let imgH = width * capture.height / capture.width;
  image(capture, 0, 100, width, imgH);

  // Glitch overlay when bw is true
  if (bw) {
    filter(GRAY);

    // Choose color based on select flag
    if (select == 0) {
      rgb = [255, 0, 0];
    } else {
      rgb = [0, 255, 0];
    }
    fill(rgb);

    // Draw jittered diagonal circles
    let i = mouseY;
    while (i <= 1200) {
      let r = random(30);
      circle(i, i + r, mouseX + r);
      i += 3;
    }

    // Loop glitch sound
    if (!mp3.isPlaying()) {
      mp3.play();
    }
  }
}

// Toggle circle color on any mouse click
function mouseClicked() {
  if (select == 0) {
    select = 1;
  } else {
    select = 0;
  }
}