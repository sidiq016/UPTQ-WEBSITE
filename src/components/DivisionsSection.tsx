import React, { useState } from 'react';
import { DIVISIONS } from '../data/uptqData';
import { Division } from '../types';
import { Calendar, MapPin, User, CheckCircle2, Trophy, Users, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface DivisionsSectionProps {
  onSelectDivisionToJoin: (divisionName: string) => void;
}

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({ onSelectDivisionToJoin }) => {
  const [selectedDivId, setSelectedDivId] = useState<string>(DIVISIONS[0].id);

  const currentDiv = DIVISIONS.find((d) => d.id === selectedDivId) || DIVISIONS[0];

  return (
    <section id="divisi" className="py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 font-bold">
            <span className="w-6 h-0.5 bg-emerald-600" />
            <span>Spesialisasi & Bidang Pembinaan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 [text-wrap:balance]">
            7 Divisi Unggulan Kader Qur'ani
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Setiap kader diarahkan untuk menguasai cabang keilmuan Al-Qur'an secara mendalam dengan kurikulum berjenjang dan bimbingan ustadz pembina terkemuka.
          </p>
        </div>

        {/* Division Selector (Modern horizontal scrollable segmented bar) */}
        <div className="flex overflow-x-auto pb-4 gap-2.5 no-scrollbar mb-8">
          {DIVISIONS.map((div, index) => {
            const isSelected = div.id === selectedDivId;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivId(div.id)}
                className={`px-5 py-3 text-xs font-bold rounded-2xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2.5 border ${
                  isSelected
                    ? 'bg-[#0c2b4e] text-white border-[#0c2b4e] shadow-lg shadow-sky-950/20 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  0{index + 1}
                </span>
                <span>{div.name}</span>
              </button>
            );
          })}
        </div>

        {/* Division Showcase Card (Bento style) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Banner with Arabic Typography and Deep Ocean Gradient */}
          <div className="bg-gradient-to-r from-[#07192f] via-[#0c2b4e] to-[#047857] p-8 sm:p-10 text-white relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Divisi Pembinaan Spesialis</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  {currentDiv.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-200 italic font-light">
                  "{currentDiv.tagline}"
                </p>
              </div>

              <div className="text-left lg:text-right space-y-1">
                <span className="font-amiri text-3xl sm:text-4xl text-emerald-300 font-bold block drop-shadow">
                  {currentDiv.arabicName}
                </span>
                <span className="text-xs text-sky-200 font-mono">
                  {currentDiv.memberCount} Kader Aktif Terdaftar
                </span>
              </div>

            </div>
          </div>

          {/* Division Detailed Content Grid */}
          <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column (7 cols): Description, Curriculum & Trophy */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Orientasi & Fokus Pembinaan
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {currentDiv.description}
                </p>
              </div>

              {/* Silabus List */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Silabus Kurikulum Latihan
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentDiv.curriculum.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Trophy */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Capaian Prestasi Divisi Ini
                </h4>
                <div className="space-y-2">
                  {currentDiv.highlightAchievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 font-semibold"
                    >
                      <Trophy className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (5 cols): Operation Box & Join CTA */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-3 border-b border-slate-200">
                  Jadwal & Pembina
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Jadwal Latihan Rutin</span>
                      <strong className="text-slate-900 text-sm">{currentDiv.schedule}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Tempat Pelaksanaan</span>
                      <strong className="text-slate-900 text-sm">{currentDiv.venue}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Ustadz Pembina Utama</span>
                      <strong className="text-slate-900 text-sm">{currentDiv.mentor}</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-xs">Koordinator Mahasiswa</span>
                      <strong className="text-slate-900 text-sm">{currentDiv.headOfDivision}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectDivisionToJoin(currentDiv.name)}
                className="w-full flex items-center justify-center gap-2.5 p-4 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 rounded-2xl shadow-lg shadow-emerald-950/20 hover:shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>Daftar ke Divisi {currentDiv.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
