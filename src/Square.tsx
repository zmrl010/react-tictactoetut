import { SquareValue } from "./types";

interface SquareProps {
  isWinner: boolean;
  onClick: () => void;
  value: SquareValue;
}

export default function Square({ isWinner, onClick, value }: SquareProps) {
  return (
    <button
      className={"square " + (isWinner ? "winner" : "")}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
