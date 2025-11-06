function preload(){

  
}




function setup() {
  createCanvas(1000, 800)
  biteSize= 250  
  snackSize = 300  
  snackFinish = false 
  snackPic = createGraphics(width, height)
  drawSnack()
  moreFoodBtn = new RedButton()
}

function draw() {
  background(40)
  image(snackPic, 0, 0)
  fill(255)
  noStroke()
  textAlign(LEFT, TOP)
  textSize(25)
  text("Eat the healthy snacks, They're good for you!", 30, 30)
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

  if (snackEmpty()) {
    snackFinish = true
    moreFoodBtn.reset()
  }
}

function drawSnack() {
  snackPic.clear()
  snackPic.noStroke()
  snackPic.fill(255)
  snackPic.circle(width/2, height/2 + 100, snackSize)
  snackFinish = false
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
  btnRadius = 40
  btnX = width + btnRadius //Off screen
  btnY = height / 2
  slideSpd = 6

  function reset() {
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
    textSize(14)
    text("more food", btnX, btnY)
    pop()
  }

  function hitButton(x, y) {
    return dist(x, y, btnX, btnY) < btnRadius
  }

  return { showButton, hitButton, reset }
}