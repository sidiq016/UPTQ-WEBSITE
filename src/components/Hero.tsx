import React, { useState } from 'react';
import { ArrowRight, Compass, Volume2, Sparkles, Award, Play, Square, CheckCircle, Flame } from 'lucide-react';
import { ORG_DETAILS } from '../data/uptqData';
import { maqamEngine } from '../utils/audioSynthesizer';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenQuiz: () => void;
  heroAmbassadorImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onOpenQuiz, heroAmbassadorImage }) => {
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
      
      {/* Wallpaper Latar Belakang */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/wallpaper.png" 
          alt="Wallpaper UPTQ" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        
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
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="font-amiri text-3xl sm:text-4xl text-emerald-300 font-bold tracking-wide drop-shadow-md">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Menghidupkan Jiwa Qur'ani, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300">
                Mengukir Prestasi Hakiki.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              Selamat datang di portal resmi <strong>UPTQ UIN SGD Bandung</strong>. Rumah pembinaan 7 cabang seni, tilawah maqamat, tahfidz 30 juz, kaligrafi Islam, dan riset ilmiah Qur'ani bagi mahasiswa kampus peradaban Wahyu Memandu Ilmu.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-950/50 transition-all hover:-translate-y-0.5 cursor-pointer"
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
            </div>
          </div>

          {/* Right Column: Brand Ambassador Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0f345c]/90 via-[#0a233f]/95 to-[#07192f] border border-sky-700/50 p-7 shadow-2xl backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-sky-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="Logo UPTQ" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white tracking-wide block">DEWAN PEMBINAAN QUR'ANI</span>
                    <span className="text-[11px] text-emerald-300 font-mono">Student Center Lt. 2 · UIN Bandung</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#06182c] to-[#0d2a4a] border border-emerald-400/20 text-center space-y-3 relative overflow-hidden flex flex-col items-center justify-center min-h-[190px]">
                <img 
                  src={heroAmbassadorImage || "/developer.png"} 
                  alt="Brand Ambassador UPTQ" 
                  className="w-28 h-28 object-cover rounded-2xl border-2 border-emerald-400/50 shadow-xl mb-1 object-top"
                />
                <div className="text-[11px] tracking-wider uppercase text-emerald-300 font-bold">
                  Kader Teladan UPTQ 2026
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 5 Foto BA (ba1.png s.d. ba5.png) */}
        <div className="mt-16 pt-10 border-t border-sky-800/50">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Dokumentasi & Galeri Kegiatan</span>
            <h3 className="text-xl font-bold text-white mt-1">Aksi & Potret Pembinaan UPTQ</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="rounded-2xl overflow-hidden border border-sky-800/60 shadow-lg h-44 bg-slate-900">
              <img src="/ba1.png" alt="BA 1" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-sky-800/60 shadow-lg h-44 bg-slate-900">
              <img src="/ba2.png" alt="BA 2" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-sky-800/60 shadow-lg h-44 bg-slate-900">
              <img src="/ba3.png" alt="BA 3" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-sky-800/60 shadow-lg h-44 bg-slate-900">
              <img src="/ba4.png" alt="BA 4" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-sky-800/60 shadow-lg h-44 bg-slate-900 col-span-2 sm:col-span-1">
              <img src="/ba5.png" alt="BA 5" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
