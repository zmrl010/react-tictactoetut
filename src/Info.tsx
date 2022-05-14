import clsx from "clsx";
import styles from "./Info.module.scss";
import type { Turn } from "./types";

interface TurnListProps {
  jumpTo: (turn: number) => void;
  turns: Turn[];
  currentTurn: number;
}

function TurnList({ jumpTo, turns, currentTurn }: TurnListProps) {
  return (
    <ul className={styles.turns}>
      {turns.map(({ index = 0, squares }, turnIndex) => (
        <li
          key={turnIndex}
          className={clsx({ current: turnIndex === currentTurn })}
        >
          <button onClick={() => jumpTo(turnIndex)}>
            {turnIndex
              ? `${squares[index]} - (${index % 3}, ${Math.floor(index / 3)})`
              : "Game Start"}
          </button>
        </li>
      ))}
    </ul>
  );
}

interface InfoProps extends TurnListProps {
  statusMessage: string;
}

export default function Info({ statusMessage, ...turnListProps }: InfoProps) {
  return (
    <div className={styles.info}>
      <TurnList {...turnListProps} />
      <div className={styles.status}>{statusMessage}</div>
    </div>
  );
}
