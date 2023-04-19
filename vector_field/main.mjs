const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 600;

const SIZE = 10

class Vector {
  magnitude;
  direction;
  x;
  y;

  constructor(x, y, magnitude, direction) {
    this.x = x;
    this.y = y;
    this.magnitude = magnitude;
    this.direction = direction;
  }
}

ctx.fillStyle = "#000"
for (let i = 0; i < canvas.width; i+=SIZE) {
  for (let j = 0; j < canvas.height; j+=SIZE) {
    ctx.beginPath()
    ctx.arc(i, j, 1, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}
