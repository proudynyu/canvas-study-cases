import { Vector } from './vector.mjs'

export class Circle {
    position;
    velocity;
    acceleration;
    ctx;
    color;
    canvas;

    constructor(ctx, x, y, canvas, color) {
        this.ctx = ctx;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.canvas = canvas;
        this.color = color || "#fff";
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.velocity.limit(5);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    edges() {
    }
}
