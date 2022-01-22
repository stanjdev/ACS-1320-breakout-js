const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");
const ballRadius = 10;

let ballSpeed = 3;

let paddleHeight = 10;
let paddleWidth = 75;
let rightPressed = false;
let leftPressed = false;

const initGame = () => {
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = ballSpeed;
  dy = -ballSpeed;
  paddleX = (canvas.width - paddleWidth) / 2;
};

initGame();

function incrementSettings() {
  level++;
  ballSpeed++;
  brickRowCount++;
  if (brickRowCount == 5) {
    brickRowCount = 3;
    brickColumnCount++;
  }
};

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;
let lives = 3;
let level = 1;

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
};

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function drawLevel() {
  ctx.font = '16px Arial';
  ctx.fillStyle = "#0035DD";
  ctx.fillText('Level: ' + level, canvas.width / 2.2, 20);
}

// Nested arrays
let bricks = [];

function initBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
};

initBricks();

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(evt) {
  if (evt.key == "Right" || evt.key == "ArrowRight") {
    rightPressed = true;
  }
  else if (evt.key == "Left" || evt.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(evt) {
  if (evt.key == "Right" || evt.key == "ArrowRight") {
    rightPressed = false;
  }
  else if (evt.key == "Left" || evt.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(evt) {
  let relativeX = evt.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          score++; 
          b.status = 0;
          if (score == brickRowCount * brickColumnCount) {
            // alert("YOU WIN, CONGRATULATIONS!");
            // document.location.reload();
            incrementSettings();
            initGame();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0055DD";
  ctx.fill();
  ctx.closePath();
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawLevel();
  collisionDetection();
  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height-ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        initGame();
      }
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}


// let interval = setInterval(draw, 10);
draw();



