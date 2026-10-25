import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import { RegistrationEntry } from '../types';
import { DIVISIONS } from '../data/uptqData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDivision?: string;
}

const FACULTIES = [
  'Fakultas Ushuluddin',
  'Fakultas Tarbiyah & Keguruan',
  'Fakultas Syari\'ah & Hukum',
  'Fakultas Dakwah & Komunikasi',
  'Fakultas Adab & Humaniora',
  'Fakultas Psikologi',
  'Fakultas Sains & Teknologi',
  'Fakultas Ilmu Sosial & Ilmu Politik',
  'Fakultas Ekonomi & Bisnis Islam',
  'Pascasarjana',
];

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultDivision,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    nim: '',
    faculty: FACULTIES[0],
    studyProgram: '',
    semester: 1,
    phone: '',
    email: '',
    primaryDivision: defaultDivision || DIVISIONS[0].name,
    secondaryDivision: DIVISIONS[1].name,
    quranExperience: 'Pernah belajar tajwid dasar di madrasah/pesantren',
    motivation: '',
  });

  const [submittedEntry, setSubmittedEntry] = useState<RegistrationEntry | null>(null);

  useEffect(() => {
    if (defaultDivision) {
      setFormData((prev) => ({ ...prev, primaryDivision: defaultDivision }));
    }
  }, [defaultDivision]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const regNumber = `UPTQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const entry: RegistrationEntry = {
      ...formData,
      regNumber,
      registrationDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('uptq_registrations') || '[]');
      localStorage.setItem('uptq_registrations', JSON.stringify([entry, ...existing]));
    } catch {
      // fallback
    }

    setSubmittedEntry(entry);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#07192f] via-[#0c2b4e] to-[#047857] p-7 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
              Penerimaan Anggota Baru (Oprec 2026)
            </div>
            <h3 className="text-2xl font-black text-white">
              Pendaftaran Kader UPTQ UIN Sunan Gunung Djati
            </h3>
            <p className="text-xs text-sky-200">
              Terbuka untuk seluruh mahasiswa aktif D3, S1, dan Pascasarjana
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-7 sm:p-9">
          {!submittedEntry ? (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Muhammad Ilham"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">NIM Mahasiswa *</label>
                  <input
                    type="text"
                    required
                    value={formData.nim}
                    onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                    placeholder="Contoh: 1222030045"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Fakultas *</label>
                  <select
                    value={formData.faculty}
                    onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                  >
                    {FACULTIES.map((fac) => (
                      <option key={fac} value={fac}>{fac}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Program Studi (Jurusan) *</label>
                  <input
                    type="text"
                    required
                    value={formData.studyProgram}
                    onChange={(e) => setFormData({ ...formData, studyProgram: e.target.value })}
                    placeholder="Contoh: Ilmu Al-Qur'an dan Tafsir"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Semester *</label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Email Mahasiswa *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@uinsgd.ac.id"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Division Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Pilihan Divisi Utama *</label>
                  <select
                    value={formData.primaryDivision}
                    onChange={(e) => setFormData({ ...formData, primaryDivision: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-emerald-50/50 border border-emerald-300 rounded-xl text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Pilihan Divisi Alternatif</label>
                  <select
                    value={formData.secondaryDivision}
                    onChange={(e) => setFormData({ ...formData, secondaryDivision: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Pengalaman Seni / Tilawah Al-Qur'an Sebelumnya</label>
                <input
                  type="text"
                  value={formData.quranExperience}
                  onChange={(e) => setFormData({ ...formData, quranExperience: e.target.value })}
                  placeholder="Contoh: Hafal 3 Juz, pernah lomba kaligrafi tingkat MA, atau baru mau belajar dari nol"
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Motivasi Bergabung UPTQ UIN SGD Bandung</label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Ceritakan tujuan dan harapan Anda menjadi bagian dari keluarga besar UPTQ..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-950/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Kirim Formulir Pendaftaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* Registration Success & Verification Card */
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-sm font-bold block">Pendaftaran Berhasil Terverifikasi!</strong>
                  <p className="text-slate-600 mt-1">
                    Data Anda telah tercatat dalam sistem administrasi penerimaan kader UPTQ UIN SGD Bandung. Simpan kartu bukti pendaftaran ini untuk verifikasi tahap Bina Kader Qur'ani (BKQ).
                  </p>
                </div>
              </div>

              {/* Official Verifiable ID Card */}
              <div className="p-7 rounded-3xl bg-gradient-to-br from-[#0c2b4e] to-[#07192f] text-white border-2 border-emerald-400/40 shadow-2xl space-y-5">
                
                <div className="flex items-center justify-between pb-4 border-b border-sky-800/60">
                  <div className="flex items-center gap-3">
                    <span className="font-amiri text-3xl font-bold text-emerald-400">ق</span>
                    <div>
                      <h4 className="text-base font-black tracking-tight text-white">UPTQ UIN SGD BANDUNG</h4>
                      <span className="text-[10px] text-sky-200 uppercase font-mono font-bold">Kartu Tanda Pendaftaran Oprec</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">No. Registrasi:</span>
                    <strong className="text-sm font-mono text-emerald-300 font-extrabold tracking-wider">{submittedEntry.regNumber}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Lengkap Mahasiswa:</span>
                    <strong className="text-white text-sm font-bold">{submittedEntry.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">NIM Mahasiswa:</span>
                    <strong className="text-white font-mono text-sm">{submittedEntry.nim}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Fakultas & Prodi:</span>
                    <span className="text-slate-200 font-medium">{submittedEntry.faculty} · {submittedEntry.studyProgram}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pilihan Divisi Utama:</span>
                    <strong className="text-emerald-300 text-sm">{submittedEntry.primaryDivision}</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-800/60 flex items-center justify-between text-[11px] text-slate-300">
                  <span>Tanggal Terbit: {submittedEntry.registrationDate}</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Terverifikasi Student Center Lt. 2</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setSubmittedEntry(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Isi Formulir Baru
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Kartu Bukti</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
