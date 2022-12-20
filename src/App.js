import './App.css';
import React from "react";
import checkIfWin from "./CheckIfWin";
import columnClick from "./assets/columnClick.mp3"
import backgroundMusic from "./assets/backgroundMusic1.mp3"

import menuClick from "./assets/menuClick.wav"
import optionsButtons from "./assets/optionsButtons.wav"
import mouseOver from "./assets/mouseOver.mp3"
import victory from "./assets/victory.mp3"
import replay from "./assets/replay.wav"
import AlgorithmStrategy from "./AlgorithmStrategy";

class App extends React.Component {
    state = {
        start: true,
        redTurn: true,
        gameOver: false,
        draw: false,
        //monkey know only how to block
        playerVsMonkey: false,
        //not a real AI. only a complex algorithm to decide the best option
        playerVsAI: false,
        onMenu: true,

        auto:false,

        music:this.music(),

        green: "green",
        red: "red",
        white: "white",

        menu: this.outMenu(),
        playersButton: this.playerButtonOut(),
        monkeyButton: this.monkeyButtonOut(),
        aiButton: this.aiButtonOut()
    }
    indicators = []
    columnsSize = 6
    boardSize = 7
    board = []
    wonColor = undefined;

    render() {
        return (
            <div>
                <tr>
                    <th>{this.state.menu}</th>
                    <th><h1 className="headline">4 in a row</h1></th>
                </tr>
                <div>{this.setGame()}</div>
            </div>
        );
    }

    overMenu() {
        new Audio(mouseOver).play()
        const thisMenu=<th>
            <button onClick={(() => {
                this.clickMenu()
            })}
                    onMouseOver={(() => {
                        this.overMenu()
                    })}
                    onMouseOut={(() => {
                        this.outMenu()
                    })} className={"menu navy textColor"}>Menu
            </button>
        </th>
        this.setState({
            menu:thisMenu
        })
    return thisMenu}

    outMenu() {
        const thisOutMenu=<th>
            <button onClick={(() => {
                this.clickMenu()
            })}
                    onMouseOver={(() => {
                        this.overMenu()
                    })}
                    onMouseOut={(() => {
                        this.outMenu()
                    })} className={"menu"}>Menu
            </button>
        </th>
        this.setState({
            menu: thisOutMenu
        })
    return thisOutMenu}

    clickMenu() {
        new Audio(menuClick).play()
        this.setState({onMenu: true})
        this.reset();
    }

    setGame() {
        if (this.state.onMenu) {
            return <div>
                {this.state.playersButton}
                {this.state.monkeyButton}
                {this.state.aiButton}
            </div>
        }
        if (this.state.start) {
            this.setBoard()
        }
        return this.showBoard();
    }
    gameMoves(){
        if((!this.state.redTurn || this.state.auto)){
            const noOption=-1
        if (this.state.playerVsMonkey && !this.state.gameOver) {
            let random = Math.floor(Math.random() * this.boardSize)
            if (this.state.playerVsAI) {
                const algorithm = AlgorithmStrategy(this.board)
                if (algorithm !== noOption) {
                    this.columnClicked(algorithm)
                } else {
                    this.columnClicked(random)
                }
            } else {
                const low=0
                const algorithm = AlgorithmStrategy(this.board,low)
                if(algorithm!==noOption){
                    this.columnClicked(algorithm)
                }else {
                this.columnClicked(random)}
            }
        }}
    }

    playersButtonOver() {
        new Audio(mouseOver).play()
        this.setState({
            playersButton: <button onClick={(() => {
                this.playerVsPlayer()
            })} className={"green menuButton textColor"}
                                   onMouseOver={(() => {
                                       this.playersButtonOver()
                                   })}
                                   onMouseOut={(() => {
                                       this.playerButtonOut()
                                   })}>player VS player
            </button>
        })
    }
    playerButtonOut() {
        const thisPlayerButtonOut=<button onClick={(() => {
            this.playerVsPlayer()
        })} className={"darkgreen menuButton"}
                                          onMouseOver={(() => {
                                              this.playersButtonOver()
                                          })}
                                          onMouseOut={(() => {
                                              this.playerButtonOut()
                                          })}>player VS player
        </button>
        this.setState({
            playersButton: thisPlayerButtonOut
        })
    return thisPlayerButtonOut}

    monkeyButtonOver() {
        new Audio(mouseOver).play()
        this.setState({
            monkeyButton: <button onClick={(() => {
                this.playerVsMonkey()
            })} className={"red menuButton textColor"}
                                  onMouseOver={(() => {
                                      this.monkeyButtonOver()
                                  })}
                                  onMouseOut={(() => {
                                      this.monkeyButtonOut()
                                  })}>player VS monkey
            </button>
        })
    }
    monkeyButtonOut() {
        const thisMonkeyButton=<button onClick={(() => {
            this.playerVsMonkey()
        })} className={"darkred menuButton"}
                                       onMouseOver={(() => {
                                           this.monkeyButtonOver()
                                       })}
                                       onMouseOut={(() => {
                                           this.monkeyButtonOut()
                                       })}>player VS monkey
        </button>
        this.setState({
            monkeyButton: thisMonkeyButton
        })
    return thisMonkeyButton}

