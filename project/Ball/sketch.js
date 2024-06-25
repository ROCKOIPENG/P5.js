let balls = [];
let number = 0;

function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('res/listen.mp3');
}

function setup() {
    let divElement = document.getElementById("window");
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(divElement);
    canvas.style("display", "block");
    noCursor();
    Creat_Ball(0);
}

function Creat_Ball(i) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let radius = random(10, 30);
    let dx = random(-10, 10);
    let dy = random(-10, 10);
    let Rcolor = random(0, 255);
    let Gcolor = random(0, 255);
    let Bcolor = random(0, 255);
    balls[i] = new Ball(x, y, radius, dx, dy, Rcolor, Gcolor, Bcolor);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function draw() {
    background(0, 90);
    //使用循环调用每个小球的方法
    fill(255);
    textSize(30);
    text("每碰一次两侧的墙就增加一个球(上限1000)", 10, 10, 100, 100);
    textSize(20);
    text("当前球的个数:" + balls.length, 10, 50, 50, 100)

    for (let i = 0; i < balls.length; i++) {
        if (balls.length <= number && number < 1000) {
            Creat_Ball(balls.length);
        }
        // balls[i].draw(); balls[i].move(); balls[i].bounce();
    }
    for (let i = 0; i < balls.length; i++) {

        balls[i].draw();

    }
    for (let i = 0; i < balls.length; i++) {

        balls[i].move();

    }
    for (let i = 0; i < balls.length; i++) {

        balls[i].bounce();
    }
}

function mouseClicked() {
    if (sound.isPlaying()) {
    }
    else {
        sound.play();
        sound.loop();
    }
}

class Ball {
    constructor(x, y, radius, dx, dy, Rcolor, Gcolor, Bcolor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;// 水平方向的速度
        this.dy = dy;// 垂直方向的速度
        this.Rcolor = Rcolor;
        this.Gcolor = Gcolor;
        this.Bcolor = Bcolor;
    }

    draw() {
        noStroke();
        fill(this.Rcolor, this.Gcolor, this.Bcolor);
        circle(this.x, this.y, this.radius * 2);// 绘制小球
    }

    move() {
        this.dy += 3;

        this.x += this.dx;
        this.y += this.dy;
    }

    bounce() {
        if (this.x < this.radius || this.x + this.radius > width) {

            this.dx = -this.dx;//在水平方向反弹

            number++;

        }
        if (this.y < this.radius || this.y + this.radius > height) {
            this.dy = -this.dy;//在垂直方向反弹
            if (this.y + this.radius > height - 1) {
                this.y = height - this.radius;
                this.dx *= 0.98;
            }
        }
    }
}




