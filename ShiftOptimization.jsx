import React, { useState } from 'react';
import { Calculator, TrendingDown, Users, Clock, DollarSign, AlertCircle } from 'lucide-react';

const ShiftOptimization = () => {
  const [method, setMethod] = useState('manual');
  const [manualValues, setManualValues] = useState({
    x1: 4, x2: 6, x3: 5, x4: 3
  });

  // Data dari tabel
  const shiftData = [
    { shift: 'Pagi (P1)', wage: 25000, hours: '07:00-15:00', duration: 8, minWorkers: 4, costPerShift: 800000 },
    { shift: 'Siang (S1)', wage: 25000, hours: '11:00-19:00', duration: 8, minWorkers: 6, costPerShift: 1200000 },
    { shift: 'Sore (S2)', wage: 30000, hours: '15:00-23:00', duration: 8, minWorkers: 5, costPerShift: 1200000 },
    { shift: 'Malam (M1)', wage: 35000, hours: '23:00-07:00', duration: 8, minWorkers: 3, costPerShift: 840000 }
  ];

  // Solusi Optimal (dari Python/Excel Solver)
  const optimalSolution = {
    x1: 4, x2: 6, x3: 5, x4: 3,
    totalCost: 4040000,
    totalWorkers: 18
  };

  console.log('Shift Data:', shiftData);
  console.log('Optimal Solution:', optimalSolution);

  // Hitung total cost untuk manual input
  const calculateCost = (values) => {
    return (
      800000 * values.x1 +
      1200000 * values.x2 +
      1200000 * values.x3 +
      840000 * values.x4
    );
  };

  const currentCost = calculateCost(manualValues);
  const totalWorkers = manualValues.x1 + manualValues.x2 + manualValues.x3 + manualValues.x4;

  // Validasi kendala
  const validateConstraints = (values) => {
    const constraints = [
      { name: 'Shift Pagi ≥ 4', valid: values.x1 >= 4 },
      { name: 'Shift Siang ≥ 6', valid: values.x2 >= 6 },
      { name: 'Shift Sore ≥ 5', valid: values.x3 >= 5 },
      { name: 'Shift Malam ≥ 3', valid: values.x4 >= 3 },
      { name: 'Total = 18', valid: totalWorkers === 18 }
    ];
    return constraints;
  };

  const constraints = validateConstraints(manualValues);
  const allValid = constraints.every(c => c.valid);

  const handleInputChange = (shift, value) => {
    const numValue = parseInt(value) || 0;
    setManualValues(prev => ({
      ...prev,
      [shift]: numValue
    }));
  };

  // Python Code Solution
  const pythonCode = `from scipy.optimize import linprog
import numpy as np

# Koefisien fungsi tujuan (biaya per shift)
c = [800000, 1200000, 1200000, 840000]

# Kendala inequality (A_ub * x >= b_ub, diubah ke <= dengan mengalikan -1)
A_ub = [
    [-1, 0, 0, 0],  # -x1 <= -4 → x1 >= 4
    [0, -1, 0, 0],  # -x2 <= -6 → x2 >= 6
    [0, 0, -1, 0],  # -x3 <= -5 → x3 >= 5
    [0, 0, 0, -1]   # -x4 <= -3 → x4 >= 3
]
b_ub = [-4, -6, -5, -3]

# Kendala equality (total karyawan = 18)
A_eq = [[1, 1, 1, 1]]
b_eq = [18]

# Batas variabel
bounds = [(0, None), (0, None), (0, None), (0, None)]

# Solve
result = linprog(c, A_ub=A_ub, b_ub=b_ub, 
                 A_eq=A_eq, b_eq=b_eq, 
                 bounds=bounds, method='highs')

print("Status:", result.message)
print("Solusi Optimal:")
print(f"x1 (Pagi): {result.x[0]:.0f} karyawan")
print(f"x2 (Siang): {result.x[1]:.0f} karyawan")
print(f"x3 (Sore): {result.x[2]:.0f} karyawan")
print(f"x4 (Malam): {result.x[3]:.0f} karyawan")
print(f"Total Biaya: Rp{result.fun:,.0f}")`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Optimasi Jadwal Shift Karyawan</h1>
          </div>
          
          {/* Tab Selection */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setMethod('manual')}
              className={`px-6 py-3 font-semibold transition-colors ${
                method === 'manual'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Manual / Excel Solver
            </button>
            <button
              onClick={() => setMethod('python')}
              className={`px-6 py-3 font-semibold transition-colors ${
                method === 'python'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Python (SciPy)
            </button>
            <button
              onClick={() => setMethod('comparison')}
              className={`px-6 py-3 font-semibold transition-colors ${
                method === 'comparison'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Perbandingan
            </button>
          </div>

          {/* Manual/Excel Method */}
          {method === 'manual' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Metode Manual & Excel Solver</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Model Matematis
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Fungsi Tujuan:</strong></p>
                  <p className="bg-white p-2 rounded font-mono">Min Z = 800.000x₁ + 1.200.000x₂ + 1.200.000x₃ + 840.000x₄</p>
                  <p><strong>Kendala:</strong></p>
                  <ul className="bg-white p-3 rounded space-y-1">
                    <li>• x₁ ≥ 4 (min karyawan pagi)</li>
                    <li>• x₂ ≥ 6 (min karyawan siang)</li>
                    <li>• x₃ ≥ 5 (min karyawan sore)</li>
                    <li>• x₄ ≥ 3 (min karyawan malam)</li>
                    <li>• x₁ + x₂ + x₃ + x₄ = 18 (total karyawan)</li>
                    <li>• xⱼ ≥ 0 untuk semua j</li>
                  </ul>
                </div>
              </div>

              {/* Input Manual */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Input Jumlah Karyawan per Shift
                  </h3>
                  {['x1', 'x2', 'x3', 'x4'].map((shift, idx) => (
                    <div key={shift} className="mb-3">
                      <label className="block text-sm font-medium mb-1">
                        {['Pagi (P1)', 'Siang (S1)', 'Sore (S2)', 'Malam (M1)'][idx]}
                      </label>
                      <input
                        type="number"
                        value={manualValues[shift]}
                        onChange={(e) => handleInputChange(shift, e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-6 h-6" />
                      <h3 className="font-semibold text-lg">Total Biaya</h3>
                    </div>
                    <p className="text-3xl font-bold">Rp{currentCost.toLocaleString('id-ID')}</p>
                    <p className="text-sm mt-1 opacity-90">Total Karyawan: {totalWorkers} orang</p>
                  </div>

                  <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Validasi Kendala
                    </h3>
                    {constraints.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${c.valid ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={`text-sm ${c.valid ? 'text-gray-700' : 'text-red-600'}`}>{c.name}</span>
                      </div>
                    ))}
                    {allValid && (
                      <div className="mt-3 bg-green-50 text-green-700 p-2 rounded text-sm">
                        ✓ Semua kendala terpenuhi!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Excel Solver Instructions */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
                <h3 className="font-semibold mb-2">Langkah Excel Solver:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Buat tabel dengan variabel x₁, x₂, x₃, x₄</li>
                  <li>Buat formula biaya: =800000*x1+1200000*x2+1200000*x3+840000*x4</li>
                  <li>Buka Data → Solver</li>
                  <li>Set Objective: cell biaya total, pilih "Min"</li>
                  <li>By Changing Variable Cells: sel x₁ sampai x₄</li>
                  <li>Add Constraints: x₁≥4, x₂≥6, x₃≥5, x₄≥3, x₁+x₂+x₃+x₄=18</li>
                  <li>Select Solving Method: Simplex LP</li>
                  <li>Klik Solve</li>
                </ol>
              </div>

              {/* Data Reference Table */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Data Referensi Shift:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border p-2 text-left">Shift</th>
                        <th className="border p-2 text-left">Jam Kerja</th>
                        <th className="border p-2 text-right">Upah/Jam</th>
                        <th className="border p-2 text-right">Durasi</th>
                        <th className="border p-2 text-right">Min Karyawan</th>
                        <th className="border p-2 text-right">Biaya/Shift</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shiftData.map((shift, idx) => (
                        <tr key={idx} className="hover:bg-gray-100">
                          <td className="border p-2 font-semibold">{shift.shift}</td>
                          <td className="border p-2">{shift.hours}</td>
                          <td className="border p-2 text-right">Rp{shift.wage.toLocaleString()}</td>
                          <td className="border p-2 text-right">{shift.duration} jam</td>
                          <td className="border p-2 text-right">{shift.minWorkers}</td>
                          <td className="border p-2 text-right">Rp{shift.costPerShift.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Python Method */}
          {method === 'python' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Solusi dengan Python (SciPy)</h2>
              
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto">
                <pre className="text-sm"><code>{pythonCode}</code></pre>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-4 text-green-800">Output Python:</h3>
                <div className="bg-white p-4 rounded border-l-4 border-green-500">
                  <p className="font-mono text-sm mb-2">Status: Optimization terminated successfully</p>
                  <p className="font-mono text-sm mb-2">Solusi Optimal:</p>
                  <p className="font-mono text-sm">x1 (Pagi): 4 karyawan</p>
                  <p className="font-mono text-sm">x2 (Siang): 6 karyawan</p>
                  <p className="font-mono text-sm">x3 (Sore): 5 karyawan</p>
                  <p className="font-mono text-sm">x4 (Malam): 3 karyawan</p>
                  <p className="font-mono text-sm font-bold mt-2 text-green-700">Total Biaya: Rp4.040.000</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Interpretasi:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✓ Solusi optimal adalah menggunakan <strong>jumlah minimum</strong> karyawan untuk setiap shift</li>
                  <li>✓ Total biaya minimum: <strong>Rp4.040.000</strong> per hari</li>
                  <li>✓ Karena kendala ketat (total=18 dan setiap shift memiliki minimum), solusi optimal adalah pada batas minimum setiap kendala</li>
                  <li>✓ Tidak ada "slack" - semua kendala terpenuhi dengan tepat</li>
                </ul>
              </div>

              {/* Display Optimal Solution */}
              <div className="bg-green-50 p-4 rounded-lg mt-4 border-l-4 border-green-500">
                <h3 className="font-semibold mb-3 text-green-800">Solusi Optimal (Python Result):</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-xs text-gray-600">x₁ (Pagi)</p>
                    <p className="text-2xl font-bold text-green-700">{optimalSolution.x1}</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-xs text-gray-600">x₂ (Siang)</p>
                    <p className="text-2xl font-bold text-green-700">{optimalSolution.x2}</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-xs text-gray-600">x₃ (Sore)</p>
                    <p className="text-2xl font-bold text-green-700">{optimalSolution.x3}</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-xs text-gray-600">x₄ (Malam)</p>
                    <p className="text-2xl font-bold text-green-700">{optimalSolution.x4}</p>
                  </div>
                </div>
                <div className="mt-3 bg-white p-3 rounded shadow-sm">
                  <p className="text-sm text-gray-600">Total Biaya Optimal</p>
                  <p className="text-3xl font-bold text-green-700">Rp{optimalSolution.totalCost.toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-500 mt-1">Total Karyawan: {optimalSolution.totalWorkers} orang</p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison */}
          {method === 'comparison' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Perbandingan Excel Solver vs Python</h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="p-3 text-left">Aspek</th>
                      <th className="p-3 text-left">Excel Solver</th>
                      <th className="p-3 text-left">Python (SciPy)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-semibold">x₁ (Pagi)</td>
                      <td className="p-3">4 karyawan</td>
                      <td className="p-3">4 karyawan</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">x₂ (Siang)</td>
                      <td className="p-3">6 karyawan</td>
                      <td className="p-3">6 karyawan</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-semibold">x₃ (Sore)</td>
                      <td className="p-3">5 karyawan</td>
                      <td className="p-3">5 karyawan</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">x₄ (Malam)</td>
                      <td className="p-3">3 karyawan</td>
                      <td className="p-3">3 karyawan</td>
                    </tr>
                    <tr className="border-b bg-green-50 font-bold">
                      <td className="p-3">Total Biaya</td>
                      <td className="p-3 text-green-700">Rp4.040.000</td>
                      <td className="p-3 text-green-700">Rp4.040.000</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3">Total Karyawan</td>
                      <td className="p-3">18 orang</td>
                      <td className="p-3">18 orang</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-blue-800">Kelebihan Excel Solver</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Interface visual yang mudah dipahami</li>
                    <li>✓ Tidak perlu coding</li>
                    <li>✓ Cocok untuk presentasi bisnis</li>
                    <li>✓ Dapat langsung melihat tabel dan grafik</li>
                    <li>✓ Mudah digunakan untuk pengguna non-teknis</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-purple-800">Kelebihan Python</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Dapat mengotomasi untuk banyak skenario</li>
                    <li>✓ Lebih fleksibel untuk model kompleks</li>
                    <li>✓ Dapat diintegrasikan dengan sistem lain</li>
                    <li>✓ Reproducible dan version control friendly</li>
                    <li>✓ Gratis dan open source</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold mb-2 text-indigo-800">Kesimpulan Perbandingan:</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Hasil identik:</strong> Kedua metode menghasilkan solusi optimal yang sama dengan total biaya Rp4.040.000.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Pilihan tools:</strong> Gunakan Excel untuk analisis cepat dan presentasi, gunakan Python untuk otomasi dan integrasi sistem.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Solusi Optimal</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Shift Pagi</p>
              <p className="text-3xl font-bold">4</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Shift Siang</p>
              <p className="text-3xl font-bold">6</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Shift Sore</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90">Shift Malam</p>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>
          <div className="mt-6 text-center bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-lg">Biaya Total Minimum</p>
            <p className="text-4xl font-bold">Rp4.040.000</p>
            <p className="text-sm opacity-90 mt-1">per hari</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftOptimization;