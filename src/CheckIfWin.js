function CheckIfWin(board, color) {

    if (columnWin(board, color)) {
        return true;
    }
    if (rowWin(board, color)) {
        return true;
    }
    if (rightSlantWin(board, color)) {
        return true;
    }
    if (leftSlantWin(board, color)) {
        return true;
    }
    return false;
}

function columnWin(board, color) {
    for (let i = 0; i < board.length; i++) {
        let column = board[i];
        for (let j = 0; j < board[i].length; j++) {
            if (
                color === column[j] &&
                color === column[j + 1] &&
                color === column[j + 2] &&
                color === column[j + 3]) {
                return true;
            }
        }
    }
    return false;
}

function rowWin(board, color) {
    for (let i = 0; i < board[0].length; i++) {
        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < board.length; j++) {
            if (
                color === column0[j] &&
                color === column1[j] &&
                color === column2[j] &&
                color === column3[j]
            ) {
                return true;
            }
        }
    }
    return false;
}

function rightSlantWin(board, color) {
    for (let i = 0; i < board[0].length; i++) {
        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < board.length; j++) {
            if (
                color === column0[j] &&
                color === column1[j - 1] &&
                color === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                return true;
            }
        }
    }
    return false;
}

function leftSlantWin(board, color) {
    for (let i = 0; i < board[0].length; i++) {
        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < board.length; j++) {
            if (
                color === column0[j] &&
                color === column1[j + 1] &&
                color === column2[j + 2] &&
                color === column3[j + 3]
            ) {
                return true;
            }
        }
    }
    return false;
}

export default CheckIfWin;