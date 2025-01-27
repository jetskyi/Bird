// Получаем канвас и контекст
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры канваса
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Начальные параметры игры
const bird = {
  x: 100,
  y: canvas.height / 2,
  width: 40,
  height: 40,
  speed: 2,
  dy: 0
};

const gravity = 0.2;
const jumpStrength = -5;

// Массив для гор
const mountains = [];
const mountainHeight = 100;
const mountainSpeed = 2;

// Обработчик клавиш
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    bird.dy = jumpStrength;
  }
});

// Функция отрисовки птицы
function drawBird() {
  bird.dy += gravity;  // Применяем гравитацию
  bird.y += bird.dy;

  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.dy = 0;
  }

  ctx.fillStyle = 'yellow';
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Функция отрисовки гор
function drawMountains() {
  for (let i = 0; i < mountains.length; i++) {
    mountains[i].x -= mountainSpeed;
    if (mountains[i].x + mountains[i].width < 0) {
      mountains.splice(i, 1);
      i--;
    } else {
      ctx.fillStyle = 'green';
      ctx.fillRect(mountains[i].x, mountains[i].y, mountains[i].width, mountains[i].height);
    }
  }
}

// Функция добавления гор
function addMountain() {
  const height = Math.random() * (canvas.height / 2) + mountainHeight;
  const width = 100 + Math.random() * 100;
  mountains.push({
    x: canvas.width,
    y: canvas.height - height,
    width: width,
    height: height
  });
}

// Главный игровой цикл
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawMountains();

  if (Math.random() < 0.01) {
    addMountain();
  }

  requestAnimationFrame(gameLoop);
}

// Запуск игры
gameLoop();
