import React, { useMemo } from 'react';
import { Matrix, CellState } from '../types';
import { calculateDataPoints, MATRIX_SIZE } from '../utils/simulation';
import { GridCell } from './GridCell';
import { DataToken } from './DataToken';

interface SystolicGridProps {
  gridState: CellState[][];
  matrixA: Matrix;
  matrixB: Matrix;
  step: number;
}

export const SystolicGrid: React.FC<SystolicGridProps> = ({ gridState, matrixA, matrixB, step }) => {
  const CELL_SIZE = 96; // 6rem (w-24)
  const GAP = 16; // 1rem (gap-4)
  
  // Calculate data tokens position
  const dataPoints = useMemo(() => 
    calculateDataPoints(step, matrixA, matrixB), 
    [step, matrixA, matrixB]
  );

  // We need a fixed container size to ensure absolute positioning works relative to a known origin
  // The grid is 3x3. 
  // Origin (0,0) of grid should be roughly centered, but we need space top/left for inputs.
  // Let's define the "Grid Area" origin relative to this container.
  // We'll give plenty of padding.
  
  const GRID_ORIGIN_X = 350; // Space for Matrix A on left
  const GRID_ORIGIN_Y = 300; // Space for Matrix B on top

  return (
    <div className="relative w-full h-[700px] bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
      
      {/* Background Grid Lines for visual context (optional aesthetics) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Axis Labels */}
      <div className="absolute text-slate-500 font-mono text-xs" style={{ left: GRID_ORIGIN_X, top: GRID_ORIGIN_Y - 40 }}>
        Matrix B (Flows Down)
      </div>
      <div className="absolute text-slate-500 font-mono text-xs -rotate-90 origin-bottom-left" style={{ left: GRID_ORIGIN_X - 20, top: GRID_ORIGIN_Y }}>
        Matrix A (Flows Right)
      </div>

      {/* The 3x3 Processing Unit Grid */}
      <div 
        className="absolute grid grid-cols-3 gap-4"
        style={{ 
          left: GRID_ORIGIN_X, 
          top: GRID_ORIGIN_Y,
          width: (CELL_SIZE * MATRIX_SIZE) + (GAP * (MATRIX_SIZE - 1)),
          height: (CELL_SIZE * MATRIX_SIZE) + (GAP * (MATRIX_SIZE - 1))
        }}
      >
        {gridState.map((row, rIdx) => (
          row.map((cell, cIdx) => (
            <GridCell key={`cell-${rIdx}-${cIdx}`} state={cell} />
          ))
        ))}
      </div>

      {/* Floating Data Tokens */}
      {dataPoints.map((point) => (
        <DataToken 
          key={point.id} 
          point={point} 
          cellSize={CELL_SIZE} 
          gap={GAP} 
          gridOriginX={GRID_ORIGIN_X}
          gridOriginY={GRID_ORIGIN_Y}
        />
      ))}

      {/* Visualization Annotations */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-500 font-mono text-right">
        <div className="flex items-center justify-end gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-pink-400 inline-block"></span> Input A
        </div>
        <div className="flex items-center justify-end gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span> Input B
        </div>
        <div className="flex items-center justify-end gap-2">
          <span className="w-3 h-3 rounded border border-tpu-highlight bg-tpu-panel inline-block"></span> MAC Unit
        </div>
      </div>

    </div>
  );
};
