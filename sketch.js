const Bodies = Matter.Bodies;
const Body = Matter.Body;
const World = Matter.World;
const Engine = Matter.Engine;
var world, engine;
var pegs = [];
var slits = [];
var ball;
var gameState = "Oscillating";

function setup() {
  createCanvas(1360,650);
  document.getElementById("defaultCanvas0").style.border = "1px solid black";
  document.getElementById("defaultCanvas0").style.position = "absolute";
  document.getElementById("defaultCanvas0").style.left = "50%";
  document.getElementById("defaultCanvas0").style.marginLeft = "-680px";
  engine = Engine.create();
  world = engine.world;
  ball = new Ball();
  for (let row = 50; row < 500; row+=57.5) {
        for (let column = 10; column < 1350; column+=35+Math.random()*15) {
          var x=column;
          if (row%57.5==0) {x-=(8+Math.random()*5);}
          else {x+=(7+Math.random()*6);}
          pegs.push(new Peg(x,row));
        }
  }
  World.add(world, Bodies.rectangle(680,650,1360,20, {isStatic:true}));
  World.add(world, Bodies.rectangle(0,325,10,650, {isStatic:true}));
  World.add(world, Bodies.rectangle(1360,325,10,650, {isStatic:true}));
  World.add(world, Bodies.rectangle(680,0,1360,10, {isStatic:true}));
  window.addEventListener("keydown", dropball);
  for (let x = 0; x < 1360; x+=200) {
    var slit = Bodies.rectangle(x,550,20,200, {isStatic:true});
    World.add(world, slit);
    slits.push(slit);
  }
  world.gravity.y=0.6;
}

function draw() {
  Engine.update(engine);
  background(255,255,255);
  pegs.forEach((peg, index)=> {
    peg.update();
  });
  ball.update();
  slits.forEach((slit, i)=>{push();fill(0);rect(slit.position.x, slit.position.y, 20,200);pop();})
  if (gameState == "Oscillating") {
    text("Press Space To Drop", 600, 500);
  }
}

function dropball(e) {
  if (e.key == " ") {
  gameState="Falling";}
}