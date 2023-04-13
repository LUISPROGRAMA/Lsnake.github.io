const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const startScreen = document.getElementById('start-screen');
const box = 10;
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * 39 + 1) * box, y: Math.floor(Math.random() * 39 + 1) * box };
let direction = 'right';
let score = 0;
let gameInterval;

// Event Listeners
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', restartGame);

function startGame() {
startScreen.style.display = 'none';
canvas.style.display = 'block';
gameInterval = setInterval(gameLoop, 100);
}

// Event Listeners
document.addEventListener('keydown', changeDirection);

// Event Listeners
document.addEventListener('keydown', changeDirection);

// Event Listeners
document.addEventListener('keydown', changeDirection);

// Functions
function drawSnake() {
for (let i = 0; i < snake.length; i++) {
ctx.fillStyle = 'green';
ctx.fillRect(snake[i].x, snake[i].y, box, box);
}
ctx.fillStyle = 'green';
ctx.fillRect(snake[0].x, snake[0].y, box, box);
ctx.fillStyle = 'white';
ctx.fillRect(snake[0].x + 2, snake[0].y + 2, box - 4, box - 4);
}

function drawFood() {
ctx.fillStyle = 'red';
ctx.fillRect(food.x, food.y, box, box);
}

function moveSnake() {
let head = { x: snake[0].x, y: snake[0].y };

if (direction === 'right') {
head.x += box;
} else if (direction === 'left') {
head.x -= box;
} else if (direction === 'up') {
head.y -= box;
} else if (direction === 'down') {
head.y += box;
}

if (head.x === food.x && head.y === food.y) {
food = { x: Math.floor(Math.random() * 39 + 1) * box, y: Math.floor(Math.random() * 39 + 1) * box };
score++;
} else {
snake.pop();
}

snake.unshift(head);
}

function checkCollision() {
if (snake[0].x === canvas.width || snake[0].x < 0 || snake[0].y === canvas.height || snake[0].y < 0) {
endGame();
}

for (let i = 1; i < snake.length; i++) {
if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
endGame();
}
}
}

function changeDirection(event) {
if (event.key === 'a' && direction !== 'right') {
direction = 'left';
} else if (event.key === 'w' && direction !== 'down') {
direction = 'up';
} else if (event.key === 'd' && direction !== 'left') {
direction = 'right';
} else if (event.key === 's' && direction !== 'up') {
direction = 'down';
}
}

function endGame() {
  clearInterval(gameInterval);
  canvas.style.opacity = '0.5';
  restartButton.style.display = 'block';
}

function showGameOverMessage() {
ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'red';
ctx.font = '48px Arial';
ctx.fillText('HAS MUERTO', canvas.width / 2 - 100, canvas.height / 2);
}

function restartGame() {
  canvas.style.display = 'block';
  snake = [{ x: 10, y: 10 }];
  food = { x: Math.floor(Math.random() * 39 + 1) * box, y: Math.floor(Math.random() * 39 + 1) * box };
  direction = 'right';
  score = 0;
  canvas.style.opacity = '1';
  restartButton.style.display = 'none';
  clearInterval(gameInterval); // Limpiar el intervalo de juego anterior
  gameInterval = setInterval(gameLoop, 100); // Comenzar un nuevo intervalo de juego
}

function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

drawSnake();
drawFood();
moveSnake();
checkCollision();

ctx.fillStyle = 'black';
ctx.font = '24px Arial';
ctx.fillText(`Score: ${score}`, 10, 50); 
}

function checkCollision() {
  if (snake[0].x === canvas.width || snake[0].x < 0 || snake[0].y === canvas.height || snake[0].y < 0) {
    endGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      endGame();
    }
  }
}

function initGame() {
  restartButton.style.display = 'none';
  canvas.style.display = 'none';
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', restartGame);
}

initGame();
