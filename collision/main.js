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

const pos = { x: gridCols / 2 * 64, y: gridRows / 2 * 64 };
const r1 = new Rect(pos.x, pos.y, size, size, "black", 8);
const c1 = new Circle(300, 300, 100, 'black');
const c2 = new Circle(undefined, undefined, 30, 'red');

function circleCollision(c1, c2) {
  const radiusSum = c1.radius + c2.radius
  const d = Math.sqrt(Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2))

  return d < radiusSum
}

function circleCollisionStep() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  c1.draw();
  c2.x = mouse.x - canvas.width / 2 / 2;
  c2.y = mouse.y - canvas.height / 2 / 2;

  if (circleCollision(c1, c2)) {
    c1.color = 'rgb(0,0,0,0.5)'
    c2.color = 'rgb(255, 0, 0, 0.5)'
  } else {
    c1.color = 'rgb(0,0,0,1)'
    c2.color = 'rgb(255, 0, 0, 1)'
  }
  c2.draw();
  requestAnimationFrame(() => circleCollisionStep());
}

function rectCollisionStep() {
  r1.mov();

  r1.draw();

  requestAnimationFrame(() => rectCollisionStep());
}

function main() {
  circleCollisionStep();
}

main();
