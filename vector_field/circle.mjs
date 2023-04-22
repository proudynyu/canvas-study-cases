import { Vector } from './vector.mjs'

export class Circle {
  position;
  velocity;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.position = new Vector(32, 32);
    this.velocity = new Vector(0,0);
  }

  update() {
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
