import { useReducer } from "react";
import Board from "./Board";
import { Mark, Turn } from "./types";
import styles from "./Game.module.scss";
import Info from "./Info";

interface GameProps {
  firstMove?: Mark;
}

type Status = "WON" | "DRAW" | "PLAY";

interface GameState {
  turns: Turn[];
  currentTurn: number;
  currentMark: Mark;
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: string[]) {
  return lines.find(
    ([a, b, c]) =>
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  );
}

type GameAction =
  | {
      type: "MARK_SQUARE";
      payload: {
        index: number;
      };
    }
  | {
      type: "JUMP_TO_TURN";
      payload: {
        turn: number;
      };
    };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MARK_SQUARE":
      const history = state.turns.slice(0, state.currentTurn + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (squares[action.payload.index]) {
        return state;
      }

      squares[action.payload.index] = state.currentMark;

      return {
        ...state,
        turns: [...state.turns, { squares, index: action.payload.index }],
        currentTurn: history.length,
        currentMark: state.currentMark === "X" ? "O" : "X",
      };
    case "JUMP_TO_TURN":
      return {
        ...state,
        currentTurn: action.payload.turn,
      };
    default:
      return state;
  }
}

export default function Game({ firstMove = "X" }: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    turns: [{ squares: Array(9).fill("") }],
    currentTurn: 0,
    currentMark: firstMove,
  });

  const current = state.turns[state.currentTurn];
  const winningLine = calculateWinner(current.squares);

  let status: Status = "PLAY";
  if (winningLine) {
    status = "WON";
  } else if (current.squares.every(Boolean)) {
    status = "DRAW";
  }

  const handleClick = (index: number) => {
    if (status === "PLAY") {
      dispatch({ type: "MARK_SQUARE", payload: { index } });
    }
  };

  const jumpTo = (turn: number) => {
    dispatch({ type: "JUMP_TO_TURN", payload: { turn } });
  };

  return (
    <div className={styles.game}>
      <Board
        squares={current.squares}
        winningLine={winningLine}
        onClick={handleClick}
      />
      <Info
        jumpTo={jumpTo}
        status={status}
        turns={state.turns}
        currentTurn={state.currentTurn}
        mark={state.currentMark}
      />
    </div>
  );
}
