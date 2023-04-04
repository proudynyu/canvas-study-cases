import { Circle, Rect } from '../basicShapes.mjs'
import { mouse, movementKeys } from '../movement.mjs'

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

window.context = ctx

const gridCols = 14;
const gridRows = 10;
const size = 64;

canvas.width = size * gridCols;
canvas.height = size * gridRows;

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

const r1 = new Rect(64, 64, size, size, "black", 8);
const c1 = new Circle(undefined, undefined, 30, 'red');

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

  c1.x = mouse.x - canvas.width / 2 / 2;
  c1.y = mouse.y - canvas.height / 2 / 2;

  for (let circle of circles) {
    circle.draw()
  }

  for (let circle of circles) {
    if (circleCollision(circle, c1)) {
      circle.color = 'rgb(0,0,0,0.5)'
      c1.color = 'rgb(255, 0, 0, 0.5)'
      break
    } else {
      circle.color = 'rgb(0,0,0,1)'
      c1.color = 'rgb(255, 0, 0, 1)'
    }
  }

  c1.draw();
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
