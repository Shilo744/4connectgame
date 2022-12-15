import './App.css';
import React from "react";
import checkIfWin from "./CheckIfWin";

class App extends React.Component {
    state = {
        start: true,
        redTurn: true,
        gameOver:false,
        playerVsMonkey:false,
        onMenu:true,
        green:"limegreen",
        red:"red",
        white:"white",
    }
    indicators= []
    columnsSize = 6;
    boardSize = 7;
    board = [];
    wonColor = undefined;

    render() {
        return (
            <div className="App">
                <h1 className="headline">4 in a row</h1>
                <div>{this.setGame()}</div>
            </div>
        );
    }
    setGame(){
        if(this.state.onMenu){
            return <div>
                <button onClick={(() => {
                    this.playerVsPlayer()
                })} className={"darkgreen menuButton"}>player VS player
                </button>
                <button onClick={(() => {
                    this.playerVsMonkey()
                })} className={"darkred menuButton"}>player VS monkey
                </button>
            </div>
        }
        if(this.state.start){
            this.setBoard()
        }
        return this.showBoard();
    }
    playerVsPlayer(){
        this.setState({
            onMenu:false,
            playerVsMonkey:false})
    }
    playerVsMonkey(){
        this.setState({
            onMenu:false,
            playerVsMonkey:true})
    }
    setBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            let column = [];
            for (let j = 0; j < this.columnsSize; j++) {
                column[j] = this.state.white
            }
            this.board.push(column)
        }
    }
    showBoard() {
        let board2=[]
        let indicators = []
        for (let i = 0; i < this.boardSize; i++) {
            let column = this.board[i];
            let newColumn = [];
            if(this.indicators.length<this.boardSize){
                this.indicators.push("")
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
        if(this.state.playerVsMonkey && !this.state.redTurn && !this.state.gameOver){
            let random = Math.floor(Math.random() * this.boardSize)
            this.rowClicked(random)
        }
        return <div><div className={"board"}>{this.displayIndicators(indicators)}{board2}</div></div>}

    displayIndicators(indicators){
        if(this.state.gameOver){
            for (let i = 0; i < indicators.length; i++) {
                indicators[i]=<button className={"indicator "+this.wonColor+"  winner"}>WON</button>
            }
        }
        return indicators;
    }
    rowClicked(i) {
        if(this.state.gameOver){
            this.reset()
        }else {
            let j=0;
            let color=this.colorTurn()
            if(this.board[i][j] === this.state.white){
                while(this.board[i][j] === this.state.white && j!==6){
                    this.board[i][j] = color
                    this.board[i][j-1] = this.state.white
                    j++
                }
                this.setState({})
                this.victory()
                this.state.redTurn=!this.state.redTurn
            }
            if(!this.state.playerVsMonkey){
                this.indicators[i]=this.colorTurn()
            }
        }
    }
    chooseColor(i){
        if(this.state.gameOver){
            this.indicators[i]=this.state.white
        }
        else if(this.colorTurn()===this.state.green){
            this.indicators[i]=this.state.green
        }else {
            this.indicators[i]=this.state.red
        }
        this.setState({})
    }
    indicatorDisappear(i){
        this.indicators[i]=""
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
    victory(){
        if(checkIfWin(this.board,this.colorTurn())){
            this.setState({
                gameOver: true,
                redTurn: !this.state.redTurn
            })
            this.wonColor = this.colorTurn();
        }
    }
    reset(){
        this.setState({
            gameOver: false,
            start: true,
            redTurn: true,
            onMenu: true
        })
        this.indicators=[]
        this.board=[];
    }
}
export default App;