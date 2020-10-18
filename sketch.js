//Create variables here
var dog,happydog,milkImg,foodS,foodStock,database;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  dog = loadImage("images/Dog.png");
  happydog = loadImage("images/happydog.png");
  
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  var DogSprite=createSprite(250,250,50,50);
  DogSprite.addImage(dog);
  DogSprite.scale = 0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj = new Food(50,50,20,20);
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(46,139,87);
  
  foodObj.display();
  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12 +"PM",350,30);
  }
  else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+lastFed + "AM",350,30);
  }
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  });
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })  
}



