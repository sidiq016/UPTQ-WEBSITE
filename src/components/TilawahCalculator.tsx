import React, { useState } from 'react';
import { BookMarked, Calculator, Clock, Sparkles } from 'lucide-react';

export const TilawahCalculator: React.FC = () => {
  const [targetDays, setTargetDays] = useState<number>(30);
  const [currentJuz, setCurrentJuz] = useState<number>(1);

  const totalPages = 604; // Standard Madinah Mushaf
  const remainingJuz = Math.max(1, 30 - currentJuz + 1);
  const pagesPerJuz = 20;
  const remainingPages = remainingJuz * pagesPerJuz;

  const pagesPerDay = Math.ceil(remainingPages / targetDays);
  const pagesPerPrayer = (pagesPerDay / 5).toFixed(1);
  const juzPerDay = (remainingJuz / targetDays).toFixed(2);

  const quickPresets = [7, 15, 30, 60, 90];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 font-bold">
            <span className="w-6 h-0.5 bg-emerald-600" />
            <span>Kalkulator & Perencanaan Ibadah</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 [text-wrap:balance]">
            Rencana Khatam & Tilawah Harian
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Hitung target tilawah Al-Qur'an Anda secara terstruktur dengan pembagian jumlah halaman setelah setiap waktu sholat fardhu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Pengaturan Target Anda</span>
            </div>

            {/* Quick Days Preset */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 block">
                Target Khatam Berapa Hari?
              </label>
              <div className="flex flex-wrap gap-2">
                {quickPresets.map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setTargetDays(days)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                      targetDays === days
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {days} Hari
                  </button>
                ))}
              </div>
            </div>

            {/* Range Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Sesuaikan Target Hari:</span>
                <span className="font-mono text-emerald-700 font-extrabold text-sm px-2.5 py-0.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  {targetDays} Hari
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="120"
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>3 Hari (Intensif)</span>
                <span>120 Hari (Santai)</span>
              </div>
            </div>

            {/* Current Position Input */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Mulai dari Juz:</span>
                <span className="font-mono text-sky-800 font-extrabold text-sm px-2.5 py-0.5 bg-sky-50 rounded-lg border border-sky-200">
                  Juz {currentJuz}
                </span>
              </div>
              <input
                type="number"
                min="1"
                max="30"
                value={currentJuz}
                onChange={(e) => setCurrentJuz(Math.min(30, Math.max(1, Number(e.target.value))))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono font-bold"
              />
              <span className="text-xs text-slate-500 block">
                Tersisa: {remainingJuz} Juz ({remainingPages} halaman mushaf standar)
              </span>
            </div>

          </div>

          {/* Results Showcase Column (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2b4e] via-[#091f38] to-[#047857] text-white border border-sky-800/60 shadow-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-sky-800/60">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <BookMarked className="w-4 h-4" />
                  <span>Hasil Perhitungan Rencana</span>
                </div>
                <span className="text-xs font-mono text-sky-300">Standar 20 Halaman / Juz</span>
              </div>

              {/* 3 Large KPI Result Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-[#06182c]/80 border border-sky-900/60 text-center space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Halaman / Hari</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums">
                    {pagesPerDay}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Halaman (~{Math.ceil(pagesPerDay / 2)} Lembar)</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#06182c]/80 border border-sky-900/60 text-center space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Tiap Waktu Sholat</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums">
                    {pagesPerPrayer}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Halaman / Sholat</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#06182c]/80 border border-sky-900/60 text-center space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Laju Tilawah</span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums">
                    {juzPerDay}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Juz / Hari</span>
                </div>
              </div>

              {/* Prayer Schedule Distribution Recommendation */}
              <div className="p-5 rounded-2xl bg-[#081a2e] border border-sky-900/80 space-y-3 text-xs">
                <div className="text-emerald-300 font-bold mb-1 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rekomendasi Waktu Tilawah Harian:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-slate-200">
                  <div className="p-3 rounded-xl bg-sky-950/70 border border-sky-900/60">
                    <span className="text-slate-400 block text-[10px]">Ba'da Subuh</span>
                    <strong className="text-white font-mono text-sm">{Math.ceil(Number(pagesPerPrayer))} Hal</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-950/70 border border-sky-900/60">
                    <span className="text-slate-400 block text-[10px]">Ba'da Dzuhur</span>
                    <strong className="text-white font-mono text-sm">{Math.floor(Number(pagesPerPrayer))} Hal</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-950/70 border border-sky-900/60">
                    <span className="text-slate-400 block text-[10px]">Ba'da Ashar</span>
                    <strong className="text-white font-mono text-sm">{Math.floor(Number(pagesPerPrayer))} Hal</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-950/70 border border-sky-900/60">
                    <span className="text-slate-400 block text-[10px]">Ba'da Maghrib</span>
                    <strong className="text-white font-mono text-sm">{Math.floor(Number(pagesPerPrayer))} Hal</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-950/70 border border-sky-900/60">
                    <span className="text-slate-400 block text-[10px]">Ba'da Isya</span>
                    <strong className="text-white font-mono text-sm">{Math.ceil(Number(pagesPerPrayer))} Hal</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sky-800/60 flex items-center justify-between text-xs text-slate-300">
              <span className="italic">"Sebaik-baik amalan adalah yang istiqamah walau sedikit."</span>
              <span className="text-emerald-400 font-bold">Program Tilawah UPTQ</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
