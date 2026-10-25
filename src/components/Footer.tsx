import React from 'react';
import { ORG_DETAILS } from '../data/uptqData';
import { MapPin, Mail, Phone, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07192f] text-slate-300 border-t border-sky-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Address Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#07192f] rounded-[10px] flex items-center justify-center border border-emerald-400/20">
                  <span className="font-amiri text-2xl font-bold text-emerald-400">ق</span>
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  UPTQ UIN SGD BANDUNG
                </h3>
                <p className="text-[11px] text-sky-300 font-mono">
                  Unit Pengembangan Tilawatil Qur'an
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Lembaga Kegiatan Mahasiswa bidang Seni, Kajian, dan Pembinaan Al-Qur'an tingkat Universitas di lingkungan Universitas Islam Negeri Sunan Gunung Djati Bandung.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{ORG_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ORG_DETAILS.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{ORG_DETAILS.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#tentang" className="hover:text-emerald-400 transition-colors">
                  Tentang & Visi Misi
                </a>
              </li>
              <li>
                <a href="#divisi" className="hover:text-emerald-400 transition-colors">
                  7 Divisi Pembinaan
                </a>
              </li>
              <li>
                <a href="#maqamat" className="hover:text-emerald-400 transition-colors">
                  Studio Audio 7 Maqamat
                </a>
              </li>
              <li>
                <a href="#prestasi" className="hover:text-emerald-400 transition-colors">
                  Pojok Prestasi MTQ
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-emerald-400 transition-colors">
                  Agenda & POSQ 2026
                </a>
              </li>
            </ul>
          </div>

          {/* External Affiliations & Social Media (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kanal Resmi & Afiliasi
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#091f38] border border-sky-900/60 space-y-1">
                <div className="text-emerald-400 font-semibold">UIN Sunan Gunung Djati Bandung</div>
                <div className="text-[11px] text-slate-400">Kampus Hijau "Wahyu Memandu Ilmu"</div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-sky-950/70 border border-sky-900 text-sky-200">
                  Instagram: {ORG_DETAILS.socials.instagram}
                </span>
                <span className="px-2.5 py-1 rounded bg-sky-950/70 border border-sky-900 text-sky-200">
                  YouTube: {ORG_DETAILS.socials.youtube}
                </span>
                <span className="px-2.5 py-1 rounded bg-sky-950/70 border border-sky-900 text-sky-200">
                  TikTok: {ORG_DETAILS.socials.tiktok}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom quiet copyright bar */}
        <div className="mt-12 pt-6 border-t border-sky-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} UPTQ UIN Sunan Gunung Djati Bandung. Seluruh Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Syiar Qur'ani, Intelektual Islami, Menuju Prestasi Hakiki</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
