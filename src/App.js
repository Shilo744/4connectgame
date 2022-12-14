import './App.css';
import React from "react";
import checkIfWin from "./CheckIfWin";

class App extends React.Component {
    state = {
        start: true,
        redTurn: true,
        gameOver:false,
        green:"limegreen",
        red:"red",
        white:"white"
    }
    indicators= []
    columnsSize = 6;
    boardSize = 7;
    board = [];
    victory(){
     return checkIfWin(this.board,this.colorTurn())
    }
    chooseColor(i){
        if(this.colorTurn()===this.state.green){
            this.indicators[i]=this.state.green
        }else {
            this.indicators[i]=this.state.red
        }
        this.setState({})
    }
    indicatorDisappear(i){
        this.indicators[i]=this.state.white
    }
    setBoard() {
        if (this.state.start) {
            for (let i = 0; i < this.boardSize; i++) {
                let column = [];
                for (let j = 0; j < this.columnsSize; j++) {
                    column[j] = this.state.white
                }
                this.board.push(column)
            }
        }
        return this.showBoard();
    }

    showBoard() {
        let board2=[]
        let indicators = []

        for (let i = 0; i < this.boardSize; i++) {
            let column = this.board[i];
            let newColumn = [];
            if(this.indicators.length<this.boardSize){
            this.indicators.push(this.state.white)
            }
            indicators.push(<div className={"indicator "+this.indicators[i]+ " box"}></div>)
            for (let j = 0; j < this.columnsSize; j++) {
                let temporary = <div className={column[j] + " box"}></div>
                newColumn.push(temporary);
            }
            board2.push(<div onClick={(() => {this.rowClicked(i)})}
                             onMouseOver={(() => {this.chooseColor(i)})}
                             onMouseLeave={(() => {this.indicatorDisappear(i)})}
                             className={"column"}>{newColumn}</div>)
        }
        return <div><div className={"board"}>{indicators}{board2}</div></div>}

    render() {
        return (
            <div className="App">
                <h1 className="headline">4 in a row</h1>
                <div>{this.setBoard()}</div>
            </div>
        );
    }

    rowClicked(i) {
        this.setState({start: false})
        let j=0;
        let color=this.colorTurn()
        if(this.board[i][j] === this.state.white){
        while(this.board[i][j] === this.state.white && j!==6){
        this.board[i][j] = color
            this.board[i][j-1] = this.state.white
        j++}
            this.state.redTurn=!this.state.redTurn}
        this.indicators[i]=this.colorTurn()
        return this.setBoard(this.board)

    }
    colorTurn(){
        let color;
        if(this.state.redTurn){
            color=this.state.red
        }else {
            color=this.state.green
        }
        return color;
    }
}
export default App;
