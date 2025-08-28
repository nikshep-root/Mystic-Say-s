document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', () => {
            window.location.href = 'game.html';
        });
    }

    const playButton = document.getElementById('playButton');
    const restartButton = document.getElementById('restartButton');
    const messageDisplay = document.getElementById('message');
    const gameButtons = document.querySelectorAll('.game-button');

    let sequence = [];
    let playerSequence = [];
    let level = 0;
    let canClick = false;

    const buttonColors = ['red', 'blue', 'green', 'yellow'];

    function startGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        messageDisplay.textContent = '';
        restartButton.classList.add('hidden');
        playButton.classList.add('hidden');
        nextRound();
    }

    function nextRound() {
        level++;
        playerSequence = [];
        messageDisplay.textContent = `Level ${level}`;
        addNewColorToSequence();
        playSequence();
    }

    function addNewColorToSequence() {
        const randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)];
        sequence.push(randomColor);
    }

    function playSequence() {
        canClick = false;
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                flashButton(sequence[i]);
                i++;
            } else {
                clearInterval(interval);
                canClick = true;
                messageDisplay.textContent = `Level ${level} - Your Turn!`;
            }
        }, 600);
    }

    function flashButton(color) {
        const button = document.getElementById(color);
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 300);
    }

    function handlePlayerClick(event) {
        if (!canClick) return;

        const clickedColor = event.target.id;
        playerSequence.push(clickedColor);
        flashButton(clickedColor);

        checkPlayerInput();
    }

    function checkPlayerInput() {
        const currentMove = playerSequence.length - 1;
        if (playerSequence[currentMove] !== sequence[currentMove]) {
            gameOver();
            return;
        }

        if (playerSequence.length === sequence.length) {
            canClick = false;
            setTimeout(() => {
                nextRound();
            }, 1000);
        }
    }

    function gameOver() {
        messageDisplay.textContent = 'Game Over – Mystic Wins!';
        messageDisplay.classList.add('glitch');
        canClick = false;
        restartButton.classList.remove('hidden');
    }

    if (playButton) {
        playButton.addEventListener('click', startGame);
    }

    if (restartButton) {
        restartButton.addEventListener('click', startGame);
    }

    gameButtons.forEach(button => {
        button.addEventListener('click', handlePlayerClick);
    });
});
