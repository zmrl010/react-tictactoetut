import { SquareValue } from "./types";
import styles from "./Square.module.css";
import clsx from "clsx";

interface SquareProps {
  isWinner: boolean;
  onClick: () => void;
  value: SquareValue;
}

export default function Square({ isWinner, onClick, value }: SquareProps) {
  const className = clsx(styles.square, { [styles.winner]: isWinner });

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}
