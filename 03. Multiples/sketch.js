/*The approach to this prompt are through being presented various snacks to be able to be eaten.
The type of food changes with the amount of snacks eaten. after eating a snack, you can order another snack to eat*/

// Preload my snack images and my eating sound
function preload() {
  applePng = loadImage('assets/apple.png');
  bananaPng = loadImage('assets/banana.png');
  beefPng = loadImage('assets/beef.png');
  coinPng = loadImage('assets/coin.png');
  davidPng = loadImage('assets/david.png');
  diamondPng = loadImage('assets/diamond.png');
  forkPng = loadImage('assets/fork.png');
  johnPng = loadImage('assets/john.png');
  orangePng = loadImage('assets/orange.png');
  pearPng = loadImage('assets/pear.png');
  porkPng = loadImage('assets/pork.png');
  stevePng = loadImage('assets/steve.png');
  munchMp3 = loadSound('assets/munch.mp3');
}

function setup() {
  /*I put my images into an array to be easily accessed later, categorising them into  three different levels.
  Each level with progressingly weirder foods and messages*/
  fruits = [applePng, bananaPng, orangePng, pearPng];
  meats = [porkPng, beefPng];
  theRich = [coinPng, diamondPng, davidPng, johnPng, stevePng];

  createCanvas(1000, 800);
  //initialize my variables
  //checking the level currently on
  foodFlag = 0;
  //from other project, recheck the previous foods not to repeat the foods repeatedly
  iPrevious = 10;
  iBeforePrevious = 11;

  // Sizes. Larger size is chosen to fill the screen and easily eat the food
  biteSize = 500;
  snackSize = 500;

  // Check for finished snack
  snackFinish = false;

  //Using createGraphics allows to check if the snack has been fully consumed later
  snackPic = createGraphics(width, height);
  drawSnack();
  moreFoodBtn = new RedButton();//button initialized
  munchMp3.setVolume(0.5);//munch sound on eat
  snacksEaten = 0;//amount of snacks eaten for counter
}

/*DRAW------------------------------------------------------------------------------------------------------------------------------*/
function draw() {
  //drawing counter, food and button
  background(0);
  image(snackPic, 0, 0);
  stateCheck(); 
  
  textAlign(RIGHT, TOP);
  text("Snacks eaten: " + snacksEaten, 900, 30);

  hand();

  if (snackFinish) {
    moreFoodBtn.showButton();
  }
}
//logic for eating by mouseclick
function mousePressed() {
  // When snack is gone, more food button appears
  if (snackFinish) {
    if (moreFoodBtn.hitButton(mouseX, mouseY)) drawSnack(); //pressing button summons another snack
    return;
  }

  // Take bite with feedback.
  snackPic.erase();
  snackPic.circle(mouseX, mouseY, biteSize);
  snackPic.noErase();
  munchMp3.play();

  if (snackEmpty()) {
    snackFinish = true;
    moreFoodBtn.reset();
  }
}

let iPrevious = -1;
let iBeforePrevious = -1;
let randomI = -1;
let foodFlag = 0;

/*FUNCTIONS---------------------------------------------------------------------------------------------------------------------------*/

// Creates snack image to be eaten
function drawSnack() {
  snackPic.clear();
  snackPic.noStroke();
  snackPic.fill(255);

  //Gets food from array and creates it as image
  let a = getFood();
  snackPic.image(a, width / 2 - snackSize / 2, height / 2 + 100 - snackSize / 2, snackSize, snackSize);
  snackFinish = false;
}

// Function to check for the current level based on amount of snacks eaten
function stateCheck() {
  noStroke();
  fill(255);
  textSize(25);
  textAlign(LEFT, TOP);
  
  // Every 7th snack, next level progress. 7 was chosen because it is neither too long or short to be achieved. 
  let state = Math.floor(snacksEaten / 7);

  // Positive innocent message
  if (state == 0) {
    text("Eat the healthy snacks, They're good for you", 30, 30);
    foodFlag = state;
  }

  // Slowly gets more disturbing. message is harsher, using red to envoke danger
  if (state == 1) {
    textSize(30);
    textStyle(BOLD);
    fill(255, 0, 0);
    text("Eat up.", 30, 30);
    foodFlag = state;
  }

  // Final state, shaking aggressive text, true message revealed in 'Eat the rich', telling the observer my intention
  if (state >= 2) {
    textSize(35);
    textStyle(BOLD);
    fill(255, 0, 0);
    text("EAT THE RICH", 30 + random(0, 30), 30 + random(0, 30));
    foodFlag = 2;
  }

  textAlign(RIGHT, TOP);
  text("Snacks eaten: " + snacksEaten, 900, 30);
}

// Function to fetch a random index from each of the 3 arrays and their levels. 
function getFood() {
  let sArray;

  if (foodFlag == 0) {
    sArray = fruits;
  }

  if (foodFlag == 1) {
    sArray = meats;
  }

  if (foodFlag == 2) {
    sArray = theRich;
  }

  // Using my previous logic, do not repeat the last food returned for all arrays
  if (!sArray || sArray.length === 0) return;

  if (sArray.length < 3) {
    randomI = floor(random(sArray.length));

    while (randomI == iPrevious) {
      randomI = floor(random(sArray.length));
    }

    iBeforePrevious = iPrevious;
    iPrevious = randomI;

    return sArray[randomI];
  }

  randomI = floor(random(sArray.length));
  
  while (randomI == iPrevious || randomI == iBeforePrevious) {
    randomI = floor(random(sArray.length));
  }

  iBeforePrevious = iPrevious;
  iPrevious = randomI;

  // Return index
  return sArray[randomI];
}

// Function to check if snack is completely consumed
function snackEmpty() {
  snackPic.loadPixels();
  pix = snackPic.pixels;

  for (let i = 3; i < pix.length; i += 4) {
    if (pix[i] > 0) return false; // Found solid pixel
  }

  return true;
}

function RedButton() {
  let btnRadius = 200;
  let btnX = width + btnRadius; // Off screen
  let btnY = height / 2;
  let slideSpd = 20;

  // Push button back outside
  function reset() {
    snacksEaten += 1;
    btnX = width + btnRadius;
  }

  // Button animation towards the middle of the screen
  function showButton() {
    if (btnX > width - btnRadius * 2 - 20) btnX -= slideSpd;

    // Draw Button
    push();
    noStroke();
    fill(200, 0, 0);
    circle(btnX, btnY, btnRadius * 2);
    fill(240, 30, 30);
    circle(btnX, btnY - 3, btnRadius * 1.8);

    // Label
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    textStyle(BOLDITALIC);
    text("more food", btnX, btnY);
    pop();
  }

  //function to check if the button has been clicked 
  function hitButton(x, y) {
    return dist(x, y, btnX, btnY) < btnRadius;
  }

  return { showButton, hitButton, reset };
}

/*Hand that bobs and moves when cursor is moved. At first i attempted some parallex but I decided on a simpler method 
on simple movement with no rotation*/
function hand() {
  push();
  imageMode(CENTER);
  translate(
    //Move X
    90 + (mouseX - width / 2) * 0.08,
    //Hand bobbing up and down
    height * 0.55 + (mouseY - height / 2) * 0.04 + sin(frameCount * 0.08) * 6
  );
  image(forkPng, 0, 0, 720, 720);
  pop();
}







