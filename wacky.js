console.log('wacky.js loaded');

let counter = 0;

function incrementCounter() {
    counter++;
    document.getElementById('counter').innerText = 'Counter: ' + counter;
    console.log('Counter incremented: ' + counter);
}

const duckImages = {
    open: 'duck_open.png',
    closed: 'duck_closed.png'
};

let currentDuckState = 'closed';
let isRotating = false;

function changeBackground() {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    console.log('Background changed');
}

function rotateCanvas() {
    const canvas = document.getElementById('pong-game');
    if (!isRotating) {
        isRotating = true;
        canvas.style.transition = 'transform 1s';
        canvas.style.transform = 'rotate(360deg)';
        console.log('Canvas rotated');
        setTimeout(() => {
            canvas.style.transform = '';
            isRotating = false;
        }, 1000);
    }
}

function quackDuck() {
    const duckSound = new Audio('quack.mp3');
    duckSound.play();
    console.log('Duck quacked');
    const canvas = document.getElementById('pong-game');
    if (currentDuckState === 'closed') {
        currentDuckState = 'open';
        canvas.style.backgroundImage = 'url(' + duckImages.open + ')';
    } else {
        currentDuckState = 'closed';
        canvas.style.backgroundImage = 'url(' + duckImages.closed + ')';
    }
}

// Pong game implementation with ducks as the ball and paddles
const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');

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
            quackDuck();
        } else {
            resetBall();
        }
    }

    if (ballY + ballSize / 2 > canvas.height) {
        if (ballX > paddle2X && ballX < paddle2X + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            quackDuck();
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
    console.log('Start Duck Animation clicked');
    setInterval(game, 1000 / 60);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
});
