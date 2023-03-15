const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gridCols = 14;
const gridRows = 10;
const size = 64;

canvas.width = size * gridCols;
canvas.height = size * gridRows;

const mouse = {
  x: 0,
  y: 0
}

const movementKeys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      movementKeys.w.pressed = true;
      break;
    case "a":
      movementKeys.a.pressed = true;
      break;
    case "s":
      movementKeys.s.pressed = true;
      break;
    case "d":
      movementKeys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      movementKeys.w.pressed = false;
      break;
    case "a":
      movementKeys.a.pressed = false;
      break;
    case "s":
      movementKeys.s.pressed = false;
      break;
    case "d":
      movementKeys.d.pressed = false;
      break;
  }
});

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Rect {
  constructor(x, y, w, h, c = "white", s = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.s = s;
    this.og = c;
  }

  get pos() {
    return { x: this.x, y: this.y };
  }

  get speed() {
    return this.s;
  }

  get width() {
    return this.w
  }

  get height() {
    return this.h
  }

  draw() {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  mov() {
    if (movementKeys.a.pressed) {
      this.x += -this.s;
    } else if (movementKeys.d.pressed) {
      this.x += this.s;

    } else if (movementKeys.s.pressed) {
      this.y += this.s;

    } else if (movementKeys.w.pressed) {
      this.y += -this.s;
    }
  }
}

const r1 = new Rect(64, 64, size, size, "black", 8);

const c2 = new Circle(undefined, undefined, 30, 'red');

const circles = [
  new Circle(300, 300, 100, 'black'),
  new Circle(600, 300, 30, 'black'),
  new Circle(100, 100, 20, 'black')
]

const rectangles = [
  new Rect(gridCols * 64 / 2, gridRows * 64 / 2, size, size, "red"),
  new Rect(gridCols * 64 / 3, gridRows * 64 / 2, size, size, "red"),
  new Rect(gridCols * 64 / 4, gridRows * 64 / 2, size, size, "red"),
  new Rect(gridCols * 64 / 6, gridRows * 64 / 2, size, size, "red"),
  new Rect(gridCols * 64 / 12, gridRows * 64 / 2, size, size, "red"),
]

function circleCollision(c1, c2) {
  const radiusSum = c1.radius + c2.radius
  const d = Math.sqrt(Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2))

  return d < radiusSum
}

function circleCollisionStep() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  c2.x = mouse.x - canvas.width / 2 / 2;
  c2.y = mouse.y - canvas.height / 2 / 2;

  for (let circle of circles) {
    circle.draw()
  }

  for (let circle of circles) {
    if (circleCollision(circle, c2)) {
      circle.color = 'rgb(0,0,0,0.5)'
      c2.color = 'rgb(255, 0, 0, 0.5)'
      break
    } else {
      circle.color = 'rgb(0,0,0,1)'
      c2.color = 'rgb(255, 0, 0, 1)'
    }
  }

  c2.draw();
  requestAnimationFrame(() => circleCollisionStep());
}

function rectCollision(r1, r2) {
  return r1.x <= r2.x + r2.w &&
    r1.x + r1.w >= r2.x &&
    r1.y <= r2.y + r2.w &&
    r1.y + r1.w >= r2.y

}

function rectCollisionStep() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  r1.mov();

  for (let rec of rectangles) {
    rec.draw();
  }

  for (let rec of rectangles) {
    if (rectCollision(r1, rec)) {
      r1.c = 'rgb(0,0,0,0.5)'
      rec.c = 'rgb(255,0,0,0.5)'
    }
    else {
      r1.c = r1.og
      rec.c = rec.og
    }
  }

  r1.draw();

  requestAnimationFrame(() => rectCollisionStep());
}

function main() {
  rectCollisionStep();
}

main();
