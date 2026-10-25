import React, { useState } from 'react';
import { Target, Compass, BookOpen, HeartHandshake, Award } from 'lucide-react';
import { ORG_DETAILS } from '../data/uptqData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'sejarah' | 'filosofi'>('visi-misi');

  const values = [
    { title: "Qur'ani", subtitle: "Asas Ruhaniah", desc: "Menjadikan Al-Qur'an dan Sunnah sebagai poros utama adab, akhlak, dan perilaku segenap civitas kader.", icon: BookOpen, accent: "from-emerald-500 to-teal-600" },
    { title: "Intelektual", subtitle: "Nalar Kritis", desc: "Mengasah ketajaman nalar saintifik, riset tafsir tematik, dan integrasi sains modern dengan Wahyu Memandu Ilmu.", icon: Target, accent: "from-sky-500 to-blue-600" },
    { title: "Prestasi Hakiki", subtitle: "Kejuaraan & Mutqin", desc: "Berikhtiar maksimal meraih medali emas MTQ dan penghargaan nasional dengan niat lillahi ta'ala.", icon: Award, accent: "from-amber-500 to-orange-600" },
    { title: "Khidmah Ummah", subtitle: "Pengabdian Sosial", desc: "Mengabdi kepada kampus dan masyarakat luas melalui pengajaran Al-Qur'an dan syiar konten kreatif.", icon: HeartHandshake, accent: "from-teal-500 to-emerald-700" },
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

          <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 self-start shrink-0">
            <button onClick={() => setActiveTab('visi-misi')} className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === 'visi-misi' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Visi & Misi 2030</button>
            <button onClick={() => setActiveTab('sejarah')} className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === 'sejarah' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Sejarah & 4 Nilai</button>
            <button onClick={() => setActiveTab('filosofi')} className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === 'filosofi' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Filosofi Lambang</button>
          </div>
        </div>

        {/* Tab 1: Visi & Misi */}
        {activeTab === 'visi-misi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c2b4e] via-[#09213d] to-[#047857] text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-widest text-emerald-300 font-bold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Visi Utama 2026-2030</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  "Menjadi Pusat Unggulan Pembinaan Seni, Riset, dan Prestasi Al-Qur'an Mahasiswa yang Berdaya Saing Global Berlandaskan Wahyu Memandu Ilmu."
                </h3>
              </div>
              <div className="pt-6 mt-8 border-t border-sky-800/60 flex items-center justify-between text-xs text-sky-200">
                <span>Rencana Strategis</span>
                <span className="font-mono text-emerald-300 font-bold">Renstra UPTQ 2030</span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">01</div>
                <h4 className="text-base font-bold text-slate-900">Pembinaan Seni Qur'an Terstandar</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Menyelenggarakan halqah pelatihan terstruktur pada 7 cabang seni Al-Qur'an.</p>
              </div>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">02</div>
                <h4 className="text-base font-bold text-slate-900">Riset Saintifik & Karya Ilmiah</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Mengembangkan riset tafsir maudhu'i dan KTIQ.</p>
              </div>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">03</div>
                <h4 className="text-base font-bold text-slate-900">Kaderisasi Ukhuwah & Adab</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Membangun iklim keorganisasian yang profesional dan beradab.</p>
              </div>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">04</div>
                <h4 className="text-base font-bold text-slate-900">Syiar Digital Transformatif</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Mengoptimalkan media sosial dan podcast Qur'anic Vibes.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sejarah & Foto Sejarah / Profil */}
        {activeTab === 'sejarah' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Teks Sejarah */}
              <div className="lg:col-span-7 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-emerald-700">
                  Lahir pada tahun 1990 dari keikhlasan para masyaikh dan aktivis mahasiswa kampus IAIN (kini UIN) Sunan Gunung Djati Bandung, UPTQ menjadi wadah resmi yang mengintegrasikan potensi tilawah, tahfidz, dan kaligrafi dari berbagai pesantren penjuru nusantara.
                </p>
                <p>
                  Selama lebih dari 35 tahun, UPTQ telah melahirkan ratusan sarjana yang kini berkiprah sebagai dewan hakim MTQ, akademisi tafsir, pimpinan pondok pesantren, dan da'i profesional di tingkat nasional maupun internasional.
                </p>
              </div>

              {/* Foto Sejarah */}
              <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-72">
                <img src="/sejarah.png" alt="Sejarah UPTQ" className="w-full h-full object-cover" />
              </div>

            </div>

            {/* Foto Profil Tambahan & Fakta */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-200">
              <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-72 order-2 lg:order-1">
                <img src="/profil.png" alt="Profil UPTQ" className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-slate-900">Potret Kelembagaan & Kaderisasi</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pembinaan intensif dilakukan setiap pekan melalui halqah di Student Center UIN Bandung, mencakup pelatihan vokal maqamat, penyetoran hafalan mutqin, hingga pelatihan kaligrafi kontemporer.
                </p>
              </div>
            </div>

            {/* 4 Nilai Inti */}
            <div className="pt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">4 Pilar Karakter Kader UPTQ</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
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
              <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-[#07192f] via-[#0c2b4e] to-[#047857] p-8 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-emerald-400/30 relative overflow-hidden">
                <div className="w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-400/40 flex items-center justify-center mb-4 shadow-inner overflow-hidden p-2">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-lg font-black text-white tracking-wide">UPTQ UIN SGD</div>
                <div className="text-xs text-emerald-300 mt-1 font-mono">Wahyu Memandu Ilmu</div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-black text-slate-900">Makna Simbolik & Harmoni Warna</h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-base mb-1">Lambang Resmi & Huruf 'Qaf' (ق)</strong>
                  Melambangkan Al-Qur'ان sebagai pedoman utama dan sumber mata air ilmu pengetahuan di kampus UIN Sunan Gunung Djati Bandung.
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-base mb-1">Perpaduan Biru & Hijau</strong>
                  Melambangkan kedalaman intelektual serta kesuburan tradisi Islam Nusantara dan kampus hijau.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
