const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const gridCols = 14;
const gridRows = 10;
const size = 64;

canvas.width = size * gridCols;
canvas.height = size * gridRows;

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
};

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
  constructor(x, y, w, h, c = "white", s = 10) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.s = s;
  }

  get pos() {
    return { x: this.x, y: this.y };
  }

  get speed() {
    return this.s;
  }

  draw() {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  mov() {
    if (movementKeys.a.pressed) {
      this.collision("right");
    } else if (movementKeys.d.pressed) {
      this.collision("left");
    } else if (movementKeys.s.pressed) {
      this.collision("down");
    } else if (movementKeys.w.pressed) {
      this.collision("up");
    }
  }

  collision(direction) {
    const boundaries = map._m;
    for (let i = 0; i < boundaries.length; i++) {
      for (let j = 0; j < boundaries[i].length; j++) {
        if (boundaries[i][j] instanceof Rect) {
          const obj = boundaries[i][j];

          if (
            direction === "up" &&
            !(this.pos.y + this.speed <= obj.pos.y + size + 10)
          ) {
            this.y += -this.s;
            break;
          }
          // if (direction === 'left' &&!(this.pos.x + this.speed <= obj.pos.x + size + 10)) {
          //   this.x += this.s;
          //   break;
          // }
          if (
            direction === "down" &&
            !(this.pos.y + size + this.speed >= obj.pos.y + 5)
          ) {
            this.y += this.s;
            break;
          }
          // if (direction === 'right' &&!(this.pos.x + size + this.speed <= obj.pos.x + 10)) {
          //   this.x += -this.s;
          //   break;
          // }

          break;
        }
      }
    }
  }
}

class Grid {
  constructor(size) {
    this.size = size;
  }

  draw() {
    for (let i = 0; i < canvas.width; i += this.size) {
      for (let j = 0; j < canvas.width; j += this.size) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(i, j, this.size, this.size);
      }
    }
  }
}

class Overworld {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.mapping = [...Array(rows)].map(() => Array(cols));
  }

  get _m() {
    return this.mapping;
  }

  create() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (i === 0 || j === 0 || i === this.rows - 1 || j === this.cols - 1)
          this.mapping[i][j] = new Rect(j * size, i * size, size, size, "blue");
      }
    }
  }

  draw() {
    this.mapping.forEach((row) => {
      row.forEach((col) => {
        if (col instanceof Rect) {
          col.draw();
        }
      });
    });
  }
}

const pos = { x: 1 * 64, y: 1 * 64 };
const r1 = new Rect(pos.x, pos.y, size, size, "black", 8);

const grid = new Grid(size);
const map = new Overworld(gridCols, gridRows);

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  map.draw();
  grid.draw();

  r1.mov();

  r1.draw();

  requestAnimationFrame(() => step());
}

function main() {
  map.create();
  map.draw();
  grid.draw();

  r1.draw();

  step();
}

main();
