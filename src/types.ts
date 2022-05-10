export type Mark = "X" | "O";
export type SquareValue = Mark | "";

export interface Turn {
  squares: SquareValue[];
  index?: number;
}
