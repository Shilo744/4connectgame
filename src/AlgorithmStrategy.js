const stuff = {
    noPossibleWin: -1,
    empty: "white",
    green: "green",
    red: "red",
    boardSize: 7,
    columnSize: 6
}

function AlgorithmStrategy(board) {
    let win;
    // trying to win
    win = strategyWithThree(board, stuff.green)
    if (win !== stuff.noPossibleWin) {
        return win
    }
    // try to block opponent
    win = strategyWithThree(board, stuff.red)
    if (win !== stuff.noPossibleWin) {
        return win
    }
    // trying to win
    win = strategyWithTwo(board, stuff.green)
    if (win !== stuff.noPossibleWin) {
        return win
    }
    //try to block opponent
    win = strategyWithTwo(board, stuff.red)
    if (win !== stuff.noPossibleWin) {
        return win
    }
    return stuff.noPossibleWin
}


function strategyWithTwo(board, color) {
    let win;

    win = rightSlantWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = leftSlantWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = rowWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = columnWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    return stuff.noPossibleWin;
}

function strategyWithThree(board, color) {
    let win;
    // working well!

    win = rightSlantWinThree(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = leftSlantWinThree(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = rowWinThree(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = columnWinThree(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    return stuff.noPossibleWin;
}


function columnWinTwo(board, color) {

    for (let i = 0; i < stuff.boardSize - 1; i++) {
        let column = board[i];
        for (let j = 0; j < stuff.columnSize - 3; j++) {
            if (
                stuff.empty === column[j] &&
                stuff.empty === column[j + 1] &&
                color === column[j + 2] &&
                color === column[j + 3]) {
                return i;
            }
        }
    }
    return stuff.noPossibleWin;
}

function rowWinTwo(board, color) {
    for (let i = 0; i < stuff.boardSize - 3; i++) {
        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < stuff.columnSize - 1; j++) {
            if (
                color === column0[j] &&
                color === column1[j] &&
                stuff.empty === column2[j] &&
                stuff.empty === column3[j]
            ) {
                if (j === stuff.columnSize || column2[j + 1] !== stuff.empty) {
                    return i + 2;
                } else if (j === stuff.columnSize || column3[j + 1] !== stuff.empty) {
                    return i + 3;
                }

            } else if (
                color === column0[j] &&
                stuff.empty === column1[j] &&
                stuff.empty === column2[j] &&
                color === column3[j]) {
                if (j === stuff.columnSize || column1[j + 1] !== stuff.empty) {
                    return i + 1;
                } else if (j === stuff.columnSize || column2[j + 1] !== stuff.empty) {
                    return i + 2;
                }

            } else if (
                stuff.empty === column0[j] &&
                stuff.empty === column1[j] &&
                color === column2[j] &&
                color === column3[j]) {
                if (j === stuff.columnSize || column1[j + 1] !== stuff.empty) {
                    return i + 1;
                } else if (j === stuff.columnSize || column0[j + 1] !== stuff.empty) {
                    return i;
                }
            } else if (
                stuff.empty === column0[j] &&
                color === column1[j] &&
                color === column2[j] &&
                stuff.empty === column3[j]) {
                if (j === stuff.columnSize || column0[j + 1] !== stuff.empty) {
                    return i;
                } else if (j === stuff.columnSize || column3[j + 1] !== stuff.empty) {
                    return i + 3;
                }
            } else if (
                stuff.empty === column0[j] &&
                color === column1[j] &&
                stuff.empty === column2[j] &&
                color === column3[j]) {
                if (j === stuff.columnSize || column2[j + 1] !== stuff.empty) {
                    return i + 2;
                } else if (j === stuff.columnSize || column0[j + 1] !== stuff.empty) {
                    return i;
                }
            } else if (
                color === column0[j] &&
                stuff.empty === column1[j] &&
                color === column2[j] &&
                stuff.empty === column3[j]) {
                if (j === stuff.columnSize || column1[j + 1] !== stuff.empty) {
                    return i + 1;
                } else if (j === stuff.columnSize || column3[j + 1] !== stuff.empty) {
                    return i + 3;
                }
            }
        }
    }
    return stuff.noPossibleWin;
}

function rightSlantWinTwo(board, color) {

    for (let i = 0; i < stuff.boardSize; i++) {

        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 3; j < stuff.columnSize; j++) {
            let underC0 = j + 1;
            let underC1 = j;
            let underC2 = j - 1;
            let underC3 = j - 2;
            if (
                //lowest point is j
                stuff.empty === column0[j] &&
                stuff.empty === column1[j - 1] &&
                color === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                } else if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }
            if (
                color === column0[j] &&
                stuff.empty === column1[j - 1] &&
                stuff.empty === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                } else if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                }
            }
            if (
                color === column0[j] &&
                color === column1[j - 1] &&
                stuff.empty === column2[j - 2] &&
                stuff.empty === column3[j - 3]
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                } else if (column3[underC3] !== stuff.empty) {
                    return i + 3;
                }
            }
            if (
                stuff.empty === column0[j] &&
                color === column1[j - 1] &&
                color === column2[j - 2] &&
                stuff.empty === column3[j - 3]
            ) {
                if (column3[underC3] !== stuff.empty) {
                    return i + 3;
                } else if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }
            if (
                stuff.empty === column0[j] &&
                color === column1[j - 1] &&
                stuff.empty === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                } else if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }
            if (
                color === column0[j] &&
                stuff.empty === column1[j - 1] &&
                color === column2[j - 2] &&
                stuff.empty === column3[j - 3]
            ) {
                if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                } else if (column3[underC3] !== stuff.empty) {
                    return i + 3;
                }
            }
        }
    }
    return stuff.noPossibleWin;
}

