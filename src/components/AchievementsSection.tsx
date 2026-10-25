import React, { useState, useMemo } from 'react';
import { ACHIEVEMENTS } from '../data/uptqData';
import { Trophy, Search, Medal, Sparkles, Award } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Tilawah', 'Tahfidz', 'Kaligrafi', 'Syarhil', 'Fahmil', 'KTIQ', 'Shalawat'];
  const levels = ['All', 'Nasional', 'Provinsi', 'Regional'];

  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchLevel = selectedLevel === 'All' || item.level === selectedLevel;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.delegate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.faculty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchLevel && matchSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  return (
    <section id="prestasi" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 font-bold">
              <span className="w-6 h-0.5 bg-emerald-600" />
              <span>Rekam Jejak Kejuaraan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 [text-wrap:balance]">
              Hall of Fame & Prestasi MTQ
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Arsip resmi kejuaraan mahasiswa UPTQ UIN Sunan Gunung Djati Bandung dalam ajang MTQ Mahasiswa Nasional (MTQMN), STQH, dan festival seni Islam tingkat nasional.
            </p>
          </div>

          {/* Achievement Summary Pill */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-amber-200/80 flex items-center gap-4 self-start shadow-sm shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">85+ Medali Emas</div>
              <span className="text-xs text-slate-600">MTQ Mahasiswa Nasional & Provinsi</span>
            </div>
          </div>
        </div>

        {/* Filter Controls (Search + Level + Category) */}
        <div className="space-y-4 mb-10">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari prestasi, nama delegasi, fakultas..."
                className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto overflow-x-auto max-w-full">
              <span className="text-[11px] font-bold text-slate-500 uppercase px-3 shrink-0">
                Tingkat:
              </span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

          </div>

          {/* Category Filter Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat === 'All' ? 'Semua Cabang' : `Cabang ${cat}`}
              </button>
            ))}
          </div>

        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 space-y-2">
            <Trophy className="w-10 h-10 mx-auto text-slate-400 opacity-40" />
            <p className="text-sm font-medium">Tidak ada prestasi yang sesuai dengan kriteria pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item) => (
              <div
                key={item.id}
                className="p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white transition-all hover:shadow-lg flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="text-emerald-700 font-bold">{item.ranking}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tingkat {item.level}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs text-slate-600 leading-relaxed">
                    {item.event}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Delegasi</span>
                    <strong className="text-slate-900">{item.delegate}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Fakultas</span>
                    <span className="text-slate-700 font-medium">{item.faculty}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
