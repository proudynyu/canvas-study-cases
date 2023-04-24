export class Vector {
  direction;
  x;
  y;
  ctx;

  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, 1, 0, 2*Math.PI)
    this.ctx.fill()
    this.ctx.closePath()
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  mag() {
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) )
  }

  distance(vector) {
    return Math.sqrt(
      Math.pow(vector.x - this.x, 2) +
      Math.pow(vector.y - this.y, 2)
    )
  }

  normalize() {
    const mag = this.mag();

    if (mag !== 0 && mag !== 1) {
      this.div(mag);
    }
    return this;
  }

  limit(scalar) {
    if (this.mag() > scalar) {
      this.normalize();
      this.mult(scalar);
    }
    return this;
  }
}
