import React from 'react';
import { DataPoint } from '../types';

interface DataTokenProps {
  point: DataPoint;
  cellSize: number;
  gap: number;
  gridOriginX: number;
  gridOriginY: number;
}

export const DataToken: React.FC<DataTokenProps> = ({ point, cellSize, gap, gridOriginX, gridOriginY }) => {
  // Calculate absolute position based on grid coordinates
  // gridOrigin is where (0,0) starts
  const left = gridOriginX + point.currentX * (cellSize + gap);
  const top = gridOriginY + point.currentY * (cellSize + gap);

  const isTypeA = point.type === 'A';

  return (
    <div
      className="absolute flex items-center justify-center transition-all duration-500 ease-in-out shadow-lg"
      style={{
        width: `${cellSize * 0.6}px`,
        height: `${cellSize * 0.6}px`,
        left: left + (cellSize * 0.2), // Center in cell
        top: top + (cellSize * 0.2),
        transform: 'translate3d(0,0,0)', // GPU acc
        zIndex: 20, // Above grid cells
      }}
    >
      <div 
        className={`
          w-full h-full rounded-full flex items-center justify-center text-slate-900 font-bold font-mono text-sm border-2
          ${isTypeA ? 'bg-pink-400 border-pink-200' : 'bg-emerald-400 border-emerald-200'}
        `}
      >
        {point.value}
      </div>
      {/* Label for debugging/educational clarity (e.g. A00) */}
      <div className={`
        absolute -top-4 text-[10px] font-bold opacity-70 whitespace-nowrap
        ${isTypeA ? 'text-pink-300' : 'text-emerald-300'}
      `}>
        {isTypeA ? `a${point.row}${point.col}` : `b${point.row}${point.col}`}
      </div>
    </div>
  );
};
