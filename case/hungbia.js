const catcher = document.getElementById("catcher");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");
const finalScoreDisplay = document.getElementById("finalScore"); // Thêm phần tử HTML mới
let score = 0;
let catcherX = window.innerWidth / 2 - 50;
let missed = 0;
let beerSpeed;
let gameLoop;
let gameOver = false;

function startGame(speed) {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("score").style.display = "block";
    beerSpeed = speed;
    missed = 0;
    score = 0;
    updateScore();
    gameLoop = setInterval(createBeer, beerSpeed);
    gameOver = false;
}

function restartGame() {
    clearInterval(gameLoop);
    document.querySelectorAll(".beer").forEach((beer) => beer.remove());
    gameOverDisplay.style.display = "none";
    document.getElementById("startScreen").style.display = "block";
    gameOver = false;
}

function exitGame() {
    window.location.href = "about:blank";
}

document.addEventListener("keydown", function(event) {
    if (!gameOver) {
        if (event.key === "ArrowLeft" && catcherX > 0) {
            catcherX -= 20;
        } else if (
            event.key === "ArrowRight" &&
            catcherX < window.innerWidth - 120
        ) {
            catcherX += 20;
        }
        catcher.style.left = catcherX + "px";
    }
});

function createBeer() {
    if (!gameOver) {
        const beer = document.createElement("div");
        beer.classList.add("beer");
        beer.style.left = Math.random() * (window.innerWidth - 200) + "px";
        document.body.appendChild(beer);

        const fallInterval = setInterval(function() {
            const beerRect = beer.getBoundingClientRect();
            const catcherRect = catcher.getBoundingClientRect();

            if (
                beerRect.bottom >= catcherRect.top &&
                beerRect.right >= catcherRect.left &&
                beerRect.left <= catcherRect.right
            ) {
                clearInterval(fallInterval);
                beer.remove();
                score++;
                updateScore();
            } else if (beerRect.bottom >= window.innerHeight) {
                clearInterval(fallInterval);
                beer.remove();
                missed++;
                if (missed >= 3) {
                    endGame();
                }
            } else {
                beer.style.top = beer.offsetTop + 1 + "px";
            }
        }, 10);
    }
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function endGame() {
    clearInterval(gameLoop);
    gameOverDisplay.style.display = "block";
    finalScoreDisplay.textContent = "Final Score: " + score; // Cập nhật điểm số cuối cùng
    gameOver = true;
}