function leftSlantWinTwo(board, color) {
    let endPoint = 3;
    for (let i = 0; i < stuff.boardSize - endPoint; i++) {

        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < stuff.columnSize - endPoint; j++) {
            let underC0 = j + 1;
            let underC1 = j + 2;
            let underC2 = j + 3;
            let underC3 = j + 4;
            if (
                //lowest point is j
                stuff.empty === column0[j] &&
                stuff.empty === column1[j + 1] &&
                color === column2[j + 2] &&
                color === column3[j + 3]
            ) {
                if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                } else if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }
            if (
                color === column0[j] &&
                stuff.empty === column1[j + 1] &&
                stuff.empty === column2[j + 2] &&
                color === column3[j + 3]
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                } else if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                }
            }
            if (
                color === column0[j] &&
                color === column1[j + 1] &&
                stuff.empty === column2[j + 2] &&
                stuff.empty === column3[j + 3]
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                } else if (underC3 < stuff.columnSize && column3[underC3] !== stuff.empty) {
                    return i + 3;
                }
            }
            if (
                stuff.empty === column0[j] &&
                color === column1[j + 1] &&
                color === column2[j + 2] &&
                stuff.empty === column3[j + 3]
            ) {
                if (underC3 < stuff.columnSize && column3[underC3] !== stuff.empty) {
                    return i + 3;
                } else if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }
            if (
                stuff.empty === column0[j] &&
                color === column1[j + 1] &&
                stuff.empty === column2[j + 2] &&
                color === column3[j + 3]
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                } else if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }
            if (
                color === column0[j] &&
                stuff.empty === column1[j + 1] &&
                color === column2[j + 2] &&
                stuff.empty === column3[j + 3]
            ) {
                if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                } else if (underC3 < stuff.columnSize && column3[underC3] !== stuff.empty) {
                    return i + 3;
                }
            }
        }
    }
    return stuff.noPossibleWin;
}


function columnWinThree(board, color) {
    for (let i = 0; i < stuff.boardSize - 1; i++) {
        let column = board[i];
        for (let j = 0; j < stuff.columnSize - 3; j++) {
            if (
                stuff.empty === column[j] &&
                color === column[j + 1] &&
                color === column[j + 2] &&
                color === column[j + 3]) {
                return i;
            }
        }
    }
    return stuff.noPossibleWin;
}

