import { Vector } from './vector.mjs'
import { Circle } from './circle.mjs'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 600;

const ORIGIN = new Vector(canvas.width / 2, canvas.height / 2)

const circle = new Circle(ctx, ORIGIN.x, ORIGIN.y)

ctx.fillStyle = "#fff";
circle.velocity.mult(4);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circle.acceleration = new Vector(randomNumber(-2, 2), randomNumber(-2, 2));
  circle.velocity.add(circle.acceleration);

  if (circle.position.x >= canvas.width || circle.position.x <= 0)
    circle.velocity.x *= -1;

  if (circle.position.y >= canvas.height || circle.position.y <= 0)
    circle.velocity.y *= -1;

  circle.position.add(circle.velocity);
  circle.velocity.limit(2);

  circle.update()

  requestAnimationFrame(update)
}

update()
