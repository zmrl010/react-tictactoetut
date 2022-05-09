import { Component } from "react";
import Square from "./Square";
import { SquareValue } from "./types";

export interface BoardProps {
  squares: SquareValue[];
  winningLine: number[];
  onClick: (i: number) => void;
}

export default class Board extends Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        isWinner={this.props.winningLine.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const numRows = 3;
    const numCols = 3;

    const rows = [];
    for (let i = 0; i < numRows; ++i) {
      const cols = [];
      for (let j = 0; j < numCols; ++j) {
        cols.push(this.renderSquare(j + i * numCols));
      }
      rows.push(
        <div key={i} className="board-row">
          {cols}
        </div>
      );
    }
    return <div>{rows}</div>;
  }
}
