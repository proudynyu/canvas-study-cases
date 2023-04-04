export class Vector {
  static vecDistance(p1, p2) {
    return Math.sqrt(
      Math.pow(p1.x + p2.x, 2),
      Math.pow(p1.y + p2.y, 2)
    )
  }

  static midpoint(p1, p2) {
    const v = Vector.scalarMultVect(0.5, Vector.sumVector(p1, p2))
    return {
      x: v.x,
      y: v.y
    }
  }

  static newVector(p1, p2) {
    return {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    }
  }

  static crossVec(p1, p2) {
    return p1.x * p2.y - p1.y * p2.x
  }

  static sumVector(p1, p2) {
    return {
      x: p1.x + p2.x,
      y: p1.y + p2.y
    }
  }

  static scalarMultVect(num, point) {
    return {
      x: num * point.x,
      y: num * point.y
    }
  }
}