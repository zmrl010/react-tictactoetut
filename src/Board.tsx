import Square from "./Square";
import { SquareValue } from "./types";

/**
 * Create a numerical array from 0..n
 */
function createSequence(n: number) {
  return Array.from(Array(n).keys());
}

const SEQ = createSequence(3);

interface BoardProps {
  squares: SquareValue[];
  winningLine?: number[];
  onClick: (squareIndex: number) => void;
}

interface BoardRowProps extends BoardProps {
  index: number;
}

function BoardRow({ squares, winningLine, onClick, index }: BoardRowProps) {
  return (
    <div key={index}>
      {SEQ.map((j) => {
        const flatIndex = j + index * 3;
        return (
          <Square
            key={j}
            value={squares[flatIndex]}
            isWinner={winningLine?.includes(flatIndex)}
            onClick={() => onClick(flatIndex)}
          />
        );
      })}
    </div>
  );
}

export default function Board(props: BoardProps) {
  return (
    <div>
      {SEQ.map((i) => (
        <BoardRow key={i} index={i} {...props} />
      ))}
    </div>
  );
}
