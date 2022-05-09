import { useState } from "react";
import Board from "./Board";
import { SquareValue, PlayerSymbol } from "./types";
import styles from "./Game.module.css";

interface Step {
  squares: SquareValue[];
  selectedIdx: number | null;
  symbol: SquareValue;
}

interface GameProps {
  firstMove: PlayerSymbol;
}

interface GameState {
  history: Step[];
  reversedHistory?: boolean;
  stepNumber: number;
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

export default function Game(props: GameProps) {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: Array(9).fill(null),
        selectedIdx: null,
        symbol: null,
      },
    ],
    stepNumber: 0,
    xIsNext: props.firstMove === "X",
  });

  const calculateWinner = (squares: SquareValue[]) => {
    for (let i = 0; i < lines.length; ++i) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return [squares[a], i] as const;
    }
    return null;
  };

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? "X" : "O";
    setState((state) => {
      return {
        ...state,
        history: history.concat([
          {
            squares,
            selectedIdx: i,
            symbol: squares[i],
          },
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      };
    });
  };

  const jumpTo = (step: number) => {
    setState((state) => ({
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    }));
  };

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const index = step.selectedIdx ?? 0;
    const col = index % 3;
    const row = Math.floor(index / 3);
    const desc = move
      ? `Move #${move} - ${step.symbol} - (${col}, ${row})`
      : "Game Start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move === state.stepNumber ? <strong>{desc}</strong> : desc}
        </button>
      </li>
    );
  });

  let status;
  let winningLine: number[] = [];
  if (winner) {
    status = "Winner: " + winner[0];
    winningLine = lines[winner[1]];
  } else if (current.squares.every((x) => x)) {
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
          <button
            onClick={() =>
              setState((state) => ({
                ...state,
                reversedHistory: !state.reversedHistory,
              }))
            }
          >
            Go to {state.reversedHistory ? "^" : "v"}
          </button>
        </div>
        <ol>{state.reversedHistory ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}
