import { movementKeys } from './constants.mjs'

export class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    window.context.beginPath();
    window.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    window.context.fillStyle = this.color;
    window.context.fill();
    window.context.closePath();
  }
}

export class Rect {
  constructor(x, y, w, h, c = "black", s = 10) {
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
    window.context.fillStyle = this.c;
    window.context.fillRect(this.x, this.y, this.w, this.h);
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