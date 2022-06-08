// Module for gameBoard
const gameBoard =(() => {
    let gameArray = ["","","","","","","","",""];
    
    // Function to add a selection to the gameBoard
    const add = (char, pos) => {
        gameArray[pos] = char;
        displayBoard(pos, char);
        return gameState(pos);
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
        else if (pos >= 3 && pos >= 5) {
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

    const checkDiag = () => {
        let state = 0;

        // Left to Right Diagonal
        if (gameArray[0] === gameArray[4] && gameArray[4] === gameArray[8]) state = 1;
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
        if (pos == 0 || pos == 2 || pos == 4 || pos == 6 || pos == 8) {
            diag = checkDiag();
        }

        if (col || row || diag) state = 1;

        return state;
    }

    // Final return statement of the module
    return {add, clearBoard, gameArray}
})();