import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const ExploratoryAnalysis = () => {
  const [scenario, setScenario] = useState('base');
  
  // Skenario Base (Original)
  const baseScenario = {
    name: 'Base Case',
    shifts: [
      { name: 'Pagi', wage: 25000, min: 4, optimal: 4, cost: 800000 },
      { name: 'Siang', wage: 25000, min: 6, optimal: 6, cost: 1200000 },
      { name: 'Sore', wage: 30000, min: 5, optimal: 5, cost: 1200000 },
      { name: 'Malam', wage: 35000, min: 3, optimal: 3, cost: 840000 }
    ],
    totalWorkers: 18,
    totalCost: 4040000
  };

  // Skenario 1: Naikkan upah malam 20%
  const scenario1 = {
    name: 'Upah Malam +20%',
    description: 'Upah shift malam naik dari Rp35.000 menjadi Rp42.000',
    shifts: [
      { name: 'Pagi', wage: 25000, min: 4, optimal: 4, cost: 800000 },
      { name: 'Siang', wage: 25000, min: 6, optimal: 6, cost: 1200000 },
      { name: 'Sore', wage: 30000, min: 5, optimal: 5, cost: 1200000 },
      { name: 'Malam', wage: 42000, min: 3, optimal: 3, cost: 1008000 }
    ],
    totalWorkers: 18,
    totalCost: 4208000,
    impact: '+Rp168.000 (+4.2%)'
  };

  // Skenario 2: Tambah kebutuhan shift siang
  const scenario2 = {
    name: 'Kebutuhan Siang +2',
    description: 'Shift siang butuh minimal 8 karyawan (naik dari 6)',
    shifts: [
      { name: 'Pagi', wage: 25000, min: 4, optimal: 4, cost: 800000 },
      { name: 'Siang', wage: 25000, min: 8, optimal: 8, cost: 1600000 },
      { name: 'Sore', wage: 30000, min: 5, optimal: 5, cost: 1200000 },
      { name: 'Malam', wage: 35000, min: 3, optimal: 3, cost: 840000 }
    ],
    totalWorkers: 20,
    totalCost: 4440000,
    impact: '+Rp400.000 (+9.9%)'
  };

  // Skenario 3: Tambah total karyawan tersedia
  const scenario3 = {
    name: 'Total Karyawan +4',
    description: 'Karyawan tersedia naik menjadi 22 orang',
    shifts: [
      { name: 'Pagi', wage: 25000, min: 4, optimal: 5, cost: 1000000 },
      { name: 'Siang', wage: 25000, min: 6, optimal: 8, cost: 1600000 },
      { name: 'Sore', wage: 30000, min: 5, optimal: 6, cost: 1440000 },
      { name: 'Malam', wage: 35000, min: 3, optimal: 3, cost: 840000 }
    ],
    totalWorkers: 22,
    totalCost: 4880000,
    impact: '+Rp840.000 (+20.8%)',
    note: 'Tambahan karyawan dialokasikan ke shift dengan beban kerja tertinggi'
  };

  // Skenario 4: Kurangi upah shift sore, naikkan malam
  const scenario4 = {
    name: 'Rebalancing Upah',
    description: 'Sore: Rp30k→Rp27k, Malam: Rp35k→Rp40k',
    shifts: [
      { name: 'Pagi', wage: 25000, min: 4, optimal: 4, cost: 800000 },
      { name: 'Siang', wage: 25000, min: 6, optimal: 6, cost: 1200000 },
      { name: 'Sore', wage: 27000, min: 5, optimal: 5, cost: 1080000 },
      { name: 'Malam', wage: 40000, min: 3, optimal: 3, cost: 960000 }
    ],
    totalWorkers: 18,
    totalCost: 4040000,
    impact: '±Rp0 (0%)',
    note: 'Total biaya sama, tetapi lebih adil untuk pekerja malam'
  };

  // Skenario 5: Peak hours (Weekend)
  const scenario5 = {
    name: 'Weekend/Peak Hours',
    description: 'Semua shift butuh +1 karyawan',
    shifts: [
      { name: 'Pagi', wage: 25000, min: 5, optimal: 5, cost: 1000000 },
      { name: 'Siang', wage: 25000, min: 7, optimal: 7, cost: 1400000 },
      { name: 'Sore', wage: 30000, min: 6, optimal: 6, cost: 1440000 },
      { name: 'Malam', wage: 35000, min: 4, optimal: 4, cost: 1120000 }
    ],
    totalWorkers: 22,
    totalCost: 4960000,
    impact: '+Rp920.000 (+22.8%)'
  };

  const scenarios = {
    base: baseScenario,
    scenario1: scenario1,
    scenario2: scenario2,
    scenario3: scenario3,
    scenario4: scenario4,
    scenario5: scenario5
  };

  const currentScenario = scenarios[scenario];

  // Data untuk comparison chart
  const comparisonData = [
    { name: 'Base', cost: 4040000, workers: 18 },
    { name: 'Upah+20%', cost: 4208000, workers: 18 },
    { name: 'Siang+2', cost: 4440000, workers: 20 },
    { name: 'Total+4', cost: 4880000, workers: 22 },
    { name: 'Rebal', cost: 4040000, workers: 18 },
    { name: 'Peak', cost: 4960000, workers: 22 }
  ];

  // Sensitivity analysis data
  const sensitivityData = [
    { variable: 'Upah Pagi', change: '+10%', impact: '+Rp80k', percentage: '+2.0%' },
    { variable: 'Upah Siang', change: '+10%', impact: '+Rp120k', percentage: '+3.0%' },
    { variable: 'Upah Sore', change: '+10%', impact: '+Rp120k', percentage: '+3.0%' },
    { variable: 'Upah Malam', change: '+10%', impact: '+Rp84k', percentage: '+2.1%' },
    { variable: 'Min Pagi', change: '+1', impact: '+Rp200k', percentage: '+5.0%' },
    { variable: 'Min Siang', change: '+1', impact: '+Rp200k', percentage: '+5.0%' },
    { variable: 'Min Sore', change: '+1', impact: '+Rp240k', percentage: '+5.9%' },
    { variable: 'Min Malam', change: '+1', impact: '+Rp280k', percentage: '+6.9%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Analisis Eksploratif & Skenario</h1>
          </div>

          {/* Scenario Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">Pilih Skenario:</label>
            <div className="grid md:grid-cols-3 gap-3">
              {Object.entries(scenarios).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    scenario === key
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-left">{s.name}</div>
                  {s.description && (
                    <div className="text-sm text-gray-600 mt-1">{s.description}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Scenario Details */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{currentScenario.name}</h2>
            {currentScenario.description && (
              <p className="mb-4 opacity-90">{currentScenario.description}</p>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90">Total Karyawan</p>
                <p className="text-3xl font-bold">{currentScenario.totalWorkers}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm opacity-90">Total Biaya</p>
                <p className="text-2xl font-bold">Rp{(currentScenario.totalCost/1000).toFixed(0)}k</p>
              </div>
              {currentScenario.impact && (
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-sm opacity-90">Perubahan dari Base</p>
                  <p className="text-2xl font-bold">{currentScenario.impact}</p>
                </div>
              )}
            </div>
            {currentScenario.note && (
              <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3">
                <p className="text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {currentScenario.note}
                </p>
              </div>
            )}
          </div>

          {/* Shift Details Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-3 text-left">Shift</th>
                  <th className="p-3 text-right">Upah/Jam</th>
                  <th className="p-3 text-right">Min Required</th>
                  <th className="p-3 text-right">Optimal</th>
                  <th className="p-3 text-right">Biaya Shift</th>
                </tr>
              </thead>
              <tbody>
                {currentScenario.shifts.map((shift, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 font-semibold">{shift.name}</td>
                    <td className="p-3 text-right">Rp{shift.wage.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right">{shift.min}</td>
                    <td className="p-3 text-right font-bold text-purple-600">{shift.optimal}</td>
                    <td className="p-3 text-right font-semibold">Rp{shift.cost.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
                <tr className="bg-purple-100 font-bold">
                  <td className="p-3" colSpan="3">TOTAL</td>
                  <td className="p-3 text-right">{currentScenario.totalWorkers}</td>
                  <td className="p-3 text-right text-purple-700">Rp{currentScenario.totalCost.toLocaleString('id-ID')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Perbandingan Semua Skenario</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Total Biaya per Skenario</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp${(value/1000).toFixed(0)}k`} />
                <Legend />
                <Bar dataKey="cost" fill="#9333ea" name="Total Biaya (Rp)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Tren Biaya vs Jumlah Karyawan</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="cost" stroke="#9333ea" strokeWidth={3} name="Biaya (Rp)" dot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="workers" stroke="#10b981" strokeWidth={3} name="Karyawan" dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sensitivity Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Analisis Sensitivitas</h2>
          <p className="text-gray-600 mb-4">
            Dampak perubahan 10% pada setiap variabel terhadap total biaya:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Variabel</th>
                  <th className="p-3 text-center">Perubahan</th>
                  <th className="p-3 text-right">Dampak Biaya</th>
                  <th className="p-3 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody>
                {sensitivityData.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 font-semibold">{item.variable}</td>
                    <td className="p-3 text-center">{item.change}</td>
                    <td className="p-3 text-right">{item.impact}</td>
                    <td className="p-3 text-right">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                        {item.percentage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Insight dari Analisis Sensitivitas:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Penambahan 1 karyawan di shift <strong>malam paling berdampak</strong> (+Rp280k atau +6.9%)</li>
              <li>• Penambahan 1 karyawan di shift <strong>pagi paling kecil dampaknya</strong> (+Rp200k atau +5.0%)</li>
              <li>• Kenaikan upah shift siang dan sore <strong>sama-sama berdampak</strong> karena jumlah karyawan dan durasi sama</li>
              <li>• Model sangat <strong>sensitif terhadap kebutuhan minimum</strong> karyawan</li>
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-8 h-8" />
            Rekomendasi Skenario Optimal
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1. Skenario Normal (Weekdays)</h3>
              <p className="text-sm opacity-90">
                Gunakan <strong>Base Case</strong> dengan 18 karyawan (4-6-5-3) dan biaya Rp4.040.000/hari.
                Ini adalah konfigurasi paling efisien untuk hari kerja normal.
              </p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">2. Skenario Peak (Weekend/Libur)</h3>
              <p className="text-sm opacity-90">
                Gunakan <strong>Skenario 5 (Peak Hours)</strong> dengan 22 karyawan (5-7-6-4) dan biaya Rp4.960.000/hari.
                Tambahan karyawan di semua shift untuk menghadapi lonjakan pengunjung.
              </p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">3. Pertimbangan Rebalancing Upah</h3>
              <p className="text-sm opacity-90">
                <strong>Skenario 4 (Rebalancing)</strong> menunjukkan bahwa upah dapat disesuaikan untuk lebih adil
                tanpa mengubah total biaya. Shift malam layak mendapat kompensasi lebih tinggi.
              </p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">4. Budget Planning</h3>
              <p className="text-sm opacity-90">
                <strong>Range biaya:</strong> Rp4.040.000 - Rp4.960.000/hari tergantung kondisi.
                <strong>Monthly budget:</strong> Rp121jt - Rp149jt (30 hari)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploratoryAnalysis;