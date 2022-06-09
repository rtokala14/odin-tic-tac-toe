// Factory function for Players
const Player = (selection, name) => {
    const symbol = selection;

    const getName = () => name;

    const getSymbol = () => symbol;

    return {getSymbol, getName}
};

// Module for gameBoard
const gameBoard =(() => {
    const gameArray = ["","","","","","","","",""];
    
    // Function to add a selection to the gameBoard
    const add = (char, pos) => {
        if (gameArray[pos] === "") {
            gameArray[pos] = char;
            displayBoard(pos, char);
            return gameState(pos);
        }
        else return -1;
    }

    // Function to clear the board
    const clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            gameArray[i] = "";
            displayBoard(i, "");
        }
    }

    // Function to update the board display
    const displayBoard = (pos, char) => {
        let search = 'box-' + pos;
        const box = document.getElementById(search);
        box.textContent = char;
    }

    // Function to check if there is win on the columns
    const checkCol = (pos) => {
        let state = 0;

        // Top row
        if (pos >= 0 && pos <= 2) {
            if (gameArray[pos] === gameArray[pos+3] && gameArray[pos+3] === gameArray[pos+6]) state = 1;
        } 
        // Middle row
        else if (pos >= 3 && pos <= 5) {
            if (gameArray[pos-3] === gameArray[pos] && gameArray[pos] === gameArray[pos+3]) state = 1;
        }
        // Bottom row
        else {
            if (gameArray[pos-6] === gameArray[pos-3] && gameArray[pos-3] === gameArray[pos]) state = 1;
        }

        // Return statement
        return state;
    }

    const checkRow = (pos) => {
        let state = 0;

        // First column
        if (pos === 0 || pos === 3 || pos === 6) {
            if (gameArray[pos] === gameArray[pos+1] && gameArray[pos+1] === gameArray[pos+2]) state = 1;
        }
        // Second column
        else if (pos === 1 || pos === 4 || pos === 7) {
            if (gameArray[pos-1] === gameArray[pos] && gameArray[pos] === gameArray[pos+1]) state = 1;
        }
        // Third column 
        else {
            if (gameArray[pos-2] === gameArray[pos-1] && gameArray[pos-1] === gameArray[pos]) state = 1;
        }

        // Return statement
        return state;
    }

    const checkDiag = (pos) => {
        let state = 0;

        // Left to Right Diagonal
        if (pos === 0 || pos === 4 || pos === 8) {
            if (gameArray[0] === gameArray[4] && gameArray[4] === gameArray[8]) state = 1;
        }
        // Right to Left Diagonal
        else if (gameArray[2] === gameArray[4] && gameArray[4] === gameArray[6]) state = 1;

        // Return statement 
        return state;
    }

    // Function to find the state of the game (win / null)
    const gameState = (pos) => {
        let state = 0;
        let diag = 0;
        
        let col = checkCol(pos);
        let row = checkRow(pos);
        if (pos === 0 || pos === 2 || pos === 4 || pos === 6 || pos === 8) {
            diag = checkDiag(pos);
        }

        if (col || row || diag) state = 1;

        return state;
    }

    // Final return statement of the module
    return {add, clearBoard, gameArray}
})();

// Module to controls game mechanics
const gameControl=(() => {
    const boxes = document.querySelectorAll('.box');

    const player1 = Player('X');
    const player2 = Player('O');

    const result = document.getElementById('result');

    let activePlayer = player1;

    let movesLeft = 9;

    let inPlay = 0;

    // Returns who the current active player is
    const getActivePlayer = () => activePlayer;

    // Switches the current active player
    const switchActivePlayer = () => {
        if (activePlayer === player1) activePlayer = player2;
        else activePlayer = player1;
        result.textContent = "Player " + activePlayer.getSymbol() + "'s turn";
    }

    // Displays the result TODO: as of now only if win
    const displayWinner = (state) => {

        if (state) result.textContent = "Player " + activePlayer.getSymbol() + " has won the game! Reset to play again";
        else {
            if (!movesLeft) {
                result.textContent = "DRAW! Reset to play again";
            }
            else {
                result.textContent = "";
            }
        }

        removeListeners();
    }

    // Add listeners to the boxes
    const addListenersBox = () => {
        boxes.forEach((box) => {
            box.addEventListener('click', () => {
                if (inPlay) {
                    let id = parseInt(box.id.charAt(4));
                    let result = gameBoard.add(getActivePlayer().getSymbol(), id); 
                    //console.log(result);
                    if (result >= 0) {
                        movesLeft = movesLeft - 1;
                        if (!result) {
                            if (!movesLeft) {
                                displayWinner(0);
                            }
                            else {
                                switchActivePlayer();
                            }
                        }
                        else {
                            displayWinner(1);
                        }
                    }
                }
            });
        });
    }

    // Add listener to reset button
    const addButtonListener = () => {
        const reset = document.getElementById('reset-btn');
        reset.addEventListener('click', () => {
            gameBoard.clearBoard();
            activePlayer = player1;
            movesLeft = 9;
            displayWinner(0);
            result.textContent = "Player " + activePlayer.getSymbol() + "'s turn";
            inPlay = 1;
        });
    }

    // Removes the listeners from boxes once a result is declared
    const removeListeners = () => {
        boxes.forEach((box) => {
            inPlay = 0;
        });
    }

    // Initializes the game
    const initGame = () => {
        // TODO: Add player choice selection
        activePlayer =  player1;
        result.textContent = "Player " + activePlayer.getSymbol() + "'s turn";
        inPlay = 1;
        addListenersBox();
        addButtonListener();
    }

    return {initGame, getActivePlayer}
})();

window.onload = () => {
    gameControl.initGame();
}