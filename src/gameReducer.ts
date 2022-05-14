import { Mark, Turn } from "./types";

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
        index: number;
      };
    }
  | { type: "RESET" };

interface GameState {
  turns: Turn[];
  currentTurnIndex: number;
  currentMark: Mark;
}

export function getInitState(firstMove: Mark = "X") {
  return {
    turns: [{ squares: Array(9).fill("") }],
    currentTurnIndex: 0,
    currentMark: firstMove,
  };
}

export default function gameReducer(
  state: GameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case "MARK_SQUARE":
      const history = state.turns.slice(0, state.currentTurnIndex + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (squares[action.payload.index]) {
        return state;
      }

      squares[action.payload.index] = state.currentMark;

      return {
        ...state,
        turns: [...state.turns, { squares, index: action.payload.index }],
        currentTurnIndex: history.length,
        currentMark: state.currentMark === "X" ? "O" : "X",
      };
    case "JUMP_TO_TURN":
      return {
        ...state,
        currentTurnIndex: action.payload.index,
      };
    default:
      return state;
  }
}
