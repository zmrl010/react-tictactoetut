interface SquareProps {
  isWinner: boolean;
  onClick: () => void;
  value: string;
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
