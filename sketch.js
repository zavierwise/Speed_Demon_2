let programState = 'menu';
let timer = 60;
let wings;
let myFont1;
let soulImg;
let columnImg;
let score = 0;

let x, y, r;



function preload() {
  myFont1 = loadFont('DemonWings-GOn4Z.ttf');
  wings = loadImage('wings.png');
  soulImg = loadImage('Mage.png');
  columnImg = loadImage('column_sides.png');
}


function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  textAlign(CENTER);
  d = 40;
  r = d/2;
  x = random(width);
  y = random(height);
}

function draw() {
  switch (programState) {
    case 'menu':
      menuScreen();
      break;
    case 'game':
      gameScreen();
      break;
    case 'info':
      infoScreen();
      break;
    case 'score':
      scoreScreen();
      break;
  }
  
}


function menuScreen() {
//set up
background(0);
  
//columns
  myColumn = new column();
  myColumn.display();
  
//wings
image(wings,0,150,600);

//title
fill(128,0,6);
textSize(100);
textFont(myFont1);
text('SPEED DEMON',width*0.46,height*0.5);

//start button
if ((mouseX > width*0.4) && (mouseX < width*0.62) && (mouseY > height*0.625) && (mouseY < height*0.71)) {
  fill(255,0,0);
  textSize(50);
  textFont(myFont1);
  text('START', width*0.5,height*0.7);
} else {
  fill(255);
  textSize(50);
  textFont(myFont1);
  text('START', width*0.5,height*0.7);
}
  
//info button
if ((mouseX > width*0.44) && (mouseX < width*0.58) && (mouseY > height*0.78) && (mouseY < height*0.85)) {
  fill(255,0,0);
  textSize(50);
  textFont(myFont1);
  text('INFO', width*0.505,height*0.85);
} else {
  fill(255);
  textSize(50);
  textFont(myFont1);
  text('INFO', width*0.505,height*0.85);
  
}
  
}


function gameScreen() {
  background(0);
  textFont(myFont1);
  textSize(20);
  fill(255);
  text('souls collected:   ' + score,180,30);
  text(timer,480,30);
  
    if (frameCount % 60 == 0 && timer > 0) { 
    timer --;
  }
  if (timer == 0) {
    programState = 'score';
  }
  
  myColumn = new column();
  myColumn.display();
  
  image(soulImg,x, y, d);

}

function mouseClicked() {
  if ((programState == 'game') && (dist(mouseX-30, mouseY-30, x, y) <= r)) {
  x = int(random(100,480));
  y = int(random(100,500));
  score += 1;
  }
}


function infoScreen() {
  background(0);
  textFont(myFont1);
  textSize(30);
  fill(255);
  text('You  are  a  demon  from  the  seventh  layer  of  hell.  According  to  Lucifer,  if  you  can  collect  one  thousand  souls  you  can  return  to  the  overworld.  A  futile  task  but  nonetheless  you  shall  persist.  Click  on  the  souls  as  they  appear  to  add  to  your  collection.  You  have  60  seconds.  Happy  hunting.  Click  anywhere  to  return  to  the   menu  screen.',width*0.465,height*0.3,500);
}


function scoreScreen() {
  background(0);
  
  myColumn = new column();
  myColumn.display();
  
  image(wings,0,150,600);
  
  textFont(myFont1);
  textSize(50);
  fill(128,0,6);
  text( 'YOUR  SCORE',width*0.49,height*0.2);
  fill(255,0,0);
  textSize(70);
  text(score,width*0.5,height*0.45);
  
  if ((mouseX > width*0.41) && (mouseX < width*0.58) && (mouseY > height*0.73) && (mouseY < height*0.8)) {
  fill(255,0,0);
  textSize(50);
  textFont(myFont1);
  text('save', width*0.495,height*0.8);
} else {
  fill(255);
  textSize(50);
  textFont(myFont1);
  text('save', width*0.495,height*0.8);
}
  
  if ((mouseX > width*0.46) && (mouseX < width*0.54) && (mouseY > height*0.87) && (mouseY < height*0.9)) {
  fill(255,0,0);
  textSize(20);
  textFont(myFont1);
  text('menu', width*0.495,height*0.9);
} else {
  fill(255);
  textSize(20);
  textFont(myFont1);
  text('menu', width*0.495,height*0.9);
}
  
}


//class declaration for columns
class column {
  constructor() {
  }

display() {
  image(columnImg,0,0);
}
}


function mouseReleased() {
  if ((programState == 'menu') && ((mouseX > width*0.4) && (mouseX < width*0.62) && (mouseY > height*0.625) && (mouseY < height*0.71))) {
    programState = 'game';
  } else if ((programState == 'menu') && ((mouseX > width*0.44) && (mouseX < width*0.58) && (mouseY > height*0.78) && (mouseY < height*0.85))) {
    programState = 'info';
  } else if ((programState == 'game') && (timer <= 0)) {
    programState = 'score';
  } else if ((programState == 'info')) {
    programState = 'menu';
  } else if ((programState == 'score') && ((mouseX > width*0.41) && (mouseX < width*0.58) && (mouseY > height*0.73) && (mouseY < height*0.8))) {
    saveCanvas();
  } else if ((programState == 'score') && ((mouseX > width*0.46) && (mouseX < width*0.54) && (mouseY > height*0.87) && (mouseY < height*0.9))) {
    programState = 'menu';
    score = 0;
    timer = 60;
  }
}
