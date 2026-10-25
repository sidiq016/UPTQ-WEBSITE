import React, { useState } from 'react';
import { CABINET_MEMBERS } from '../data/uptqData';
import { Shield, Sparkles, UserCheck } from 'lucide-react';

export const CabinetSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bph' | 'bidang'>('all');

  const ketum = CABINET_MEMBERS[0];

  const filteredMembers = CABINET_MEMBERS.filter((m) => {
    if (activeFilter === 'bph') return m.department.includes('Harian');
    if (activeFilter === 'bidang') return !m.department.includes('Harian');
    return true;
  });

  return (
    <section className="py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 font-bold">
            <span className="w-6 h-0.5 bg-emerald-600" />
            <span>Kepemimpinan & Tata Kelola</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 [text-wrap:balance]">
            Struktur Pengurus Kabinet Syiar Qur'ani
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Dikelola oleh kader-kader mahasiswa berakhlakul karimah yang mengemban amanah kelembagaan dengan profesionalisme, kesantunan, dan keikhlasan.
          </p>
        </div>

        {/* Ketua Umum Executive Card */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#07192f] via-[#0c2b4e] to-[#047857] text-white shadow-xl border border-sky-700/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-8 space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5" />
              <span>Amanah Ketua Umum UPTQ</span>
            </div>
            
            <p className="text-lg sm:text-xl text-slate-100 italic leading-relaxed font-light">
              "{ketum.quote}"
            </p>

            <div className="pt-2">
              <h3 className="text-2xl font-black text-white">{ketum.name}</h3>
              <div className="text-xs sm:text-sm text-emerald-300 font-semibold mt-0.5">
                {ketum.role} · {ketum.faculty} ({ketum.generation})
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end relative z-10">
            <div className="w-44 h-44 rounded-3xl bg-gradient-to-b from-[#0e2c4f] to-[#06182c] border-2 border-emerald-400/40 p-4 flex flex-col items-center justify-center text-center shadow-2xl">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 mb-2 shadow-md">
                <div className="w-full h-full bg-[#07192f] rounded-[14px] flex items-center justify-center">
                  <span className="font-amiri text-4xl font-bold text-emerald-300">ق</span>
                </div>
              </div>
              <span className="text-xs font-black text-white">UPTQ UIN SGD</span>
              <span className="text-[10px] text-sky-300 font-mono">BPH 2026/2027</span>
            </div>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
              activeFilter === 'all'
                ? 'bg-[#0c2b4e] text-white border-[#0c2b4e] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Semua Pengurus ({CABINET_MEMBERS.length})
          </button>
          <button
            onClick={() => setActiveFilter('bph')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
              activeFilter === 'bph'
                ? 'bg-[#0c2b4e] text-white border-[#0c2b4e] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Badan Pengurus Harian
          </button>
          <button
            onClick={() => setActiveFilter('bidang')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
              activeFilter === 'bidang'
                ? 'bg-[#0c2b4e] text-white border-[#0c2b4e] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Ketua-Ketua Bidang
          </button>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Clean Role Kicker */}
                <div className="text-xs uppercase tracking-wider text-emerald-700 font-bold">
                  {member.role}
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {member.name}
                </h3>

                <p className="text-xs text-slate-600 italic font-light leading-relaxed">
                  "{member.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div>
                  <span className="text-slate-400">Bidang: </span>
                  <span className="text-slate-800 font-semibold">{member.department}</span>
                </div>
                <div>
                  <span className="text-slate-400">Fakultas: </span>
                  <span className="text-slate-700">{member.faculty} ({member.generation})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
