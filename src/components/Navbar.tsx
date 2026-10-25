import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#07192f]/90 backdrop-blur-xl border-b border-sky-800/50 text-white transition-all shadow-lg shadow-sky-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a href="#" className="flex items-center gap-3.5 group whitespace-nowrap shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-600 p-0.5 shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07192f] rounded-[14px] flex items-center justify-center border border-emerald-400/30">
                <span className="font-amiri text-2xl font-bold text-emerald-300">ق</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                UPTQ UIN SGD
              </span>
              <span className="text-[10px] tracking-widest text-sky-300/90 uppercase font-semibold">
                Bandung · Wahyu Memandu Ilmu
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-200">
            <a href="#tentang" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
              Tentang Kami
            </a>
            <a href="#divisi" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
              7 Divisi
            </a>
            <a href="#maqamat" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
              Studio Maqamat
            </a>
            <a href="#prestasi" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
              Prestasi
            </a>
            <a href="#agenda" className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0">
              Agenda POSQ
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 rounded-xl shadow-md shadow-emerald-950/60 hover:shadow-emerald-500/20 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Pendaftaran Oprec 2026</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sky-900/60 bg-[#07192f] px-6 py-5 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
            <a
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Tentang Kami
            </a>
            <a
              href="#divisi"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Divisi & Pembinaan
            </a>
            <a
              href="#maqamat"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Studio Maqamat
            </a>
            <a
              href="#prestasi"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Prestasi & Arsip
            </a>
            <a
              href="#agenda"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-emerald-400 py-1 transition-colors"
            >
              Agenda & Kegiatan
            </a>
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
            >
              <span>Pendaftaran Anggota (Oprec)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
