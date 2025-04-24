// game.js

// Canvas elementini al
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Oyun ayarları
const box = 20;
const canvasSize = 400;
const totalBoxes = canvasSize / box;

// Yılan başlangıç ayarları
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = 'RIGHT';

// Meyve ayarları
let food = {
    x: Math.floor(Math.random() * totalBoxes) * box,
    y: Math.floor(Math.random() * totalBoxes) * box
};

// Puan
let score = 0;

// Yılanın hareketini kontrol eden fonksiyon
function moveSnake() {
    let head = { ...snake[0] };

    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'DOWN') head.y += box;

    // Yılanın kendisiyle çarpmasını engelle
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || collisionWithSnake(head)) {
        clearInterval(game);
        alert('Oyun Bitti! Puanınız: ' + score);
    }

    snake.unshift(head);

    // Yılanın meyveye çarpıp büyümesini sağla
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * totalBoxes) * box,
            y: Math.floor(Math.random() * totalBoxes) * box
        };
    } else {
        snake.pop();
    }
}

// Yılanın kendisine çarpıp çarpmadığını kontrol et
function collisionWithSnake(head) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Yılanı ve meyveyi çizme
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Yılanı çiz
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Meyveyi çiz
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Puanı yazdır
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Puan: ' + score, box, box);
}

// Yön tuşlarıyla yılanı kontrol etme
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

// Oyun döngüsünü başlat
function startGame() {
    moveSnake();
    draw();
}

// 100 ms aralıklarla oyunu başlat
let game = setInterval(startGame, 100);
