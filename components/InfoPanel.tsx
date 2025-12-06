import React from 'react';
import { MATRIX_SIZE } from '../utils/simulation';

interface InfoPanelProps {
  step: number;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ step }) => {
  return (
    <div className="bg-tpu-panel p-6 rounded-xl border border-slate-700 h-full flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span className="w-1 h-6 bg-tpu-accent rounded-full"></span>
          What is a Systolic Array?
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          A systolic array is a network of tightly coupled Processing Elements (PEs). 
          Like a heart pumping blood (systole), data flows rhythmically through the network.
          In a TPU, this architecture allows for massive parallel matrix multiplication with minimal memory access, 
          passing data directly between neighbors.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-700 pb-2">
          Current Operation Analysis
        </h4>
        
        <div className="text-sm text-slate-300 space-y-3">
          <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
            <span className="block text-xs text-slate-500 mb-1">Data Flow</span>
            Input A (Rows) are skewed so row <code>i</code> is delayed by <code>i</code> steps.<br/>
            Input B (Columns) are skewed so col <code>j</code> is delayed by <code>j</code> steps.
          </div>

          <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
            <span className="block text-xs text-slate-500 mb-1">Processing Element (PE)</span>
            At each step, active cells perform a <strong>Multiply-Accumulate (MAC)</strong>:<br/>
            <code className="block mt-2 text-tpu-accent bg-slate-900 p-2 rounded">
              Sum += a_ik × b_kj
            </code>
          </div>

          <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
            <span className="block text-xs text-slate-500 mb-1">Timing</span>
            Cells coordinate perfectly. PE at <code>(row, col)</code> performs its k-th multiplication at time:
            <code className="block mt-2 text-indigo-300 font-mono">
              t = row + col + k + 1
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
