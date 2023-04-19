const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 600;

ctx.fillStyle = "#000"
ctx.fillRect(canvas.width / 2, canvas.height / 2, 10, 10)

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
