var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3;

var zombieGroup;

var bullets =100;

var gameState = "fight"

function preload(){

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
heart1Img = loadImage("assets/heart_1.png")
heart2Img = loadImage("assets/heart_2.png")
heart3Img = loadImage("assets/heart_3.png")

shooterImg = loadImage("assets/shooter_2.png")
shooter_shooting= loadImage("assets/shooter_3.png")

zombieImg = loadImage("assets/zombie.png")
bgImg = loadImage("assets/bg.jpeg")

}

function setup() {


  createCanvas(windowWidth,windowHeight);

  //adding the background image 
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale=1.1


  //creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale=0.3
  player.debug = true 
  player.setCollider("rectangle", 0,0, 300,300)


  //creating sprites to depict lives remaining
  heart1= createSprite(displayWidth-150,40,20,20)
  heart1.visible=false
  heart1.addImage("heart1",heart1Img)
  heart1.scale=0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible= false 
  heart2.addImage("heart2", heart2Img)
  heart2,scale=0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3", heart3Img)
  heart3,scale=0.4

  //creating group for zombies
  zombieGroup = new Group();
  bulletGroup=new Group()
}

function draw(){
  background(0);

if(gameState==="fight"){


//moving the player up and down and making the game mobile compatible using touches 
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y=player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y=player.y+30
  }


  //relase bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
bullets= createSprite(displayWidth-1150,player,y-30,20,10)
bullets.velocityX=20

bulletGroup.add(bullet)
player.depth =bullet.depth
player.depth = player.depth+2
bullets= bullets-1
    player.addImage(shooter_shooting)

  }

  //player goes back to orginal standing image once we stop pressing the space bar 
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }

  
  
  
  //go to gameState "bullet" when player runs out bullets
  if(bullets==0){
    gameState = "bullet"

  }
  
  //destory the zombie when bullet touches it 
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0; i<zombieGroup.length;i++){

      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.detroyEach()

      }
    }
  }
  //destroy zoombie when player touches it
  if(zombieGroup.isTouching(player)){
 

    for(var i=0;i<zombieGroup.length;i++){     
         
     if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy()
          } 
    }
   } 
  
  //calllin this function to spawn zombies 
  enemy();

   drawSprites();
  }



 //destroy Zombies and player and display a message in gamestated"Lost"
 if(gameState == "lost"){

  textSize(100)
  FileList("red")
  text("You Lost", 400,400)
  zombieGroup.detroyEach();
  player.destroy();

 }
 
//destroy zombie and player and display message "you Won" 
else if(gameState == "won"){

  textSize(100)
  FileList("yellow")
  text("You Won",400,400)
  zombieGroup.destroyEach();
  player.destroy

}  
 
 //destroy zombies, player and bullets and diaplay message in gamstate"bullet"
 else if(gameState=="bullet"){

  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!", 470,410)
  zombieGroup.destroyEach();
  player,destroy();
  bulletGroup.destroyEach();
  
 }

//creating function to spawn zombies 
  function enemy(){
    if(frameCount%50===0){

      //giving random x and y position for the zombies to appear 
      zombie = createSprite(random(500,1100),random(100,500),40,40)

      zombie.addImage(zombieImg)
      zombie.scale = 0.15
      zombie.velocityX = -3
      zombie.debug= true
      zombie.setCollider("rectangle",0,0,400,400)

      zombie.lifetime = 400
zombieGroup.add(zombie)
    }
  }
}