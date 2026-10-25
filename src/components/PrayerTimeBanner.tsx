import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, BookOpen, BellRing, Sparkles } from 'lucide-react';
import { getBandungPrayerTimes, getNextPrayerInfo, getEstimatedHijriDate } from '../utils/prayerCalculator';
import { DAILY_AYAH } from '../data/uptqData';

export const PrayerTimeBanner: React.FC = () => {
  const [times, setTimes] = useState(getBandungPrayerTimes());
  const [nextInfo, setNextInfo] = useState(getNextPrayerInfo(times));
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [hijriDate, setHijriDate] = useState(getEstimatedHijriDate());
  const [copiedAyah, setCopiedAyah] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const updatedTimes = getBandungPrayerTimes(now);
      setTimes(updatedTimes);
      setNextInfo(getNextPrayerInfo(updatedTimes));
      setHijriDate(getEstimatedHijriDate(now));
      setCurrentTimeStr(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const prayerList = [
    { name: 'Subuh', time: times.Subuh },
    { name: 'Terbit', time: times.Terbit },
    { name: 'Dzuhur', time: times.Dzuhur },
    { name: 'Ashar', time: times.Ashar },
    { name: 'Maghrib', time: times.Maghrib },
    { name: 'Isya', time: times.Isya },
  ];

  const formatCountdown = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) {
      return `${h} jam ${m} mnt`;
    }
    return `${m} menit`;
  };

  const handleCopyAyah = () => {
    navigator.clipboard?.writeText(`${DAILY_AYAH.arabic}\n\n"${DAILY_AYAH.translation}" (${DAILY_AYAH.surah})`);
    setCopiedAyah(true);
    setTimeout(() => setCopiedAyah(false), 2000);
  };

  return (
    <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-sky-100 shadow-xl shadow-sky-950/10 p-5 sm:p-6 space-y-4">
        
        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b border-slate-100">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Jadwal Sholat Bandung & Kampus UIN</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>{hijriDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-600 font-mono tabular-nums text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentTimeStr}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 text-emerald-600" />
              <span>Menuju {nextInfo.nextPrayer}: </span>
              <strong className="font-mono tabular-nums">{formatCountdown(nextInfo.minutesRemaining)}</strong>
            </div>
          </div>

        </div>

        {/* 6 Prayer Times Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
          {prayerList.map((item) => {
            const isNext = item.name === nextInfo.nextPrayer;
            return (
              <div
                key={item.name}
                className={`p-3 rounded-2xl transition-all flex flex-col items-center justify-center text-center ${
                  isNext
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/30 scale-[1.03] ring-2 ring-emerald-300'
                    : 'bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 text-slate-800'
                }`}
              >
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isNext ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {item.name}
                </span>
                <span className="text-base font-black font-mono tabular-nums mt-0.5">
                  {item.time.replace(' WIB', '')}
                </span>
                <span className={`text-[10px] mt-0.5 ${isNext ? 'text-emerald-200 font-semibold' : 'text-slate-400'}`}>
                  {isNext ? 'Berikutnya' : 'WIB'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Daily Ayat Ribbon with Copy Action */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold shrink-0">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Ayat Hari Ini</span>
            <span className="text-slate-500 font-normal">({DAILY_AYAH.surah}):</span>
          </div>

          <div className="text-slate-600 line-clamp-1 italic text-xs max-w-2xl">
            "{DAILY_AYAH.translation}"
          </div>

          <button
            onClick={handleCopyAyah}
            className="text-emerald-700 hover:text-emerald-800 font-semibold shrink-0 cursor-pointer text-xs"
          >
            {copiedAyah ? '✓ Tersalin' : 'Salin Ayat'}
          </button>
        </div>

      </div>
    </section>
  );
};
