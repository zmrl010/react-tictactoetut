export type Mark = "X" | "O";
export type SquareMark = Mark | "";

export interface Turn {
  squares: SquareMark[];
  index?: number;
}

export type Status = "WON" | "DRAW" | "PLAY";
