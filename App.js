import React, { useState } from 'react';
import ShiftOptimization from './components/ShiftOptimization';
import ExploratoryAnalysis from './components/ExploratoryAnalysis';

function App() {
  const [currentPage, setCurrentPage] = useState('optimization');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('optimization')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'optimization'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📊 Nomor 3: Optimasi & Solver
            </button>
            <button
              onClick={() => setCurrentPage('exploratory')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'exploratory'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📈 Nomor 4: Analisis Eksploratif
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {currentPage === 'optimization' ? (
        <ShiftOptimization />
      ) : (
        <ExploratoryAnalysis />
      )}
    </div>
  );
}

export default App;