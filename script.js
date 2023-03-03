canvas = document.getElementById("gameRoot")
ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 600

let hp = 3
let level = 1
let points = 0

// add move platform by keyboard
let platform = {
    x: 0,
    y: 580,
    width: canvas.width * 0.25,
    height: 15,
    color: "red",
    draw: function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
canvas.addEventListener("mousemove", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    if(x > (platform.width/2)-10 && x < (canvas.width-platform.width/2)+10) 
        platform.x = x - platform.width / 2
})

// add move ball to platform (x) before click
let ball = {
    x: canvas.width / 2,
    y: 500,
    changeX: 1,
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
        if (this.y + this.changeY > platform.y && this.y + this.changeY < platform.y + this.changeY+1 && this.x + this.changeX > platform.x && this.x + this.changeX < platform.x + platform.width) {
            this.changeX = (this.x - (platform.x + platform.width / 2)) / 10
            this.changeY = (Math.sqrt((50+level)-this.changeX*this.changeX)) * -1 // pitagoras
        }
    },
    move: function() {
        if(this.canMove){
            this.x = this.x + this.changeX
            this.y = this.y + this.changeY
        }
    },
    resetBall: function() {
        this.x = canvas.width / 2
        this.y = 500
        this.canMove = false
        this.changeX = Math.floor(Math.random()*10)
        this.changeY = -5
    },
    floorCollision: function() {
        if (this.y + this.changeY > canvas.height) {
            this.resetBall()
            hp--
        }
    }
}

canvas.addEventListener("click", function(event) {
    ball.canMove = true
})

let bricks = {
    "white": 50,
    "orange": 60,
    "aqua": 70,
    "green": 80,
    "red": 90,
    "blue": 100,
    "pink": 110,
    "yellow": 120,
}

let stage = {
    bricksNumber: level,
    brickHeight: 100,
    brickWidth: canvas.width / (level/3),
    bricks: [],
    setBricks: function() {
        for (let i = 0; i < this.bricksNumber; i++){
            const keys = Object.keys(bricks);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            let brickX;
            let brickY;
            if(i < level/3) {
                brickX = this.brickWidth * i
                brickY = 0
            } else if (i < level/3*2) {
                brickX = this.brickWidth * (i - level/3)
                brickY = this.brickHeight
            } else {
                brickX = this.brickWidth * (i - level/3*2)
                brickY = this.brickHeight*2
            }
            this.bricks.push({
                x: brickX,
                y: brickY,
                color: randomKey
            })
        }
    },
    draw: function() {
        for (let i = 0; i < this.bricks.length; i++) {
            ctx.fillStyle = this.bricks[i].color
            ctx.fillRect(this.bricks[i].x, this.bricks[i].y, this.brickWidth, this.brickHeight)
        }
    },
    brickCollision: function() {
        for (let i = 0; i < this.bricks.length; i++) {
            if (ball.y + ball.changeY > this.bricks[i].y && ball.y + ball.changeY < this.bricks[i].y + this.brickHeight && (ball.x < this.bricks[i].x + this.brickWidth && ball.x > this.bricks[i].x ) ) {
                ball.changeY = -ball.changeY
                points += bricks[this.bricks[i].color]
                this.bricks.splice(i, 1)
                if(this.bricks.length == 0) {
                    level++
                    this.bricksNumber = level
                    this.brickWidth = canvas.width / (level/3)
                    this.bricks = []
                    this.setBricks()
                    ball.resetBall()
                }
            }
            if (ball.x + ball.changeX > this.bricks[i].x && ball.x + ball.changeX < this.bricks[i].x + this.brickWidth && (ball.y < this.bricks[i].y + this.brickHeight && ball.y > this.bricks[i].y )){
                ball.changeX = -ball.changeX
                this.bricks.splice(i, 1)
                if(this.bricks.length == 0) {
                    level++
                    this.bricksNumber = level
                    this.brickWidth = canvas.width / (level/3)
                    this.bricks = []
                    this.setBricks()
                    ball.resetBall()
                }
            }
        }
    }
}
stage.setBricks()

function checkHp(){
    if(hp < 0) {
        if(localStorage.getItem("highscore") == undefined){
            localStorage.setItem("highscore", points)
        }else if(localStorage.getItem("highscore") < points){
            localStorage.setItem("highscore", points)
        }
        localStorage.setItem("lastscore", points)
        window.location.href = "gg.html"
    }
}

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    platform.draw()
    ball.draw()
    stage.draw()

    document.getElementById("hp").innerHTML = "HP: " + hp
    document.getElementById("level").innerHTML = "Poziom: " + level
    document.getElementById("score").innerHTML = "Punkty: " + points
}
let update = () => {
    ball.move()
    ball.wallCollision()
    ball.platformCollision()
    ball.floorCollision()
    stage.brickCollision()
    checkHp()
}

let updateInterval = setInterval(update, 15)
let drawInterval = setInterval(draw, 15)

