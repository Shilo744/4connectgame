
function CheckIfWin(board,color){

     if(columnWin(board, color)){
         return true;
     }
return false;}
function columnWin(board,color){

    for (let i = 0; i <board.length-1; i++) {
        let column=board[i];
        for (let j = 0; j < board[i].length-4; j++) {
            if(color===column[j]===column[j+1]===column[j+2]===column[j+3]){
                return true;
            }
        }
    }
    return false;
}
export default CheckIfWin;