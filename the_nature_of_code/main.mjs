import { Vector } from './vector.mjs'
import { Circle } from './circle.mjs'

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

const circle = new Circle(ctx, ORIGIN.x, ORIGIN.y, canvas);

ctx.fillStyle = "#fff";

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const mouse = new Vector(mousePosition.x, mousePosition.y);

    mouse
        .sub(circle.position)
        .normalize()
        .div(5);

    circle.acceleration = mouse;
    circle.velocity.add(circle.acceleration);
    circle.position.add(circle.velocity);
    circle.velocity.limit(5);
    circle.update()

    requestAnimationFrame(update)
}

update()
