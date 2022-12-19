let audioFile, amplitude, level
let cnv   // Variable to hold the canvas

let clock = -1
let counter = 4

let sw
let swMax = 15

let sc 

let radius

// Set the radius based on the size of the window for responsive web
if(window.innerWidth > 1024){
  radius = window.innerHeight * 0.75/2  // The radius of the circle
} else {
  radius = window.innerWidth * 0.6/2
  swMax = 10
}


let numPoints = 360  // The number of points in the circle 
let inc = 360 / numPoints   // The amount to increment each jump

let circlePoints // array to hold the X and Y values of the circle

function preload(){
  audioFile = loadSound('./assets/Flutter129-1min med.mp3')
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
  // Set the radius based on the size of the window for responsive web
  if(window.innerWidth > 1024){
    radius = window.innerHeight * 0.75/2  // The radius of the circle
    console.log(window.innerWidth)
  } else {
    radius = window.innerWidth * 0.6/2
  }
  initCircle(radius, inc)
}

// Fill the 2d array with values to draw the circle
// Parameters: radius of the circle and the number of points
function initCircle(radius, inc){
  // Clear the array
  circlePoints = []

  for(let i = 0; i <= 360; i += inc){
    let X = sin(i) * radius
    let Y = cos(i) * radius

    circlePoints.push([X, Y])
  }
}



// Function to draw the circle 
function drawLogo(){
  strokeWeight(swMax)
  stroke(255)

  drawingContext.shadowBlur = 32
  drawingContext.shadowColor = color(255, 255, 255)


  // Draw horizontal line
  line(-radius, 0, radius, 0)

  // Draw other line
  line(-radius, 0, circlePoints[45][0], circlePoints[45][1])
  // First draw circle
  beginShape()
  for(let i = 0; i < circlePoints.length; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()
}


// Functions for drawing individual letters
function G(){
  beginShape()
  for(let i = 0; i < circlePoints.length; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()
  line(0, 0, radius, 0)
}

function R(){
  beginShape()
  for(let i = 90; i <= 330; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()
  line(-radius, 0, circlePoints[45][0], circlePoints[45][1])
  line(-radius, 0, radius, 0)

}

function O(){
  beginShape()
  for(let i = 0; i < circlePoints.length; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()

}

function V(){
  // Draw left side
  beginShape()
  for(let i = 225; i <= 360; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()
  // Draw Right side
  beginShape()
  for(let i = 0; i < 135; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()
}

function E(){
  beginShape()
  for(let i = 0; i <= 45; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()

  beginShape()
  for(let i = 90; i <= 360; i ++){
    let x = circlePoints[i][0]
    let y = circlePoints[i][1]
    vertex(x, y)
  }
  endShape()

  line(-radius, 0, radius, 0)
}


function setup(){
  cnv = createCanvas(windowWidth, windowHeight)
  cnv.mousePressed(toggleMusic)


  amplitude = new p5.Amplitude(0.1)

  angleMode(DEGREES)
  smooth()

  // Make sure pixel density matches screen density
  pixelDensity(displayDensity())

  // Initialise the circle point array
  initCircle(radius, inc)
}


function draw(){
  background(0);
  translate(width/2, height/2)

  noFill()

  drawingContext.shadowBlur = 32
  drawingContext.shadowColor = color(sc, sc, sc)

  level = amplitude.getLevel() * 10

  if(level > 3.55 && frameCount % 3 == 0){
    counter ++
    clock = (counter % 5)
    sw = swMax * 2
    sc = 255
  }

  sw = lerp(sw, 0.000001, 0.07)
  sc = lerp(sc, 0, 0.07)
  strokeWeight(sw)
  stroke(sc)

  switch(clock){
    case -1:
      drawLogo()
      break
    case 0:
      G()
      break
    case 1:
      R()
      break
    case 2:
      O()
      break
    case 3:
      V()
      break
    case 4:
      E()
      break
  }

}

function toggleMusic(){
  // toggle music when canvas is pressed
  if(audioFile.isPlaying()){
    audioFile.pause()
  } else {
    audioFile.play()
    amplitude = new p5.Amplitude(0.1)
    amplitude.setInput(audioFile)
  }
}