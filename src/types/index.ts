export interface Division {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  description: string;
  curriculum: string[];
  schedule: string;
  venue: string;
  mentor: string;
  headOfDivision: string;
  memberCount: number;
  highlightAchievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  level: 'Nasional' | 'Provinsi' | 'Regional' | 'Universitas';
  year: number;
  delegate: string;
  faculty: string;
  category: 'Tilawah' | 'Tahfidz' | 'Kaligrafi' | 'Syarhil' | 'Fahmil' | 'KTIQ' | 'Shalawat';
  ranking: string;
}

export interface CabinetMember {
  id: string;
  name: string;
  role: string;
  department: string;
  faculty: string;
  quote: string;
  generation: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Pelatihan' | 'Kompetisi' | 'Kajian' | 'Kaderisasi' | 'Sosial';
  date: string;
  time: string;
  location: string;
  description: string;
  speaker?: string;
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

export interface MaqamTrack {
  id: string;
  name: string;
  arabicName: string;
  character: string;
  description: string;
  surah: string;
  ayah: string;
  arabicVerse: string;
  translation: string;
  qari: string;
  baseFrequency: number;
  melodyNotes: number[];
}

export interface PrayerTimes {
  Subuh: string;
  Terbit: string;
  Dzuhur: string;
  Ashar: string;
  Maghrib: string;
  Isya: string;
}

export interface RegistrationEntry {
  regNumber: string;
  fullName: string;
  nim: string;
  faculty: string;
  studyProgram: string;
  semester: number;
  phone: string;
  email: string;
  primaryDivision: string;
  secondaryDivision: string;
  quranExperience: string;
  motivation: string;
  registrationDate: string;
}
