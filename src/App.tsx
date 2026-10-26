/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
  Award,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Eye,
  BookHeart,
  UsersRound,
  Lightbulb,
  Medal,
  GraduationCap,
  BookOpenCheck,
  Megaphone,
  Camera,
  Handshake,
  BriefcaseBusiness,
  Clock3,
  CalendarDays,
  FileText,
  User,
  RadioTower,
  PackageOpen,
  MicVocal,
  Music2,
  Instagram,
  Youtube,
  Facebook,
  X,
  Send,
  CircleCheck,
  Menu,
  Download,
  Image as ImageIcon,
  Music,
  Video,
  Edit3,
} from 'lucide-react';
import {
  AdminPortal,
  ServiceSubmission,
  AgendaItemData,
  ContentItemData,
} from './components/AdminPortal';
import { SiteConfigData, DEFAULT_SITE_CONFIG } from './data/siteConfig';
import { Human3DSubject } from './utils/cutout3d';
import { PreloaderScreen } from './components/PreloaderScreen';
import { SiteLanguage, trText } from './utils/translations';

const INITIAL_CONTENTS: ContentItemData[] = [
  {
    id: 'c1',
    category: 'event',
    title: 'Festival Qur\'ani Mahasiswa 2025',
    meta: '14–16 Juni 2025 • UIN Bandung',
    img: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=700&q=85',
    alt: 'Festival Al-Qur\'an',
  },
  {
    id: 'c2',
    category: 'artikel',
    title: 'Menjadikan Al-Qur\'an Sahabat dalam Keseharian',
    meta: '7 menit baca • Redaksi UPTQ',
    img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=700&q=85',
    alt: 'Al-Qur\'an sebagai sumber inspirasi',
  },
  {
    id: 'c3',
    category: 'lomba',
    title: 'Open Registration Musabaqah Tilawatil Qur\'an',
    meta: 'Pendaftaran hingga 30 Mei 2025',
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=85',
    alt: 'Panggung kompetisi mahasiswa',
  },
  {
    id: 'c4',
    category: 'rekaman',
    title: 'Murottal Surah Ar-Rahman',
    meta: 'Qari: Ahmad Fawwaz • 13:42',
    img: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=85',
    alt: 'Masjid saat senja',
  },
  {
    id: 'c5',
    category: 'artikel',
    title: 'Mengenal Ragam Khat dalam Seni Kaligrafi',
    meta: '5 menit baca • Bidang Pembinaan',
    img: 'https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?auto=format&fit=crop&w=700&q=85',
    alt: 'Seni kaligrafi Islam',
  },
  {
    id: 'c6',
    category: 'rekaman',
    title: 'Kajian: Akhlak Pemuda Qur\'ani',
    meta: 'Ust. Rahmat Hidayat • 48:20',
    img: 'https://images.unsplash.com/photo-1597244678060-550e6c0496d0?auto=format&fit=crop&w=700&q=85',
    alt: 'Kajian Islami',
  },
  {
    id: 'c7',
    category: 'event',
    title: 'Workshop Public Speaking Qur\'ani',
    meta: '21 Juni 2025 • Student Center',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=85',
    alt: 'Workshop organisasi',
  },
  {
    id: 'c8',
    category: 'lomba',
    title: 'Kompetisi Karya Tulis Ilmiah Al-Qur\'an',
    meta: 'Total hadiah jutaan rupiah',
    img: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=700&q=85',
    alt: 'Lomba karya tulis mahasiswa',
  },
];

const INITIAL_AGENDAS: AgendaItemData[] = [
  {
    id: 'ag-1',
    day: '10',
    monthYear: 'Mei 2025',
    title: 'UPTQ Qur\'anic Training',
    time: '08.00–15.00 WIB',
    location: 'Aula Student Center',
    tag: 'Terbuka',
  },
  {
    id: 'ag-2',
    day: '17',
    monthYear: 'Mei 2025',
    title: 'Kajian Qur\'ani: Pemuda dan Peradaban',
    time: '15.30–17.30 WIB',
    location: 'Masjid Iqomah',
    tag: 'Gratis',
  },
  {
    id: 'ag-3',
    day: '24',
    monthYear: 'Mei 2025',
    title: 'Seleksi Delegasi MTQ Mahasiswa',
    time: '09.00–Selesai',
    location: 'Gedung Anwar Musaddad',
    tag: 'Internal',
  },
  {
    id: 'ag-4',
    day: '31',
    monthYear: 'Mei 2025',
    title: 'UPTQ Berbagi dan Mengabdi',
    time: '07.30–16.00 WIB',
    location: 'Kabupaten Bandung',
    tag: 'Sosial',
  },
];

