export interface LeaderItemData {
  id: string;
  name: string;
  role: string;
  major: string;
  img: string;
}

export interface DivisionItemData {
  id: string;
  number: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface NewsItemData {
  id: string;
  category: string;
  date: string;
  author?: string;
  title: string;
  excerpt: string;
  img: string;
  featured?: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentType?: string;
}

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  img: string;
}

export interface UploadedMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document';
  mimeType: string;
  url: string;
  sizeLabel: string;
  uploadedAt: string;
  sectionTarget?: string;
}

export interface AccountProfileData {
  username: string;
  password: string;
  isAccessEnabled?: boolean;
  fullName: string;
  roleTitle: string;
  nimOrNip: string;
  facultyOrDivision: string;
  phone: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

export interface SiteConfigData {
  // Brand & Header
  brandTitle: string;
  brandSubtitle: string;
  brandLogoUrl?: string;
  // Hero Section (Foto 2 Style: Center Brand Ambassador + Left Website Name + Right Cabinet Name + Bottom Website Purpose)
  heroKicker: string;
  heroLeftWebsiteTitle1: string;
  heroLeftWebsiteTitle2: string;
  heroRightCabinetTitle1: string;
  heroRightCabinetTitle2: string;
  heroAmbassadorImage: string;
  heroAmbassadorImages?: string[];
  heroAmbassadorName: string;
  heroAmbassadorRole: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPurposeTitle: string;
  heroPurposeDescription: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  heroBgImage: string;
  heroVerseArabic: string;
  heroVerseTranslation: string;
  // Developer WhatsApp for 3x Failed Login Escalation
  developerWhatsapp: string;
  // Sejarah Section
  historyEyebrow: string;
  historyTitle: string;
  historyHighlight: string;
  historyP1: string;
  historyP2: string;
  historyMainImg: string;
  historySmallImg: string;
  historyBadgeNum: string;
  historyBadgeText: string;
  // Visi & Misi Section
  visionEyebrow: string;
  visionHeading: string;
  visionHighlight: string;
  visionSubheading: string;
  visionText: string;
  missions: string[];
  // Profil Section
  profileEyebrow: string;
  profileTitle: string;
  profileDesc: string;
  profileImg: string;
  profileQuote: string;
  // Kepengurusan Section
  leaders: LeaderItemData[];
  // Bidang Organisasi Section
  divisions: DivisionItemData[];
  // Program Pembinaan Section
  pembinaanEyebrow: string;
  pembinaanTitle: string;
  pembinaanDesc: string;
  pembinaanImg: string;
  programsList: string[];
  // Berita Terkini Section
  newsList: NewsItemData[];
  // Pelayanan Section
  servicesList: ServiceCardData[];
  // Footer & Kontak
  footerAbout: string;
  address: string;
  phone: string;
  email: string;
  workHours: string;
  instagramUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  facebookUrl: string;
  contactPersonName?: string;
  gmapsEmbedUrl?: string;
  gmapsLinkUrl?: string;
  // Uploaded Files Repository (links & device files: doc, pdf, word, png, jpg, gif, mp3, mp4, dll)
  mediaRepository: UploadedMediaItem[];
  // Differentiated Accounts & Biodata for Admin (50% features) & Developer (100% features)
  adminAccount: AccountProfileData;
  developerAccount: AccountProfileData;
}

export const DEFAULT_SITE_CONFIG: SiteConfigData = {
  brandTitle: 'UPTQ UIN BANDUNG',
  brandSubtitle: 'Bersama Al-Qur\'an, Meraih Kemuliaan',
  heroKicker: 'Unit Pengembangan Tilawatil Qur\'an UIN SGD Bandung ✨',
  heroLeftWebsiteTitle1: 'UPTQ UIN',
  heroLeftWebsiteTitle2: 'BANDUNG',
  heroRightCabinetTitle1: 'KABINET',
  heroRightCabinetTitle2: 'NAHDLATUL QURRA',
  heroAmbassadorImage:
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=3840&q=100',
  heroAmbassadorImages: [
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=3840&q=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=3840&q=100',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=3840&q=100',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=3840&q=100',
  ],
  heroAmbassadorName: 'Muhammad Fadhlan, S.Ag.',
  heroAmbassadorRole: 'Brand Ambassador & Ketua Umum UPTQ UIN SGD',
  heroTitle: 'Bersama Al-Qur\'an, Meraih Kemuliaan.',
  heroSubtitle:
    'Wadah pembinaan seni baca, tahfidz, kaligrafi, dan syiar Al-Qur\'an mahasiswa UIN Sunan Gunung Djati Bandung. Mari bertumbuh dan menginspirasi peradaban.',
  heroPurposeTitle: 'Bersama Al-Qur\'an, Meraih Kemuliaan.',
  heroPurposeDescription:
    'Menjadi pusat informasi, pendaftaran pembinaan, kolaborasi syiar, serta publikasi karya mahasiswa dalam mencetak generasi Qur\'ani yang unggul, moderat, berprestasi, dan berakhlak mulia.',
  heroPrimaryBtn: 'Gabung UPTQ',
  heroSecondaryBtn: 'Lihat Pembinaan',
  heroBgImage:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=3840&q=100',
  heroVerseArabic: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا',
  heroVerseTranslation: '“Dan bacalah Al-Qur\'an itu dengan perlahan-lahan.” — QS. Al-Muzzammil: 4',
  developerWhatsapp: '6281234567890',
  historyEyebrow: 'Sejarah Kami',
  historyTitle: 'Tumbuh Bersama dalam Cahaya',
  historyHighlight: 'Al-Qur\'an',
  historyP1:
    'UPTQ UIN Bandung lahir dari semangat mahasiswa untuk menghadirkan ruang pengembangan potensi Qur\'ani yang inklusif, profesional, dan berkelanjutan.',
  historyP2:
    'Dari kelompok kajian sederhana, UPTQ berkembang menjadi organisasi yang aktif mencetak qari-qariah, hafiz-hafizah, kaligrafer, dan generasi Qur\'ani berprestasi di tingkat regional hingga nasional.',
  historyMainImg:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=3840&q=100',
  historySmallImg:
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=2560&q=100',
  historyBadgeNum: '25+',
  historyBadgeText: 'Tahun Berkarya',
  visionEyebrow: 'Arah Organisasi',
  visionHeading: 'Visi yang Menggerakkan, Misi yang',
  visionHighlight: 'Menguatkan',
  visionSubheading:
    'Landasan kami untuk membangun generasi kampus yang mencintai, memahami, dan mengamalkan nilai Al-Qur\'an.',
  visionText:
    'Menjadi pusat pengembangan potensi Qur\'ani mahasiswa yang unggul, moderat, adaptif, dan berdaya saing untuk mewujudkan kampus yang berkarakter rahmatan lil ‘alamin.',
  missions: [
    'Menyelenggarakan pembinaan seni baca, hafalan, pemahaman, dan kreativitas Al-Qur\'an secara berjenjang.',
    'Mengembangkan budaya akademik dan syiar Qur\'ani yang relevan dengan perkembangan zaman.',
    'Mengoptimalkan potensi anggota melalui kompetisi, kolaborasi, dan pengabdian masyarakat.',
    'Membangun tata kelola organisasi yang profesional, inklusif, transparan, dan berkelanjutan.',
  ],
  profileEyebrow: 'Profil UPTQ',
  profileTitle: 'Rumah Tumbuh Generasi Qur\'ani UIN Bandung',
  profileDesc:
    'UPTQ merupakan unit kegiatan mahasiswa yang bergerak dalam pembinaan minat, bakat, dan prestasi di bidang Al-Qur\'an. Kami percaya setiap mahasiswa memiliki jalan unik untuk dekat dengan kitab suci.',
  profileImg:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=3840&q=100',
  profileQuote: '“Bukan sekadar organisasi, tetapi keluarga dalam perjalanan mencintai Al-Qur\'an.”',
  leaders: [
    {
      id: 'ld-1',
      name: 'Muhammad Fadhlan',
      role: 'Ketua Umum',
      major: 'Mahasiswa Ilmu Al-Qur\'an dan Tafsir',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85',
    },
    {
      id: 'ld-2',
      name: 'Siti Nur Aulia',
      role: 'Wakil Ketua',
      major: 'Mahasiswi Pendidikan Agama Islam',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85',
    },
    {
      id: 'ld-3',
      name: 'Rizky Ramadhan',
      role: 'Sekretaris Umum',
      major: 'Mahasiswa Manajemen Dakwah',
      img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=85',
    },
    {
      id: 'ld-4',
      name: 'Nabila Zahra',
      role: 'Bendahara Umum',
      major: 'Mahasiswi Ekonomi Syariah',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85',
    },
  ],
  divisions: [
    {
      id: 'div-1',
      number: '01',
      title: 'Pengembangan SDM',
      description: 'Mengelola kaderisasi, upgrading, dan pengembangan kapasitas anggota secara berkelanjutan.',
      linkText: 'Lihat program',
      linkHref: '#pembinaan',
    },
    {
      id: 'div-2',
      number: '02',
      title: 'Pembinaan Qur\'ani',
      description: 'Menyusun kurikulum serta pelaksanaan pembinaan tilawah, tahfiz, tafsir, dan kaligrafi.',
      linkText: 'Lihat program',
      linkHref: '#pembinaan',
    },
    {
      id: 'div-3',
      number: '03',
      title: 'Syiar & Dakwah',
      description: 'Menghadirkan kegiatan dakwah kreatif, kajian, dan pengabdian Qur\'ani bagi masyarakat.',
      linkText: 'Lihat agenda',
      linkHref: '#agenda',
    },
    {
      id: 'div-4',
      number: '04',
      title: 'Media & Informasi',
      description: 'Mengelola publikasi, dokumentasi, desain kreatif, dan informasi digital organisasi.',
      linkText: 'Lihat konten',
      linkHref: '#konten',
    },
    {
      id: 'div-5',
      number: '05',
      title: 'Relasi & Kemitraan',
      description: 'Membangun jejaring kolaborasi bersama lembaga internal maupun mitra eksternal.',
      linkText: 'Lihat layanan',
      linkHref: '#pelayanan',
    },
    {
      id: 'div-6',
      number: '06',
      title: 'Ekonomi Kreatif',
      description: 'Mengembangkan kemandirian organisasi melalui usaha kreatif berbasis nilai Islami.',
      linkText: 'Lihat karya',
      linkHref: '#konten',
    },
  ],
  pembinaanEyebrow: 'Program Pembinaan',
  pembinaanTitle: 'Temukan Potensi Terbaikmu Bersama Al-Qur\'an',
  pembinaanDesc:
    'Pembinaan rutin dibimbing mentor berpengalaman dengan metode ramah pemula, terukur, dan berorientasi prestasi.',
  pembinaanImg:
    'https://images.unsplash.com/photo-1596525738055-24e4b3f53aa5?auto=format&fit=crop&w=1000&q=85',
  programsList: [
    'Tilawah',
    'Tahfiz',
    'Kaligrafi',
    'Fahmil Qur\'an',
    'Syarhil Qur\'an',
    'Tafsir Qur\'an',
    'Karya Tulis',
    'Hadrah',
  ],
  newsList: [
    {
      id: 'nw-1',
      category: 'Prestasi',
      date: '28 April 2025',
      author: 'Redaksi UPTQ',
      title: 'Delegasi UPTQ Raih Lima Juara pada MTQ Mahasiswa Tingkat Nasional',
      excerpt:
        'Prestasi membanggakan kembali diraih melalui cabang tilawah, kaligrafi, fahmil, dan karya tulis Al-Qur\'an.',
      img: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1000&q=85',
      featured: true,
    },
    {
      id: 'nw-2',
      category: 'Kaderisasi',
      date: '20 April 2025',
      title: 'Upgrading Pengurus: Menguatkan Sinergi dan Profesionalitas',
      excerpt: 'Ruang belajar untuk meningkatkan kapasitas kepemimpinan pengurus.',
      img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=85',
    },
    {
      id: 'nw-3',
      category: 'Pembinaan',
      date: '12 April 2025',
      title: 'Pembinaan Perdana Disambut Antusias Ratusan Mahasiswa',
      excerpt: 'Program pembinaan kembali dibuka dengan delapan cabang pilihan.',
      img: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f7?auto=format&fit=crop&w=800&q=85',
    },
  ],
  servicesList: [
    {
      id: 'srv-1',
      title: 'Media Partner',
      description: 'Kolaborasi publikasi untuk kegiatan edukatif, kompetisi, seminar, dan agenda keislaman.',
      buttonText: 'Ajukan kerja sama →',
      img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'srv-2',
      title: 'Peminjaman Barang',
      description: 'Peminjaman perlengkapan kegiatan seperti sound system, stand banner, dan alat pendukung acara.',
      buttonText: 'Cek ketersediaan →',
      img: 'https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?auto=format&fit=crop&w=900&q=85',
    },
    {
      id: 'srv-3',
      title: 'Entertainment',
      description: 'Penampilan qari-qariah, hadrah, nasyid, MC, dan pengisi acara bernuansa Islami.',
      buttonText: 'Pesan layanan →',
      img: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85',
    },
  ],
  footerAbout: 'Ruang bertumbuh, belajar, berprestasi, dan mengabdi bersama nilai-nilai Al-Qur\'an.',
  address: 'Jl. A.H. Nasution No. 105, Cibiru, Bandung 40614',
  phone: '+62 812-3456-7890',
  email: 'uptq@uinsgd.ac.id',
  workHours: 'Senin–Jumat, 08.00–16.00 WIB',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  tiktokUrl: 'https://tiktok.com',
  facebookUrl: 'https://facebook.com',
  contactPersonName: 'Humas UPTQ UIN SGD Bandung',
  gmapsEmbedUrl: 'https://www.google.com/maps?q=UIN%20Sunan%20Gunung%20Djati%20Bandung&output=embed',
  gmapsLinkUrl: 'https://maps.google.com/?q=UIN+Sunan+Gunung+Djati+Bandung',
  mediaRepository: [
    {
      id: 'med-1',
      name: 'Panduan_Musabaqah_UPTQ_2025.pdf',
      type: 'document',
      mimeType: 'application/pdf',
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      sizeLabel: '245 KB',
      uploadedAt: '10 Mei 2025',
      sectionTarget: 'Dokumen Panduan Lomba',
    },
    {
      id: 'med-2',
      name: 'Silabus_Pembinaan_Tilawah_Tahfidz.docx',
      type: 'document',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      url: '#pembinaan',
      sizeLabel: '180 KB',
      uploadedAt: '12 Mei 2025',
      sectionTarget: 'Kurikulum Pembinaan',
    },
  ],
  adminAccount: {
    username: 'UPTQJAYA',
    password: 'Z4MZ4M4',
    isAccessEnabled: true,
    fullName: 'Pengurus Admin UPTQ',
    roleTitle: 'Admin Keanggotaan, Kepengurusan & Publikasi',
    nimOrNip: '1211030089',
    facultyOrDivision: 'Pengurus Inti Kabinet Nahdlatul Qurra',
    phone: '0812-3456-7890',
    email: 'admin@uptq.uinsgd.ac.id',
    bio: 'Bertugas mengelola keanggotaan, kepengurusan, bidang organisasi, pembinaan, agenda, dan berita terkini UPTQ UIN Bandung.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
  },
  developerAccount: {
    username: 'UPTQJAYA',
    password: 'F1R6M6N6',
    isAccessEnabled: true,
    fullName: 'Lead Developer UPTQ',
    roleTitle: 'Full-Stack Developer & Pemantau Sistem',
    nimOrNip: 'DEV-UPTQ-001',
    facultyOrDivision: 'Tim Pengembang & Infrastruktur Digital UPTQ',
    phone: '0812-9988-7766',
    email: 'firman.sidiq216@gmail.com',
    bio: 'Mengelola seluruh isi website, memantau sistem, serta mengatur biodata dan akses login Admin.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
  },
};

