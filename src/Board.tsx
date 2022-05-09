import Square from "./Square";
import { SquareValue } from "./types";

/**
 * Create a numerical array from 0..n
 */
function createSequence(n: number) {
  return Array.from(Array(n).keys());
}

interface BoardProps {
  squares: SquareValue[];
  winningLine: number[];
  onClick: (squareIndex: number) => void;
}

const SEQ = createSequence(3);

export default function Board({ squares, winningLine, onClick }: BoardProps) {
  return (
    <div className="game-board">
      {SEQ.map((i) => (
        <div key={i} className="board-row">
          {SEQ.map((j) => {
            const flatIndex = j + i * 3;
            return (
              <Square
                key={j}
                value={squares[flatIndex]}
                isWinner={winningLine.includes(flatIndex)}
                onClick={() => onClick(flatIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
