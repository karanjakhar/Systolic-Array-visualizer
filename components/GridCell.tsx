import React from 'react';
import { CellState } from '../types';
import { Cpu, Plus, X } from 'lucide-react';

interface GridCellProps {
  state: CellState;
}

export const GridCell: React.FC<GridCellProps> = ({ state }) => {
  const { sum, activeA, activeB, isActive } = state;

  return (
    <div 
      className={`
        relative w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300
        ${isActive 
          ? 'bg-tpu-panel border-tpu-highlight shadow-[0_0_15px_rgba(129,140,248,0.5)] scale-105 z-10' 
          : 'bg-slate-800/50 border-slate-700 shadow-sm z-0'}
      `}
    >
      {/* Background Icon to signify hardware */}
      <Cpu className={`absolute top-1 left-1 w-4 h-4 ${isActive ? 'text-tpu-highlight' : 'text-slate-600'} opacity-50`} />

      {/* Main Accumulator Display */}
      <div className="flex flex-col items-center z-10">
        <span className="text-xs text-slate-400 font-mono mb-1">ACC</span>
        <span className={`text-2xl font-bold font-mono ${isActive ? 'text-white' : 'text-slate-300'}`}>
          {sum}
        </span>
      </div>

      {/* Active Calculation Overlay */}
      <div 
        className={`
          absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-200
          ${isActive ? 'opacity-100' : ''}
        `}
      >
        <div className="absolute top-1 right-1 text-[10px] text-tpu-inputA font-bold font-mono">
           {activeA !== null ? activeA : ''}
        </div>
        <div className="absolute bottom-1 left-1 text-[10px] text-tpu-inputB font-bold font-mono">
           {activeB !== null ? activeB : ''}
        </div>
        
        {/* Visual cue for multiplication */}
        {isActive && (
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tpu-highlight opacity-10"></div>
           </div>
        )}
      </div>

      {/* Operation Indicators (Tiny) */}
      <div className="absolute bottom-1 right-1 flex gap-0.5 opacity-30">
        <X size={10} />
        <Plus size={10} />
      </div>
    </div>
  );
};
