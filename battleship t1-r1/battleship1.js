// Get the start button and game container elements
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const gridContainer = document.getElementById('grid-container');
const clicksRemainingElement = document.getElementById('clicks-remaining');

// Initialize variables
let clicksRemaining = 8;
let hiddenSquares = [];
let gameStarted = false;

// Function to start the game
function startGame() {
    // Reset variables
    clicksRemaining = 8;
    hiddenSquares = [];
    gameStarted = true;

    // Show the game container and hide the start button
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';

    // Update the clicks remaining element
    clicksRemainingElement.textContent = `Clicks remaining: ${clicksRemaining}`;

    // Create the 4x4 grid
    for (let i = 0; i < 16; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.dataset.index = i;
        gridContainer.appendChild(gridSquare);
    }

    // Randomly select 3 hidden squares
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * 16);
        while (hiddenSquares.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * 16);
        }
        hiddenSquares.push(randomIndex);
    }

    // Add event listener to each grid square
    const gridSquares = document.querySelectorAll('.grid-square');
    gridSquares.forEach((square) => {
        square.addEventListener('click', checkSquare);
    });
}

// Function to check if a square is hidden
function checkSquare(event) {
    const squareIndex = parseInt(event.target.dataset.index);
    const square = event.target;

    // Check if the square is hidden
    if (hiddenSquares.includes(squareIndex)) {
        // Change the background color to blue
        square.classList.add('found');
    } else {
        // Change the background color to red
        square.classList.add('not-found');
    }

    // Decrement the clicks remaining
    clicksRemaining--;
    clicksRemainingElement.textContent = `Clicks remaining: ${clicksRemaining}`;

    // Check if the game is over
    if (clicksRemaining === 0) {
        // Game over, show alert and restart game
        alert('Game over! Do you want to play again?');
        restartGame();
    }
}

// Function to restart the game
function restartGame() {
    // Remove all grid squares
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    // Show the start button and hide the game container
    startButton.style.display = 'block';
    gameContainer.style.display = 'none';

    // Reset variables
    gameStarted = false;
}

// Add event listener to the start button
startButton.addEventListener('click', startGame);