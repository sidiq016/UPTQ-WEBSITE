import React, { useState } from 'react';
import { Target, Compass, BookOpen, HeartHandshake, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { ORG_DETAILS } from '../data/uptqData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'sejarah' | 'filosofi'>('visi-misi');

  const values = [
    {
      title: "Qur'ani",
      subtitle: "Asas Ruhaniah",
      desc: "Menjadikan Al-Qur'an dan Sunnah sebagai poros utama adab, akhlak, dan perilaku segenap civitas kader.",
      icon: BookOpen,
      accent: "from-emerald-500 to-teal-600",
    },
    {
      title: "Intelektual",
      subtitle: "Nalar Kritis",
      desc: "Mengasah ketajaman nalar saintifik, riset tafsir tematik, dan integrasi sains modern dengan Wahyu Memandu Ilmu.",
      icon: Target,
      accent: "from-sky-500 to-blue-600",
    },
    {
      title: "Prestasi Hakiki",
      subtitle: "Kejuaraan & Mutqin",
      desc: "Berikhtiar maksimal meraih medali emas MTQ dan penghargaan nasional dengan niat lillahi ta'ala.",
      icon: Award,
      accent: "from-amber-500 to-orange-600",
    },
    {
      title: "Khidmah Ummah",
      subtitle: "Pengabdian Sosial",
      desc: "Mengabdi kepada kampus dan masyarakat luas melalui pengajaran Al-Qur'an dan syiar konten kreatif.",
      icon: HeartHandshake,
      accent: "from-teal-500 to-emerald-700",
    },
  ];

  return (
    <section id="tentang" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 font-bold">
              <span className="w-6 h-0.5 bg-emerald-600" />
              <span>Profil & Visi Kelembagaan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 [text-wrap:balance]">
              Menjaga Tradisi Keilmuan & Seni Al-Qur'an Sejak {ORG_DETAILS.establishedYear}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed pt-1">
              Unit Pengembangan Tilawatil Qur'an (UPTQ) UIN Sunan Gunung Djati Bandung adalah pusat unggulan mahasiswa dalam seni tilawah, qira'at sab'ah, tahfidz mutqin, khat kaligrafi, dan riset ilmiah bernafaskan Al-Qur'an.
            </p>
          </div>

          {/* Segmented Control Buttons */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 self-start shrink-0">
            <button
              onClick={() => setActiveTab('visi-misi')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'visi-misi'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visi & Misi 2030
            </button>
            <button
              onClick={() => setActiveTab('sejarah')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'sejarah'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sejarah & 4 Nilai
            </button>
            <button
              onClick={() => setActiveTab('filosofi')}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'filosofi'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Filosofi Lambang
            </button>
          </div>
        </div>

        {/* Tab 1: Visi & Misi */}
        {activeTab === 'visi-misi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Grand Visi Banner Card */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2b4e] via-[#09213d] to-[#047857] text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-emerald-300/30 text-xs uppercase tracking-widest text-emerald-300 font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Visi Utama 2026-2030</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  "Menjadi Pusat Unggulan Pembinaan Seni, Riset, dan Prestasi Al-Qur'an Mahasiswa yang Berdaya Saing Global Berlandaskan Wahyu Memandu Ilmu."
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed font-light">
                  Melahirkan sarjana muslim yang tidak hanya piawai melantunkan ayat Ilahi dengan cengkok maqamat dan riwayat mutawatir, namun juga berakhlakul karimah, mandiri, dan berjiwa pemikir peradaban.
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-sky-800/60 flex items-center justify-between text-xs text-sky-200 relative z-10">
                <span>Rencana Strategis</span>
                <span className="font-mono text-emerald-300 font-bold">Renstra UPTQ 2030</span>
              </div>
            </div>

            {/* 4 Misi Strategic Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-400/60 transition-all hover:shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h4 className="text-base font-bold text-slate-900">Pembinaan Seni Qur'an Terstandar</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Menyelenggarakan halqah pelatihan terstruktur pada 7 cabang seni Al-Qur'an yang dibimbing langsung dewan hakim LPTQ dan qari juara nasional.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-sky-400/60 transition-all hover:shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h4 className="text-base font-bold text-slate-900">Riset Saintifik & Karya Ilmiah</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mengembangkan riset tafsir maudhu'i (tematik), penulisan karya tulis ilmiah Al-Qur'an (KTIQ), dan simposium pemikiran Islam kontemporer.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-400/60 transition-all hover:shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h4 className="text-base font-bold text-slate-900">Kaderisasi Ukhuwah & Adab</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Membangun iklim keorganisasian yang inklusif, profesional, beradab, berlandaskan persaudaraan ukhuwah Islamiyah lintas fakultas.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-400/60 transition-all hover:shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h4 className="text-base font-bold text-slate-900">Syiar Digital Transformatif</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mengoptimalkan media sosial, podcast Qur'anic Vibes, dan publikasi video untuk menghadirkan dakwah Islam yang sejuk, estetik, dan inspiratif.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Sejarah & 4 Nilai Inti */}
        {activeTab === 'sejarah' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 max-w-prose">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-emerald-700">
                  Lahir pada tahun 1990 dari keikhlasan para masyaikh dan aktivis mahasiswa kampus IAIN (kini UIN) Sunan Gunung Djati Bandung, UPTQ menjadi wadah resmi yang mengintegrasikan potensi tilawah, tahfidz, dan kaligrafi dari berbagai pesantren penjuru nusantara.
                </p>
                <p>
                  Selama lebih dari 35 tahun, UPTQ telah melahirkan ratusan sarjana yang kini berkiprah sebagai dewan hakim MTQ, akademisi tafsir, pimpinan pondok pesantren, seniman kaligrafer, dan da'i profesional di tingkat nasional maupun internasional.
                </p>
              </div>

              <div className="lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-200/80 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Fakta Kelembagaan UPTQ
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Tahun Pendirian</span>
                    <strong className="font-mono text-slate-900">1990 M (35+ Tahun)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Sekretariat Resmi</span>
                    <strong className="text-slate-900">Gedung SC Lt. 2</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Naungan Lembaga</span>
                    <strong className="text-slate-900">Wakil Rektor III UIN SGD</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Jejaring Alumni</span>
                    <strong className="text-slate-900">Nasional & Luar Negeri</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Nilai Inti */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">4 Pilar Karakter Kader UPTQ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-400/60 transition-all hover:shadow-md">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.accent} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{v.subtitle}</span>
                        <h4 className="text-lg font-black text-slate-900">{v.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Filosofi Lambang */}
        {activeTab === 'filosofi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-[#07192f] via-[#0c2b4e] to-[#047857] p-8 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-emerald-400/30 relative">
                <div className="w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/40 flex items-center justify-center mb-4 shadow-inner">
                  <span className="font-amiri text-6xl font-bold text-emerald-300">ق</span>
                </div>
                <div className="text-lg font-black text-white tracking-wide">
                  UPTQ UIN SGD
                </div>
                <div className="text-xs text-emerald-300 mt-1 font-mono">
                  Wahyu Memandu Ilmu
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-black text-slate-900">Makna Simbolik & Harmoni Warna</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-base mb-1">Huruf 'Qaf' (ق) & Mushaf Terbuka</strong>
                  Melambangkan Al-Qur'anul Karim sebagai sumber mata air ilmu pengetahuan, pedoman kebenaran mutlak, dan landasan utama pembinaan karakter mahasiswa.
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-base mb-1">Perpaduan Biru Laut (Ocean Blue) & Hijau Zamrud (Emerald)</strong>
                  Biru melambangkan kedalaman samudra intelektual, profesionalisme, ketenangan, dan keluasan wawasan modern. Hijau merepresentasikan kesuburan tradisi Islam nusantara, akhlak karimah, dan identitas kampus hijau UIN SGD.
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-base mb-1">Warna Putih Suci (Pure White)</strong>
                  Menegaskan keikhlasan niat lillahi ta'ala dalam mengabdi, kemurnian kalam Ilahi, serta kejujuran dalam berorganisasi.
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
