import { Vector } from './vector.mjs'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 600;
canvas.height = 800;

const p1 = {
  x: (canvas.width / 2 / 2),
  y: (canvas.height / 2 + canvas.height / 2 / 2)
};

const p2 = {
  x: p1.x + canvas.width / 2,
  y: p1.y
};

const p3 = {
  x: canvas.width / 2,
  y: canvas.height / 2 / 2
}

const initialPoints = [p1, p2, p3];

let choosePoint;
let lastPoint;
let midpoint;

function isInsideTriangle(x, y) {
  const point = { x, y }
  const AB = Vector.newVector(p1, p2);
  const BC = Vector.newVector(p2, p3);
  const CA = Vector.newVector(p3, p1);

  const AP = Vector.newVector(point, p1);
  const BP = Vector.newVector(point, p2);
  const CP = Vector.newVector(point, p3);

  const crossABP = Vector.crossVec(AB, AP);
  const crossBCP = Vector.crossVec(BC, BP);
  const crossCAP = Vector.crossVec(CA, CP);

  return (crossABP >= 0 && crossBCP >= 0 && crossCAP >= 0);
}

function generatePointInsideTriangle() {
  let point;

  while (true) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    if (isInsideTriangle(x, y)) {
      point = { x, y };
      break;
    }
  }

  return point
}

function generateFirstThreePoints() {
  for (let i of initialPoints) {
    ctx.fillRect(i.x, i.y, 1, 1)
  }

  lastPoint = generatePointInsideTriangle()
  ctx.fillRect(lastPoint.x, lastPoint.y, 1, 1)
}

function step() {
  choosePoint = initialPoints[Math.floor(Math.random() * 3)]

  midpoint = Vector.midpoint(choosePoint, lastPoint)

  ctx.fillRect(midpoint.x, midpoint.y, 1, 1)

  lastPoint = midpoint;

  requestAnimationFrame(step)
}

function main() {
  generateFirstThreePoints()
  step()
}

main()
