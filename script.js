const bird = document.getElementById('bird');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let birdY = 250;
let gravity = 2;
let score = 0;
let isGameOver = false;

document.addEventListener('keydown', () => {
    if (!isGameOver) {
        birdY -= 40;
        bird.style.top = birdY + 'px';
    }
});

function createPipe() {
    const pipe = document.createElement('div');
    pipe.classList.add('pipe');
    const pipeHeight = Math.random() * 200 + 100;
    pipe.style.height = pipeHeight + 'px';
    pipe.style.left = '400px';
    game.appendChild(pipe);

    let pipeInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(pipeInterval);
            return;
        }
        let pipeLeft = parseInt(pipe.style.left);
        if (pipeLeft < -50) {
            clearInterval(pipeInterval);
            game.removeChild(pipe);
            score++;
            scoreDisplay.innerText = score;
        } else {
            pipe.style.left = pipeLeft - 5 + 'px';
        }
    }, 20);
}

function startGame() {
    setInterval(() => {
        if (!isGameOver) {
            birdY += gravity;
            bird.style.top = birdY + 'px';
        }
    }, 20);
    
    setInterval(createPipe, 2000);
}

startGame();
