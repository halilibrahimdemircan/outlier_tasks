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
    return hiddenSquares;
}

// Function to update the grid based on the player's click
function updateGrid(grid, hiddenSquares, row, col, remainingClicks) {
    // Check if the clicked square is a hidden square
    const isHiddenSquare = hiddenSquares.some((square) => square.row === row && square.col === col);
    if (isHiddenSquare) {
        // If it's a hidden square, mark it as blue
        grid[row][col].style.background = 'blue';
    } else {
        // If it's not a hidden square, mark it as red
        grid[row][col].style.background = 'red';
    }
    // Update the remaining clicks
    document.getElementById('remaining-clicks').textContent = `Remaining clicks: ${remainingClicks - 1}`;
}

// Function to check if the game is over
function isGameOver(hiddenSquares, remainingClicks) {
    // Check if all hidden squares have been found or if there are no remaining clicks
    return hiddenSquares.length === 0 || remainingClicks === 0;
}

// Start the game when the start button is clicked
startButton.addEventListener('click', () => {
    // Remove the start button
    container.removeChild(startButton);

    // Create the game grid
    const grid = createGrid();
    grid.forEach((row) => {
        const rowContainer = document.createElement('div');
        row.forEach((button) => {
            rowContainer.appendChild(button);
        });
        container.appendChild(rowContainer);
    });

    // Select random hidden squares
    const hiddenSquares = selectHiddenSquares(grid);

    // Set the initial remaining clicks
    let remainingClicks = 8;
    const remainingClicksElement = document.createElement('div');
    remainingClicksElement.id = 'remaining-clicks';
    remainingClicksElement.textContent = `Remaining clicks: ${remainingClicks}`;
    remainingClicksElement.style.position = 'absolute';
    remainingClicksElement.style.top = '0';
    remainingClicksElement.style.right = '0';
    document.body.appendChild(remainingClicksElement);

    // Add event listeners to each grid cell
    grid.forEach((row, rowIndex) => {
        row.forEach((button, colIndex) => {
            button.addEventListener('click', () => {
                // Update the grid based on the player's click
                updateGrid(grid, hiddenSquares, rowIndex, colIndex, remainingClicks);
                remainingClicks--;

                // Check if the game is over
                if (isGameOver(hiddenSquares, remainingClicks)) {
                    // If the game is over, issue a warning and restart the game
                    alert('Game over! Do you want to play again?');
                    // Remove all game elements
                    grid.forEach((row) => {
                        row.forEach((button) => {
                            button.parentNode.removeChild(button);
                        });
                    });
                    document.body.removeChild(remainingClicksElement);
                    // Add the start button back
                    container.appendChild(startButton);
                }
            });
        });
    });
});