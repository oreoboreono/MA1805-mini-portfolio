function preload(){
  applePng = loadImage('assets/apple.png')
  bananaPng = loadImage('assets/banana.png')
  beefPng = loadImage('assets/beef.png')
  coinPng = loadImage('assets/coin.png')
  coinbagPng = loadImage('assets/coinbag.png')
  davidPng = loadImage('assets/david.png')
  diamondPng = loadImage('assets/diamond.png')
  forkPng = loadImage('assets/fork.png')
  johnPng = loadImage('assets/john.png')
  meatPng = loadImage('assets/meat.png')
  orangePng = loadImage('assets/orange.png')
  pearPng = loadImage('assets/pear.png')
  porkPng = loadImage('assets/pork.png')
  stevePng = loadImage('assets/steve.png')
  munchMp3 = loadSound('assets/munch.mp3')
  

}




function setup() {
  fruits = [applePng,bananaPng,orangePng,pearPng];
  meats = [porkPng,meatPng,beefPng]
  theRich = [coinPng, coinbagPng, diamondPng, davidPng, johnPng, stevePng]




  createCanvas(1000, 800)
  foodFlag = 0
  iPrevious = 10
  iBeforePrevious = 11
  biteSize= 500  
  snackSize = 500  
  snackFinish = false 
  snackPic = createGraphics(width, height)
  drawSnack()
  moreFoodBtn = new RedButton()
  munchMp3.setVolume(0.5);
  snacksEaten = 0




}

function draw() {
  background(0)
  image(snackPic, 0, 0)
  stateCheck();


  textAlign(RIGHT, TOP)
  text("Snacks eaten: " + snacksEaten,900,30)

  hand()
  if (snackFinish){ 
    moreFoodBtn.showButton()
  }
}

function mousePressed() {
  //When snack is gone, more food button appears
  if (snackFinish) {
    if (moreFoodBtn.hitButton(mouseX, mouseY)) drawSnack()
    return
  }
  

  //Take bite
  snackPic.erase()
  snackPic.circle(mouseX, mouseY, biteSize)
  snackPic.noErase()
  munchMp3.play();

  if (snackEmpty()) {
    snackFinish = true
    moreFoodBtn.reset()
  }
}

iPrevious = -1
iBeforePrevious = -1
randomI = -1
foodFlag = 0

function drawSnack() {
  snackPic.clear()
  snackPic.noStroke()
  snackPic.fill(255)
  let a = getFood()
  snackPic.image(a, width / 2 - snackSize / 2, height / 2 + 100 - snackSize / 2, snackSize, snackSize)
  snackFinish = false;
}

function stateCheck() {
  noStroke()
  fill(255)
  textSize(25)
  textAlign(LEFT, TOP)

  state = Math.floor(snacksEaten / 7);

  if (state == 0) {
    text("Eat the healthy snacks, They're good for you", 30, 30)
    foodFlag = state
    
  }
  if (state == 1) {
    textSize(30)
    textStyle(BOLD)
    fill(255,0,0)
    text("Eat up.", 30, 30)
    foodFlag = state;
  }
  if (state >= 2) {
     
    textSize(35)
    textStyle(BOLD)
    fill(255,0,0)
    text("EAT THE RICH", 30+random(0,30), 30+random(0,30))
    foodFlag = 2
  }

  textAlign(RIGHT, TOP)
  text("Snacks eaten: " + snacksEaten, 900, 30)
}


function getFood() {
  let sArray

  if (foodFlag == 0) {
    sArray = fruits
  }
  if (foodFlag == 1) {
    sArray = meats
  }
  if (foodFlag == 2) {
    sArray = theRich
  }

  if (!sArray || sArray.length === 0) return

  if (sArray.length < 3) {
    randomI = floor(random(sArray.length))
    while (randomI == iPrevious) {
      randomI = floor(random(sArray.length))
    }
    iBeforePrevious = iPrevious
    iPrevious = randomI
    return sArray[randomI]
  }

  randomI = floor(random(sArray.length))
  while (randomI == iPrevious || randomI == iBeforePrevious) {
    randomI = floor(random(sArray.length))
  }

  iBeforePrevious = iPrevious
  iPrevious = randomI

  return sArray[randomI]
}







function snackEmpty() {
  snackPic.loadPixels()
  pix = snackPic.pixels
  for (let i = 3; i < pix.length; i += 4) {
    if (pix[i] > 0) return false; //Found solid pixel
  }
  return true;
}

function RedButton() {
  btnRadius = 200
  btnX = width + btnRadius //Off screen
  btnY = height / 2
  slideSpd = 20

  function reset() {
    snacksEaten += 1
    btnX = width + btnRadius //Push button back outside
  }

  function showButton() {
    //Button animation
    if (btnX > width - btnRadius * 2 - 20) btnX -= slideSpd
    //Draw Button
    push()
    noStroke()
    fill(200, 0, 0)
    circle(btnX, btnY, btnRadius * 2)
    fill(240, 30, 30)
    circle(btnX, btnY - 3, btnRadius * 1.8)
    //Label
    fill(255)
    textAlign(CENTER, CENTER)
    textSize(40)
    textStyle(BOLDITALIC)
    text("more food", btnX, btnY)
    pop()
  }

  function hitButton(x, y) {
    return dist(x, y, btnX, btnY) < btnRadius
  }
  

  return { showButton, hitButton, reset }
}
function hand() {
  push()
  imageMode(CENTER)
  translate(
    90 + (mouseX - width / 2) * 0.08,
    height * 0.55 + (mouseY - height / 2) * 0.04 + sin(frameCount * 0.08) * 6
  )
  image(forkPng, 0, 0, 720, 720)
  pop()
}







