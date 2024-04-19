let particles = [];
let isFist = false;
let sound;

class Particle {
  constructor(x, y) {
    this.p = createVector(x, y);
    this.v = createVector(random(-1, 1), random(-1, 1));
    this.a = createVector(0, 0);
    this.radius = 1.5;
    //'rgb(155, 155, 148)'
    let color1 = color(225, 225, 35);
    let color2 = color(155, 155, 148);
    this.col = lerpColor(color1, color2, random(1));

  }

  update() {
    this.p.add(this.v);
    this.v.add(this.a);
    this.v.limit(3);

    if (this.p.x + this.radius > width) {
      this.v.x *= -1;
      this.p.x = width - this.radius;
    }

    if (this.p.x - this.radius < 0) {
      this.v.x *= -1;
      this.p.x = this.radius;
    }
    if (this.p.y + this.radius > height) {
      this.v.y *= -1;
      this.p.y = height - this.radius;
    }
    if (this.p.y - this.radius < 0) {
      this.v.y *= -1;
      this.p.y = this.radius;
    }


    if (isFist) {
      let center = createVector(mouseX, mouseY);
      let diff = p5.Vector.sub(center, this.p);
      this.a = diff.div(5000);
      this.a.limit(2);
    } else {
      this.a.x = ((random(0, 100) * 0.01) - 0.5);
      this.a.y = ((random(0, 100) * 0.01) - 0.5);
    }


  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.p.x, this.p.y, this.radius * 2, this.radius * 2);
  }
}
// windowHeight - 5

function preload() {
  soundFormats('mp3', 'ogg');
  sound = loadSound('res/1.mp3');
}

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  sound.loop();
  for (let i = 0; i < 400; i++) {
    let p = new Particle(random(width), random(height));
    particles.push(p);
  }
}

function draw() {
  background(0, frameCount % 70 + 30);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

function mousePressed() {
  isFist = true;

}
function mouseReleased() {
  isFist = false;
}

function mouseClicked() {
  if (sound.isPlaying()) {
  }
  else {
    sound.play();
  }
}
