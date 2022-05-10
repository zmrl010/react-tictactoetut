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
  turns,
  currentTurn,
  status,
  mark,
}: InfoProps) {
  let statusMessage: string;
  switch (status) {
    case "WON":
      statusMessage = `Winner: ${mark === "O" ? "X" : "O"}`;
      break;
    case "DRAW":
      statusMessage = "Draw!";
      break;
    case "PLAY":
      statusMessage = `Next Move: ${mark}`;
      break;
  }

  return (
    <div className={styles.info}>
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
      <div className={styles.status}>{statusMessage}</div>
    </div>
  );
}
