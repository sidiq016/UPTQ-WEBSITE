import React, { useState } from 'react';
import {
  Compass,
  Home,
  User,
  Calendar,
  Newspaper,
  Layers,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Share2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  BookOpen,
  Trophy,
  UsersRound,
  ShieldCheck,
  Music2,
  FileText,
  Megaphone,
  RadioTower,
  PackageOpen,
  MicVocal,
  Play,
  Pause,
  X,
  Volume2,
  Clock3,
  CheckCircle,
  Eye,
  Maximize2
} from 'lucide-react';
import { ORG_DETAILS, DIVISIONS } from '../data/uptqData';
import { maqamEngine } from '../utils/audioSynthesizer';

interface DashboardAwalWindowProps {
  onOpenService?: (serviceName: string) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const DashboardAwalWindow: React.FC<DashboardAwalWindowProps> = ({
  onOpenService,
  onClose,
  isModal = false,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [kontenFilter, setKontenFilter] = useState<'all' | 'event' | 'artikel' | 'lomba' | 'rekaman'>('all');
  const [isPlayingRekaman, setIsPlayingRekaman] = useState<string | null>(null);

  const tabs = [
    { id: 1, label: '1. Home', icon: Home, badge: '5 Menu' },
    { id: 2, label: '2. Profil', icon: User, badge: null },
    { id: 3, label: '3. Agenda', icon: Calendar, badge: 'Terbaru' },
    { id: 4, label: '4. Berita', icon: Newspaper, badge: 'Warta' },
    { id: 5, label: '5. Konten', icon: Layers, badge: '4 Kategori' },
    { id: 6, label: '6. Pelayanan', icon: HeartHandshake, badge: '3 Layanan' },
    { id: 7, label: '7. Dashboard Bawah', icon: MapPin, badge: 'Kontak' },
  ];

  const handleNavigate = (targetId: string) => {
    if (isModal && onClose) {
      onClose();
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayAudio = (trackId: string, melody: number[]) => {
    if (isPlayingRekaman === trackId) {
      maqamEngine.stop();
      setIsPlayingRekaman(null);
    } else {
      setIsPlayingRekaman(trackId);
      maqamEngine.playMaqamSequence(melody, undefined, () => {
        setIsPlayingRekaman(null);
      });
    }
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-white/25 shadow-2xl transition-all duration-300 ${
        isModal
          ? 'max-w-5xl mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-950/85 backdrop-blur-2xl'
          : 'bg-slate-950/70 backdrop-blur-xl'
      }`}
      style={{
        backgroundImage: !isModal
          ? `linear-gradient(to bottom, rgba(2, 24, 44, 0.78), rgba(2, 24, 44, 0.92)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=85')`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top macOS-style Window Frame Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/15 bg-slate-900/80 backdrop-blur-md select-none">
        {/* Left: Window Dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" title="Tutup" />
          <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm" title="Minimalkan" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-sm" title="Perbesar" />
          <span className="ml-3 text-[11px] font-mono tracking-widest text-emerald-400 font-semibold uppercase">
            = Dashboard Awal · Jendela Filter UPTQ
          </span>
        </div>

        {/* Center/Right: Badges & Close action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Portal Eksplorasi 2026/2027</span>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
              aria-label="Tutup Jendela"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Navigation Filter Bar */}
      <div className="p-3 bg-slate-900/60 border-b border-white/10 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/60 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive
                        ? 'bg-emerald-950/80 text-emerald-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content View Area */}
      <div className={`p-6 text-white ${isModal ? 'overflow-y-auto max-h-[calc(92vh-120px)]' : ''}`}>
        {/* =========================================================
            TAB 1: HOME (Sejarah, Visi Misi, Kepengurusan, Bidang, Pembinaan)
            ========================================================= */}
        {activeTab === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">1. Home</span>
                  <span className="text-xs font-normal text-slate-300">· 5 Sub-menu Utama UPTQ</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Akses langsung ke fondasi sejarah, filosofi, kepengurusan, cabang seni, dan pembinaan.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold cursor-pointer"
              >
                <span>Lihat Hero Utama</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Sejarah */}
              <div
                onClick={() => handleNavigate('sejarah')}
                className="group p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    • Sejarah
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Napak tilas 35+ tahun berdirinya UPTQ sejak 1990 dalam mencetak qari-qari'ah dan kader Qur'ani berprestasi.
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Buka Sejarah</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

              {/* Visi Misi */}
              <div
                onClick={() => handleNavigate('visi-misi')}
                className="group p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    • Visi Misi
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Menjadi pusat unggulan pengembangan tilawatil Qur'an berbasis paradigma integrasi Wahyu Memandu Ilmu.
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Buka Visi Misi</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

              {/* Kepengurusan */}
              <div
                onClick={() => handleNavigate('kepengurusan')}
                className="group p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <UsersRound className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    • Kepengurusan
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Struktur Dewan Pengurus Harian (DPH), Majelis Pertimbangan Organisasi (MPO), dan Dewan Pembina.
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Struktur</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

              {/* Bidang */}
              <div
                onClick={() => handleNavigate('bidang')}
                className="group p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    • Bidang (7 Divisi)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tilawah & Qira'at, Tahfidz 30 Juz, Kaligrafi Khattil Qur'an, Syarhil, Fahmil, KTIQ, dan Hadroh Religi.
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Eksplor 7 Bidang</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>

              {/* Pembinaan */}
              <div
                onClick={() => handleNavigate('pembinaan')}
                className="group p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                    • Pembinaan
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jadwal rutin mingguan, kurikulum talaqqi sanad, halqah harian, serta bimbingan intensif dewan guru.
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform">
                  <span>Jadwal Pembinaan</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: PROFIL
            ========================================================= */}
        {activeTab === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">2. Profil</span>
                  <span className="text-xs font-normal text-slate-300">· Lembaga Seni Qur'ani UIN SGD</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Profil kelembagaan, pembinaan seni Qur'ani, dan rekam jejak kader.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('profil')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold cursor-pointer"
              >
                <span>Buka Bagian Profil Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
                <div className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>Dedikasi &amp; Tradisi</span>
                </div>
                <div className="text-3xl font-black text-white">35+ Tahun</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Kiprah membina generasi Qur'ani berakhlak mulia dan berprestasi sejak 1990 di UIN Bandung.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <UsersRound className="w-4 h-4" />
                  <span>Kaderisasi Mahasiswa</span>
                </div>
                <div className="text-3xl font-black text-white">1,250+</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Alumni & kader aktif tersebar di seluruh Indonesia sebagai qari, hafidz, dan akademisi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
                <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Trofi Juara</span>
                </div>
                <div className="text-3xl font-black text-white">85+ Gelar</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Piala MTQ Mahasiswa Nasional, Kopertais II Jabar, dan kejuaraan tilawah antar bangsa.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900/70 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Filosofi "Wahyu Memandu Ilmu"</h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Setiap pembinaan qira'at dan seni Islam di UPTQ berorientasi pada penyatuan spiritualitas Al-Qur'an dan kecendekiaan sains modern.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('profil')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Selengkapnya
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: AGENDA
            ========================================================= */}
        {activeTab === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">3. Agenda</span>
                  <span className="text-xs font-normal text-slate-300">· Kalender Kegiatan &amp; Musabaqah</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Jadwal open recruitment, haflah tilawah, khataman akbar, dan kompetisi.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('agenda')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold cursor-pointer"
              >
                <span>Buka Kalender Agenda Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                  <span>15 - 28 MEI 2026</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px]">PENDAFTARAN</span>
                </div>
                <h4 className="text-sm font-bold text-white">Open Recruitment Kader Baru 2026</h4>
                <p className="text-xs text-slate-300">
                  Penerimaan anggota baru untuk 7 divisi seni Islam UPTQ bagi seluruh mahasiswa UIN SGD.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                  <span>10 JUNI 2026</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px]">HAFLAH</span>
                </div>
                <h4 className="text-sm font-bold text-white">Haflah Tilawah &amp; Khataman Akbar</h4>
                <p className="text-xs text-slate-300">
                  Lantunan tilawah maqamat bersama Qari Internasional dan wisuda tahfidz 30 juz.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                  <span>22 JULI 2026</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[10px]">KOMPETISI</span>
                </div>
                <h4 className="text-sm font-bold text-white">Kafilah MTQ Mahasiswa Nasional</h4>
                <p className="text-xs text-slate-300">
                  Pelepasan kafilah delegasi mahasiswa UIN SGD menuju ajang bergengsi MTQMN.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: BERITA
            ========================================================= */}
        {activeTab === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">4. Berita</span>
                  <span className="text-xs font-normal text-slate-300">· Kabar Terkini &amp; Prestasi Kampus</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Warta kegiatan syiar Al-Qur'an, liputan kejuaraan, dan kabar kepengurusan.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('berita')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold cursor-pointer"
              >
                <span>Buka Arsip Berita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => handleNavigate('berita')}
                className="p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 transition-all cursor-pointer flex gap-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
                  alt="Berita Prestasi"
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] text-amber-400 font-mono font-bold">PRESTASI NASIONAL</span>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    Kafilah UPTQ Raih Juara Umum MTQ Mahasiswa Tingkat Jawa Barat
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Delegasi cabang tilawah dan tahfidz kembali mengharumkan nama kampus Gunung Djati dengan perolehan 7 piala emas.
                  </p>
                </div>
              </div>

              <div
                onClick={() => handleNavigate('berita')}
                className="p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-white/10 transition-all cursor-pointer flex gap-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=300&q=80"
                  alt="Berita Pelantikan"
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">KEPENGURUSAN</span>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    Pelantikan Akbar Pengurus UPTQ Masa Khidmat 2026/2027 Resmi Digelar
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Dihadiri jajaran Rektorat dan alumni, pengurus baru siap membawa inovasi digital syiar Qur'ani.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: KONTEN (Event, Artikel, Lomba, Rekaman)
            ========================================================= */}
        {activeTab === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">5. Konten</span>
                  <span className="text-xs font-normal text-slate-300">· 4 Kategori Edukasi &amp; Audio Syiar</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Filter langsung konten berdasarkan Event, Artikel ilmiah, Lomba, dan Rekaman tilawah murottal.
                </p>
              </div>

              {/* Sub-filter pills */}
              <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-white/10">
                {(['all', 'event', 'artikel', 'lomba', 'rekaman'] as const).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setKontenFilter(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      kontenFilter === sub
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {sub === 'all' ? 'Semua' : sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Filtered Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Event Card */}
              {(kontenFilter === 'all' || kontenFilter === 'event') && (
                <div
                  onClick={() => handleNavigate('konten')}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2 hover:border-emerald-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Megaphone className="w-3 h-3" /> EVENT
                    </span>
                    <span>18 Mei 2026</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    Seminar Nasional: Rahasia Maqamat Tilawah &amp; Tajwid Riwayat Imam Ashim
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Bedah nada Bayati dan Hijaz bersama dewan hakim LPTQ Nasional dan dosen Ushuluddin.
                  </p>
                </div>
              )}

              {/* Artikel Card */}
              {(kontenFilter === 'all' || kontenFilter === 'artikel') && (
                <div
                  onClick={() => handleNavigate('konten')}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" /> ARTIKEL
                    </span>
                    <span>Karya Tulis Ilmiah</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    Integrasi Wahyu Memandu Ilmu dalam Preservasi Seni Khat Kaligrafi Islam
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Kajian metodologis estetika seni kaligrafi Arab sebagai sarana transmisi teks suci Al-Qur'an.
                  </p>
                </div>
              )}

              {/* Lomba Card */}
              {(kontenFilter === 'all' || kontenFilter === 'lomba') && (
                <div
                  onClick={() => handleNavigate('konten')}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2 hover:border-amber-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> LOMBA
                    </span>
                    <span>MTQ Internal UIN</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    Musabaqah Tilawatil Qur'an Tingkat Universitas 2026
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    Kompetisi 7 cabang seni Al-Qur'an memperebutkan Piala Bergilir Rektor UIN SGD Bandung.
                  </p>
                </div>
              )}

              {/* Rekaman Audio Card (Interactive Playback) */}
              {(kontenFilter === 'all' || kontenFilter === 'rekaman') && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-teal-950/70 border border-teal-500/40 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-teal-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> REKAMAN AUDIO
                    </span>
                    <span className="text-amber-300 font-bold">MAQAM RAST &amp; BAYATI</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Murottal Syahdu QS. Al-Muzzammil (Ayat 1-8)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Lantunan tilawah dengan variasi laras Rast Qarar dan Bayati Syuri oleh Duta Qari UPTQ.
                  </p>
                  <div className="pt-1 flex items-center justify-between gap-3">
                    <button
                      onClick={() =>
                        handlePlayAudio('rekaman-1', [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25])
                      }
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPlayingRekaman === 'rekaman-1'
                          ? 'bg-rose-500 text-white'
                          : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                      }`}
                    >
                      {isPlayingRekaman === 'rekaman-1' ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Jeda Audio</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          <span>Dengarkan Langsung</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] text-slate-400">Audio Synth 44.1kHz</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: PELAYANAN (Media Partner, Peminjaman Barang, Entertainment)
            ========================================================= */}
        {activeTab === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">6. Pelayanan</span>
                  <span className="text-xs font-normal text-slate-300">· 3 Layanan Terpadu UPTQ</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Fasilitas resmi untuk kolaborasi syiar, peminjaman inventaris, dan pengisi acara seni Islam.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('pelayanan')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold cursor-pointer"
              >
                <span>Buka Formulir Pelayanan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Media Partner */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                    <RadioTower className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">• Media Partner</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Kerja sama publikasi acara keagamaan, seminar kampus, dan event pemuda di kanal media sosial UPTQ.
                  </p>
                </div>
                <button
                  onClick={() => onOpenService && onOpenService('Media Partner')}
                  className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Ajukan Media Partner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Peminjaman Barang */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <PackageOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">• Peminjaman Barang</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Peminjaman sound system portable, mikrofon wireless, podium MTQ, dan alat musik hadroh/rebana.
                  </p>
                </div>
                <button
                  onClick={() => onOpenService && onOpenService('Peminjaman Barang')}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Ajukan Peminjaman</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Entertainment */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <MicVocal className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">• Entertainment</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengisi acara qari tilawah pembuka, tim hadroh shalawat, musik gambus religi, dan MC bilingual.
                  </p>
                </div>
                <button
                  onClick={() => onOpenService && onOpenService('Entertainment')}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Booking Pengisi Acara</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 7: DASHBOARD BAWAH (Alamat, Contact Person, Email, Media Sosial, Lokasi G Maps)
            ========================================================= */}
        {activeTab === 7 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">7. Dashboard Bawah</span>
                  <span className="text-xs font-normal text-slate-300">· Kontak, Alamat, Media &amp; Peta</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Informasi lengkap sekretariat, WhatsApp humas, email resmi, dan navigasi lokasi kampus.
                </p>
              </div>
              <button
                onClick={() => handleNavigate('kontak')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-semibold cursor-pointer"
              >
                <span>Lihat Footer Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Alamat */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">• Alamat</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gedung Student Center Lt. 2, Kampus 1 UIN Sunan Gunung Djati Bandung, Jl. A.H. Nasution No. 105, Cibiru, Kota Bandung 40614
                </p>
              </div>

              {/* Contact Person */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">• Contact Person</h4>
                <p className="text-xs text-slate-300">WhatsApp Humas &amp; Sekretariat:</p>
                <a
                  href="https://wa.me/6282119902026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>+62 821-1990-2026</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">• Email</h4>
                <p className="text-xs text-slate-300">Surel Resmi Organisasi:</p>
                <a
                  href="mailto:uptq@uinsgd.ac.id"
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <span>uptq@uinsgd.ac.id</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Media Sosial */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">• Media Sosial</h4>
                <div className="space-y-1 text-xs">
                  <div>
                    <a
                      href="https://instagram.com/uptquinbandung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 font-semibold"
                    >
                      IG: @uptquinbandung
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://youtube.com/@uptquinbandung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:text-rose-300 font-semibold"
                    >
                      YT: UPTQ UIN BANDUNG
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Lokasi Google Maps Embedded */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>• Lokasi G Maps: UIN Sunan Gunung Djati Bandung</span>
                </h4>
                <a
                  href="https://maps.google.com/?q=UIN+Sunan+Gunung+Djati+Bandung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <span>Buka di Google Maps App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-44 rounded-xl overflow-hidden border border-white/10 relative">
                <iframe
                  title="Peta Lokasi Google Maps UIN Sunan Gunung Djati Bandung"
                  src="https://www.google.com/maps?q=UIN%20Sunan%20Gunung%20Djati%20Bandung&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="px-5 py-2.5 bg-slate-900/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Sistem Navigasi Cepat Portal UPTQ · Klik salah satu item untuk langsung menuju ke halaman/aksi</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-emerald-400">Tab {activeTab}/7 Aktif</span>
        </div>
      </div>
    </div>
  );
};
