import React, { useState, useEffect } from 'react';
import { Play, Square, Music, Volume2, Sparkles, BookOpen, Info, Radio } from 'lucide-react';
import { MAQAMAT_TRACKS } from '../data/uptqData';
import { MaqamTrack } from '../types';
import { maqamEngine } from '../utils/audioSynthesizer';

export const AudioShowcase: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<MaqamTrack>(MAQAMAT_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeNoteIdx, setActiveNoteIdx] = useState<number>(-1);

  useEffect(() => {
    return () => {
      maqamEngine.stop();
    };
  }, []);

  const handlePlay = (track: MaqamTrack) => {
    setSelectedTrack(track);
    if (isPlaying && selectedTrack.id === track.id) {
      maqamEngine.stop();
      setIsPlaying(false);
      setActiveNoteIdx(-1);
      return;
    }

    setIsPlaying(true);
    maqamEngine.playMaqamSequence(
      track.melodyNotes,
      (idx) => {
        setActiveNoteIdx(idx);
      },
      () => {
        setIsPlaying(false);
        setActiveNoteIdx(-1);
      }
    );
  };

  const handleStop = () => {
    maqamEngine.stop();
    setIsPlaying(false);
    setActiveNoteIdx(-1);
  };

  return (
    <section id="maqamat" className="py-24 bg-[#06192e] text-white border-b border-sky-900/60 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-bold">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Studio Interaktif Seni Baca Qur'an</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white [text-wrap:balance]">
              Eksplorasi 7 Lagu Maqamat Tilawah
            </h2>
            <p className="text-base text-slate-300 leading-relaxed pt-1">
              Dengarkan lantunan frekuensi nada dan karakter cengkok khas 7 Maqam standar musabaqah tilawatil Qur'an yang dibina di UPTQ UIN Sunan Gunung Djati Bandung.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/70 border border-sky-800/60 flex items-center gap-3 self-start text-xs text-sky-200">
            <Volume2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Synthesizer Harmoni Aktif</span>
              <span>Web Audio API · Tanpa buffering</span>
            </div>
          </div>
        </div>

        {/* 2-Column Audio Workstation Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): 7 Maqam Selection Tiles */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
              <span>Pilih Tangga Lagu Maqam</span>
              <span className="text-emerald-400 font-mono text-[11px]">7 Maqamat Lengkap</span>
            </div>

            <div className="space-y-2">
              {MAQAMAT_TRACKS.map((track, idx) => {
                const isCurrent = track.id === selectedTrack.id;
                const isThisPlaying = isCurrent && isPlaying;

                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setSelectedTrack(track);
                      if (isPlaying) {
                        handlePlay(track);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#0c2b4e] to-[#064e3b] border-emerald-400/60 text-white shadow-xl scale-[1.01]'
                        : 'bg-[#091f38]/60 border-sky-900/40 text-slate-300 hover:bg-[#0c2b4e]/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(track);
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isThisPlaying
                            ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-emerald-300'
                            : 'bg-white/10 hover:bg-emerald-600 text-slate-200 hover:text-white'
                        }`}
                        title={isThisPlaying ? 'Stop' : 'Putar Tangga Nada'}
                      >
                        {isThisPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </button>

                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{track.name}</span>
                          <span className="text-[11px] font-normal text-emerald-300">({track.character})</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          {track.surah} · {track.ayah}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-amiri text-xl text-emerald-300 font-bold block">
                        {track.arabicName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Studio Console & Melodic Visualizer */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-b from-[#0c2b4e] via-[#091f38] to-[#07192f] border border-sky-700/60 p-7 sm:p-9 space-y-6 shadow-2xl relative overflow-hidden">
              
              {/* Studio Header */}
              <div className="flex items-center justify-between pb-4 border-b border-sky-800/60">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 font-bold">
                  <Music className="w-4 h-4" />
                  <span>Laboratorium Vokal Qari</span>
                </div>

                {/* Animated Equalizer Wave */}
                <div className="flex items-end gap-1 h-5">
                  {[30, 80, 50, 95, 65, 85, 40].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: isPlaying ? `${h}%` : '20%' }}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-emerald-400' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Play Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black text-white">
                    {selectedTrack.name}
                  </h3>
                  <div className="text-xs sm:text-sm text-emerald-300 font-medium mt-1">
                    Karakteristik Jiwa: <strong>{selectedTrack.character}</strong>
                  </div>
                </div>

                <div>
                  {isPlaying ? (
                    <button
                      onClick={handleStop}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Hentikan Audio</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlay(selectedTrack)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Dengarkan Tangga Nada</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Maqam Description */}
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {selectedTrack.description}
              </p>

              {/* Note Frequency Ladder */}
              <div className="p-4 rounded-2xl bg-[#06182c] border border-sky-900/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tangga Nada Skala (Frekuensi Audio Hz)</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">
                    {isPlaying ? `Memainkan Not ke-${activeNoteIdx + 1}` : 'Siap'}
                  </span>
                </div>
                <div className="grid grid-cols-8 gap-1.5 pt-1">
                  {selectedTrack.melodyNotes.map((freq, idx) => {
                    const isActive = isPlaying && activeNoteIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-center transition-all ${
                          isActive
                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-105 shadow-lg'
                            : 'bg-sky-950/80 text-slate-300 border border-sky-900/50'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-slate-400">N{idx + 1}</div>
                        <div className="text-xs font-black font-mono tabular-nums">{Math.round(freq)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Arabic Verse Box with Calligraphy */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#06182c] to-[#0a233f] border border-emerald-400/20 text-center space-y-4">
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                  Contoh Penerapan Ayat ({selectedTrack.surah} : {selectedTrack.ayah})
                </div>
                <div className="font-amiri text-3xl sm:text-4xl text-emerald-200 font-bold leading-loose px-2 drop-shadow">
                  {selectedTrack.arabicVerse}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 italic max-w-xl mx-auto">
                  "{selectedTrack.translation}"
                </div>
                <div className="pt-2 text-xs text-sky-300 border-t border-sky-900/60 flex items-center justify-center gap-2">
                  <span>Rujukan Rekaman Suara:</span>
                  <strong className="text-white">{selectedTrack.qari}</strong>
                </div>
              </div>

              {/* Practice Reminder */}
              <div className="flex items-start gap-2.5 text-xs text-slate-400">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Pelatihan maqamat intensif diadakan setiap Selasa & Kamis sore di Masjid Icom UIN SGD Bandung bersama dewan hakim LPTQ.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
