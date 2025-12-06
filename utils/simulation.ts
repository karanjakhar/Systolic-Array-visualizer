import { Matrix, CellState, DataPoint } from '../types';

export const MATRIX_SIZE = 3;

// Default Matrices
export const INITIAL_MATRIX_A: Matrix = [
  [1, 2, 1],
  [2, 3, 1],
  [1, 1, 2]
];

export const INITIAL_MATRIX_B: Matrix = [
  [1, 0, 2],
  [2, 1, 1],
  [0, 1, 1]
];

/**
 * Calculates the state of the grid (accumulators) at a specific time step.
 * We simulate from t=0 up to currentStep to ensure correct accumulation.
 */
export const calculateGridState = (step: number, matrixA: Matrix, matrixB: Matrix): CellState[][] => {
  // Initialize empty grid
  const grid: CellState[][] = Array.from({ length: MATRIX_SIZE }, (_, r) =>
    Array.from({ length: MATRIX_SIZE }, (_, c) => ({
      row: r,
      col: c,
      sum: 0,
      activeA: null,
      activeB: null,
      isActive: false
    }))
  );

  // We need to simulate step-by-step to accumulate sums correctly
  // Simulation runs for steps 1 to currentStep
  for (let s = 1; s <= step; s++) {
    for (let r = 0; r < MATRIX_SIZE; r++) {
      for (let c = 0; c < MATRIX_SIZE; c++) {
        // Reset transient state for this step
        if (s === step) {
           grid[r][c].activeA = null;
           grid[r][c].activeB = null;
           grid[r][c].isActive = false;
        }

        // Determine if inputs meet at this cell at time s
        // Formula: Meet time t = r + c + k + 1 (assuming 1-based step, 0-based index)
        // So k = s - r - c - 1
        const k = s - r - c - 1;

        if (k >= 0 && k < MATRIX_SIZE) {
          const valA = matrixA[r][k];
          const valB = matrixB[k][c];
          
          grid[r][c].sum += valA * valB;
          
          // If this is the current frame we are rendering, mark active
          if (s === step) {
            grid[r][c].activeA = valA;
            grid[r][c].activeB = valB;
            grid[r][c].isActive = true;
          }
        }
      }
    }
  }

  return grid;
};

/**
 * Calculates the position of all flowing data points for the visualization at a given step.
 */
export const calculateDataPoints = (step: number, matrixA: Matrix, matrixB: Matrix): DataPoint[] => {
  const points: DataPoint[] = [];

  // Generate points for Matrix A (Rows flowing Right)
  for (let r = 0; r < MATRIX_SIZE; r++) {
    for (let k = 0; k < MATRIX_SIZE; k++) {
      // Logic for position:
      // Start X at t=0 is skewed.
      // Row r is delayed by r. Sequence index k is behind k.
      // Initial X = -1 (just left of grid) - r (row skew) - k (sequence order)
      // Position at time step: X + step
      const initialX = -1 - r - k;
      const currentX = initialX + step;
      const currentY = r;

      // Only include if it's within a visible range (e.g., somewhat left of grid or inside)
      if (currentX > -8 && currentX < MATRIX_SIZE + 2) {
        points.push({
          value: matrixA[r][k],
          type: 'A',
          row: r,
          col: k,
          currentX,
          currentY,
          id: `A-${r}-${k}`
        });
      }
    }
  }

  // Generate points for Matrix B (Columns flowing Down)
  for (let c = 0; c < MATRIX_SIZE; c++) {
    for (let k = 0; k < MATRIX_SIZE; k++) {
      // Logic for position:
      // Start Y at t=0 is skewed.
      // Col c is delayed by c. Sequence index k (row in B) is behind k.
      // Initial Y = -1 - c (col skew) - k (sequence order)
      // Position at time step: Y + step
      const initialY = -1 - c - k;
      const currentY = initialY + step;
      const currentX = c;

      if (currentY > -8 && currentY < MATRIX_SIZE + 2) {
        points.push({
          value: matrixB[k][c],
          type: 'B',
          row: k,
          col: c,
          currentX,
          currentY,
          id: `B-${k}-${c}`
        });
      }
    }
  }

  return points;
};
