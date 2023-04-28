import { Vector } from './vector.mjs'
import { Circle } from './circle.mjs'

// import { Screen } from './canvas.mjs'
// const canvas = new Screen(800, 600, 'root', 'main')

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 600;

let mousePosition = {
    x: null, y: null
}

window.addEventListener("mousemove", (event) => {
    mousePosition.x = event.clientX - event.target.offsetLeft;
    mousePosition.y = event.clientY - event.target.offsetTop;
})

const ORIGIN = new Vector(canvas.width / 2, canvas.height / 2);
const circle = new Circle(ctx, canvas, ORIGIN.x, ORIGIN.y);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const f = new Vector(-0.1,0);
    circle.acceleration = f

    circle.update();
    circle.edges();
    circle.draw();

    requestAnimationFrame(update);
}

window.addEventListener("DOMContentLoaded", update());
