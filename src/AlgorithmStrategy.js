
const stuff = {
    noPossibleWin: -1,
    empty: "white",
    green: "green",
    red: "red",
    boardSize: 7,
    columnSize: 6,
    doNotEnter:[],
    ruinForYourself:[]

}

function AlgorithmStrategy(board,level) {
    const regularMove=0;
    const checkLoseOption=1;
    let win;
    if(level===0){
        win = strategyWithThree(board, stuff.red,regularMove)
        return win
    }
    stuff.doNotEnter=[]
    stuff.ruinForYourself=[]
    strategyWithThree(board, stuff.green,checkLoseOption)
    stuff.ruinForYourself=stuff.doNotEnter

    stuff.doNotEnter=[]
    strategyWithThree(board, stuff.red,checkLoseOption)

    // trying to win
    win = strategyWithThree(board, stuff.green,regularMove)
    if (win !== stuff.noPossibleWin) {
        return win}

    // try to block opponent
    win = strategyWithThree(board, stuff.red,regularMove)
    if (win !== stuff.noPossibleWin) {
        return win}

    // try to block opponent
    win = strategyWithTwo(board, stuff.red)
    if (win !== stuff.noPossibleWin) {
        if(!willLose(win) && !ruinYourself(win)) {
            return win}}

    // trying to win
    win = strategyWithTwo(board, stuff.green)
    if (win !== stuff.noPossibleWin) {
        if(!willLose(win) && !ruinYourself(win)) {
            return win}}


    //putting in place where the result will not be losing potential win or losing in the opponent turn
    let bestOptionsPut=bestOption(board)
    if(bestOptionsPut.length>0){
        let random = Math.floor(Math.random() * bestOptionsPut.length)
        return  bestOptionsPut[random]
    }
    //putting in place you will not lose next turn
    let columnsOptions=validColumns(board)
    if(columnsOptions.length>0){
        let random = Math.floor(Math.random() * columnsOptions.length)
        return  columnsOptions[random]
    }
    // if didn't find any good option and giving back negative answer -1. (will happen toward the end game when only lose possible)
    return stuff.noPossibleWin
}
function bestOption(board){
    let options=validColumns(board)
    let bestOptions=[]
    for (let i = 0; i < options.length; i++) {
        let valid=true
        for (let j = 0; j < stuff.ruinForYourself; j++) {
            if(options[i]===stuff.ruinForYourself[j]){
                valid=false
                break
            }
        }
        if(valid){
            bestOptions.push(options[i])
        }
    }
    return bestOptions;
}
function validColumns(board){
    let freeColumns=[]
    for (let i = 0; i < stuff.boardSize; i++) {
        if(board[i][0]===stuff.empty){
            if(!willLose(i)){
                freeColumns.push(i)}
        }
    }
    return freeColumns}
function willLose(i){
    for (let j = 0; j <stuff.doNotEnter.length; j++) {
        if (i===stuff.doNotEnter[j]){
            return true
        }
    }
    return false
}
function ruinYourself(i){
    for (let j = 0; j <stuff.ruinForYourself.length; j++) {
        if (i===stuff.ruinForYourself[j]){
            return true
        }
    }
    return false
}
function strategyWithTwo(board, color) {
    let win;

    win = rowWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = rightSlantWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = leftSlantWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    win = columnWinTwo(board, color)
    if (win !== stuff.noPossibleWin) {
        return win;
    }

    return stuff.noPossibleWin;
}

function strategyWithThree(board, color,move) {
    let win=stuff.noPossibleWin
    // working well!

    win = rightSlantWinThree(board, color,move)
    if (win !== stuff.noPossibleWin) {
        if(move===0){
            return win;}
    }

    win = leftSlantWinThree(board, color,move)
    if (win !== stuff.noPossibleWin) {
        if(move===0){
            return win;}
    }

    win = rowWinThree(board, color,move)
    if (win !== stuff.noPossibleWin) {
        if(move===0){
            return win;}
    }

    win = columnWinThree(board, color,move)
    if (win !== stuff.noPossibleWin) {
        if(move===0){
            return win;}
    }

    if(move===0){
        return win;}
    return stuff.noPossibleWin
}

