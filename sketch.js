let particles = [];
const numParticles = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(255, 254, 252, 0);

  
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(
      random(-width / 2, width / 2),
      random(-height / 2, height / 2),
      0 // todas en el mismo plano Z
    );
    this.vel = p5.Vector.random2D().mult(0.5); // solo movimiento 2D
    this.acc = createVector(0, 0, 0);
    this.size = random(2, 5);
    this.gray = random(50, 200);
  }

  update() {
    let mouse = createVector(mouseX - width / 2, mouseY - height / 2, 0);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag();
    let mouseRadius = 200;

    if (d < mouseRadius) {
      dir.normalize();
      let strength = map(d, 0, mouseRadius, 1.5, 0.1);
      dir.mult(strength);
      this.acc = dir;
    } else {
      let angle = noise(this.pos.x * 0.002, this.pos.y * 0.002, frameCount * 0.002) * TWO_PI;
      let flow = createVector(cos(angle), sin(angle), 0); // sin Z
      flow.mult(0.1);
      this.acc = flow;
    }

    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    fill('#6E83EB', 60); // más transparente alpha 60/255
    sphere(this.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}
