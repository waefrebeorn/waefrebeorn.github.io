// Pong game
// Ensure duckOpen is available if not already defined (e.g. from duck.js)
// For this file, it's assumed duckOpen will be globally available from duck.js
// and playQuack from main.js

// Canvas and context setup
const canvas = document.getElementById('pongCanvas');
let ctx; // Declare ctx here
if (canvas) {
    ctx = canvas.getContext('2d');
} else {
    console.error("pongCanvas not found. Pong game will not initialize.");
    // Potentially, you might want to stop script execution here or handle this case
}

// Game variables
let ballX, ballY, ballSpeedX, ballSpeedY, paddle1Y, paddle2Y;
const paddleHeight = 100;
const paddleWidth = 10;
const ballSize = 20;

// Initialize variables that depend on canvas dimensions
function initializeGameVariables() {
    if (!canvas) return; // Don't initialize if canvas isn't there

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
    paddle1Y = canvas.height / 2 - paddleHeight / 2; // Center paddle
    paddle2Y = canvas.height / 2 - paddleHeight / 2; // Center paddle
}

function drawRect(x, y, width, height, color) {
    if (!ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawDuck(x, y) {
    if (!ctx) return;
    const duckImg = new Image();
    // Ensure duckOpen is defined (should be loaded from duck.js)
    if (typeof duckOpen !== 'undefined') {
        duckImg.src = duckOpen;
        ctx.drawImage(duckImg, x - ballSize / 2, y - ballSize / 2, ballSize, ballSize);
    } else {
        // Fallback or error if duckOpen is not available
        // console.error("duckOpen is not defined. Cannot draw duck.");
        drawRect(x - ballSize / 2, y - ballSize / 2, ballSize, ballSize, 'yellow'); // Fallback
    }
}

function movePaddles() {
    if (!canvas) return;
    const paddleSpeed = 6;
    // AI for paddle1 (left)
    if (paddle1Y + paddleHeight / 2 < ballY) {
        paddle1Y += paddleSpeed;
    } else if (paddle1Y + paddleHeight / 2 > ballY) {
        paddle1Y -= paddleSpeed;
    }

    // AI for paddle2 (right)
    if (paddle2Y + paddleHeight / 2 < ballY) {
        paddle2Y += paddleSpeed;
    } else if (paddle2Y + paddleHeight / 2 > ballY) {
        paddle2Y -= paddleSpeed;
    }

    // Clamp paddles to canvas boundaries
    paddle1Y = Math.max(0, Math.min(canvas.height - paddleHeight, paddle1Y));
    paddle2Y = Math.max(0, Math.min(canvas.height - paddleHeight, paddle2Y));
}

function resetBall() {
    if (!canvas) return;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change direction
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 5; // Randomize Y direction
}

function updateGame() {
    if (!canvas) return;
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision (top/bottom)
    if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
        ballSpeedY = -ballSpeedY;
        if (typeof playQuack === 'function') playQuack();
    }

    // Paddle collision
    // Left paddle (paddle1)
    if (ballX - ballSize / 2 < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.25; // Adjust rebound angle based on hit position
            if (typeof playQuack === 'function') playQuack();
        } else if (ballX - ballSize / 2 < 0) { // Ball passed paddle
            resetBall();
        }
    }

    // Right paddle (paddle2)
    if (ballX + ballSize / 2 > canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.25; // Adjust rebound angle
            if (typeof playQuack === 'function') playQuack();
        } else if (ballX + ballSize / 2 > canvas.width) { // Ball passed paddle
            resetBall();
        }
    }

    movePaddles();
}

function drawGame() {
    if (!ctx || !canvas) return;
    // Draw background (semi-transparent to show video)
    drawRect(0, 0, canvas.width, canvas.height, 'rgba(0,0,0,0.5)');
    // Draw paddles
    drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#fff'); // Left paddle
    drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#fff'); // Right paddle
    // Draw ball (duck)
    drawDuck(ballX, ballY);
}

function gameLoop() {
    if (!canvas || !ctx) {
        // console.warn("Canvas or context not available, stopping game loop.");
        return;
    }
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Initialize and start the game when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (canvas) {
        initializeGameVariables(); // Initialize game variables after canvas is surely available
        gameLoop(); // Start the game loop
    }
});
