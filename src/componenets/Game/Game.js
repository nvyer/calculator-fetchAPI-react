import React from 'react';
import { render } from 'react-dom';
import { Board } from './Board';
import './game.css';

class Game extends React.Component {
    static intervalId;
    constructor(props,) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            count: 6,
            isGameOver: true
        };
    };

    countDown = () => {
        this.intervalId = setInterval(() => {
            this.setState(({ count: prevCount }) => ({
                count: prevCount - 1
            }))
            if (this.state.count === 0) {
                this.setState({
                    isGameOver: false
                })
                clearInterval(this.intervalId);
            }
        }, 1000);
    }

    handleClick(i) {
        if(this.state.isGameOver){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        clearInterval(this.intervalId);

            this.setState({
                history: history.concat([{
                squares: squares,
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
                count: 6,
                isGameOver:true
            }, this.countDown);
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const count = this.state.count;

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            clearInterval(this.intervalId);
            status = 'Winner: ' + winner;
        } else if (this.state.count === 0) {
            clearInterval(this.intervalId);
            status = 'Winner: ' + (this.state.xIsNext ? "O" : "X");
            setTimeout(() => {
                this.setState({
                    history: [{
                        squares: Array(9).fill(null),
                    }],
                    stepNumber: 0,
                    xIsNext: true,
                    count: 6,
                    isGameOver:true
                })
            }, 4000)
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        <div>{status}</div>
                        <br></br>
                        <div >Count: {count}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

render(
    <div>
        <Game />
        <br />
        <h4 className='txt'>
            Exercise
        </h4>
        <h4>
            Add a 6 second countdown stopwatch to the game  (6... 5... 4... 3... 2... 1... 0)
            <br /><br />
                So every player in his turn, will have 6 seconds to finish a turn
        </h4>
        <h4>
            A player will loose game if not played in the 6 seconds
        </h4>
    </div>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;
