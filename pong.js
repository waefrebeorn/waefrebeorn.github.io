const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');

const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');
const duckSound = new Audio('data:audio/ogg;base64,T2dnUwACAAAAAAAAAAAV7nByAAAAAIC07h8BHgF2b3JiaXMAAAAAARErAAAAAAAAIE4AAAAAAACZAU9nZ1MAAAAAAAAAAAAAFe5wcgEAAAD3DzPZC0X///////////+1A3ZvcmJpczUAAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDE4MDMxNiAoTm93IDEwMCUgZmV3ZXIgc2hlbGxzKQAAAAABBXZvcmJpcxJCQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBADIAAAYhiGH3knMkFOQSSYpVcw5CKH1DjnlFGTSUsaYYoxRzpBTDDEFMYbQKYUQ1E45pQwiCENInWTOIEs96OBi5zgQGrIiAIgCAACMQYwhxpBzDEoGIXKOScggRM45KZ2UTEoorbSWSQktldYi55yUTkompbQWUsuklNZCKwUAAAQ4AAAEWAiFhqwIAKIAABCDkFJIKcSUYk4xh5RSjinHkFLMOcWYcowx6CBUzDHIHIRIKcUYc0455iBkDCrmHIQMMgEAAAEOAAABFkKhISsCgDgBAIMkaZqlaaJoaZooeqaoqqIoqqrleabpmaaqeqKpqqaquq6pqq5seZ5peqaoqp4pqqqpqq5rqqrriqpqy6ar2rbpqrbsyrJuu7Ks256qyrapurJuqq5tu7Js664s27rkearqmabreqbpuqrr2rLqurLtmabriqor26bryrLryratyrKua6bpuqKr2q6purLtyq5tu7Ks+6br6rbqyrquyrLu27au+7KtC7vourauyq6uq7Ks67It67Zs20LJ81TVM03X9UzTdVXXtW3VdW1bM03XNV1XlkXVdWXVlXVddWVb90zTdU1XlWXTVWVZlWXddmVXl0XXtW1Vln1ddWVfl23d92VZ133TdXVblWXbV2VZ92Vd94VZt33dU1VbN11X103X1X1b131htm3fF11X11XZ1oVVlnXf1n1lmHWdMLqurqu27OuqLOu+ruvGMOu6MKy6bfyurQvDq+vGseu+rty+j2rbvvDqtjG8um4cu7Abv+37xrGpqm2brqvrpivrumzrvm/runGMrqvrqiz7uurKvm/ruvDrvi8Mo+vquirLurDasq/Lui4Mu64bw2rbwu7aunDMsi4Mt+8rx68LQ9W2heHVdaOr28ZvC8PSN3a+AACAAQcAgAATykChISsCgDgBAAYhCBVjECrGIIQQUgohpFQxBiFjDkrGHJQQSkkhlNIqxiBkjknIHJMQSmiplNBKKKWlUEpLoZTWUmotptRaDKG0FEpprZTSWmopttRSbBVjEDLnpGSOSSiltFZKaSlzTErGoKQOQiqlpNJKSa1lzknJoKPSOUippNJSSam1UEproZTWSkqxpdJKba3FGkppLaTSWkmptdRSba21WiPGIGSMQcmck1JKSamU0lrmnJQOOiqZg5JKKamVklKsmJPSQSglg4xKSaW1kkoroZTWSkqxhVJaa63VmFJLNZSSWkmpxVBKa621GlMrNYVQUgultBZKaa21VmtqLbZQQmuhpBZLKjG1FmNtrcUYSmmtpBJbKanFFluNrbVYU0s1lpJibK3V2EotOdZaa0ot1tJSjK21mFtMucVYaw0ltBZKaa2U0lpKrcXWWq2hlNZKKrGVklpsrdXYWow1lNJiKSm1kEpsrbVYW2w1ppZibLHVWFKLMcZYc0u11ZRai621WEsrNcYYa2415VIAAMCAAwBAgAlloNCQlQBAFAAAYAxjjEFoFHLMOSmNUs45JyVzDkIIKWXOQQghpc45CKW01DkHoZSUQikppRRbKCWl1losAACgwAEAIMAGTYnFAQoNWQkARAEAIMYoxRiExiClGIPQGKMUYxAqpRhzDkKlFGPOQcgYc85BKRljzkEnJYQQQimlhBBCKKWUAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0UjopEYRMSielkRJaCylllkqKJcbMWomtxNhICa2F1jJrJcbSYkatxFhiKgAA7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw5CCE0CDHmHIQQKsaccw5CCBVjzjkHIYTOOecghBBC55xzEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCKGUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOSclpUYpxiCkFFujFGMQUmqtYgxCSq3FWDEGIaXWYuwgpNRajLV2EFJqLcZaQ0qtxVhrziGl1mKsNdfUWoy15tx7ai3GWnPOuQAA3AUHALADG0U2JxgJKjRkJQCQBwBAIKQUY4w5h5RijDHnnENKMcaYc84pxhhzzjnnFGOMOeecc4wx55xzzjnGmHPOOeecc84556CDkDnnnHPQQeicc845CCF0zjnnHIQQCgAAKnAAAAiwUWRzgpGgQkNWAgDhAACAMZRSSimllFJKqKOUUkoppZRSAiGllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimVUkoppZRSSimllFJKKaUAIN8KBwD/BxtnWEk6KxwNLjRkJQAQDgAAGMMYhIw5JyWlhjEIpXROSkklNYxBKKVzElJKKYPQWmqlpNJSShmElGILIZWUWgqltFZrKam1lFIoKcUaS0qppdYy5ySkklpLrbaYOQelpNZaaq3FEEJKsbXWUmuxdVJSSa211lptLaSUWmstxtZibCWlllprqcXWWkyptRZbSy3G1mJLrcXYYosxxhoLAOBucACASLBxhpWks8LR4EJDVgIAIQEABDJKOeecgxBCCCFSijHnoIMQQgghREox5pyDEEIIIYSMMecghBBCCKGUkDHmHIQQQgghhFI65yCEUEoJpZRSSucchBBCCKWUUkoJIYQQQiillFJKKSGEEEoppZRSSiklhBBCKKWUUkoppYQQQiillFJKKaWUEEIopZRSSimllBJCCKGUUkoppZRSQgillFJKKaWUUkooIYRSSimllFJKCSWUUkoppZRSSikhlFJKKaWUUkoppQAAgAMHAIAAI+gko8oibDThwgMQAAAAAgACTACBAYKCUQgChBEIAAAAAAAIAPgAAEgKgIiIaOYMDhASFBYYGhweICIkAAAAAAAAAAAAAAAABE9nZ1MABKAGAAAAAAAAFe5wcgIAAAALXk4lCEVHSUZISUpEquAmnc28AHTgUvKKp6/pj4PehCkqreIhGZ1Y55Nfi6+6zQOPdzl2uyzCv96t42t/7qgsgEj8dEupw0kru5/d/KSLx0sAnuH2FD6aLwEAIJWk2lyUmU/abqKlmJCyk98m4y5U9LFpSL7XbU7loe2mSj70vJpo55WRXQet1nrnbuqbVIN7/jNAXBEUCQCiHjbRwsU6EMjIzY4/t5X3ld7ZpeaWqTwYEB7EjEEiJVEuL3IqJWxjaTqOerfZ0TaNPKKX2/wWx2C7yhIs+4RAJuWtvu7H624RnqCkpl2ooaAAj4Sm1sYmsv9Z8F7QCP73so4m++Hk5h9kVFsPXPAzpnszHWc6znRfHvOTDoxkJECPUjCUZjYvkuqeJi23A5pcL2OPToYS0ADjSAAI7G8I1y3svwKWXBJuAmQBz+BWgTESf1qb3r7WakkN7h8FRt3WsMI8HpygG9t5uRSadJ8qA3fi417jAJ5cvrLGQwWQkR8w3J7d5l/mSOhSRVUM0/FQe3//3JxvWEupnpHYsMKhZhindHBSITe6ajyNWnFgcYNIZoLLal1w7yx628zmNQGW2n5KmWHgCYDIQp5uOj+pMDntQnU5NCKZ7sVLwwFZFdbhFv/94tgiHrggy225NCz0aNooWmqayRrdV4aSZYbMWw7PfP9a001PBIrTrg8ZAJFKxScn7399XMdJzZm8pkQfkIAINznQdEe8PyLwttQ7ftI052WoLotwf8DpRWA0xkgE7CORQYmiP5B4TxkA
iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAVklEQVQoz6WRSw6AMAhEH5yiR+5Re4txIwka1LbOik8eGQA2ZDlpQhEPu/ZKKAMzIADqSB2dsKohUfMAbk2egE97lYZhPu0/yVdOHYP995/edluxX+oAarQf4d+S0rQAAAAASUVORK5CYII=
iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAWUlEQVQoz5WRwQ3AIAwDz0zRkRmVLdxPI1VpoHAvBDrLFuLFZRznIcQEVcKOCIA7dseP7CokaCGkmiURpNlDrhf3Q2i5qWIIte3RedMuEXwkff7pb9tJ/ZIbxb4jzL1bE3wAAAAASUVORK5CYII=');
  duckSound.play();
const duckOpen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAWUlEQVQoz5WRwQ3AIAwDz0zRkRmVLdxPI1VpoHAvBDrLFuLFZRznIcQEVcKOCIA7dseP7CokaCGkmiURpNlDrhf3Q2i5qWIIte3RedMuEXwkff7pb9tJ/ZIbxb4jzL1bE3wAAAAASUVORK5CYII=';
const duckClosed = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAVklEQVQoz6WRSw6AMAhEH5yiR+5Re4txIwka1LbOik8eGQA2ZDlpQhEPu/ZKKAMzIADqSB2dsKohUfMAbk2egE97lYZhPu0/yVdOHYP995/edluxX+oAarQf4d+S0rQAAAAASUVORK5CYII=';

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
            toggleDuckImage();
        } else {
            resetBall();
        }
    }

    if (ballY + ballSize / 2 > canvas.height) {
        if (ballX > paddle2X && ballX < paddle2X + paddleWidth) {
            ballSpeedY = -ballSpeedY;
            duckSound.play();
            toggleDuckImage();
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

function toggleDuckImage() {
    const cubeFaces = document.querySelectorAll('.cube div');
    cubeFaces.forEach(face => {
        face.style.backgroundImage = (face.style.backgroundImage === `url("${duckOpen}")`) ? `url("${duckClosed}")`) : `url("${duckOpen}")`;
    });
}

document.getElementById('start-duck-animation').addEventListener('click', function() {
    setInterval(game, 1000 / 60);
});