canvas = document.getElementById("gameRoot")
ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 600

let hp = 3;

// add move platform by keyboard
let platform = {
    x: 0,
    y: 550,
    width: canvas.width * 0.25,
    height: 25,
    color: "red",
    draw: function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
canvas.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    platform.x = x - platform.width / 2
})

// add move ball to platform (x) before click
let ball = {
    x: canvas.width / 2,
    y: 500,
    changeX: -5,
    changeY: -5,
    color: "blue",
    canMove: false,
    draw: function() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    },
    wallCollision: function() {
        if (this.x + this.changeX > canvas.width || this.x + this.changeX < 0) {
            this.changeX = -this.changeX
        }
        if (this.y + this.changeY < 0) {
            this.changeY = -this.changeY
        }
    },
    platformCollision: function() {
        if (this.y + this.changeY > platform.y && this.x + this.changeX > platform.x && this.x + this.changeX < platform.x + platform.width) {
            this.changeY = -this.changeY
            this.changeX = (this.x - (platform.x + platform.width / 2)) / 10
        }
    },
    move: function() {
        if(this.canMove){
            this.x = this.x + this.changeX
            this.y = this.y + this.changeY
        }
    },
    floorCollision: function() {
        if (this.y + this.changeY > canvas.height) {
            this.x = canvas.width / 2
            this.y = 500
            this.canMove = false
            hp--
            this.changeX = -5
            this.changeY = -5
        }
    }
}

canvas.addEventListener("click", function(event) {
    ball.canMove = true
})

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    platform.draw()
    ball.draw()
    document.getElementById("hp").innerHTML = "HP: " + hp
}
let update = () => {
    ball.move()
    ball.wallCollision()
    ball.platformCollision()
    ball.floorCollision()
}

let updateInterval = setInterval(update, 15)
let drawInterval = setInterval(draw, 15)

