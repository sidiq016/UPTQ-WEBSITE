import { PrayerTimes } from '../types';

/**
 * Calculates prayer times for Bandung, West Java, Indonesia
 * Coordinates: -6.9175° S, 107.6191° E, UTC+7
 */
export function getBandungPrayerTimes(date: Date = new Date()): PrayerTimes {
  // Bandung standard offsets based on Kemenag RI solar calculations
  // Day-of-year solar variation simulation for Bandung
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Slight seasonal sinusoidal variation for tropical Bandung (minutes delta from baseline)
  const deltaMin = Math.sin((dayOfYear - 80) * (2 * Math.PI / 365)) * 12;

  const baseMinutes = {
    Subuh: 4 * 60 + 26 - Math.round(deltaMin * 0.4),
    Terbit: 5 * 60 + 43 - Math.round(deltaMin * 0.4),
    Dzuhur: 11 * 60 + 48 + Math.round(deltaMin * 0.8),
    Ashar: 14 * 60 + 58 + Math.round(deltaMin * 0.6),
    Maghrib: 17 * 60 + 52 + Math.round(deltaMin * 0.5),
    Isya: 19 * 60 + 0o3 + Math.round(deltaMin * 0.5),
  };

  const formatMin = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} WIB`;
  };

  return {
    Subuh: formatMin(baseMinutes.Subuh),
    Terbit: formatMin(baseMinutes.Terbit),
    Dzuhur: formatMin(baseMinutes.Dzuhur),
    Ashar: formatMin(baseMinutes.Ashar),
    Maghrib: formatMin(baseMinutes.Maghrib),
    Isya: formatMin(baseMinutes.Isya),
  };
}

export function getNextPrayerInfo(times: PrayerTimes): {
  nextPrayer: string;
  nextTime: string;
  minutesRemaining: number;
} {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(' ')[0].split(':').map(Number);
    return h * 60 + m;
  };

  const prayers = [
    { name: 'Subuh', mins: parseTime(times.Subuh), label: times.Subuh },
    { name: 'Terbit', mins: parseTime(times.Terbit), label: times.Terbit },
    { name: 'Dzuhur', mins: parseTime(times.Dzuhur), label: times.Dzuhur },
    { name: 'Ashar', mins: parseTime(times.Ashar), label: times.Ashar },
    { name: 'Maghrib', mins: parseTime(times.Maghrib), label: times.Maghrib },
    { name: 'Isya', mins: parseTime(times.Isya), label: times.Isya },
  ];

  for (const p of prayers) {
    if (p.mins > currentMinutes) {
      return {
        nextPrayer: p.name,
        nextTime: p.label,
        minutesRemaining: p.mins - currentMinutes,
      };
    }
  }

  // Next is Subuh tomorrow
  const subuhTomorrow = prayers[0].mins + 24 * 60;
  return {
    nextPrayer: 'Subuh (Besok)',
    nextTime: times.Subuh,
    minutesRemaining: subuhTomorrow - currentMinutes,
  };
}

export function getEstimatedHijriDate(date: Date = new Date()): string {
  // Approximate Hijri conversion for display
  try {
    const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(date) + ' H';
  } catch {
    return '1448 H';
  }
}
