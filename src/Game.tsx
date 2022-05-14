import { useReducer } from "react";
import Board from "./Board";
import styles from "./Game.module.scss";
import gameReducer, { getInitState } from "./gameReducer";
import Info from "./Info";
import type { Mark, Status } from "./types";

function getStatusMessage(status: Status, mark: "X" | "O") {
  switch (status) {
    case "WON":
      return `Winner: ${mark === "O" ? "X" : "O"}`;
    case "DRAW":
      return "Draw!";
    case "PLAY":
      return `Next Move: ${mark}`;
  }
}

function findWinningLine(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  return lines.find(
    ([a, b, c]) =>
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  );
}

interface GameProps {
  firstMove?: Mark;
}

export default function Game({ firstMove = "X" }: GameProps) {
  const [{ turns, currentTurnIndex, currentMark }, dispatch] = useReducer(
    gameReducer,
    getInitState(firstMove)
  );

  const { squares } = turns[currentTurnIndex];
  const winningLine = findWinningLine(squares);

  let status: Status = "PLAY";
  if (winningLine) {
    status = "WON";
  } else if (squares.every(Boolean)) {
    status = "DRAW";
  }

  const handleClick = (index: number) => {
    if (status === "PLAY") {
      dispatch({ type: "MARK_SQUARE", payload: { index } });
    }
  };

  const jumpTo = (turn: number) => {
    dispatch({ type: "JUMP_TO_TURN", payload: { index: turn } });
  };

  return (
    <div className={styles.game}>
      <Board
        squares={squares}
        winningLine={winningLine}
        onClick={handleClick}
      />
      <Info
        jumpTo={jumpTo}
        turns={turns}
        currentTurn={currentTurnIndex}
        statusMessage={getStatusMessage(status, currentMark)}
      />
    </div>
  );
}
