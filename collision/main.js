const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gridCols = 14
const gridRows = 10
const size = 64

canvas.width = size * gridCols
canvas.height = size * gridRows

const movementKeys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      movementKeys.w.pressed = true;
      break;
    case "a":
      movementKeys.a.pressed = true;
      break;
    case "s":
      movementKeys.s.pressed = true;
      break;
    case "d":
      movementKeys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      movementKeys.w.pressed = false;
      break;
    case "a":
      movementKeys.a.pressed = false;
      break;
    case "s":
      movementKeys.s.pressed = false;
      break;
    case "d":
      movementKeys.d.pressed = false;
      break;
  }
});

class Rect {
  constructor(
    x, y, w, h, c = "white", s = 10
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.s = s;
  }

  get pos() {
    return { x: this.x, y: this.y }
  }

  draw() {
    ctx.fillStyle = this.c
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  mov() {
    if (movementKeys.a.pressed) this.x += -this.s;
    else if (movementKeys.d.pressed) this.x += this.s;
    else if (movementKeys.s.pressed) this.y += this.s;
    else if (movementKeys.w.pressed) this.y += -this.s
  }
}

class Grid {
  constructor(
    size
  ) {
    this.size = size;
  }

  draw() {
    for (let i = 0; i < canvas.width; i += this.size) {
      for (let j = 0; j < canvas.width; j += this.size) {
        ctx.strokeStyle = "#000"
        ctx.strokeRect(i, j, this.size, this.size)
      }
    }
  }
}

class Overworld {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.mapping = [...Array(10)].map(() => Array(14))
  }

  get _m() {
    return this.mapping
  }

  create() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const hasRect = Math.floor(Math.random() * 2)
        if (hasRect) 
          this.mapping[i][j] = new Rect(i * size, j * size, size, size, 'blue')
        else 
          this.mapping[i][j] = 0
      }
    }

    console.log(this.mapping)
  }

  draw() {
    this.mapping.forEach(arr => {
      arr.forEach(obj => {
        if (obj instanceof Rect) obj.draw()
      })
    })
  }

  collision(object1) {
    // this.mapping.forEach(arr => {
    //   arr.forEach(obj => {
    //     if (obj instanceof Rect) {
    //       const isCollinding = 
    //         (object1.pos.x + size >= obj.pos.x) &&
    //         (object1.pos.x <= obj.pos.x + size) &&
    //         (object1.pos.y + size >= obj.pos.y) &&
    //         (object1.pos.y <= obj.pos.y + size)

    //       if (isCollinding) console.log('collinding')
    //     }
    //   })
    // })
  }
}

function collision(object1, object2) {
  return (object1.pos.x + size >= object2.pos.x) &&
    (object1.pos.x <= object2.pos.x + size) &&
    (object1.pos.y + size >= object2.pos.y) &&
    (object1.pos.y <= object2.pos.y + size)
}

const pos = { x: 1 * 64, y: 1 * 64 }
const r1 = new Rect(pos.x, pos.y, size, size, 'black', 8)

const grid = new Grid(size)
const map = new Overworld(gridCols, gridRows)

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  grid.draw()
  map.draw()

  map.collision(r1)
  r1.mov()

  r1.draw();

  requestAnimationFrame(() => step())
}

function main() {
  r1.draw()
  map.create()

  step()
}

main()