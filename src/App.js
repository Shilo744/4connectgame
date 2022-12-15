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
        green:"green",
        red:"red",
        white:"white",
        menu:<th><button onClick={(()=>{this.clickMenu()})}
                         onMouseOver={(()=>{this.overMenu()})}
                         onMouseOut={(()=>{this.outMenu()})}
                         className={"menu"}>Menu</button></th>,
        playersButton:<button onClick={(() => {
            this.playerVsPlayer()
        })} className={"darkgreen menuButton"}
            onMouseOver={(() => {this.playersButtonOver()})}>player VS player
        </button>,
        monkeyButton:<button onClick={(() => {
                this.playerVsMonkey()
            })} className={"darkred menuButton"}
                                           onMouseOver={(() => {this.monkeyButtonOver()})}
                                           onMouseOut={(() => {this.monkeyButtonOut()})}>player VS monkey
            </button>
    }

    indicators= []
    columnsSize = 6;
    boardSize = 7;
    board = [];
    wonColor = undefined;

    render() {
        return (
            <div>
               <tr>{this.state.menu}
                   <th><h1 className="headline">4 in a row</h1></th></tr>
                <div>{this.setGame()}</div>
            </div>
        );
    }
    overMenu(){
        this.setState({menu:<th><button onClick={(()=>{this.clickMenu()})}
                                        onMouseOver={(()=>{this.overMenu()})}
                                        onMouseOut={(()=>{this.outMenu()})} className={"menu navy"}>Menu</button></th>})
    }
    outMenu(){
        this.setState({menu:<th><button onClick={(()=>{this.clickMenu()})}
                                        onMouseOver={(()=>{this.overMenu()})}
                                        onMouseOut={(()=>{this.outMenu()})} className={"menu"}>Menu</button></th>})
    }

    clickMenu(){
    this.setState({onMenu:true})
    this.reset();
    }
    setGame(){
        if(this.state.onMenu){
            return <div>
                {this.state.playersButton}
                {this.state.monkeyButton}
            </div>
        }
        if(this.state.start){
            this.setBoard()
        }
        return this.showBoard();
    }
    playersButtonOver(){
        this.setState({playersButton:<button onClick={(() => {
                this.playerVsPlayer()
            })} className={"green menuButton"}
             onMouseOver={(() => {this.playersButtonOver()})}
                                             onMouseOut={(() => {this.playerButtonOut()})}>player VS player
            </button>})
    }
    playerButtonOut(){
        this.setState({playersButton:<button onClick={(() => {
                this.playerVsPlayer()
            })} className={"darkgreen menuButton"}
               onMouseOver={(() => {this.playersButtonOver(this.state.green,this)})}
                                             onMouseOut={(() => {this.playerButtonOut()})}>player VS player
            </button>})
    }
    monkeyButtonOver(){
        this.setState({monkeyButton:<button onClick={(() => {
                this.playerVsMonkey()
            })} className={"red menuButton"}
                                             onMouseOver={(() => {this.monkeyButtonOver()})}
                                             onMouseOut={(() => {this.monkeyButtonOut()})}>player VS monkey
            </button>})
    }
    monkeyButtonOut(){
        this.setState({monkeyButton:<button onClick={(() => {
                this.playerVsMonkey()
            })} className={"darkred menuButton"}
                                            onMouseOver={(() => {this.monkeyButtonOver()})}
                                            onMouseOut={(() => {this.monkeyButtonOut()})}>player VS monkey
            </button>})
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
                while(this.board[i][j] === this.state.white && j!==this.columnsSize){
                    this.board[i][j] = color
                    this.board[i][j-1] = this.state.white
                    j++
                }
                this.victory()
                this.state.redTurn=!this.state.redTurn
            }
            if(!this.state.playerVsMonkey){
                this.indicators[i]=this.colorTurn()
            }
            this.setState({})
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
        this.setState({})
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
                gameOver: true
            })
            this.wonColor = this.colorTurn();
        }
    }
    reset(){
        this.setState({
            gameOver: false,
            start: true,
            redTurn: true,
        })
        this.indicators=[]
        this.board=[];
    }
}
export default App;