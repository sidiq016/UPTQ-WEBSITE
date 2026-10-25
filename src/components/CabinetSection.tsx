import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export const CabinetSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bph' | 'bidang'>('all');

  // Daftar pengurus inti yang terhubung dengan foto Anda
  const customMembers = [
    {
      id: 1,
      name: "Ketua Umum UPTQ",
      role: "Ketua Umum",
      department: "Badan Pengurus Harian",
      faculty: "UIN SGD Bandung",
      generation: "2026",
      quote: "Menjadikan UPTQ sebagai rumah pembinaan Qur'ani yang unggul dan berprestasi.",
      image: "/ketum.png"
    },
    {
      id: 2,
      name: "Sekretaris Umum I (Putra)",
      role: "Sekretaris Umum I",
      department: "Badan Pengurus Harian",
      faculty: "UIN SGD Bandung",
      generation: "2026",
      quote: "Tertib administrasi dan solid dalam ukhuwah.",
      image: "/sekum-1.png"
    },
    {
      id: 3,
      name: "Sekretaris Umum II (Putri)",
      role: "Sekretaris Umum II",
      department: "Badan Pengurus Harian",
      faculty: "UIN SGD Bandung",
      generation: "2026",
      quote: "Melayani dengan ketulusan hati untuk kemajuan organisasi.",
      image: "/sekum-2.png"
    },
    {
      id: 4,
      name: "Penanggung Jawab Sarpras",
      role: "Sarana & Prasarana",
      department: "Bidang Perlengkapan",
      faculty: "UIN SGD Bandung",
      generation: "2026",
      quote: "Siap sedia merawat fasilitas demi kenyamanan dakwah Qur'ani.",
      image: "/sarpras.png"
    }
  ];

  const ketum = customMembers[0];

  const filteredMembers = customMembers.filter((m) => {
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Struktur Pengurus Kabinet Syiar Qur'ani
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Dikelola oleh kader-kader mahasiswa berakhlakul karimah yang mengemban amanah kelembagaan dengan profesionalisme.
          </p>
        </div>

        {/* Ketua Umum Executive Card dengan Foto Ketum */}
        <div className="mb-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#07192f] via-[#0c2b4e] to-[#047857] text-white shadow-xl border border-sky-700/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-8 space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>Amanah Ketua Umum UPTQ</span>
            </div>
            <p className="text-lg sm:text-xl text-slate-100 italic leading-relaxed font-light">
              "{ketum.quote}"
            </p>
            <div className="pt-2">
              <h3 className="text-2xl font-black text-white">{ketum.name}</h3>
              <div className="text-xs sm:text-sm text-emerald-300 font-semibold mt-0.5">
                {ketum.role} · {ketum.faculty}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end relative z-10">
            <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-emerald-400/40 shadow-2xl bg-slate-950">
              <img src={ketum.image} alt={ketum.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Members Grid (Sekum 1, Sekum 2, Sarpras) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.slice(1).map((member) => (
            <div key={member.id} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-700 font-bold">{member.role}</div>
                  <h3 className="text-base font-black text-slate-900 leading-snug">{member.name}</h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic font-light leading-relaxed">
                "{member.quote}"
              </p>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div>
                  <span className="text-slate-400">Bagian: </span>
                  <span className="text-slate-800 font-semibold">{member.department}</span>
                </div>
                <div>
                  <span className="text-slate-400">Status: </span>
                  <span className="text-slate-700">Mahasiswa UIN SGD Bandung</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
