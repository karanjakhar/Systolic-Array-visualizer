import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_MATRIX_A, INITIAL_MATRIX_B, calculateGridState, MATRIX_SIZE } from './utils/simulation';
import { SystolicGrid } from './components/SystolicGrid';
import { Controls } from './components/Controls';
import { InfoPanel } from './components/InfoPanel';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // The total time needed for the last element to pass through the last cell.
  // Last cell is (N-1, N-1). Last element is k=N-1.
  // t = (N-1) + (N-1) + (N-1) + 1 = 3N - 2.
  // Add padding for visuals to clear out.
  const MAX_STEPS = (3 * MATRIX_SIZE) + 2;

  // Memoize grid state calculation to avoid re-calc on non-step renders
  const gridState = useMemo(() => 
    calculateGridState(step, INITIAL_MATRIX_A, INITIAL_MATRIX_B), 
    [step]
  );

  const handleNext = useCallback(() => {
    setStep(prev => (prev >= MAX_STEPS ? prev : prev + 1));
  }, [MAX_STEPS]);

  const handlePrev = useCallback(() => {
    setStep(prev => (prev <= 0 ? 0 : prev - 1));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setStep(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (step >= MAX_STEPS) {
      setStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [step, MAX_STEPS]);

  // Timer Effect
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setStep(prev => {
          if (prev >= MAX_STEPS) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, MAX_STEPS]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-tpu-accent to-indigo-500 bg-clip-text text-transparent">
              TPU Systolic Array Visualizer
            </h1>
            <p className="text-slate-400 mt-1 max-w-2xl text-sm">
              Watch how data flows through a grid of processors to perform matrix multiplication $C = A \times B$ efficiently.
            </p>
          </div>
          <div className="flex gap-4 text-xs font-mono text-slate-500">
             <div className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Size: {MATRIX_SIZE}x{MATRIX_SIZE}</div>
             <div className="px-3 py-1 bg-slate-800 rounded border border-slate-700">Architecture: Output Stationary</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visualization Area (Spans 2 cols on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SystolicGrid 
            gridState={gridState} 
            matrixA={INITIAL_MATRIX_A} 
            matrixB={INITIAL_MATRIX_B} 
            step={step} 
          />
          <Controls 
            step={step} 
            maxSteps={MAX_STEPS}
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            onStepForward={handleNext}
            onStepBack={handlePrev}
            onReset={handleReset}
            speed={speed}
            setSpeed={setSpeed}
          />
        </div>

        {/* Info / Sidebar */}
        <div className="lg:col-span-1 h-full">
          <InfoPanel step={step} />
        </div>

      </main>

    </div>
  );
};

export default App;
