var Monkey,MonkeyRunning,MonkeyStanding;
var MonkeyTouch = 0;
var Banana,BananaImage, Obstacle, ObstacleImage
var BananaGroup, ObstacleGroup
var Score = 0;
var Ground,GroundImage;
var WhiteGround,InvisGround;
var PLAY = 1;
var END = 0
var gameState = PLAY;

function preload(){
  
  //add running animation for monkey
  MonkeyRunning = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png");
  
  BananaImage = loadImage("banana.png");
  
  ObstacleImage = loadImage("obstacle.png");
  
  GroundImage = loadImage("jungle-3.jpg");
  
  MonkeyStanding = loadImage("Monkey_01.png")
}

function setup() {
  createCanvas(500,500);
  
  var gameState = 1;
  
  //create monkey
  Monkey = createSprite (80,250,20,20);
  Monkey.addAnimation("Running", MonkeyRunning);
  Monkey.addAnimation("Standing", MonkeyStanding);
  Monkey.scale = 0.1;
  
  //create ground
  Ground = createSprite(0,200,1000,15);
  Ground.addImage(GroundImage);
  Ground.scale = 1;
  
  WhiteGround = createSprite(250,383,500,15);
  WhiteGround.shapeColor = "white";
  WhiteGround.depth = Ground.depth + 1;
  WhiteGround.visible = false;
  
  InvisGround = createSprite(250,400,500,15)
  InvisGround.visible = false;
  
  Monkey.depth = WhiteGround.depth + 1;
  
  BananaGroup = new Group();
  ObstacleGroup = new Group();
  
  Monkey.debug = true;
}


function draw() {
  background("white");

  if(Monkey.isTouching(BananaGroup)){
     BananaGroup.destroyEach();
     Score = Score + 2;
     }
  
  if(gameState === PLAY){
   fill("white");
    
  //Moving Ground
  //Ground.velocityX = -7;
  if(Ground.x < (camera.position.x) - 3500){
    Ground.x = camera.position.x;
  }

  if(keyDown("space") && Monkey.y > 345){
    Monkey.velocityY = - 18;
  }
  
  //Gravity
  Monkey.velocityY = Monkey.velocityY + 0.8

  //Movement
  Monkey.velocityX = 5
  camera.position.x = Monkey.x
  InvisGround.x = Monkey.x
  
  Monkey.collide(InvisGround);
  
  if(frameCount%80 === 0){
    SpawnBanana();
  }
  if(frameCount%300 === 0){
    SpawnObstacle();
  }
  
  switch(Score){
    case 10: Monkey.scale = 0.12;
             MonkeyTouch = 0;
             break;
    case 20: Monkey.scale = 0.14;
             MonkeyTouch = 0;
             break;         
    case 30: Monkey.scale = 0.16;
             MonkeyTouch = 0;
             break;
    case 40: Monkey.scale = 0.18;
             MonkeyTouch = 0;
             break;
    case 50: Monkey.scale = 0.2;
             MonkeyTouch = 0;
             break;         
  }  
    
  if(Monkey.isTouching(ObstacleGroup)){
     ObstacleGroup.destroyEach(); 
     MonkeyTouch = MonkeyTouch + 1;
     Monkey.scale = 0.1;
      if(MonkeyTouch === 2){
        gameState = END;
    }
  }
   drawSprites(); 
  }
  if(gameState === END){
    Ground.velocityX = 0;
    Monkey.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    Monkey.changeAnimation("Standing",MonkeyStanding);
    textSize(20);
    text("Press 'R' to restart",camera.x,220);
    
    if(keyDown("r")){
      reset();
      gameState = PLAY;
    }
  }
  
  //console.log(MonkeyTouch);
  
  textSize(20);
  text("Score: " + Score, Monkey.x + 100,50);
}

function SpawnBanana(){
  var Random = Math.round(random(150,270))
  Banana = createSprite(Monkey.x + 300,Random,20,20);
  Banana.addImage(BananaImage);
  Banana.scale = 0.1;
  //Banana.velocityX = -5;
  Banana.lifetime = 150;
  
  //console.log(Random);
  
  BananaGroup.add(Banana);

  console.log(Banana.x)
  console.log(Banana.y)
  console.log(Banana.velocityX)
  console.log(Monkey.x)
}

function SpawnObstacle(){
  Obstacle = createSprite(Monkey.x + 300,370,20,20);
  Obstacle.addImage(ObstacleImage);
  Obstacle.scale = 0.15;
  Obstacle.velocityX = -7;
  Obstacle.lifetime = 150;
  
  //Obstacle.debug = true;
  
  ObstacleGroup.add(Obstacle);
}

function reset(){
  ObstacleGroup.destroyEach();
  BananaGroup.destroyEach();
  Score = 0;
  Monkey.changeAnimation("Running", MonkeyRunning);
}
