import clsx from "clsx";
import styles from "./Info.module.scss";
import { Mark, Turn } from "./types";

interface InfoProps {
  status: "WON" | "DRAW" | "PLAY";
  jumpTo: (turn: number) => void;
  turns: Turn[];
  currentTurn: number;
  mark: Mark;
}

export default function Info({
  jumpTo,
  status,
  turns,
  currentTurn,
  mark,
}: InfoProps) {
  let statusMessage: string;
  switch (status) {
    case "WON":
      statusMessage = `Winner: ${mark}`;
      break;
    case "DRAW":
      statusMessage = "Draw!";
      break;
    case "PLAY":
    default:
      statusMessage = `Next Move: ${mark}`;
  }

  return (
    <div className={styles.root}>
      <div>{statusMessage}</div>
      <div>History</div>
      <ul>
        {turns.map(({ index = 0, squares }, turn) => (
          <li key={turn} className={clsx({ current: turn === currentTurn })}>
            <button onClick={() => jumpTo(turn)}>
              {turn
                ? `${squares[index]} - (${index % 3}, ${Math.floor(index / 3)})`
                : "Game Start"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