const INITIAL_SUBMISSIONS: ServiceSubmission[] = [
  {
    id: 'sub-1',
    orderCode: '#2632',
    name: 'Ahmad Faiz Zarkasyi',
    phone: '081234567891',
    email: 'ahmad.faiz@uinsgd.ac.id',
    service: 'Pendaftaran Anggota',
    message: 'Divisi Tilawah & Qira\'at Sab\'ah • Kampus 1 Cibiru Bandung',
    date: '31 Jul 2025',
    status: 'Menunggu',
  },
  {
    id: 'sub-2',
    orderCode: '#2633',
    name: 'Siti Rahmah Aulia',
    phone: '085712345678',
    email: 'siti.rahmah@uinsgd.ac.id',
    service: 'Media Partner',
    message: 'Seminar Nasional Al-Qur\'an & Sains • Aula Abdjan Soelaeman',
    date: '01 Aug 2025',
    status: 'Diterima',
  },
  {
    id: 'sub-3',
    orderCode: '#2634',
    name: 'Muhammad Luthfi Hakim',
    phone: '081398765432',
    email: 'luthfi.hakim@uinsgd.ac.id',
    service: 'Program Pembinaan',
    message: 'Pembinaan Tahfidz 30 Juz & Tafsir • Masjid Iqomah UIN Bandung',
    date: '02 Aug 2025',
    status: 'Selesai',
  },
  {
    id: 'sub-4',
    orderCode: '#2635',
    name: 'Nabila Zahra Putri',
    phone: '082134567899',
    email: 'nabila.zahra@uinsgd.ac.id',
    service: 'Peminjaman Barang',
    message: 'Peminjaman Set Hadrah & Sound System • Gedung Student Center',
    date: '02 Aug 2025',
    status: 'Menunggu',
  },
  {
    id: 'sub-5',
    orderCode: '#2636',
    name: 'Rizky Ramadhan Pratama',
    phone: '089612345670',
    email: 'rizky.ramadhan@uinsgd.ac.id',
    service: 'Entertainment',
    message: 'Undangan Qari & Sari Tilawah Wisuda • Auditorium Utama',
    date: '03 Aug 2025',
    status: 'Diterima',
  },
  {
    id: 'sub-6',
    orderCode: '#2637',
    name: 'Fatimah Az-Zahra',
    phone: '081987654321',
    email: 'fatimah.azzahra@uinsgd.ac.id',
    service: 'Pendaftaran Anggota',
    message: 'Cabang Seni Kaligrafi Islam (Khat Naskhi & Tsuluts) • Kampus 2',
    date: '03 Aug 2025',
    status: 'Menunggu',
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavFilter, setActiveNavFilter] = useState<string>('home');
  const navClickLockRef = useRef<boolean>(false);
  const navClickTimestampRef = useRef<number>(0);

  const selectNavFilter = (filterId: string) => {
    navClickLockRef.current = true;
    navClickTimestampRef.current = performance.now();
    setActiveNavFilter(filterId);
  };

  const [lang, setLang] = useState<SiteLanguage>('id');
  const t = (text: string | undefined) => trText(text, lang);

  const [contentFilter, setContentFilter] = useState<'all' | 'event' | 'artikel' | 'lomba' | 'rekaman'>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Pendaftaran Anggota');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date(2025, 4, 1));

  const [loggedInRole, setLoggedInRole] = useState<'admin' | 'developer' | null>(() => {
    const savedRole = localStorage.getItem('uptq_active_role_v2');
    if (savedRole === 'admin' || savedRole === 'developer') return savedRole;
    return null;
  });
  const isAdminLoggedIn = loggedInRole !== null;
  const [currentView, setCurrentView] = useState<'website' | 'admin'>('website');

  const [siteConfig, setSiteConfig] = useState<SiteConfigData>(() => {
    try {
      const saved = localStorage.getItem('uptq_site_config_v6');
      if (!saved) return DEFAULT_SITE_CONFIG;
      const parsed = JSON.parse(saved);
      const savedDevEmail = parsed.developerAccount?.email;
      return {
        ...DEFAULT_SITE_CONFIG,
        ...parsed,
        email:
          parsed.email && parsed.email !== 'developer@uptq.uinsgd.ac.id'
            ? parsed.email
            : DEFAULT_SITE_CONFIG.email,
        adminAccount: {
          ...DEFAULT_SITE_CONFIG.adminAccount,
          ...(parsed.adminAccount || {}),
          roleTitle: (parsed.adminAccount?.roleTitle || DEFAULT_SITE_CONFIG.adminAccount.roleTitle)
            .replace(/\s*\(Akses 50%\)/gi, ''),
        },
        developerAccount: {
          ...DEFAULT_SITE_CONFIG.developerAccount,
          ...(parsed.developerAccount || {}),
          roleTitle: (parsed.developerAccount?.roleTitle || DEFAULT_SITE_CONFIG.developerAccount.roleTitle)
            .replace(/\s*\(Akses 100%\)/gi, ''),
          email:
            !savedDevEmail || savedDevEmail === 'developer@uptq.uinsgd.ac.id'
              ? 'firman.sidiq216@gmail.com'
              : savedDevEmail,
        },
      };
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  const ambassadorSlidePhotos = React.useMemo(() => {
    const upgradeTo4K = (url: string) =>
      url.includes('images.unsplash.com')
        ? url.replace(/w=\d+/g, 'w=3840').replace(/q=\d+/g, 'q=100')
        : url;

    const rawList =
      siteConfig.heroAmbassadorImages && siteConfig.heroAmbassadorImages.length >= 3
        ? siteConfig.heroAmbassadorImages.filter(Boolean).slice(0, 5)
        : [
            siteConfig.heroAmbassadorImage ||
              'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=3840&q=100',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=3840&q=100',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=3840&q=100',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=3840&q=100',
          ];
    return rawList.slice(0, 5).map(upgradeTo4K);
  }, [siteConfig.heroAmbassadorImages, siteConfig.heroAmbassadorImage]);

  const [ambassadorSlideIdx, setAmbassadorSlideIdx] = useState(0);

  useEffect(() => {
    if (currentView !== 'website' || ambassadorSlidePhotos.length <= 1) return;
    const slideInterval = setInterval(() => {
      setAmbassadorSlideIdx((prev) => (prev + 1) % ambassadorSlidePhotos.length);
    }, 3600);
    return () => clearInterval(slideInterval);
  }, [currentView, ambassadorSlidePhotos.length]);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('uptq_stats');
      return saved ? JSON.parse(saved) : { members: 450, achievements: 36, programs: 8, events: 52 };
    } catch {
      return { members: 450, achievements: 36, programs: 8, events: 52 };
    }
  });

  const [agendas, setAgendas] = useState<AgendaItemData[]>(() => {
    try {
      const saved = localStorage.getItem('uptq_agendas');
      return saved ? JSON.parse(saved) : INITIAL_AGENDAS;
    } catch {
      return INITIAL_AGENDAS;
    }
  });

  const [contents, setContents] = useState<ContentItemData[]>(() => {
    try {
      const saved = localStorage.getItem('uptq_contents');
      return saved ? JSON.parse(saved) : INITIAL_CONTENTS;
    } catch {
      return INITIAL_CONTENTS;
    }
  });

  const [submissions, setSubmissions] = useState<ServiceSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('uptq_submissions');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length >= 4 ? parsed : INITIAL_SUBMISSIONS;
      }
      return INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  const [displayedMembers, setDisplayedMembers] = useState(0);
  const [displayedAchievements, setDisplayedAchievements] = useState(0);
  const [displayedPrograms, setDisplayedPrograms] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimatedStats = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem('uptq_site_config_v6', JSON.stringify(siteConfig));
    } catch {}
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('uptq_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('uptq_agendas', JSON.stringify(agendas));
  }, [agendas]);

  useEffect(() => {
    try {
      localStorage.setItem('uptq_contents', JSON.stringify(contents));
    } catch {}
  }, [contents]);

  useEffect(() => {
    localStorage.setItem('uptq_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollAnimations = () => {
      const vh = window.innerHeight;
      const revealElements = document.querySelectorAll('.reveal, .stagger');
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < vh * 0.15) {
          el.setAttribute('data-scroll', 'out-top');
        } else if (rect.top > vh * 0.88) {
          el.setAttribute('data-scroll', 'out-bottom');
        } else {
          el.setAttribute('data-scroll', 'in');
        }
      });
    };

    const updateActiveNavFromScroll = () => {
      if (navClickLockRef.current) return;
      const sectionOrder = [
        'pelayanan',
        'konten',
        'berita',
        'agenda',
        'pembinaan',
        'bidang',
        'kepengurusan',
        'profil',
        'visi-misi',
        'sejarah',
        'home',
      ];
      const probeY = window.innerHeight * 0.35;
      for (const secId of sectionOrder) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom >= 120) {
            setActiveNavFilter(secId);
            break;
          }
        }
      }
    };

    const releaseNavLockOnManualScroll = () => {
      if (navClickLockRef.current && performance.now() - navClickTimestampRef.current > 180) {
        navClickLockRef.current = false;
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      if (rafId === null) {
        rafId = window.requestAnimationFrame(() => {
          updateScrollAnimations();
          updateActiveNavFromScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', releaseNavLockOnManualScroll, { passive: true });
    window.addEventListener('touchmove', releaseNavLockOnManualScroll, { passive: true });
    window.addEventListener('resize', updateScrollAnimations, { passive: true });
    handleScroll();
    updateScrollAnimations();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'q' || e.code === 'KeyQ')) {
        e.preventDefault();
        setCurrentView((prev) => (prev === 'admin' ? 'website' : 'admin'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedStats.current) {
          hasAnimatedStats.current = true;
          const duration = 1400;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setDisplayedMembers(Math.floor(stats.members * easeOut));
            setDisplayedAchievements(Math.floor(stats.achievements * easeOut));
            setDisplayedPrograms(Math.floor(stats.programs * easeOut));
            setDisplayedEvents(Math.floor(stats.events * easeOut));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', releaseNavLockOnManualScroll);
      window.removeEventListener('touchmove', releaseNavLockOnManualScroll);
      window.removeEventListener('resize', updateScrollAnimations);
      window.removeEventListener('keydown', handleKeyDown);
      if (rafId !== null) cancelAnimationFrame(rafId);
      statsObserver.disconnect();
    };
  }, [stats, currentView, contentFilter]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  const openServiceModal = (serviceName: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: ServiceSubmission = {
      id: `sub-${Date.now()}`,
      orderCode: `#${2632 + submissions.length}`,
      name: formName,
      phone: formPhone,
      email: formEmail,
      service: modalService,
      message: formMessage,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Menunggu',
    };

    setSubmissions([newSub, ...submissions]);
    setIsModalOpen(false);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormMessage('');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4200);
  };

  const handleAdminLoginSuccess = (role: 'admin' | 'developer') => {
    setLoggedInRole(role);
    localStorage.setItem('uptq_active_role_v2', role);
  };

  const handleAdminLogout = () => {
    setLoggedInRole(null);
    localStorage.removeItem('uptq_active_role_v2');
    localStorage.removeItem('uptq_admin_session');
    setCurrentView('website');
  };

  const toggleAudio = (id: string) => {
    setPlayingAudioId(playingAudioId === id ? null : id);
  };

  const monthNames =
    lang === 'en'
      ? [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ]
      : [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];
  const dayNames =
    lang === 'en'
      ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const eventDates: Record<string, number[]> = {
    '2025-4': [10, 17, 24, 31],
    '2025-5': [14, 16, 21],
    '2025-6': [5, 12, 26],
  };

  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const previousMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const markedDays = eventDates[`${currentYear}-${currentMonth}`] || [];

  const handlePrevMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const filteredContent = contents.filter((item) => {
    if (contentFilter === 'all') return true;
    return item.category === contentFilter;
  });

  const divisionIcons = [
    GraduationCap,
    BookOpenCheck,
    Megaphone,
    Camera,
    Handshake,
    BriefcaseBusiness,
  ];

  const serviceIcons = [RadioTower, PackageOpen, MicVocal];

  if (currentView === 'admin') {
    return (
      <AdminPortal
        onBackToWebsite={() => setCurrentView('website')}
        isLoggedIn={isAdminLoggedIn}
        userRole={loggedInRole}
        onLogin={handleAdminLoginSuccess}
        onLogout={handleAdminLogout}
        stats={stats}
        onUpdateStats={(newStats) => setStats(newStats)}
        submissions={submissions}
        onUpdateSubmissions={(newSubs) => setSubmissions(newSubs)}
        agendas={agendas}
        onUpdateAgendas={(newAgendas) => setAgendas(newAgendas)}
        contents={contents}
        onUpdateContents={(newContents) => setContents(newContents)}
        siteConfig={siteConfig}
        onUpdateSiteConfig={(newCfg) => setSiteConfig(newCfg)}
      />
    );
  }

  const isHomeGroupActive = ['home', 'sejarah', 'visi-misi', 'kepengurusan', 'bidang', 'pembinaan'].includes(
    activeNavFilter
  );

  return (
    <>
      {/* Backsound Musik Latar Otomatis Berputar Saat Website Dibuka */}
      <audio src="/backsound.mp3" autoPlay loop preload="auto" />

      {/* Preloader Split-Curtain Loading Screen */}
      <PreloaderScreen
        brandLogoUrl={siteConfig.brandLogoUrl}
        brandTitle={siteConfig.brandTitle}
      />

      <a className="skip-link" href="#main">
        {lang === 'en' ? 'Skip to main content' : 'Lewati ke konten utama'}
      </a>

      {isAdminLoggedIn && (
        <div className="admin-bar">
          <div className="container flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  loggedInRole === 'developer' ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
              ></span>
              <span>
                {loggedInRole === 'developer'
                  ? lang === 'en'
                    ? 'Developer Mode Active — Press Shift+Ctrl+Q to toggle editor'
                    : 'Mode Developer Aktif — Tekan Shift+Ctrl+Q untuk membuka editor'
                  : lang === 'en'
                  ? 'Admin Mode Active — Press Shift+Ctrl+Q to toggle editor'
                  : 'Mode Admin Aktif — Tekan Shift+Ctrl+Q untuk membuka editor'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('admin')}
                className="hover:underline flex items-center gap-1 cursor-pointer font-bold text-white"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#f5c542]" />{' '}
                {loggedInRole === 'developer'
                  ? lang === 'en'
                    ? 'Open Developer Dashboard'
                    : 'Buka Dashboard Developer'
                  : lang === 'en'
                  ? 'Open Admin Dashboard'
                  : 'Buka Dashboard Admin'}
              </button>
              <button
                onClick={handleAdminLogout}
                className="text-rose-300 hover:text-white cursor-pointer ml-3 font-semibold"
              >
                {lang === 'en' ? 'Logout' : 'Keluar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
        <div className="nav-wrap">
          <a
            className="brand"
            href="#home"
            aria-label={siteConfig.brandTitle}
            onClick={() => selectNavFilter('home')}
          >
            <div
              className="logo-mark select-none overflow-hidden"
              aria-hidden="true"
            >
              {siteConfig.brandLogoUrl ? (
                <img
                  src={siteConfig.brandLogoUrl}
                  alt={siteConfig.brandTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                'ق'
              )}
            </div>
            <div>
              <span className="brand-title">{siteConfig.brandTitle}</span>
            </div>
          </a>

          <button
            className="menu-toggle"
            id="menuToggle"
            aria-label={lang === 'en' ? 'Open navigation menu' : 'Buka menu navigasi'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <nav
            className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
            id="navMenu"
            aria-label={lang === 'en' ? 'Main navigation' : 'Navigasi utama'}
          >
            <ul className="nav-list">
              <li className={`nav-item ${openDropdown === 'home' ? 'dropdown-open' : ''}`}>
                <a
                  className={`nav-link dropdown-trigger ${isHomeGroupActive ? 'active' : ''}`}
                  href="#home"
                  onClick={(e) => {
                    selectNavFilter('home');
                    if (window.innerWidth <= 1060) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === 'home' ? null : 'home');
                    }
                  }}
                >
                  Home <ChevronDown />
                </a>
                <div className="dropdown">
                  <a
                    href="#sejarah"
                    className={activeNavFilter === 'sejarah' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('sejarah');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'History' : 'Sejarah'}
                  </a>
                  <a
                    href="#visi-misi"
                    className={activeNavFilter === 'visi-misi' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('visi-misi');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Vision & Mission' : 'Visi & Misi'}
                  </a>
                  <a
                    href="#kepengurusan"
                    className={activeNavFilter === 'kepengurusan' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('kepengurusan');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Leadership' : 'Kepengurusan'}
                  </a>
                  <a
                    href="#bidang"
                    className={activeNavFilter === 'bidang' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('bidang');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Divisions' : 'Bidang'}
                  </a>
                  <a
                    href="#pembinaan"
                    className={activeNavFilter === 'pembinaan' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('pembinaan');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Coaching' : 'Pembinaan'}
                  </a>
                </div>
              </li>

              <li>
                <a
                  className={`nav-link ${activeNavFilter === 'profil' ? 'active' : ''}`}
                  href="#profil"
                  onClick={() => {
                    selectNavFilter('profil');
                    setIsMenuOpen(false);
                  }}
                >
                  {lang === 'en' ? 'Profile' : 'Profil'}
                </a>
              </li>

              <li>
                <a
                  className={`nav-link ${activeNavFilter === 'agenda' ? 'active' : ''}`}
                  href="#agenda"
                  onClick={() => {
                    selectNavFilter('agenda');
                    setIsMenuOpen(false);
                  }}
                >
                  {lang === 'en' ? 'Schedule' : 'Agenda'}
                </a>
              </li>

              <li>
                <a
                  className={`nav-link ${activeNavFilter === 'berita' ? 'active' : ''}`}
                  href="#berita"
                  onClick={() => {
                    selectNavFilter('berita');
                    setIsMenuOpen(false);
                  }}
                >
                  {lang === 'en' ? 'News' : 'Berita'}
                </a>
              </li>

              <li className={`nav-item ${openDropdown === 'konten' ? 'dropdown-open' : ''}`}>
                <a
                  className={`nav-link dropdown-trigger ${activeNavFilter === 'konten' ? 'active' : ''}`}
                  href="#konten"
                  onClick={(e) => {
                    selectNavFilter('konten');
                    if (window.innerWidth <= 1060) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === 'konten' ? null : 'konten');
                    }
                  }}
                >
                  {lang === 'en' ? 'Content' : 'Konten'} <ChevronDown />
                </a>
                <div className="dropdown">
                  <a
                    href="#konten"
                    className={activeNavFilter === 'konten' && contentFilter === 'event' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('konten');
                      setContentFilter('event');
                      setIsMenuOpen(false);
                    }}
                  >
                    Event
                  </a>
                  <a
                    href="#konten"
                    className={activeNavFilter === 'konten' && contentFilter === 'artikel' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('konten');
                      setContentFilter('artikel');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Articles' : 'Artikel'}
                  </a>
                  <a
                    href="#konten"
                    className={activeNavFilter === 'konten' && contentFilter === 'lomba' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('konten');
                      setContentFilter('lomba');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Competitions' : 'Lomba'}
                  </a>
                  <a
                    href="#konten"
                    className={activeNavFilter === 'konten' && contentFilter === 'rekaman' ? 'active' : ''}
                    onClick={() => {
                      selectNavFilter('konten');
                      setContentFilter('rekaman');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Recordings' : 'Rekaman'}
                  </a>
                </div>
              </li>

              <li className={`nav-item ${openDropdown === 'pelayanan' ? 'dropdown-open' : ''}`}>
                <a
                  className={`nav-link dropdown-trigger ${activeNavFilter === 'pelayanan' ? 'active' : ''}`}
                  href="#pelayanan"
                  onClick={(e) => {
                    selectNavFilter('pelayanan');
                    if (window.innerWidth <= 1060) {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === 'pelayanan' ? null : 'pelayanan');
                    }
                  }}
                >
                  {lang === 'en' ? 'Services' : 'Pelayanan'} <ChevronDown />
                </a>
                <div className="dropdown">
                  <a
                    href="#pelayanan"
                    onClick={() => {
                      selectNavFilter('pelayanan');
                      openServiceModal('Media Partner');
                      setIsMenuOpen(false);
                    }}
                  >
                    Media Partner
                  </a>
                  <a
                    href="#pelayanan"
                    onClick={() => {
                      selectNavFilter('pelayanan');
                      openServiceModal('Peminjaman Barang');
                      setIsMenuOpen(false);
                    }}
                  >
                    {lang === 'en' ? 'Equipment Loan' : 'Peminjaman Barang'}
                  </a>
                  <a
                    href="#pelayanan"
                    onClick={() => {
                      selectNavFilter('pelayanan');
                      openServiceModal('Entertainment');
                      setIsMenuOpen(false);
                    }}
                  >
                    Entertainment
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2 ml-2">
                <button
                  type="button"
                  className="nav-cta-dark"
                  onClick={() => {
                    openServiceModal('Pendaftaran Anggota');
                    setIsMenuOpen(false);
                  }}
                  title={
                    lang === 'en'
                      ? 'Register to join the UPTQ UIN Bandung family'
                      : 'Daftar bergabung menjadi keluarga UPTQ UIN Bandung'
                  }
                >
                  {lang === 'en' ? 'Register' : 'Daftar'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero-ambassador-section" id="home">
          <div
            className="hero-ambassador-bg-ornament"
            style={{
              backgroundImage: `url("${siteConfig.heroBgImage}")`,
            }}
            aria-hidden="true"
          ></div>
          <div className="hero-ambassador-radial-aura" aria-hidden="true"></div>

          <div className="relative z-10 flex flex-col items-center text-center reveal">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/10 border border-[#f5c542]/45 text-[#f5c542] text-xs font-extrabold tracking-wider uppercase backdrop-blur-md shadow-lg">
              <span>{t(siteConfig.heroKicker)}</span>
            </div>
          </div>

          <div className="hero-ambassador-stage reveal">
            <div className="hero-ambassador-left-text">
              <span className="hero-ambassador-left-line1">
                {siteConfig.heroLeftWebsiteTitle1 || 'UPTQ UIN'}
              </span>
              <span className="hero-ambassador-left-line2">
                {siteConfig.heroLeftWebsiteTitle2 || 'BANDUNG'}
              </span>
            </div>

            <div className="hero-ambassador-center-figure">
              <div className="hero-ambassador-frame-glow" aria-hidden="true"></div>
              <div
                className="hero-ambassador-slide-viewport cursor-pointer"
                onClick={() =>
                  setAmbassadorSlideIdx((prev) => (prev + 1) % ambassadorSlidePhotos.length)
                }
                title={
                  lang === 'en'
                    ? 'Click to view next Brand Ambassador pose'
                    : 'Klik untuk melihat pose Brand Ambassador berikutnya'
                }
              >
                {ambassadorSlidePhotos.map((photoUrl, idx) => (
                  <Human3DSubject
                    key={`amb-slide-${idx}`}
                    src={photoUrl}
                    alt={`Brand Ambassador UPTQ Pose ${idx + 1}`}
                    className={`human-3d-hero-slide ${
                      idx === ambassadorSlideIdx % ambassadorSlidePhotos.length ? 'active-slide' : ''
                    }`}
                  />
                ))}
              </div>

              {ambassadorSlidePhotos.length > 1 && (
                <div className="hero-ambassador-slide-dots" role="tablist" aria-label="Slide Foto Brand Ambassador">
                  {ambassadorSlidePhotos.map((_, idx) => (
                    <button
                      key={`amb-dot-${idx}`}
                      type="button"
                      onClick={() => setAmbassadorSlideIdx(idx)}
                      className={`hero-ambassador-slide-dot ${
                        idx === ambassadorSlideIdx % ambassadorSlidePhotos.length ? 'active' : ''
                      }`}
                      aria-label={`Pose ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="hero-ambassador-right-text">
              <span className="hero-ambassador-right-line1">
                {t(siteConfig.heroRightCabinetTitle1 || 'KABINET')}
              </span>
              <span className="hero-ambassador-right-line2">
                {siteConfig.heroRightCabinetTitle2 || 'NAHDLATUL QURRA'}
              </span>
            </div>
          </div>

          <div className="hero-ambassador-purpose-box reveal">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2.5">
              {t(siteConfig.heroTitle)}
            </h1>

            <p className="text-sm sm:text-base text-sky-100/95 max-w-2xl mx-auto leading-relaxed font-medium mb-3.5">
              {t(siteConfig.heroPurposeDescription || siteConfig.heroSubtitle)}
            </p>

            <div className="py-2.5 px-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/20 inline-block mb-5">
              <p className="font-serif text-lg sm:text-xl text-[#f5c542]" lang="ar" dir="rtl">
                {siteConfig.heroVerseArabic}
              </p>
              <p className="text-[11px] sm:text-xs text-sky-100/90 mt-0.5">
                {t(siteConfig.heroVerseTranslation)}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openServiceModal('Pendaftaran Anggota')}
                className="btn btn-primary"
              >
                <span>{t(siteConfig.heroPrimaryBtn)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#pembinaan" className="btn btn-outline">
                {t(siteConfig.heroSecondaryBtn)}
              </a>
              {isAdminLoggedIn && (
                <button
                  type="button"
                  onClick={() => setCurrentView('admin')}
                  className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-[#f5c542]/50 text-xs font-extrabold text-[#f5c542] flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Slide Brand Ambassador
                </button>
              )}
            </div>
          </div>
        </section>

        <section id="sejarah">
          <div className="container history-grid">
            <div className="history-media reveal from-left">
              <div className="human-3d-section-stage">
                <div className="human-3d-ambient-aura" aria-hidden="true"></div>
                <Human3DSubject
                  src={siteConfig.historyMainImg}
                  alt="Brand Ambassador UPTQ UIN Sunan Gunung Djati Bandung"
                  className="relative w-full h-full flex items-end justify-center"
                />
                <div className="human-3d-floor-shadow" aria-hidden="true"></div>
              </div>
              <div className="experience-badge">
                <strong>{siteConfig.historyBadgeNum}</strong>
                <span>{t(siteConfig.historyBadgeText)}</span>
              </div>
            </div>
            <div className="history-content reveal from-right">
              <span className="eyebrow">{t(siteConfig.historyEyebrow)}</span>
              <h2>
                {t(siteConfig.historyTitle)} <span className="highlight">{t(siteConfig.historyHighlight)}</span>
              </h2>
              <p>{t(siteConfig.historyP1)}</p>
              <p>{t(siteConfig.historyP2)}</p>
              <div className="mini-features">
                <div className="mini-feature">
                  <i>
                    <Award />
                  </i>{' '}
                  {lang === 'en' ? 'Accomplished' : 'Berprestasi'}
                </div>
                <div className="mini-feature">
                  <i>
                    <HeartHandshake />
                  </i>{' '}
                  {lang === 'en' ? 'Family Spirit' : 'Kekeluargaan'}
                </div>
                <div className="mini-feature">
                  <i>
                    <Sparkles />
                  </i>{' '}
                  {lang === 'en' ? 'Creative' : 'Kreatif'}
                </div>
                <div className="mini-feature">
                  <i>
                    <ShieldCheck />
                  </i>{' '}
                  {lang === 'en' ? 'Integrity' : 'Berintegritas'}
                </div>
              </div>
              <a className="btn btn-blue" href="#profil">
                {lang === 'en' ? 'Learn More' : 'Selengkapnya'} <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        <div className="stats-section" ref={statsRef}>
          <div className="container">
            <div className="stats-panel stagger">
              <div className="stat">
                <div>
                  <span className="stat-number">{displayedMembers || stats.members}</span>
                  <span className="stat-number">+</span>
                </div>
                <p className="stat-label">
                  {lang === 'en' ? 'Active Members & Alumni' : 'Anggota Aktif & Alumni'}
                </p>
              </div>
              <div className="stat">
                <div>
                  <span className="stat-number">{displayedAchievements || stats.achievements}</span>
                  <span className="stat-number">+</span>
                </div>
                <p className="stat-label">
                  {lang === 'en' ? 'National Achievements' : 'Prestasi Nasional'}
                </p>
              </div>
              <div className="stat">
                <div>
                  <span className="stat-number">{displayedPrograms || stats.programs}</span>
                </div>
                <p className="stat-label">
                  {lang === 'en' ? 'Coaching Programs' : 'Program Pembinaan'}
                </p>
              </div>
              <div className="stat">
                <div>
                  <span className="stat-number">{displayedEvents || stats.events}</span>
                  <span className="stat-number">+</span>
                </div>
                <p className="stat-label">
                  {lang === 'en' ? 'Annual Events' : 'Kegiatan Tahunan'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="section-soft" id="visi-misi">
          <div className="container">
            <div className="section-heading center reveal">
              <span className="eyebrow">{t(siteConfig.visionEyebrow)}</span>
              <h2>
                {t(siteConfig.visionHeading)} <span className="highlight">{t(siteConfig.visionHighlight)}</span>
              </h2>
              <p>{t(siteConfig.visionSubheading)}</p>
            </div>
            <div className="vision-grid stagger">
              <article className="vision-card">
                <div className="card-icon">
                  <Eye />
                </div>
                <h3>{lang === 'en' ? 'Vision' : 'Visi'}</h3>
                <p>{t(siteConfig.visionText)}</p>
              </article>
              <article className="mission-card">
                <h3>{lang === 'en' ? 'Our Mission' : 'Misi Kami'}</h3>
                <ul className="mission-list">
                  {siteConfig.missions.map((mission, idx) => (
                    <li key={idx}>
                      <strong>{String(idx + 1).padStart(2, '0')}</strong>
                      <span>{t(mission)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="profile-intro" id="profil">
          <div className="container profile-grid">
            <div className="reveal from-left">
              <span className="eyebrow" style={{ color: '#f5c542' }}>
                {t(siteConfig.profileEyebrow)}
              </span>
              <h2>{t(siteConfig.profileTitle)}</h2>
              <p>{t(siteConfig.profileDesc)}</p>
              <div className="values">
                <div className="value">
                  <BookHeart />
                  <div>
                    <b>{lang === 'en' ? "Qur'anic" : "Qur'ani"}</b>
                    <small>{lang === 'en' ? 'Values as foundation' : 'Nilai sebagai landasan'}</small>
                  </div>
                </div>
                <div className="value">
                  <UsersRound />
                  <div>
                    <b>{lang === 'en' ? 'Collaborative' : 'Kolaboratif'}</b>
                    <small>{lang === 'en' ? 'Growing together' : 'Tumbuh bersama'}</small>
                  </div>
                </div>
                <div className="value">
                  <Lightbulb />
                  <div>
                    <b>{lang === 'en' ? 'Innovative' : 'Inovatif'}</b>
                    <small>{lang === 'en' ? 'Adaptive and creative' : 'Adaptif dan kreatif'}</small>
                  </div>
                </div>
                <div className="value">
                  <Medal />
                  <div>
                    <b>{lang === 'en' ? 'Professional' : 'Profesional'}</b>
                    <small>{lang === 'en' ? 'Excellence in work' : 'Unggul dalam karya'}</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-image reveal from-right">
              <div className="human-3d-section-stage human-3d-profil">
                <div className="human-3d-ambient-aura" aria-hidden="true"></div>
                <Human3DSubject
                  src={siteConfig.profileImg}
                  alt="Brand Ambassador Profil UPTQ"
                  className="relative w-full h-full flex items-end justify-center"
                />
                <div className="human-3d-floor-shadow" aria-hidden="true"></div>
              </div>
              <div className="profile-quote">{t(siteConfig.profileQuote)}</div>
            </div>
          </div>
        </section>

        <section id="kepengurusan">
          <div className="container">
            <div className="section-heading reveal">
              <span className="eyebrow">{lang === 'en' ? 'Leadership' : 'Kepengurusan'}</span>
              <h2>
                {lang === 'en' ? 'Moving in One ' : 'Bergerak dalam Satu '}
                <span className="highlight">{lang === 'en' ? 'Dedication' : 'Khidmat'}</span>
              </h2>
              <p>
                {lang === 'en'
                  ? 'Board members committed to delivering quality programs and the best service for the entire UPTQ family.'
                  : 'Pengurus yang berkomitmen menghadirkan program berkualitas dan pelayanan terbaik bagi seluruh keluarga UPTQ.'}
              </p>
            </div>
            <div className="leader-grid stagger">
              {siteConfig.leaders.map((leader) => (
                <article key={leader.id} className="leader-card">
                  <div className="leader-photo">
                    <img src={leader.img} alt={leader.name} />
                    <span className="leader-role">{t(leader.role)}</span>
                  </div>
                  <div className="leader-info">
                    <h3>{leader.name}</h3>
                    <p>{t(leader.major)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-soft" id="bidang">
          <div className="container">
            <div className="section-heading center reveal">
              <span className="eyebrow">{lang === 'en' ? 'Organizational Divisions' : 'Bidang Organisasi'}</span>
              <h2>
                {lang === 'en' ? 'Synergy to Serve and ' : 'Sinergi untuk Melayani dan '}
                <span className="highlight">{lang === 'en' ? 'Create' : 'Berkarya'}</span>
              </h2>
              <p>
                {lang === 'en'
                  ? 'Each division operates with a strategic function to support coaching, regeneration, and Islamic syiar.'
                  : 'Setiap bidang hadir dengan fungsi strategis untuk mendukung pembinaan, kaderisasi, dan syiar organisasi.'}
              </p>
            </div>
            <div className="division-grid stagger">
              {siteConfig.divisions.map((div, idx) => {
                const IconComp = divisionIcons[idx % divisionIcons.length];
                return (
                  <article key={div.id} className="division-card">
                    <span className="division-number">{div.number || String(idx + 1).padStart(2, '0')}</span>
                    <div className="division-icon">
                      <IconComp />
                    </div>
                    <h3>{t(div.title)}</h3>
                    <p>{t(div.description)}</p>
                    <a className="division-link" href={div.linkHref || '#pembinaan'}>
                      {t(div.linkText || 'Lihat program')} <ArrowRight />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pembinaan">
          <div className="container">
            <div className="development-box reveal">
              <div className="development-content">
                <span className="eyebrow" style={{ color: '#f5c542' }}>
                  {t(siteConfig.pembinaanEyebrow)}
                </span>
                <h2>{t(siteConfig.pembinaanTitle)}</h2>
                <p>{t(siteConfig.pembinaanDesc)}</p>
                <ul className="program-list">
                  {siteConfig.programsList.map((prog, idx) => (
                    <li key={idx}>
                      <CheckCircle2 /> {t(prog)}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary open-modal"
                  onClick={() => openServiceModal('Program Pembinaan')}
                >
                  {lang === 'en' ? 'Register for Coaching' : 'Daftar Pembinaan'} <ArrowRight />
                </button>
              </div>
              <div className="development-image">
                <img
                  src={siteConfig.pembinaanImg}
                  alt="Kegiatan pembinaan membaca Al-Qur'an"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-soft" id="agenda">
          <div className="container">
            <div className="section-heading reveal">
              <span className="eyebrow">{lang === 'en' ? 'Upcoming Schedule' : 'Agenda Terdekat'}</span>
              <h2>
                {lang === 'en' ? "Don't Miss Our " : 'Jangan Lewatkan Kegiatan '}
                <span className="highlight">{lang === 'en' ? 'Events' : 'Kami'}</span>
              </h2>
              <p>
                {lang === 'en'
                  ? 'Join various coaching sessions, Islamic studies, competitions, and collaborative spaces at UPTQ.'
                  : 'Ikuti berbagai kegiatan pembinaan, kajian, perlombaan, dan ruang kolaborasi UPTQ.'}
              </p>
            </div>
            <div className="agenda-layout">
              <aside className="calendar-card reveal from-left">
                <div className="calendar-header">
                  <h3 id="calendarTitle">{`${monthNames[currentMonth]} ${currentYear}`}</h3>
                  <div className="calendar-nav">
                    <button
                      id="prevMonth"
                      aria-label={lang === 'en' ? 'Previous month' : 'Bulan sebelumnya'}
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      id="nextMonth"
                      aria-label={lang === 'en' ? 'Next month' : 'Bulan berikutnya'}
                      onClick={handleNextMonth}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>

                <div className="calendar-grid" id="calendarGrid">
                  {dayNames.map((d) => (
                    <span key={d} className="day-name">
                      {d}
                    </span>
                  ))}
                  {Array.from({ length: Math.max(0, firstDay) }).map((_, i) => (
                    <span key={`prev-${i}`} className="muted-day">
                      {previousMonthDays - (firstDay - 1 - i)}
                    </span>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isEvent = markedDays.includes(day);
                    return (
                      <span key={`day-${day}`} className={isEvent ? 'event-day' : ''}>
                        {day}
                      </span>
                    );
                  })}
                  {Array.from({
                    length: (firstDay + daysInMonth <= 35 ? 35 : 42) - (firstDay + daysInMonth),
                  }).map((_, i) => (
                    <span key={`next-${i}`} className="muted-day">
                      {i + 1}
                    </span>
                  ))}
                </div>

                <p className="calendar-note">
                  {lang === 'en' ? 'Highlighted dates indicate scheduled events' : 'Tanggal berwarna menandakan adanya agenda'}
                </p>
              </aside>

              <div className="agenda-list stagger">
                {agendas.map((item) => (
                  <article key={item.id} className="agenda-item">
                    <div className="agenda-date">
                      <strong>{item.day}</strong>
                      <span>{item.monthYear}</span>
                    </div>
                    <div className="agenda-info">
                      <h3>{item.title}</h3>
                      <div className="agenda-meta">
                        <span>
                          <Clock3 /> {item.time}
                        </span>
                        <span>
                          <MapPin /> {item.location}
                        </span>
                      </div>
                    </div>
                    <span className="agenda-tag">{item.tag}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="berita">
          <div className="container">
            <div className="section-heading reveal">
              <span className="eyebrow">{lang === 'en' ? 'Latest News' : 'Berita Terkini'}</span>
              <h2>
                {lang === 'en' ? 'Stories from the ' : 'Kabar dari Keluarga '}
                <span className="highlight">UPTQ</span>
              </h2>
              <p>
                {lang === 'en'
                  ? 'Latest updates on achievements, programs, and activities of the UPTQ UIN Bandung family.'
                  : 'Informasi terbaru seputar prestasi, program, dan aktivitas keluarga besar UPTQ UIN Bandung.'}
              </p>
            </div>
            <div className="news-grid stagger">
              {siteConfig.newsList.map((news, idx) => (
                <article key={news.id} className={`news-card ${idx === 0 ? 'featured' : ''}`}>
                  <div className="news-image">
                    <img src={news.img} alt={t(news.title)} />
                    <span className="news-category">{t(news.category)}</span>
                  </div>
                  <div className="news-body">
                    <div className="news-meta">
                      <span>
                        <CalendarDays /> {t(news.date)}
                      </span>
                      {news.author && (
                        <span>
                          <User /> {t(news.author)}
                        </span>
                      )}
                    </div>
                    <h3>{t(news.title)}</h3>
                    <p>{t(news.excerpt)}</p>
                    <a className="text-link" href="#konten">
                      {lang === 'en' ? 'Read more' : 'Baca selengkapnya'} <ArrowRight />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-soft" id="konten">
          <div className="container">
            <div className="section-heading center reveal">
              <span className="eyebrow">
                {lang === 'en' ? 'Content & Digital Library' : 'Ruang Konten & Pustaka'}
              </span>
              <h2>
                {lang === 'en' ? "Qur'anic Inspiration in One " : "Inspirasi Qur'ani dalam Satu "}
                <span className="highlight">{lang === 'en' ? 'Space' : 'Ruang'}</span>
              </h2>
              <p>
                {lang === 'en'
                  ? 'Discover events, educational articles, competition info, audio recordings, and official UPTQ documents.'
                  : 'Temukan event, artikel edukatif, informasi perlombaan, rekaman, serta dokumen resmi UPTQ.'}
              </p>
            </div>

            <div className="tab-controls reveal" role="tablist" aria-label="Filter konten">
              <button
                className={`tab-btn ${contentFilter === 'all' ? 'active' : ''}`}
                onClick={() => setContentFilter('all')}
                role="tab"
              >
                {lang === 'en' ? 'All' : 'Semua'}
              </button>
              <button
                className={`tab-btn ${contentFilter === 'event' ? 'active' : ''}`}
                onClick={() => setContentFilter('event')}
                role="tab"
              >
                Event
              </button>
              <button
                className={`tab-btn ${contentFilter === 'artikel' ? 'active' : ''}`}
                onClick={() => setContentFilter('artikel')}
                role="tab"
              >
                {lang === 'en' ? 'Articles' : 'Artikel'}
              </button>
              <button
                className={`tab-btn ${contentFilter === 'lomba' ? 'active' : ''}`}
                onClick={() => setContentFilter('lomba')}
                role="tab"
              >
                {lang === 'en' ? 'Competitions' : 'Lomba'}
              </button>
              <button
                className={`tab-btn ${contentFilter === 'rekaman' ? 'active' : ''}`}
                onClick={() => setContentFilter('rekaman')}
                role="tab"
              >
                {lang === 'en' ? 'Recordings' : 'Rekaman'}
              </button>
            </div>

            <div className="content-grid stagger" id="contentGrid">
              {filteredContent.map((item) => (
                <article key={item.id} className="content-card">
                  <div className="content-thumb">
                    <img src={item.img} alt={item.alt} />
                    <span className="content-type">{item.category.toUpperCase()}</span>
                    {item.category === 'rekaman' && (
                      <button
                        className="play-btn"
                        aria-label={playingAudioId === item.id ? 'Pause recording' : 'Play recording'}
                        onClick={() => toggleAudio(item.id)}
                      >
                        {playingAudioId === item.id ? <Pause /> : <Play />}
                      </button>
                    )}
                  </div>
                  <div className="content-info">
                    <h3>{item.title}</h3>
                    <small className="block">{item.meta}</small>
                    {item.fileUrl && (
                      <a
                        href={item.fileUrl}
                        download={item.fileName || item.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-[#0369a1] hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />{' '}
                        {lang === 'en' ? 'Download Attachment' : 'Unduh Lampiran'} ({item.fileName || 'File'})
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {siteConfig.mediaRepository && siteConfig.mediaRepository.length > 0 && (
              <div className="mt-14 pt-10 border-t border-slate-200/80 reveal">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="eyebrow">
                      {lang === 'en' ? 'Digital Library & Official Files' : 'Pustaka Digital & Berkas Organisasi'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#02182c]">
                      {lang === 'en' ? 'Official UPTQ Documents, Modules & Media' : 'Dokumen, Modul & Media Resmi UPTQ'}
                    </h3>
                  </div>
                  {isAdminLoggedIn && (
                    <button
                      onClick={() => setCurrentView('admin')}
                      className="px-4 py-2 rounded-full bg-[#073763] text-white text-xs font-bold cursor-pointer self-start sm:self-auto"
                    >
                      + Upload File / Link Baru
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {siteConfig.mediaRepository.map((med) => (
                    <div
                      key={med.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0369a1] flex items-center justify-center shrink-0">
                          {med.type === 'image' && <ImageIcon className="w-5 h-5" />}
                          {med.type === 'audio' && <Music className="w-5 h-5" />}
                          {med.type === 'video' && <Video className="w-5 h-5" />}
                          {med.type === 'document' && <FileText className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0369a1]">
                            {med.sectionTarget || 'Dokumen Publik'}
                          </span>
                          <h4 className="text-sm font-extrabold text-[#02182c] truncate mt-0.5">{med.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {med.sizeLabel} • {med.uploadedAt}
                          </p>
                        </div>
                      </div>

                      {med.type === 'image' && (
                        <img
                          src={med.url}
                          alt={med.name}
                          className="w-full h-36 object-cover rounded-xl border border-slate-100"
                        />
                      )}
                      {med.type === 'audio' && <audio controls src={med.url} className="w-full h-9" />}
                      {med.type === 'video' && (
                        <video controls src={med.url} className="w-full h-40 rounded-xl bg-slate-950" />
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">{med.type}</span>
                        <a
                          href={med.url}
                          download={med.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-extrabold text-[#073763] hover:text-[#0369a1] inline-flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />{' '}
                          {lang === 'en' ? 'Open / Download' : 'Buka / Unduh File'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="pelayanan">
          <div className="container">
            <div className="section-heading center reveal">
              <span className="eyebrow">{lang === 'en' ? 'Services' : 'Pelayanan'}</span>
              <h2>
                {lang === 'en' ? 'Ready to Be Your Best ' : 'Kami Siap Menjadi Mitra '}
                <span className="highlight">{lang === 'en' ? 'Partner' : 'Terbaik'}</span>
              </h2>
              <p>
                {lang === 'en'
                  ? 'Professional UPTQ services supporting organizational, institutional, and community events.'
                  : 'Layanan profesional UPTQ untuk mendukung kegiatan organisasi, lembaga, dan masyarakat.'}
              </p>
            </div>
            <div className="service-grid stagger">
              {siteConfig.servicesList.map((srv, idx) => {
                const SrvIcon = serviceIcons[idx % serviceIcons.length];
                return (
                  <article key={srv.id} className="service-card">
                    <img src={srv.img} alt={t(srv.title)} />
                    <div className="service-content">
                      <div className="service-icon">
                        <SrvIcon />
                      </div>
                      <h3>{t(srv.title)}</h3>
                      <p>{t(srv.description)}</p>
                      <button
                        className="service-btn open-modal"
                        onClick={() => openServiceModal(srv.title)}
                      >
                        {t(srv.buttonText)}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-box reveal">
              <div className="cta-copy">
                <h2>{lang === 'en' ? 'Ready to Grow with UPTQ?' : 'Siap Tumbuh Bersama UPTQ?'}</h2>
                <p>
                  {lang === 'en'
                    ? "Let's be part of the journey of goodness and Qur'anic achievement."
                    : "Mari menjadi bagian dari perjalanan kebaikan dan prestasi Qur'ani."}
                </p>
              </div>
              <div className="cta-actions">
                <button
                  className="btn btn-primary open-modal"
                  onClick={() => openServiceModal('Pendaftaran Anggota')}
                >
                  {lang === 'en' ? 'Register Now' : 'Daftar Sekarang'}
                </button>
                <a
                  className="btn btn-outline"
                  href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lang === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="kontak">
        <div className="container footer-grid">
          <div>
            <a className="brand" href="#home">
              <div className="logo-mark overflow-hidden" aria-hidden="true">
                {siteConfig.brandLogoUrl ? (
                  <img
                    src={siteConfig.brandLogoUrl}
                    alt={siteConfig.brandTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  'ق'
                )}
              </div>
              <div>
                <span className="brand-title">{siteConfig.brandTitle}</span>
                <span className="brand-subtitle">{t(siteConfig.brandSubtitle)}</span>
              </div>
            </a>
            <p className="footer-about">{t(siteConfig.footerAbout)}</p>
            <div className="socials" aria-label="Media sosial">
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
              <a href={siteConfig.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube />
              </a>
              <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Music2 />
              </a>
              <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook />
              </a>
            </div>
          </div>

          <div>
            <h3>{lang === 'en' ? 'Quick Links' : 'Tautan Cepat'}</h3>
            <div className="footer-links">
              <a href="#profil">{lang === 'en' ? 'About UPTQ' : 'Tentang UPTQ'}</a>
              <a href="#kepengurusan">{lang === 'en' ? 'Leadership' : 'Kepengurusan'}</a>
              <a href="#agenda">{lang === 'en' ? 'Schedule' : 'Agenda'}</a>
              <a href="#berita">{lang === 'en' ? 'News' : 'Berita'}</a>
              <a href="#pelayanan">{lang === 'en' ? 'Services' : 'Pelayanan'}</a>
            </div>
          </div>

          <div>
            <h3>{lang === 'en' ? 'Information & Contact' : 'Informasi & Kontak'}</h3>
            <ul className="contact-list">
              <li>
                <MapPin />
                <span>{siteConfig.address}</span>
              </li>
              <li>
                <Phone />
                <a href={`tel:${siteConfig.phone}`}>
                  {siteConfig.contactPersonName ? `${siteConfig.contactPersonName}: ` : ''}
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <Mail />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <Clock3 />
                <span>{t(siteConfig.workHours)}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3>{lang === 'en' ? 'Google Maps Location' : 'Lokasi Google Maps'}</h3>
            <div className="map">
              <iframe
                title="Lokasi UIN Sunan Gunung Djati Bandung"
                src={
                  siteConfig.gmapsEmbedUrl ||
                  'https://www.google.com/maps?q=UIN%20Sunan%20Gunung%20Djati%20Bandung&output=embed'
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandTitle}.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi.'}
          </p>
          <div className="flex items-center gap-3">
            <p>
              {lang === 'en' ? 'Built with ' : 'Dibangun dengan '}
              <span style={{ color: '#f5c542' }} className="select-none inline-block">
                ♥
              </span>{' '}
              {lang === 'en' ? "for the Qur'anic generation." : "untuk generasi Qur'ani."}
            </p>
          </div>
        </div>
      </footer>

      <div className={`modal ${isModalOpen ? 'show' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-panel">
          <button
            className="modal-close"
            onClick={closeServiceModal}
            aria-label={lang === 'en' ? 'Close form' : 'Tutup formulir'}
          >
            <X />
          </button>
          <span className="eyebrow">{lang === 'en' ? 'Online Registration Form' : 'Formulir Online'}</span>
          <h3 id="modalTitle">
            {modalService === 'Pendaftaran Anggota'
              ? lang === 'en'
                ? 'Join the UPTQ UIN Bandung Family'
                : 'Daftar Anggota Keluarga UPTQ'
              : lang === 'en'
              ? `Request ${t(modalService)}`
              : `Pengajuan ${modalService}`}
          </h3>
          <p>
            {lang === 'en'
              ? 'Complete the form below. The UPTQ team will contact you via WhatsApp or email.'
              : 'Lengkapi data berikut. Tim UPTQ akan menghubungi Anda melalui WhatsApp atau email.'}
          </p>

          <form id="serviceForm" onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">{lang === 'en' ? 'Full Name' : 'Nama lengkap'}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={lang === 'en' ? 'Your full name' : 'Nama Anda'}
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{lang === 'en' ? 'WhatsApp Number' : 'Nomor WhatsApp'}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </div>
              <div className="form-group full">
                <label htmlFor="email">{lang === 'en' ? 'Email Address' : 'Alamat email'}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div className="form-group full">
                <label htmlFor="service">{lang === 'en' ? 'Category / Service' : 'Jenis layanan'}</label>
                <select
                  id="service"
                  name="service"
                  value={modalService}
                  onChange={(e) => setModalService(e.target.value)}
                >
                  <option value="Pendaftaran Anggota">
                    {lang === 'en' ? 'Membership Registration (Join UPTQ)' : 'Pendaftaran Anggota Keluarga UPTQ'}
                  </option>
                  <option value="Program Pembinaan">
                    {lang === 'en' ? 'Coaching Program' : 'Program Pembinaan'}
                  </option>
                  <option value="Media Partner">Media Partner</option>
                  <option value="Peminjaman Barang">
                    {lang === 'en' ? 'Equipment Loan' : 'Peminjaman Barang'}
                  </option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <div className="form-group full">
                <label htmlFor="message">{lang === 'en' ? 'Details / Division Interest' : 'Keperluan / Minat Bidang'}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={
                    lang === 'en'
                      ? 'Tell us your faculty/department and your Qur’anic interest...'
                      : 'Jelaskan jurusan/fakultas serta minat bidang atau keperluan Anda...'
                  }
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button className="btn btn-blue form-submit" type="submit">
              {lang === 'en' ? 'Submit Registration' : 'Kirim Pendaftaran'} <Send />
            </button>
          </form>
        </div>
      </div>

      <div className={`toast ${showToast ? 'show' : ''}`} role="status" aria-live="polite">
        <CircleCheck />
        <span>
          {lang === 'en'
            ? 'Submission sent successfully. We will contact you shortly.'
            : 'Pengajuan berhasil dikirim. Kami akan segera menghubungi Anda.'}
        </span>
      </div>

      <button
        type="button"
        className="uptq-lang-toggle-fab"
        onClick={() => setLang((prev) => (prev === 'id' ? 'en' : 'id'))}
        aria-label={lang === 'id' ? 'Translate website to English (EN)' : 'Terjemahkan website ke Bahasa Indonesia (ID)'}
        title={lang === 'id' ? 'Klik untuk terjemahkan ke Bahasa Inggris (EN)' : 'Click to translate to Indonesian (ID)'}
      >
        {lang === 'id' ? (
          <>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              className="rounded-[3px] shadow-xs shrink-0 overflow-hidden border border-white/25"
              aria-hidden="true"
            >
              <rect width="22" height="8" y="0" fill="#E70011" />
              <rect width="22" height="8" y="8" fill="#FFFFFF" />
            </svg>
            <span>ID</span>
          </>
        ) : (
          <>
            <svg
              width="22"
              height="16"
              viewBox="0 0 60 40"
              className="rounded-[3px] shadow-xs shrink-0 overflow-hidden border border-white/25"
              aria-hidden="true"
            >
              <rect width="60" height="40" fill="#012169" />
              <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="7" />
              <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
              <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="11" />
              <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="6.5" />
            </svg>
            <span>EN</span>
          </>
        )}
      </button>
    </>
  );
}
