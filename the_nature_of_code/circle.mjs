import { Vector } from './vector.mjs'

export class Circle {
    position;
    velocity;
    acceleration;
    ctx;
    color;
    canvas;

    constructor(ctx, canvas, x, y, color) {
        this.ctx = ctx;
        this.position = new Vector(x, y);
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        this.canvas = canvas;
        this.color = color || "#fff";
    }

    update() {
        this.velocity.limit(5);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    edges() {
        if (this.position.x >= this.canvas.width || this.position.x < 0) {
            this.velocity.x *= -1;
        }

        if (this.position.y >= this.canvas.height || this.position.y <= 0) {
            this.velocity.y *= -1;
        }
    }

    addForce(force) {
    }
}
