const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const WIDTH = canvas.width
const HEIGTH = canvas.height

function randint(n) {
    // 0 ~ (n - 1)
    return Math.floor(Math.random() * n)
}

function selectColor(color) {
    ctx.beginPath()
    ctx.fillStyle = color.toString()
    ctx.strokeStyle = color.toString()
}

//원 그리기
function Circle(pos, r, color) {
    selectColor(color)
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2, false)
    ctx.fill()
}

function getSym(n) {
    if (n < 0) {
        return -1
    }
    return +1
}

//벡터 클래스
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    set(x, y) {
        this.x = x
        this.y = y
    }
    add(b) {
        this.x += b.x
        this.y += b.y
    }
    clone() {
        return new Vector(this.x, this.y)
    }
}

//색깔 클래스
class RGB {
    constructor(r, g, b, a = 1) {
        this.R = r
        this.G = g
        this.B = b
        this.A = a
    }
    toString() {
        return `rgb(${this.R}, ${this.G}, ${this.B}, ${this.A})`
    }
    alpha(value) {
        let A = value
        if (value < 0) {
            A = 0
        }
        return new RGB(this.R, this.G, this.B, A)
    }
}

const PALETTE = [
    new RGB(255, 104, 132),   //RED
    new RGB(107, 141, 255)  //BLUE
]

class Organism {
    constructor(isSuper) {
        this.pos = new Vector(randint(WIDTH), randint(HEIGTH))
        this.color = PALETTE[1]
        if (isSuper) {
            this.color = PALETTE[0]
        }
        this.vel = new Vector(randint(2) + 1, randint(2) + 1)
    }
    get x() {
        return this.pos.x
    }
    get y() {
        return this.pos.y
    }
    processWall() {
        if (this.pos.x < 0) {
            this.pos.x = 0
            this.vel.x *= -1
        } else if (this.pos.x + this.radius > WIDTH) {
            this.pos.x = WIDTH - this.radius
            this.vel.x *= -1
        }
        if (this.pos.y < 0) {
            this.pos.y = 0
            this.vel.y *= -1
        } else if (this.pos.y + this.radius > WIDTH) {
            this.pos.y = WIDTH - this.radius
            this.vel.y *= -1
        }
    }
    move() {
        this.pos.add(this.vel)
        this.processWall()
    }
    draw() {
        Circle(this.pos, 10, this.color)
    }
}

let RenderList = [
]

function createObject(isSuper) {
    RenderList.push(new Organism(isSuper))
}

createObject(true)

let frame = 0
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGTH)
    RenderList.forEach(i => {
        i.move()
        i.draw()
    })

    frame++
    requestAnimationFrame(render)
}

render()