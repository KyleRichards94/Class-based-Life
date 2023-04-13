class cell{
  constructor(x,y, size, lifeSpan){
    this.x = x;
    this.y = y; 
    this.live = lifeSpan;  //to make sure that the background image loads correctly
    this.size = size;
    this.lifeSpan = lifeSpan;//10*this.live;
    this.dying = 0;
    this.neighbors = 0;
    this.visited = 0;
  }

  isDead(){
    return this.live;
  }
  draw(){
    //basic life logic.
    if(this.lifeSpan == 0){
      this.live = 0;
    }
    if(this.live == 1){
      strokeWeight(0.08);
      fill(255);
      square(this.x,this.y,this.size);
    } else {
      strokeWeight(0.08);
      fill(30+this.visited, this.visited/2, 5);
      square(this.x,this.y, this.size)
    }
    if(this.visited > 0){
      this.visited -= 0.7;
    }
  }

  checkDead(){
    //the cell is currently DEAD
    if(this.live == 0){
      if(this.neighbors == 3){
        this.live = 1;
        this.lifeSpan = 1;
        this.visited += 20;
      }
    }
  }
  checkLive(){
    if(this.live == 1){
      if(this.neighbors < 2 || this.neighbors > 3){
        this.live = 0;
      } else {
        this.live = 1;
        this.lifeSpan = 1;
      }
    }
  }

}

let PImage;
let Cell = [];
let CellSpacing = 5;
let lifeSpan; 
let pause;
let paused;

function setup() {
  var canvas = createCanvas(500,500);
  //canvas.parent('P5container');
  //dom elements
  lifeSpan = 1;
  pause = createCheckbox("paused", true);
  pause.style("scale:100%");

  background (255);
  //PImage.loadPixels();
  //imageMode(CENTER);

  for(let x = 0; x<=width/CellSpacing; x++){
    Cell[x] = [];
    for(let y = 0; y <= height/CellSpacing; y++){
      //All this stuff makes sure that the organisms spawn in the location of some image text.
      let place = random(0,1);
      let alive = 0;
      if(place < 0.5){
        alive = 1;
      }
      //end shitshow
      Cell[x][y] = new cell((CellSpacing*x), (CellSpacing*y), CellSpacing, alive);
    }
  }
}

function draw() {
  //background(255);
  if(pause.checked() == false){
  for(let x = 0; x < Cell.length; x++){
    for(let y = 0; y < Cell[x].length; y++){
      //initialize
      //up
      let neighborCount = 0;//Cell[x][y].neighbors;
      if(y > 0 && Cell[x][y-1].live == 1){
        neighborCount++;
      } 
      //down
      if(y < height/CellSpacing && Cell[x][y+1].live == 1){
        neighborCount++;
      } 
      //left
      if(x > 0 && Cell[x-1][y].live == 1){
        neighborCount++;
      } 
      //right
      if(x < width/CellSpacing && Cell[x+1][y].live == 1){
        neighborCount++;
      } 

      //diagonal left up 
      if((y > 0 && x > 0) && Cell[x-1][y-1].live == 1){
        neighborCount++;
      }
      //diagonal right up
      if((y > 0 && x < width/CellSpacing) && Cell[x+1][y-1].live == 1){
        neighborCount++;
      }
      //diagonal down left
      if((x > 0 && y < height/CellSpacing ) && Cell[x-1][y+1].live == 1){
        neighborCount++;
      }
      //diagonal down right
      if((x < width/CellSpacing && y < height/CellSpacing) && Cell[x+1][y+1].live == 1){
        neighborCount++;
      }
      Cell[x][y].neighbors = neighborCount;
      
    }
  }
  for(let x = 0; x < Cell.length; x++){
    for(let y = 0; y < Cell[x].length; y++){
      if(Cell[x][y].lifeSpan >= 0 ){
        Cell[x][y].lifeSpan--;
      }
    }
  }
  
  for(let x = 0; x < Cell.length; x++){
    for(let y = 0; y < Cell[x].length; y++){
      Cell[x][y].checkLive();
      
      Cell[x][y].checkDead();
    }
  }
  for(let x = 0; x < Cell.length; x++){
    for(let y = 0; y < Cell[x].length; y++){
    }
  }

}
  for(let x = 0; x < Cell.length; x++){
    for(let y = 0; y < Cell[x].length; y++){
      Cell[x][y].draw();
      //pause play handling 
    }
  }
}

function mouseDragged(){
  
}

function Pause(){
  paused = true;
}
function Play(){
  paused = false;
}