    aiButtonOver() {
        new Audio(mouseOver).play()
        this.setState({
            aiButton: <button onClick={(() => {
                this.playerVsAI()
            })} className={"ai menuButton goldText"}
                              onMouseOver={(() => {
                                  this.aiButtonOver()
                              })}
                              onMouseOut={(() => {
                                  this.aiButtonOut()
                              })}>player VS AI
            </button>
        })
    }
    aiButtonOut() {
        const thisAiButton=<button onClick={(() => {
            this.playerVsAI()
        })} className={"black menuButton"}
                                   onMouseOver={(() => {
                                       this.aiButtonOver()
                                   })}
                                   onMouseOut={(() => {
                                       this.aiButtonOut()
                                   })}>player VS AI
        </button>
        this.setState({
            aiButton: thisAiButton
        })
    return thisAiButton}

    playerVsAI() {
        new Audio(optionsButtons).play()
        this.aiButtonOut()
        this.setState({
            onMenu: false,
            playerVsMonkey: true,
            playerVsAI: true,
        })
    }
    playerVsPlayer() {
        new Audio(optionsButtons).play()
        this.playerButtonOut()
        this.setState({
            onMenu: false,
            playerVsMonkey: false,
            playerVsAI: false
        })
    }
    playerVsMonkey() {
        new Audio(optionsButtons).play()
        this.monkeyButtonOut()
        this.setState({
            onMenu: false,
            playerVsMonkey: true,
            playerVsAI: false
        })
    }

    showBoard() {
        let board2 = []
        let indicators = []
        for (let i = 0; i < this.boardSize; i++) {
            let column = this.board[i];
            let newColumn = [];
            if (this.indicators.length < this.boardSize) {
                this.indicators.push("")
            }
            indicators.push(<div className={"indicator " + this.indicators[i] + " box"}/>)
            for (let j = 0; j < this.columnsSize; j++) {
                let temporary = <div className={column[j] + " box"}></div>
                if(this.state.playerVsAI && column[j]==="green"){
                    temporary = <div className={"ai box"}></div>
                }
                newColumn.push(temporary);
            }

            board2.push(<div onClick={(() => {
                this.columnClicked(i)
            })}
                             onMouseOver={(() => {
                                 this.chooseColor(i)
                             })}
                             onMouseLeave={(() => {
                                 this.indicatorDisappear(i)
                             })}
                             className={"column"}>{newColumn}</div>)
        }
        this.gameMoves()
        return <div>
            <div className={"board"}>{this.displayIndicatorsVictory(indicators)}{board2}</div>
        </div>
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

    displayIndicatorsVictory(indicators) {
        if (this.state.gameOver && !this.state.draw) {
            for (let i = 0; i < indicators.length; i++) {
                if(this.state.playerVsAI && this.wonColor==="green"){
                    indicators[i] = <button className={"indicator ai  winner"}>WON</button>
                }else {
                indicators[i] = <button className={"indicator " + this.wonColor + "  winner"}>WON</button>}
            }
        } else if (this.state.draw) {
            for (let i = 0; i < indicators.length; i++) {
                indicators[i] = <button className={"indicator winner"}>draw</button>
            }
        }
        return indicators;
    }

    columnClicked(i) {
        if (this.state.gameOver) {
            let replaySound= new Audio(replay)
           replaySound.volume=0.6
            replaySound.play()
            this.reset()
        } else {
            let j = 0;
            let color = this.colorTurn()
            if (this.board[i][j] === this.state.white) {
                new Audio(columnClick).play()
                while (this.board[i][j] === this.state.white && j !== this.columnsSize) {
                    this.board[i][j] = color
                    this.board[i][j - 1] = this.state.white
                    j++
                }
                this.victory()
                this.state.redTurn = !this.state.redTurn
            }
            if (!this.state.playerVsMonkey) {
                this.indicators[i] = this.colorTurn()
            }
            this.setState({})
        }
    }

    chooseColor(i) {
         if (this.colorTurn() === this.state.green) {
            this.indicators[i] = this.state.green
        } else {
            this.indicators[i] = this.state.red
        }
        this.setState({})
    }
    indicatorDisappear(i) {
        if(!this.state.gameOver){
        this.indicators[i] = ""
        this.setState({})}
    }
    colorTurn() {
        let color;
        if (this.state.redTurn) {
            color = this.state.red
        } else {
            color = this.state.green
        }
        return color;
    }
    victory() {
        if (checkIfWin(this.board, this.colorTurn())) {
            new Audio(victory).play()
            this.setState({
                gameOver: true
            })
            this.wonColor = this.colorTurn();
        } else if (this.draw()) {
            this.setState({
                gameOver: true,
                draw: true
            })
        }
    }
    draw() {
        for (let i = 0; i < this.boardSize; i++) {
            let column = this.board[i]
            if (column[0] === this.state.white) {
                return false;
            }
        }
        return true;
    }
    reset() {
        this.setState({
            gameOver: false,
            start: true,
            redTurn: true,
            draw: false
        })
        this.indicators = []
        this.board = [];
    }
    music() {
        let music1 = new Audio(backgroundMusic)
        music1.loop = true
        music1.volume = 0.25
        music1.autoplay = true
        return music1
    }
}

export default App;