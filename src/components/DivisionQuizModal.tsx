import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { DIVISIONS } from '../data/uptqData';

interface DivisionQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDivision: (divisionName: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    targetDivisionId: string;
    sub: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Keahlian atau minat apa yang paling ingin Anda kembangkan di kampus?",
    options: [
      { label: "Seni Baca Al-Qur'an (Lagu Maqamat & Cengkok)", targetDivisionId: "tilawah", sub: "Memperindah suara dengan kaidah tajwid dan riwayat" },
      { label: "Menghafal Al-Qur'an (Tahfidz & Tartil 30 Juz)", targetDivisionId: "tahfidz", sub: "Menjaga hafalan mutqin dan setoran harian" },
      { label: "Seni Kaligrafi Islam & Goresan Handam", targetDivisionId: "khattil-quran", sub: "Menulis ayat-ayat indah di atas kertas dan kanvas" },
      { label: "Retorika Dakwah, Pidato & Cerdas Cermat", targetDivisionId: "syarhil-fahmil", sub: "Tampil di panggung syiar dan pemahaman tafsir" },
      { label: "Riset Ilmiah, Penulisan Makalah & Tafsir Saintifik", targetDivisionId: "ktiq", sub: "Menghubungkan ayat kauniyah dengan sains modern" },
      { label: "Seni Musik Religi, Hadroh Banjari & Shalawat", targetDivisionId: "seni-suara", sub: "Harmonisasi tabuhan terbang dan vokal kasidah" },
      { label: "Kreator Konten Digital, Desain Grafis & Humas", targetDivisionId: "media-syiar", sub: "Dakwah melalui media sosial, video, dan podcast" },
    ],
  },
  {
    id: 2,
    question: "Bagaimana latar belakang pengalaman Anda saat ini?",
    options: [
      { label: "Belum pernah, ingin belajar dari nol dengan tekun", targetDivisionId: "any", sub: "UPTQ membimbing dari dasar makhraj dan kaidah" },
      { label: "Pernah belajar di pesantren / madrasah sebelumnya", targetDivisionId: "any", sub: "Siap mengasah ke tingkat kompetisi yang lebih tinggi" },
      { label: "Pernah ikut lomba/MTQ dan ingin menjadi juara nasional", targetDivisionId: "any", sub: "Siap mengikuti bimbingan intensif dewan hakim" },
    ],
  },
  {
    id: 3,
    question: "Apa tujuan terpenting yang ingin Anda capai bersama UPTQ?",
    options: [
      { label: "Meraih trofi emas di MTQ Mahasiswa Nasional (MTQMN)", targetDivisionId: "tilawah", sub: "Membawa nama harum kampus UIN Sunan Gunung Djati" },
      { label: "Menjadi Hafidz/Hafidzah 30 Juz bersanad", targetDivisionId: "tahfidz", sub: "Menjaga Al-Qur'an dalam dada seumur hidup" },
      { label: "Menjadi kaligrafer profesional & mengadakan pameran seni", targetDivisionId: "khattil-quran", sub: "Memperkaya khazanah seni rupa Islam nusantara" },
      { label: "Menjadi Da'i muda yang vokal dan inspiratif", targetDivisionId: "syarhil-fahmil", sub: "Menyampaikan pesan rahmatan lil 'alamin" },
    ],
  },
];

export const DivisionQuizModal: React.FC<DivisionQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectDivision,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [resultDivisionId, setResultDivisionId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (divisionId: string) => {
    const updated = { ...selectedAnswers, [currentStep]: divisionId };
    setSelectedAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best division
      const firstChoice = updated[0] !== 'any' ? updated[0] : 'tilawah';
      setResultDivisionId(firstChoice);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setResultDivisionId(null);
  };

  const matchedDivision = DIVISIONS.find((d) => d.id === resultDivisionId) || DIVISIONS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0c2b4e] via-[#0f3b6c] to-[#047857] p-6 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tes Kecocokan Divisi UPTQ</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Temukan Divisi Impianmu di Kampus
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6 sm:p-8">
          {!resultDivisionId ? (
            <div className="space-y-6">
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Pertanyaan {currentStep + 1} dari {QUESTIONS.length}</span>
                <span className="font-mono text-emerald-700 font-bold">{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Title */}
              <h4 className="text-lg font-bold text-slate-900 leading-snug">
                {QUESTIONS[currentStep].question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt.targetDivisionId)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <strong className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900 block">
                          {opt.label}
                        </strong>
                        <span className="text-xs text-slate-500 mt-0.5 block">
                          {opt.sub}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                        Pilih →
                      </span>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                  Rekomendasi Divisi Terbaik Untuk Anda:
                </span>
                <h4 className="text-2xl font-black text-slate-900">
                  {matchedDivision.name}
                </h4>
                <div className="font-amiri text-xl text-emerald-800 font-bold">
                  {matchedDivision.arabicName}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto pt-1">
                  "{matchedDivision.tagline}"
                </p>
              </div>

              {/* Highlight Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="font-bold text-slate-900">Kenapa divisi ini cocok untuk Anda?</div>
                <p className="text-slate-600 leading-relaxed">
                  Berdasarkan minat dan tujuan Anda, divisi ini menyediakan kurikulum terstruktur yang dibina langsung oleh <strong>{matchedDivision.mentor}</strong>. Anda akan berlatih setiap <strong>{matchedDivision.schedule}</strong> di <strong>{matchedDivision.venue}</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Tes</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSelectDivision(matchedDivision.name);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Daftar ke Divisi Ini Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
