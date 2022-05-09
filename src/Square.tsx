import { SquareValue } from "./types";
import styles from "./Square.module.css";

interface SquareProps {
  isWinner: boolean;
  onClick: () => void;
  value: SquareValue;
}

export default function Square({ isWinner, onClick, value }: SquareProps) {
  return (
    <button
      className={styles.square + " " + (isWinner ? styles.winner : "")}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
