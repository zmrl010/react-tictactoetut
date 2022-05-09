import { useReducer } from "react";
import Board from "./Board";
import { SquareValue, Mark } from "./types";
import styles from "./Game.module.css";

interface Turn {
  squares: SquareValue[];
  index?: number;
}

interface GameProps {
  firstMove?: Mark;
}

interface GameState {
  turns: Turn[];
  reverseTurns?: boolean;
  currentTurn: number;
  // currentMark: Mark;
  xIsNext: boolean;
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
  const winningLine = lines.find(
    ([a, b, c]) =>
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  );

  return winningLine ?? null;
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
    }
  | {
      type: "REVERSE_TURNS";
    };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MARK_SQUARE":
      const history = state.turns.slice(0, state.currentTurn + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (squares[action.payload.index] ?? calculateWinner(squares)) {
        return state;
      }

      squares[action.payload.index] = state.xIsNext ? "X" : "O";

      return {
        ...state,
        turns: [...state.turns, { squares, index: action.payload.index }],
        currentTurn: history.length,
        xIsNext: !state.xIsNext,
      };
    case "JUMP_TO_TURN":
      return {
        ...state,
        currentTurn: action.payload.turn,
        xIsNext: action.payload.turn % 2 === 0,
      };
    case "REVERSE_TURNS":
      return {
        ...state,
        reverseTurns: !state.reverseTurns,
      };
    default:
      return state;
  }
}

export default function Game({ firstMove = "X" }: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    turns: [{ squares: Array(9).fill("") }],
    currentTurn: 0,
    // currentMark: firstMove,
    xIsNext: firstMove === "X",
  });

  const handleClick = (index: number) => {
    dispatch({ type: "MARK_SQUARE", payload: { index } });
  };

  const jumpTo = (turn: number) => {
    dispatch({ type: "JUMP_TO_TURN", payload: { turn } });
  };

  const current = state.turns[state.currentTurn];
  const winner = calculateWinner(current.squares);

  const moves = state.turns.map(({ index = 0, squares }, move) => {
    const desc = move
      ? `${squares[index]} - (${index % 3}, ${Math.floor(index / 3)})`
      : "Game Start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move === state.currentTurn ? <strong>{desc}</strong> : desc}
        </button>
      </li>
    );
  });

  let status;
  let winningLine: number[] = [];
  if (winner) {
    status = "Winner: " + winner[0];
    winningLine = lines[winner[1]];
  } else if (current.squares.every(Boolean)) {
    status = "Draw!";
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  return (
    <div className={styles.game}>
      <Board
        squares={current.squares}
        winningLine={winningLine}
        onClick={handleClick}
      />
      <div className={styles["game-info"]}>
        <div>{status}</div>
        <div>
          <button onClick={() => dispatch({ type: "REVERSE_TURNS" })}>
            History {state.reverseTurns ? <>&#11014;</> : <>&#11015;</>}
          </button>
        </div>
        <ol>{state.reverseTurns ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}
