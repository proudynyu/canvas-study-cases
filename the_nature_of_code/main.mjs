import { Vector } from './vector.mjs'
import { Circle } from './circle.mjs'


const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 600;

const SIZE = 10
const ORIGIN = new Vector(canvas.width / 2, canvas.height / 2)

const vectorPoints = []
for (let i = 0; i < canvas.width; i+=SIZE) {
  for (let j = 0; j < canvas.height; j+=SIZE) {
    vectorPoints.push(new Vector(i, j, ctx))
  }
}

const circle = new Circle(ctx)

for (const vec of vectorPoints) {
  ctx.fillStyle = "red"
  
  if(vec.distance(ORIGIN) <= 350 && vec.distance(ORIGIN) >= 150)
    ctx.fillStyle = "yellow"

  if(vec.distance(ORIGIN) > 350)
    ctx.fillStyle = "green"

  if (vec.x === ORIGIN.x && vec.y === ORIGIN.y)
    ctx.fillStyle = "white"
  
  vec.draw()
}

ctx.save();

ctx.fillStyle = "#fff";
function update() {
  circle.update()

  requestAnimationFrame(update)
}

update()
