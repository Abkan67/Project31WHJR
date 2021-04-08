class Peg {
    constructor(x,y) {
        this.body = Matter.Bodies.circle(x,y,10,{isStatic:true, restitution:2});
        World.add(world, this.body);
    }

    update() {
        this.draw();
    }
    draw() {
        ellipse(this.body.position.x, this.body.position.y,16)
    }
}

class Ball {
    constructor() {
        this.body = Bodies.circle(0,20,6,{restitution:1.2, density:5});
        World.add(world, this.body);
        this.clawX = 0;
        this.clawdx = 1;
    }
    update() {
        if (this.clawX>=680) {this.clawdx-=0.01;} else {this.clawdx+=0.01;}
        this.clawX+=this.clawdx*3;
        if(gameState == "Oscillating") {
        Matter.Body.setPosition(this.body, {x:this.clawX, y:20})
        }
        this.draw();
    }
    draw() {
        push();
        fill("red");
        ellipse(this.body.position.x,this.body.position.y,10);
        pop();
    }
}