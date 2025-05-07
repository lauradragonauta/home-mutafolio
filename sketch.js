let particles = [];
const numParticles = 800;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  clear;
  orbitControl(); // permite rotar suavemente con el mouse
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.001);
  
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-300, 300));
    this.vel = p5.Vector.random3D().mult(0.5);
    this.acc = createVector(0, 0, 0);
    this.size = random(2, 5);
    this.gray = random(50, 200);
  }

  update() {
    let mouse = createVector((mouseX - width / 2), (mouseY - height / 2), 0);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag();
    let mouseRadius = 200; // área de influencia
  
    if (d < mouseRadius) {
      dir.normalize();
      let strength = map(d, 0, mouseRadius, 1.5, 0.1); // más fuerza cerca, menos lejos
      dir.mult(strength);
      this.acc = dir;
    } else {
      this.acc.mult(0); // sin influencia
    }
  
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
  }
  

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    fill(this.gray);
    sphere(this.size);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
