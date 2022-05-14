import clsx from "clsx";
import styles from "./Board.module.scss";
import type { SquareMark } from "./types";

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

export default function Board({
  squares,
  winningLine = [],
  onClick,
}: BoardProps) {
  const squareElements = squares.map((square, i) => (
    <button
      className={clsx(styles.square, {
        [styles.winner]: winningLine.includes(i),
      })}
      onClick={() => onClick(i)}
    >
      {square}
    </button>
  ));

  return (
    <div className={styles.board}>
      {SEQ.map((i) => (
        <div key={i} className={styles.row}>
          {SEQ.map((j) => squareElements[j + i * 3])}
        </div>
      ))}
    </div>
  );
}
