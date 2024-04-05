
var backgroundImg, bg;
var invisGround;

var mrMole;
var ledges, ledgesGroup, ledge1, ledge2, ledge3, ledge4;
var worm, wormsGroup;
var invisibleBlockGroup;

var wormsCollected = 0;
var healthBar = 3;


function preload(){
   
  backgroundImg = loadImage("assets/bgImg.jpg");
  ledge1 = loadImage("assets/dirtLedges/dirtLedge1.png");
  ledge2 = loadImage("assets/dirtLedges/dirtLedge2.png");
  ledge3 = loadImage("assets/dirtLedges/dirtLedge3.png");
  ledge4 = loadImage("assets/dirtLedges/dirtLedge4.png");

  blueGem = loadImage("assets/gems/gemBlue.png");
  greenGem = loadImage("assets/gems/gemGreen.png");
  redGem = loadImage("assets/gems/gemRed.png");
  yellowgem = loadImage("assets/gems/gemYellow.png");

  daffodilImg = loadImage("assets/daffodil.png");

  moleStanding = loadImage("assets/mole/mole_sprite_standing.png");

  moleJumpL = loadImage("assets/mole/mole_jump_LEFT.png");
  moleJumpR = loadImage("assets/mole/mole_jump_RIGHT.png");

  moleWalkingL = loadAnimation("assets/mole/mole_walking1_LEFT.png","assets/mole/mole_walking2_LEFT.png");
  moleWalkingR = loadAnimation("assets/mole/mole_walking1_RIGHT.png","assets/mole/mole_walking2_RIGHT.png")

  wormImg = loadImage("assets/worm/worm5.png");
  wormAnim = loadAnimation(
  "assets/worm/worm1.png",
  "assets/worm/worm2.png",
  "assets/worm/worm3.png",
  "assets/worm/worm4.png",
  "assets/worm/worm5.png",
  "assets/worm/worm6.png",
  "assets/worm/worm7.png")

  emptyHealth = loadAnimation("assets/health/emptyHealth.png");
  oneHealth = loadAnimation("assets/health/oneHealth.png");
  twoHealth = loadAnimation("assets/health/twoHealth.png");
  threeHealth = loadAnimation("assets/health/threeHealth.png");
}

function setup() {
  createCanvas(700, 700);

  invisGround = createSprite(350, 680, 700, 20);
  
  bg = createSprite(625, 350, 1500, 1500);
  bg.addImage(backgroundImg);
  bg.velocityY = 1.5

  mrMole = createSprite(250, 600, 50, 50);
  mrMole.addAnimation("walkingL",moleWalkingL);
  mrMole.addAnimation("walkingR", moleWalkingR);
  mrMole.scale = 1.5;

  healthBar = createSprite(100, 50, 50, 50);
  healthBar.addAnimation("empty", emptyHealth);
  healthBar.addAnimation("one", oneHealth);
  healthBar.addAnimation("two", twoHealth);
  healthBar.addAnimation("full", threeHealth)
  healthBar.changeAnimation("full", threeHealth);

  // mrMole.addImage(moleStanding);
  // mrMole.scale = 1.5

  wormsGroup = new Group();
  daffodilsGroup = new Group();
  ledgesGroup = new Group();
  invisibleBlockGroup = new Group();
   
}

function draw() {
  background("black");
  
  if(bg.y > 420){
    bg.y = 350;
  }

  //movement
  if(keyDown("LEFT_ARROW")){
    mrMole.x -= 5;
    mrMole.changeAnimation("walkingL");
  }

  if(keyDown("RIGHT_ARROW")){
    mrMole.x +=5;
    mrMole.changeAnimation("walkingR");
  }

  if(keyDown("UP_ARROW")){
    mrMole.velocityY = -10;
  }

  if(mrMole.x>700){
    mrMole.x = 5;
  }
  if(mrMole.x<0){
    mrMole.x = 695;
  }

  mrMole.velocityY += 0.5;


  mrMole.collide(invisGround);
  
  dirtLedges();

  mrMole.collide(ledgesGroup);

  daffodils();
  collectWorms();
  collectDaffodils();

  drawSprites();
}

function dirtLedges(){
  if(frameCount%60 === 0){

    ledges = createSprite(Math.round(random(20, 680)), 0, 100, 36);
    ledges.velocityY = 1.5;

    var randLedges = Math.round(random(1,4))
    switch(randLedges){
      case 1 : ledges.addImage(ledge1)
      break;
      case 2 : ledges.addImage(ledge2)
      break;
      case 3 : ledges.addImage(ledge3)
      break;
      case 4 : ledges.addImage(ledge4)
      break;
      default:
        break;
    }

    ledges.debug = true;
    ledges.setCollider("rectangle", 0, 0, 100, 36);

    var randWorm = Math.round(random(1,3));
    if(randWorm === 1){
      var worm = createSprite(ledges.x, ledges.y-25);
      //worm.addImage(wormImg);
      worm.addAnimation("wormMoving",wormAnim);
      worm.scale = 0.3;

      worm.velocityY = 1.5;

      worm.depth = ledges.depth;

      wormsGroup.add(worm);
      wormsGroup.setLifetimeEach(400);
    }


    ledges.depth = mrMole.depth;
    mrMole.depth += 1;

    mrMole.depth = healthBar.depth;
    healthBar.depth += 1;

    ledgesGroup.add(ledges);
    ledgesGroup.setLifetimeEach(400);

  }
}

function daffodils(){
  if(frameCount%90 === 0){
    daffodil = createSprite(Math.round(random(15, 685)), 0, 20, 20);
    daffodil.addImage(daffodilImg);
    daffodil.scale = 0.1;

    daffodil.velocityY = 1.5;
    
    daffodilsGroup.add(daffodil);
    daffodilsGroup.setLifetimeEach(400);

    daffodil.depth = ledges.depth;
  }
}

function collectWorms(index){
  mrMole.overlap(wormsGroup, function(collector, collected){
    wormsCollected += 1;
    collected.remove();
  });
}

function collectDaffodils(index){
  mrMole.overlap(daffodilsGroup, function(collector, collected){
    healthBar -= 1;
    collected.remove();
  });
}
 
 