function rowWinThree(board, color) {
    for (let i = 0; i < stuff.boardSize - 3; i++) {
        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < stuff.columnSize; j++) {
            if (
                color === column0[j] &&
                color === column1[j] &&
                color === column2[j] &&
                stuff.empty === column3[j] &&
                (j === stuff.columnSize || column3[j + 1] !== stuff.empty)
            ) {
                return i + 3;
            } else if (color === column0[j] &&
                color === column1[j] &&
                stuff.empty === column2[j] &&
                (j === stuff.columnSize || column2[j + 1] !== stuff.empty) &&
                color === column3[j]) {
                return i + 2;
            } else if (color === column0[j] &&
                stuff.empty === column1[j] &&
                (j === stuff.columnSize || column1[j + 1] !== stuff.empty) &&
                color === column2[j] &&
                color === column3[j]) {
                return i + 1;
            } else if (stuff.empty === column0[j] &&
                (j === stuff.columnSize || column0[j + 1] !== stuff.empty) &&
                color === column1[j] &&
                color === column2[j] &&
                color === column3[j]) {
                return i;
            }
        }
    }
    return stuff.noPossibleWin;
}

function rightSlantWinThree(board, color) {
    let startPoint = 3;
    for (let i = 0; i < stuff.boardSize; i++) {

        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 3; j < stuff.columnSize; j++) {
            let underC0 = j + 1;
            let underC1 = j;
            let underC2 = j - 1;
            let underC3 = j - 2;
            if (
                //lowest point is j
                stuff.empty === column0[j] &&
                (j + startPoint === stuff.columnSize || column0[underC0] !== stuff.empty) &&
                color === column1[j - 1] &&
                color === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                return i;
            }
            if (
                color === column0[j] &&
                stuff.empty === column1[j - 1] &&
                (j + startPoint === stuff.columnSize || column1[underC1] !== stuff.empty) &&
                color === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                return i + 1;
            }
            if (
                color === column0[j] &&
                color === column1[j - 1] &&
                stuff.empty === column2[j - 2] &&
                (j + startPoint === stuff.columnSize || column2[underC2] !== stuff.empty) &&
                color === column3[j - 3]
            ) {
                return i + 2;
            }
            if (
                color === column0[j] &&
                color === column1[j - 1] &&
                color === column2[j - 2] &&
                stuff.empty === column3[j - 3] &&
                (j + startPoint === stuff.columnSize || column3[underC3] !== stuff.empty)
            ) {
                return i + 3;
            }
        }
    }
    return stuff.noPossibleWin;
}

function leftSlantWinThree(board, color) {
    let endPoint = 3;
    for (let i = 0; i < stuff.boardSize - endPoint; i++) {

        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < stuff.columnSize - endPoint; j++) {
            let c0 = column0[j]
            let c1 = column1[j + 1]
            let c2 = column2[j + 2]
            let c3 = column3[j + 3]

            let underC0 = j + 1;
            let underC1 = j + 2;
            let underC2 = j + 3;
            let underC3 = j + 4;
            if (
                //highest point is j
                stuff.empty === c0 &&
                color === c1 &&
                color === c2 &&
                color === c3
            ) {
                if (column0[underC0] !== stuff.empty) {
                    return i;
                }
            }

            if (
                color === c0 &&
                stuff.empty === c1 &&
                color === c2 &&
                color === c3
            ) {
                if (column1[underC1] !== stuff.empty) {
                    return i + 1;
                }
            }

            if (
                color === c0 &&
                color === c1 &&
                stuff.empty === c2 &&
                color === c3
            ) {
                if (column2[underC2] !== stuff.empty) {
                    return i + 2;
                }
            }

            if (
                color === c0 &&
                color === c1 &&
                color === c2 &&
                stuff.empty === c3
            ) {
                if (j + endPoint === stuff.columnSize || column3[underC3] !== stuff.empty) {
                    return i + 3;
                }
            }
        }
    }
    return stuff.noPossibleWin;
}

export default AlgorithmStrategy;