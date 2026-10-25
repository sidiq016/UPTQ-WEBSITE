export type SiteLanguage = 'id' | 'en';

const PHRASE_MAP_ID_TO_EN: Record<string, string> = {
  // Brand & Hero
  "Unit Pengembangan Tilawatil Qur'an UIN SGD Bandung ✨":
    "Qur'anic Recitation Development Unit of UIN SGD Bandung ✨",
  'KABINET': 'CABINET',
  'Bersama Al-Qur\'an, Meraih Kemuliaan.': 'With the Holy Qur\'an, Achieving Glory.',
  'Bersama Al-Qur\'an, Meraih Kemuliaan': 'With the Holy Qur\'an, Achieving Glory',
  'Menjadi pusat informasi, pendaftaran pembinaan, kolaborasi syiar, serta publikasi karya mahasiswa dalam mencetak generasi Qur\'ani yang unggul, moderat, berprestasi, dan berakhlak mulia.':
    'Serving as the official hub for information, coaching registration, Islamic syiar collaboration, and student publications to nurture an excellent, moderate, high-achieving, and noble Qur\'anic generation.',
  'Wadah pembinaan seni baca, tahfidz, kaligrafi, dan syiar Al-Qur\'an mahasiswa UIN Sunan Gunung Djati Bandung. Mari bertumbuh dan menginspirasi peradaban.':
    'A center for Qur\'anic recitation arts, tahfidz, calligraphy, and Islamic syiar for students of UIN Sunan Gunung Djati Bandung. Let us grow and inspire civilization.',
  '“Dan bacalah Al-Qur\'an itu dengan perlahan-lahan.” — QS. Al-Muzzammil: 4':
    '“And recite the Qur\'an with measured, rhythmic recitation.” — QS. Al-Muzzammil: 4',
  'Gabung UPTQ': 'Join UPTQ',
  'Lihat Pembinaan': 'Explore Coaching',

  // Sejarah
  'Sejarah Kami': 'Our History',
  'Tumbuh Bersama dalam Cahaya': 'Growing Together in the Light of',
  'Al-Qur\'an': 'the Holy Qur\'an',
  'UPTQ UIN Bandung lahir dari semangat mahasiswa untuk menghadirkan ruang pengembangan potensi Qur\'ani yang inklusif, profesional, dan berkelanjutan.':
    'UPTQ UIN Bandung was born from students\' passion to build an inclusive, professional, and sustainable space for developing Qur\'anic potential.',
  'Dari kelompok kajian sederhana, UPTQ berkembang menjadi organisasi yang aktif mencetak qari-qariah, hafiz-hafizah, kaligrafer, dan generasi Qur\'ani berprestasi di tingkat regional hingga nasional.':
    'From a humble study circle, UPTQ grew into an active organization producing accomplished reciters, memorizers, calligraphers, and Qur\'anic leaders at regional and national levels.',
  'Tahun Berkarya': 'Years of Dedication',

  // Visi Misi
  'Arah Organisasi': 'Organizational Direction',
  'Visi yang Menggerakkan, Misi yang': 'A Vision that Inspires, A Mission that',
  'Menguatkan': 'Empowers',
  'Landasan kami untuk membangun generasi kampus yang mencintai, memahami, dan mengamalkan nilai Al-Qur\'an.':
    'Our foundation for building a campus generation that loves, understands, and practices the values of the Qur\'an.',
  'Menjadi pusat pengembangan potensi Qur\'ani mahasiswa yang unggul, moderat, adaptif, dan berdaya saing untuk mewujudkan kampus yang berkarakter rahmatan lil ‘alamin.':
    'To become an excellent, moderate, adaptive, and competitive center for developing student Qur\'anic potential toward a campus characterized by rahmatan lil ‘alamin.',
  'Menyelenggarakan pembinaan seni baca, hafalan, pemahaman, dan kreativitas Al-Qur\'an secara berjenjang.':
    'Organize tiered coaching in Qur\'anic recitation arts, memorization, comprehension, and creativity.',
  'Mengembangkan budaya akademik dan syiar Qur\'ani yang relevan dengan perkembangan zaman.':
    'Develop an academic culture and Qur\'anic outreach relevant to modern times.',
  'Mengoptimalkan potensi anggota melalui kompetisi, kolaborasi, dan pengabdian masyarakat.':
    'Optimize member potential through competitions, collaborations, and community service.',
  'Membangun tata kelola organisasi yang profesional, inklusif, transparan, dan berkelanjutan.':
    'Build professional, inclusive, transparent, and sustainable organizational governance.',

  // Profil
  'Profil UPTQ': 'UPTQ Profile',
  'Rumah Tumbuh Generasi Qur\'ani UIN Bandung': 'A Home of Growth for UIN Bandung\'s Qur\'anic Generation',
  'UPTQ merupakan unit kegiatan mahasiswa yang bergerak dalam pembinaan minat, bakat, dan prestasi di bidang Al-Qur\'an. Kami percaya setiap mahasiswa memiliki jalan unik untuk dekat dengan kitab suci.':
    'UPTQ is a student activity unit dedicated to nurturing interests, talents, and achievements in the field of the Qur\'an. We believe every student has a unique path to grow closer to the Holy Book.',
  '“Bukan sekadar organisasi, tetapi keluarga dalam perjalanan mencintai Al-Qur\'an.”':
    '“Not merely an organization, but a family on the journey of loving the Qur\'an.”',

  // Leaders
  'Ketua Umum': 'President / Chairman',
  'Wakil Ketua': 'Vice Chairman',
  'Sekretaris Umum': 'General Secretary',
  'Bendahara Umum': 'General Treasurer',
  'Mahasiswa Ilmu Al-Qur\'an dan Tafsir': ' Qur\'anic Sciences & Exegesis Student',
  'Mahasiswi Pendidikan Agama Islam': 'Islamic Education Student',
  'Mahasiswa Manajemen Dakwah': 'Da\'wah Management Student',
  'Mahasiswi Ekonomi Syariah': 'Islamic Economics Student',

  // Divisions
  'Pengembangan SDM': 'Human Resource Development',
  'Mengelola kaderisasi, upgrading, dan pengembangan kapasitas anggota secara berkelanjutan.':
    'Manages cadre regeneration, upgrading, and continuous member capacity building.',
  'Pembinaan Qur\'ani': 'Qur\'anic Coaching',
  'Menyusun kurikulum serta pelaksanaan pembinaan tilawah, tahfiz, tafsir, dan kaligrafi.':
    'Designs curriculum and executes coaching in tilawah, tahfidz, tafsir, and calligraphy.',
  'Syiar & Dakwah': 'Outreach & Da\'wah',
  'Menghadirkan kegiatan dakwah kreatif, kajian, dan pengabdian Qur\'ani bagi masyarakat.':
    'Delivers creative da\'wah events, Islamic studies, and Qur\'anic community service.',
  'Media & Publikasi': 'Media & Publication',
  'Mengelola identitas visual, dokumentasi, dan penyebaran konten edukatif di berbagai kanal digital.':
    'Manages visual identity, documentation, and educational content across digital channels.',
  'Relasi & Kemitraan': 'Relations & Partnership',
  'Membangun jejaring kerja sama dengan lembaga kampus, komunitas, dan mitra strategis.':
    'Builds collaborative networks with campus institutions, communities, and strategic partners.',
  'kesekretariatan & Inventaris': 'Secretariat & Inventory',
  'Kesekretariatan & Inventaris': 'Secretariat & Inventory',
  'Menjaga ketertiban administrasi, arsip organisasi, serta pengelolaan sarana dan prasarana.':
    'Maintains administrative order, organizational archives, and facility management.',
  'Lihat program': 'View program',
  'Lihat agenda': 'View agenda',
  'Lihat konten': 'View content',
  'Kerja sama': 'Collaborate',
  'Peminjaman': 'Equipment Loan',

  // Pembinaan
  'Program Pembinaan': 'Coaching Programs',
  'Pembinaan Terarah dari Dasar hingga Mahir': 'Structured Coaching from Beginner to Advanced',
  'Setiap anggota mendapatkan pendampingan bertahap sesuai minat dan bidang yang dipilih bersama pembina berpengalaman.':
    'Every member receives step-by-step mentorship tailored to their chosen field with experienced instructors.',
  'Tilawah & Qira\'at': 'Tilawah & Qira\'at',
  'Tahfidz & Muraja\'ah': 'Tahfidz & Muraja\'ah',
  'Tafsir & Ulumul Qur\'an': 'Tafsir & Qur\'anic Sciences',
  'Kaligrafi & Seni Islami': 'Calligraphy & Islamic Arts',
  'Syarhil & Fahmil Qur\'an': 'Syarhil & Fahmil Qur\'an',
  'Public Speaking Qur\'ani': 'Qur\'anic Public Speaking',

  // Berita
  'Prestasi': 'Achievement',
  '12 Mei 2025': 'May 12, 2025',
  '05 Mei 2025': 'May 05, 2025',
  '28 Apr 2025': 'Apr 28, 2025',
  'Tim Humas UPTQ': 'UPTQ PR Team',
  'Delegasi UPTQ Raih Prestasi pada Ajang MTQ Mahasiswa Tingkat Nasional':
    'UPTQ Delegation Wins Top Honors at the National Student MTQ Championship',
  'Komitmen pembinaan berkelanjutan kembali membuahkan hasil membanggakan melalui capaian delegasi UPTQ di berbagai cabang lomba.':
    'Continuous coaching commitment once again delivers proud achievements through UPTQ delegates across multiple competition branches.',
  'Kegiatan': 'Activity',
  'Khatmil Qur\'an dan Doa Bersama Menyambut Semester Baru':
    'Khatmil Qur\'an and Collective Prayer Welcoming the New Semester',
  'Momentum mempererat ukhuwah dan meneguhkan niat belajar bersama seluruh pengurus serta anggota.':
    'A moment to strengthen brotherhood and renew learning intentions among all board members and members.',
  'Kaderisasi': 'Cadre Training',
  'Pelatihan Manajemen Organisasi dan Kepemimpinan Mahasiswa Qur\'ani':
    'Organizational Management and Qur\'anic Student Leadership Training',
  'Membangun kapasitas pengurus yang adaptif, komunikatif, dan berorientasi pada pelayanan.':
    'Building adaptive, communicative, and service-oriented board leadership capacity.',

  // Pelayanan
  'Media Partner': 'Media Partner',
  'Dukungan publikasi kegiatan kampus, seminar, kajian, dan event positif melalui kanal resmi UPTQ.':
    'Publication support for campus events, seminars, Islamic studies, and positive programs via official UPTQ channels.',
  'Ajukan Kerja Sama': 'Submit Partnership',
  'Peminjaman Barang': 'Equipment Loan',
  'Layanan peminjaman perlengkapan organisasi dengan prosedur yang jelas, tertib, dan transparan.':
    'Equipment borrowing service with clear, orderly, and transparent procedures.',
  'Ajukan Peminjaman': 'Request Equipment',
  'Entertainment': 'Islamic Entertainment',
  'Penampilan tilawah, sari tilawah, hadrah, atau pengisi acara bernuansa Islami dan Qur\'ani.':
    'Tilawah recitations, sari tilawah, hadrah performances, and Islamic event talent.',
  'Undang Tim UPTQ': 'Invite UPTQ Team',

  // Footer
  'Unit Pengembangan Tilawatil Qur\'an UIN Sunan Gunung Djati Bandung. Ruang bertumbuh dalam bacaan, hafalan, pemahaman, dan pengamalan Al-Qur\'an.':
    'Qur\'anic Recitation Development Unit of UIN Sunan Gunung Djati Bandung. A space to grow in recitation, memorization, comprehension, and practice of the Holy Qur\'an.',
  'Senin – Sabtu, 08.00 – 16.00 WIB': 'Monday – Saturday, 08:00 AM – 04:00 PM WIB',
};

export function trText(text: string | undefined, lang: SiteLanguage): string {
  if (!text) return '';
  if (lang === 'id') return text;
  return PHRASE_MAP_ID_TO_EN[text] || text;
}
