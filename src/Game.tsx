import { Component } from "react";
import Board from "./Board";
import { SquareValue, PlayerSymbol } from "./types";

interface Step {
  squares: SquareValue[];
  selectedIdx: number;
  symbol: SquareValue;
}

interface GameProps {
  firstMove: PlayerSymbol;
}

interface GameState {
  history: Step[];
  reversedHistory?: boolean;
  stepNumber: number;
  xIsNext: boolean;
}

export default class Game extends Component<GameProps, GameState> {
  lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          selectedIdx: null,
          symbol: null,
        },
      ],
      stepNumber: 0,
      xIsNext: props.firstMove === "X",
    };
  }

  calculateWinner(squares) {
    for (let i = 0; i < this.lines.length; ++i) {
      const [a, b, c] = this.lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return [squares[a], i];
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          selectedIdx: i,
          symbol: squares[i],
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const col = step.selectedIdx % 3;
      const row = Math.floor(step.selectedIdx / 3);
      const desc = move
        ? `Move #${move} - ${step.symbol} - (${col}, ${row})`
        : "Game Start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move === this.state.stepNumber ? <strong>{desc}</strong> : desc}
          </button>
        </li>
      );
    });

    let status;
    let winningLine = [];
    if (winner) {
      status = "Winner: " + winner[0];
      winningLine = this.lines[winner[1]];
    } else if (current.squares.every((x) => x)) {
      status = "Draw!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningLine={winningLine}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button
              onClick={() =>
                this.setState({
                  reversedHistory: !this.state.reversedHistory,
                })
              }
            >
              Go to {this.state.reversedHistory ? "^" : "v"}
            </button>
          </div>
          <ol>{this.state.reversedHistory ? moves.reverse() : moves}</ol>
        </div>
      </div>
    );
  }
}
