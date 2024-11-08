// Get the container element
const container = document.getElementById('game-container');

// Create the start button
const startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.style.color = 'white';
startButton.style.background = 'black';

// Append the start button to the container
container.appendChild(startButton);

// Function to create the game grid
function createGrid() {
    // Create a 4x4 grid
    const grid = [];
    for (let i = 0; i < 4; i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
            // Create a button for each grid cell
            const button = document.createElement('button');
            button.style.width = '50px';
            button.style.height = '50px';
            button.style.margin = '5px';
            button.style.color = 'white';
            button.style.background = 'gray';
            button.dataset.row = i;
            button.dataset.col = j;
            row.push(button);
        }
        grid.push(row);
    }
    return grid;
}

// Function to select random hidden squares
function selectHiddenSquares(grid) {
    // Select 3 random squares
    const hiddenSquares = [];
    for (let i = 0; i < 3; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 4);
            col = Math.floor(Math.random() * 4);
        } while (hiddenSquares.some((square) => square.row === row && square.col === col));
        hiddenSquares.push({ row, col });
    }
    console.log('hiddenSquares :>> ', hiddenSquares);
    return hiddenSquares;
}

// Function to update the grid based on the player's click
function updateGrid(grid, hiddenSquares, row, col, remainingClicks, scoreElement, score) {
    // Check if the clicked square is a hidden square
    const isHiddenSquare = hiddenSquares.some((square) => square.row === row && square.col === col);
    if (isHiddenSquare) {
        // If it's a hidden square, mark it as blue
        grid[row][col].style.background = 'blue';
        score++;
        scoreElement.textContent = `Score: ${score}`;
        if (score <= 2) {
            scoreElement.style.color = 'red';
        } else {
            scoreElement.style.color = 'green';
        }
        // Remove the hidden square from the list
        hiddenSquares.splice(hiddenSquares.findIndex((square) => square.row === row && square.col === col), 1);
    } else {
        // If it's not a hidden square, mark it as red
        grid[row][col].style.background = 'red';
    }
    // Update the remaining clicks
    document.getElementById('remaining-clicks').textContent = `Remaining clicks: ${remainingClicks - 1}`;
}

// Function to check if the game is over
function isGameOver(hiddenSquares, remainingClicks, score) {
    // Check if all hidden squares have been found or if there are no remaining clicks
    if (score >= 3) {
        alert('Congratulations, you won the game!');
        return true;
    } else if (remainingClicks === 0) {
        alert('Game over! Do you want to play again?');
        return true;
    }
    return false;
}

// Start the game when the start button is clicked
startButton.addEventListener('click', () => {
    // Remove the start button
    container.removeChild(startButton);

    // Create the game grid
    const grid = createGrid();
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'inline-block';
    grid.forEach((row) => {
        const rowContainer = document.createElement('div');
        row.forEach((button) => {
            rowContainer.appendChild(button);
        });
        gridContainer.appendChild(rowContainer);
    });
    container.appendChild(gridContainer);

    // Create a container to hold the remaining clicks and score elements on the right side
    const infoContainer = document.createElement('div');
    infoContainer.style.display = 'inline-block';
    infoContainer.style.verticalAlign = 'top';
    infoContainer.style.marginLeft = '20px'; // Add some space between grid and info

    // Create the remaining clicks element
    const remainingClicksElement = document.createElement('div');
    remainingClicksElement.id = 'remaining-clicks';
    remainingClicksElement.style.marginBottom = '10px';
    infoContainer.appendChild(remainingClicksElement);

    // Create the score element directly below remaining clicks
    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    infoContainer.appendChild(scoreElement);

    // Append the info container next to the grid
    container.appendChild(infoContainer);

    // Select random hidden squares
    const hiddenSquares = selectHiddenSquares(grid);

    // Set the initial remaining clicks and score
    let remainingClicks = 8;
    remainingClicksElement.textContent = `Remaining clicks: ${remainingClicks}`;
    let score = 0;
    scoreElement.textContent = `Score: ${score}`;

    // Add event listeners to each grid cell
    grid.forEach((row, rowIndex) => {
        row.forEach((button, colIndex) => {
            button.addEventListener('click', () => {
                // Update the grid based on the player's click
                updateGrid(grid, hiddenSquares, rowIndex, colIndex, remainingClicks, scoreElement, score);
                remainingClicks--;
                score = parseInt(scoreElement.textContent.split(' ')[1]);

                // Check if the game is over
                if (isGameOver(hiddenSquares, remainingClicks, score)) {
                    // If the game is over, remove all game elements
                    grid.forEach((row) => {
                        row.forEach((button) => {
                            button.parentNode.removeChild(button);
                        });
                    });
                    container.removeChild(infoContainer);
                    // Add the start button back
                    container.appendChild(startButton);
                }
            });
        });
    });
});


