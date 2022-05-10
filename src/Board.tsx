import { SquareMark } from "./types";
import styles from "./Board.module.scss";
import clsx from "clsx";

/**
 * Create a numerical array from 0..n
 */
function createSequence(n: number) {
  return Array.from(Array(n).keys());
}

const SEQ = createSequence(3);

interface BoardProps {
  squares: SquareMark[];
  winningLine?: number[];
  onClick: (squareIndex: number) => void;
}

export default function Board({ squares, winningLine, onClick }: BoardProps) {
  return (
    <div className={styles.board}>
      {SEQ.map((i) => (
        <div key={i} className={styles.row}>
          {SEQ.map((j) => {
            const flatIndex = j + i * 3;
            return (
              <button
                className={clsx(styles.square, {
                  [styles.winner]: winningLine?.includes(flatIndex),
                })}
                onClick={() => onClick(flatIndex)}
              >
                {squares[flatIndex]}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
