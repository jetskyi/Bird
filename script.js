const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bird = {
    x: 100,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    gravity: 0.5,
    lift: -15,
    velocity: 0
};

let mountains = [];
let score = 0;
let deathCount = 0;
let gameSpeed = 1;
let isGameOver = false;

function generateMountain() {
    const gapHeight = Math.floor(Math.random() * (canvas.height / 3)) + 50;
    const topMountainHeight = Math.floor(Math.random() * (canvas.height / 3)) + 30;
    const bottomMountainHeight = canvas.height - gapHeight - topMountainHeight;

    mountains.push({
        x: canvas.width,
        topHeight: topMountainHeight,
        bottomHeight: bottomMountainHeight,
        gapHeight: gapHeight
    });
}

function updateMountains() {
    for (let i = 0; i < mountains.length; i++) {
        mountains[i].x -= gameSpeed;
        if (mountains[i].x + 50 < 0) {
            mountains.splice(i, 1);
            score++;
            if (score % 10 === 0) {
                gameSpeed *= 1.05;
            }
            break;
        }
    }
}

function drawMountains() {
    mountains.forEach(mountain => {
        ctx.fillStyle = "#228B22";
        ctx.fillRect(mountain.x, 0, 50, mountain.topHeight); // Верхняя гора
        ctx.fillRect(mountain.x, canvas.height - mountain.bottomHeight, 50, mountain.bottomHeight); // Нижняя гора
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame();
    }
}

function drawBird() {
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function endGame() {
    isGameOver = true;
    alert(`Игра окончена! Ваш счёт: ${score}, Количество смертей: ${deathCount}`);
}

function restartGame() {
    score = 0;
    deathCount = 0;
    gameSpeed = 1;
    mountains = [];
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    isGameOver = false;
}

function handleKeyPress(e) {
    if (e.key === " ") {
        bird.velocity = bird.lift;
    }
}

function updateGame() {
    if (isGameOver) return;

    updateMountains();
    updateBird();
    drawMountains();
    drawBird();

    requestAnimationFrame(updateGame);
}

function gameLoop() {
    if (isGameOver) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) {
        generateMountain();
    }

    updateGame();
}

document.addEventListener('keydown', handleKeyPress);
setInterval(gameLoop, 1000 / 60);  // FPS = 60

