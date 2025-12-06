import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';

interface ControlsProps {
  step: number;
  maxSteps: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  speed: number;
  setSpeed: (s: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  step, maxSteps, isPlaying, onPlayPause, onStepForward, onStepBack, onReset, speed, setSpeed 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-tpu-panel p-4 rounded-xl border border-slate-700 shadow-lg gap-4">
      
      {/* Step Indicator */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Time Step</div>
          <div className="text-3xl font-mono text-tpu-accent font-bold">
            T = {step}
          </div>
        </div>
        <div className="h-10 w-px bg-slate-700 mx-2"></div>
        <div className="text-xs text-slate-500 max-w-[150px]">
          {step === 0 ? "Initialization. Data ready to enter." : 
           step > maxSteps ? "Calculation Complete." :
           "Data flowing through array."}
        </div>
      </div>

      {/* Main Transport Controls */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onReset}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
        
        <button 
          onClick={onStepBack}
          disabled={step <= 0 || isPlaying}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors disabled:opacity-30"
          title="Previous Step"
        >
          <SkipBack size={24} />
        </button>

        <button 
          onClick={onPlayPause}
          className="w-14 h-14 flex items-center justify-center bg-tpu-highlight hover:bg-indigo-400 text-white rounded-full shadow-[0_0_20px_rgba(129,140,248,0.3)] transition-all hover:scale-105 active:scale-95"
        >
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
        </button>

        <button 
          onClick={onStepForward}
          disabled={step >= maxSteps || isPlaying}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors disabled:opacity-30"
          title="Next Step"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-3 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
        <span className="text-xs text-slate-400 font-bold uppercase">Speed</span>
        <div className="flex gap-1">
          {[1000, 500, 200].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`
                text-xs font-mono px-2 py-1 rounded transition-colors
                ${speed === s ? 'bg-tpu-accent text-slate-900 font-bold' : 'text-slate-400 hover:bg-slate-700'}
              `}
            >
              {s === 1000 ? '1x' : s === 500 ? '2x' : '5x'}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
