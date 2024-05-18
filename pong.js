const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');

const duckSound = new Audio('quack.mp3');

let paddleWidth = 100;
let paddleHeight = 20;
let ballSize = 20;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddle1X = (canvas.width - paddleWidth) / 2;
let paddle2X = (canvas.width - paddleWidth) / 2;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fill();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballSize / 2 > canvas.width || ballX - ballSize / 2 < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY - ballSize / 2 < 0) {
        if (ballX > paddle1X && ballX < paddle1X + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            duckSound.play();
        } else {
            resetBall();
        }
    }

    if (ballY + ballSize / 2 > canvas.height) {
        if (ballX > paddle2X && ballX < paddle2X + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            duckSound.play();
        } else {
            resetBall();
        }
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
}

function movePaddle() {
    paddle1X += ballSpeedX;
    paddle2X -= ballSpeedX;

    if (paddle1X + paddleWidth > canvas.width || paddle1X < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (paddle2X + paddleWidth > canvas.width || paddle2X < 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawRect(paddle1X, 0, paddleWidth, paddleHeight, '#FFF');
    drawRect(paddle2X, canvas.height - paddleHeight, paddleWidth, paddleHeight, '#FFF');
    drawCircle(ballX, ballY, ballSize / 2, '#FFF');
}

function game() {
    moveBall();
    movePaddle();
    draw();
}

document.getElementById('start-duck-animation').addEventListener('click', function() {
    setInterval(game, 1000 / 60);
});
