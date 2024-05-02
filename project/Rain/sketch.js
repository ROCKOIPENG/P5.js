let Rains = [];

let speed;
let sound;

function Rain() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    this.update = function () {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }
    };

    this.show = function () {
        fill(255, 255, 255, 80);
        noStroke();

        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        var r = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);

        var px = map(this.x / this.pz, 0, 1, 0, width);
        var py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        stroke(255, 255, 255, 50);
        line(px, py, sx, sy);
    };
}

function preload() {
    soundFormats("mp3", "ogg");
    sound = loadSound("res/Rainy_Blue.mp3");
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("display", "block");
    for (let i = 0; i < 500; i++) {
        Rains[i] = new Rain();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    speed = map(mouseX, 0, width, 0, 100);
   
    background(32, 61, 120);
    translate(width / 2, height / 2);
    for (let i = 0; i < Rains.length; i++) {
        Rains[i].update();
        Rains[i].show();
    }
}

function mouseClicked() {
    if (sound.isPlaying()) {
    } else {
        sound.play();
        sound.loop();
    }
}
