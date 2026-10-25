import React, { useState } from 'react';
import { ArrowRight, Compass, Volume2, Sparkles, Award, Play, Square, CheckCircle, Flame } from 'lucide-react';
import { ORG_DETAILS } from '../data/uptqData';
import { maqamEngine } from '../utils/audioSynthesizer';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onOpenQuiz }) => {
  const [isPlayingHeroTrack, setIsPlayingHeroTrack] = useState(false);

  const heroMelody = [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 261.63];

  const handleToggleAudio = () => {
    if (isPlayingHeroTrack) {
      maqamEngine.stop();
      setIsPlayingHeroTrack(false);
    } else {
      setIsPlayingHeroTrack(true);
      maqamEngine.playMaqamSequence(heroMelody, undefined, () => {
        setIsPlayingHeroTrack(false);
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-ocean-hero text-white pt-12 pb-20 border-b border-sky-900/60">
      
      {/* Decorative Rotating Sacred Geometry Mandala */}
      <div className="absolute -top-32 -right-32 w-[620px] h-[620px] opacity-15 pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 400 400" className="w-full h-full text-emerald-400" fill="none" stroke="currentColor">
          <circle cx="200" cy="200" r="190" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="200" cy="200" r="150" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="110" strokeWidth="1" strokeDasharray="3 3" />
          {/* 8-pointed star rosette */}
          <polygon points="200,40 240,160 360,200 240,240 200,360 160,240 40,200 160,160" strokeWidth="1.5" />
          <polygon points="200,40 240,160 360,200 240,240 200,360 160,240 40,200 160,160" strokeWidth="1.5" transform="rotate(45 200 200)" />
          <circle cx="200" cy="200" r="60" strokeWidth="2" />
        </svg>
      </div>

      {/* Radiant ambient light pools */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-500/15 via-emerald-500/15 to-teal-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-sky-800/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-emerald-300 uppercase tracking-widest text-[11px]">
              Unit Kegiatan Mahasiswa Universitas
            </span>
            <span className="text-sky-500">·</span>
            <span className="text-slate-300">UIN Sunan Gunung Djati Bandung</span>
          </div>

          <div className="flex items-center gap-2 text-sky-200">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Peringkat 1 Lembaga Seni Qur'ani Terbaik PTKIN</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Typography & Direct CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Arabic Basmalah with Glowing Serif Font */}
            <div className="inline-block">
              <span className="font-amiri text-3xl sm:text-4xl text-emerald-300 font-bold tracking-wide drop-shadow-md">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Menghidupkan Jiwa Qur'ani, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300">
                Mengukir Prestasi Hakiki.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              Selamat datang di portal resmi <strong>UPTQ UIN SGD Bandung</strong>. Rumah pembinaan 7 cabang seni, tilawah maqamat, tahfidz 30 juz, kaligrafi Islam, dan riset ilmiah Qur'ani bagi mahasiswa kampus peradaban Wahyu Memandu Ilmu.
            </p>

            {/* CTA Action Cluster */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 rounded-xl shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Daftar Anggota (Oprec 2026)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-100 bg-sky-950/80 hover:bg-sky-900 border border-sky-700/60 rounded-xl transition-all hover:border-emerald-400 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tes Kecocokan Divisi</span>
              </button>

              <a
                href="#divisi"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-sky-200 hover:text-white transition-colors"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Lihat 7 Divisi</span>
              </a>
            </div>

            {/* Interactive Hero Recitation Soundstrip */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-800/50 backdrop-blur-md flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAudio}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isPlayingHeroTrack
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-md'
                  }`}
                  title={isPlayingHeroTrack ? 'Hentikan Audio' : 'Dengarkan Melodi Maqamat'}
                >
                  {isPlayingHeroTrack ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Harmoni Melodi Maqamat Tilawah</span>
                    {isPlayingHeroTrack && (
                      <span className="text-[10px] text-emerald-400 font-mono animate-pulse">● MEMUTAR</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Laras Maqam Rast & Bayati · Khidmat & Menenangkan
                  </div>
                </div>
              </div>

              {/* Soundwave Visualizer Bars */}
              <div className="flex items-end gap-1 h-6">
                {[40, 75, 55, 90, 60, 85, 45, 95].map((height, i) => (
                  <span
                    key={i}
                    style={{ height: isPlayingHeroTrack ? `${height}%` : '25%' }}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingHeroTrack ? 'bg-emerald-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Modern Luminous Islamic Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0f345c]/90 via-[#0a233f]/95 to-[#07192f] border border-sky-700/50 p-7 shadow-2xl backdrop-blur-xl space-y-6 glow-ocean">
              
              {/* Header of Box */}
              <div className="flex items-center justify-between pb-4 border-b border-sky-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 p-0.5 shadow-md">
                    <div className="w-full h-full bg-[#07192f] rounded-[10px] flex items-center justify-center">
                      <span className="font-amiri text-2xl font-bold text-emerald-300">ق</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white tracking-wide block">
                      DEWAN PEMBINAAN QUR'ANI
                    </span>
                    <span className="text-[11px] text-emerald-300 font-mono">
                      Student Center Lt. 2 · UIN Bandung
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono text-sky-300 font-bold tabular-nums">
                  35+ TAHUN
                </span>
              </div>

              {/* Quran Calligraphy Showcase */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#06182c] to-[#0d2a4a] border border-emerald-400/20 text-center space-y-3 relative overflow-hidden">
                <div className="text-[11px] tracking-wider uppercase text-emerald-400 font-semibold">
                  Kalamullah yang Maha Agung
                </div>
                <div className="font-amiri text-3xl text-emerald-200 font-bold leading-relaxed px-2">
                  وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
                </div>
                <div className="text-xs text-slate-300 italic">
                  "Dan bacalah Al-Qur'an itu dengan perlahan-lahan (tartil)."
                </div>
                <div className="text-[11px] text-sky-400 font-medium">
                  QS. Al-Muzzammil: 4
                </div>
              </div>

              {/* 3 Pillars of Excellence */}
              <div className="space-y-3 text-xs text-slate-200">
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-sky-900/40">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">Dewan Pembina Qari Nasional</strong>
                    <span className="text-slate-300 text-[11px]">Bimbingan langsung dewan hakim LPTQ Jawa Barat & dosen pakar tafsir UIN.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-sky-900/40">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-300 shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">Fasilitas Terpadu & Studio</strong>
                    <span className="text-slate-300 text-[11px]">Baitul Tahfidz, studio kaligrafi kanvas, aula maqamat, dan podcast dakwah.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/40 border border-sky-900/40">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white block">Jejaring MTQ Mahasiswa Nasional</strong>
                    <span className="text-slate-300 text-[11px]">Pengiriman delegasi resmi kejuaraan MTQMN, STQH, dan festival antar bangsa.</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Status */}
              <div className="pt-3 border-t border-sky-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Status Pendaftaran 2026</span>
                <span className="text-emerald-400 font-semibold">Telah Dibuka (Terbuka Semua Jurusan)</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Stat Matrix in Full Width Row */}
        <div className="mt-16 pt-8 border-t border-sky-800/50 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ORG_DETAILS.stats.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#091f38]/80 border border-sky-800/60 backdrop-blur-md hover:border-emerald-400/50 transition-colors space-y-1"
            >
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {s.label}
              </div>
              <div className="text-[11px] text-emerald-400 font-medium">
                {s.unit}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
