export type Matrix = number[][];

export interface CellState {
  row: number;
  col: number;
  sum: number;
  activeA: number | null; // The value from Matrix A currently in this cell (if any)
  activeB: number | null; // The value from Matrix B currently in this cell (if any)
  isActive: boolean; // True if a multiplication is happening this step
}

export interface SimulationState {
  grid: CellState[][];
  step: number;
}

export interface DataPoint {
  value: number;
  type: 'A' | 'B';
  row: number; // The logic row/col index in the source matrix
  col: number;
  currentX: number; // Grid coordinate X
  currentY: number; // Grid coordinate Y
  id: string; // Unique ID for keying
}