function columnWinTwo(board, color) {

    for (let i = 0; i < stuff.boardSize; i++) {
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
        for (let j = 0; j < stuff.columnSize; j++) {
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

function columnWinThree(board, color,move) {
    if(move===0){
        for (let i = 0; i < stuff.boardSize; i++) {
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
        }}
    return stuff.noPossibleWin;
}
function rowWinThree(board, color,move) {
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
                stuff.empty === column3[j+move] &&
                (j === stuff.columnSize || column3[j + 1+move] !== stuff.empty)
            ) {
                if(move===0){
                    return i + 3;}
                else {stuff.doNotEnter.push(i+3)}

            } else if (color === column0[j] &&
                color === column1[j] &&
                stuff.empty === column2[j+move] &&
                (j === stuff.columnSize || column2[j + 1+move] !== stuff.empty) &&
                color === column3[j]) {
                if(move===0){
                    return i + 2;}
                else {stuff.doNotEnter.push(i+2)}

            } else if (color === column0[j] &&
                stuff.empty === column1[j+move] &&
                (j === stuff.columnSize || column1[j + 1+move] !== stuff.empty) &&
                color === column2[j] &&
                color === column3[j]) {
                if(move===0){
                    return i + 1;}
                else {stuff.doNotEnter.push(i+1)}

            } else if (stuff.empty === column0[j+move] &&
                (j === stuff.columnSize || column0[j + 1+move] !== stuff.empty) &&
                color === column1[j] &&
                color === column2[j] &&
                color === column3[j]) {
                if(move===0){
                    return i ;}
                else {stuff.doNotEnter.push(i)}            }
        }
    }
    return stuff.noPossibleWin;
}
function rightSlantWinThree(board, color,move) {
    let startPoint = 3;

    for (let i = 0; i < stuff.boardSize; i++) {

        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = startPoint; j < stuff.columnSize; j++) {
            let underC0 = j + 1;
            let underC1 = j;
            let underC2 = j - 1;
            let underC3 = j - 2;
            if (
                //lowest point is j
                stuff.empty === column0[j+move] &&
                (column0[underC0+move] !== stuff.empty) &&
                color === column1[j - 1] &&
                color === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                if(move===0){
                    return i;}
                else {
                    stuff.doNotEnter.push(i)
                }
            }
            if (
                color === column0[j] &&
                stuff.empty === column1[j - 1+move] &&
                (column1[underC1+move] !== stuff.empty) &&
                color === column2[j - 2] &&
                color === column3[j - 3]
            ) {
                if(move===0){
                    return i+1;}
                else {
                    stuff.doNotEnter.push(i+1)
                }            }
            if (
                color === column0[j] &&
                color === column1[j - 1] &&
                stuff.empty === column2[j - 2+move] &&
                (column2[underC2+move] !== stuff.empty) &&
                color === column3[j - 3]
            ) {
                if(move===0){
                    return i+2;}
                else {
                    stuff.doNotEnter.push(i+2)
                }            }
            if (
                color === column0[j] &&
                color === column1[j - 1] &&
                color === column2[j - 2] &&
                stuff.empty === column3[j - 3+move] &&
                (column3[underC3+move] !== stuff.empty)
            ) {
                if(move===0){
                    return i+3;}
                else {
                    stuff.doNotEnter.push(i+3)
                }            }
        }
    }
    return stuff.noPossibleWin;
}
function leftSlantWinThree(board, color,move) {
    let endPoint = 3;
    for (let i = 0; i < stuff.boardSize - endPoint; i++) {

        let column0 = board[i];
        let column1 = board[i + 1];
        let column2 = board[i + 2];
        let column3 = board[i + 3];
        for (let j = 0; j < stuff.columnSize - endPoint; j++) {
            let c0 = j
            let c1 = j+1
            let c2 = j+2
            let c3 = j+3

            let underC0 = j + 1;
            let underC1 = j + 2;
            let underC2 = j + 3;
            let underC3 = j + 4;
            if (
                //highest point is j
                stuff.empty === column0[c0+move] &&
                color === column1[c1] &&
                color === column2[c2] &&
                color === column3[c3]
            ) {
                if (column0[underC0+move] !== stuff.empty) {
                    if(move===0){
                        return i;}
                    else {
                        stuff.doNotEnter.push(i)
                    }
                }
            }

            if (
                color === column0[c0] &&
                stuff.empty === column1[c1+move] &&
                color === column2[c2] &&
                color === column3[c3]
            ) {
                if (column1[underC1+move] !== stuff.empty) {
                    if(move===0){
                        return i+1;}
                    else {
                        stuff.doNotEnter.push(i+1)
                    }
                }
            }

            if (
                color === column0[c0] &&
                color === column1[c1] &&
                stuff.empty === column2[c2+move] &&
                color === column3[c3]
            ) {
                if (column2[underC2+move] !== stuff.empty) {
                    if(move===0){
                        return i+2;}
                    else {
                        stuff.doNotEnter.push(i+2)
                    }                }
            }

            if (
                color === column0[c0] &&
                color === column1[c1] &&
                color === column2[c2] &&
                stuff.empty === column3[c3+move]
            ) {
                if (j + endPoint === stuff.columnSize || column3[underC3+move] !== stuff.empty) {
                    if(move===0){
                        return i+3;}
                    else {
                        stuff.doNotEnter.push(i+3)
                    }                }
            }
        }
    }
    return stuff.noPossibleWin;
}

export default AlgorithmStrategy;