const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const maxLetters = 600
const fontSize = 16;
let alphabet;
let fallingLetters = [];

class DropLetter {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.letter;
  }

  draw(){
    this.speed = Math.random() * fontSize * (3/4)
    this.letter = getRandomLetter()
    ctx.font = `${fontSize}px serif`;
    ctx.fillStyle = 'green';
    ctx.fillText(this.letter, this.x, this.y)

    this.y+=this.speed;

    if (this.y + fontSize >= canvas.height) {
      this.y = fontSize;
      this.x = Math.random() * canvas.width
    }
  }
}

function generateAlphabet() {
  const arr = []
  for (let i = 33; i <= 126; i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

function getRandomLetter() {
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

function update() {
  if (fallingLetters.length < maxLetters) {
    const x = Math.random() * canvas.width
    const letter = new DropLetter(x, fontSize, getRandomLetter())
    fallingLetters.push(letter)
  }
  
  ctx.fillStyle = 'rgba(0,0,0,0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i of fallingLetters) {
    i.draw()
  }

  requestAnimationFrame(update)
}

function main() {
  alphabet = generateAlphabet();

  update();
}

main();