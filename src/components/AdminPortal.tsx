import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutGrid,
  Home,
  UserCheck,
  Calendar,
  Newspaper,
  Layers,
  Briefcase,
  MapPin,
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Upload,
  Link2,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Save,
  Download,
  Phone,
  Mail,
  Share2,
  Camera,
  Lock,
  ShieldCheck,
  UserCog,
  KeyRound,
} from 'lucide-react';
import {
  SiteConfigData,
  DEFAULT_SITE_CONFIG,
  UploadedMediaItem,
  LeaderItemData,
  DivisionItemData,
  NewsItemData,
  AccountProfileData,
} from '../data/siteConfig';

import { removeImageBackgroundToCutout } from '../utils/cutout3d';

export interface ServiceSubmission {
  id: string;
  orderCode?: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  date: string;
  status: 'Menunggu' | 'Diterima' | 'Selesai';
}

export interface AgendaItemData {
  id: string;
  day: string;
  monthYear: string;
  title: string;
  time: string;
  location: string;
  tag: string;
}

export interface ContentItemData {
  id: string;
  category: 'event' | 'artikel' | 'lomba' | 'rekaman';
  title: string;
  meta: string;
  img: string;
  alt: string;
  fileUrl?: string;
  fileName?: string;
  mimeType?: string;
}

interface AdminPortalProps {
  onBackToWebsite: () => void;
  isLoggedIn: boolean;
  userRole: 'admin' | 'developer' | null;
  onLogin: (role: 'admin' | 'developer') => void;
  onLogout: () => void;
  stats: {
    members: number;
    achievements: number;
    programs: number;
    events: number;
  };
  onUpdateStats: (newStats: { members: number; achievements: number; programs: number; events: number }) => void;
  submissions: ServiceSubmission[];
  onUpdateSubmissions: (subs: ServiceSubmission[]) => void;
  agendas: AgendaItemData[];
  onUpdateAgendas: (agendas: AgendaItemData[]) => void;
  contents: ContentItemData[];
  onUpdateContents: (contents: ContentItemData[]) => void;
  siteConfig: SiteConfigData;
  onUpdateSiteConfig: (newConfig: SiteConfigData) => void;
}

type MainWindowFilter =
  | 'dashboard_awal'
  | 'home'
  | 'profil'
  | 'agenda'
  | 'berita'
  | 'konten'
  | 'pelayanan'
  | 'dashboard_bawah'
  | 'akun_biodata';

type HomeSubFilter = 'sejarah' | 'visimisi' | 'kepengurusan' | 'bidang' | 'pembinaan' | 'hero';
type KontenSubFilter = 'all' | 'event' | 'artikel' | 'lomba' | 'rekaman' | 'upload';
type PelayananSubFilter = 'all' | 'Media Partner' | 'Peminjaman Barang' | 'Entertainment';
type BawahSubFilter = 'alamat' | 'cp' | 'email' | 'medsos' | 'gmaps';

const smoothSpringTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onBackToWebsite,
  isLoggedIn,
  userRole,
  onLogin,
  onLogout,
  stats,
  onUpdateStats,
  submissions,
  onUpdateSubmissions,
  agendas,
  onUpdateAgendas,
  contents,
  onUpdateContents,
  siteConfig,
  onUpdateSiteConfig,
}) => {
  const isDeveloper = userRole === 'developer';
  const isAdminOnly = userRole === 'admin';

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [showWaLockoutPopup, setShowWaLockoutPopup] = useState(false);
  const [showAdminPassEdit, setShowAdminPassEdit] = useState(false);
  const [showDevPassEdit, setShowDevPassEdit] = useState(false);

  const [windowFilter, setWindowFilter] = useState<MainWindowFilter>(() =>
    userRole === 'admin' ? 'home' : 'dashboard_awal'
  );
  const [homeSubFilter, setHomeSubFilter] = useState<HomeSubFilter>(() =>
    userRole === 'admin' ? 'kepengurusan' : 'sejarah'
  );
  const [kontenSubFilter, setKontenSubFilter] = useState<KontenSubFilter>('all');
  const [pelayananSubFilter, setPelayananSubFilter] = useState<PelayananSubFilter>('all');
  const [bawahSubFilter, setBawahSubFilter] = useState<BawahSubFilter>('alamat');

  const [isSidebarMenuVisible, setIsSidebarMenuVisible] = useState(true);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const [orderTab, setOrderTab] = useState<'all' | 'Diterima' | 'Menunggu' | 'Selesai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRowId, setSelectedRowId] = useState<string>(submissions[1]?.id || submissions[0]?.id || 'sub-2');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('31 Jul 2020');
  const [endDate, setEndDate] = useState('03 Aug 2020');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionNotice, setActionNotice] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [newOrderName, setNewOrderName] = useState('');
  const [newOrderPhone, setNewOrderPhone] = useState('');
  const [newOrderEmail, setNewOrderEmail] = useState('');
  const [newOrderService, setNewOrderService] = useState('Media Partner');
  const [newOrderMessage, setNewOrderMessage] = useState('');

  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [newContentCategory, setNewContentCategory] = useState<'event' | 'artikel' | 'lomba' | 'rekaman'>('event');
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentMeta, setNewContentMeta] = useState('');
  const [newContentImg, setNewContentImg] = useState('');
  const [newContentFileUrl, setNewContentFileUrl] = useState('');
  const [newContentFileName, setNewContentFileName] = useState('');
  const [newContentMimeType, setNewContentMimeType] = useState('');
  const contentFileInputRef = useRef<HTMLInputElement>(null);
  const contentThumbInputRef = useRef<HTMLInputElement>(null);

  const [editingAgendaId, setEditingAgendaId] = useState<string | null>(null);
  const [newAgendaDay, setNewAgendaDay] = useState('');
  const [newAgendaMonthYear, setNewAgendaMonthYear] = useState('Juni 2025');
  const [newAgendaTitle, setNewAgendaTitle] = useState('');
  const [newAgendaTime, setNewAgendaTime] = useState('08.00–12.00 WIB');
  const [newAgendaLocation, setNewAgendaLocation] = useState('Masjid Iqomah UIN Sunan Gunung Djati');
  const [newAgendaTag, setNewAgendaTag] = useState('Terbuka');

  const [editMembers, setEditMembers] = useState(stats.members);
  const [editAchievements, setEditAchievements] = useState(stats.achievements);
  const [editPrograms, setEditPrograms] = useState(stats.programs);
  const [editEvents, setEditEvents] = useState(stats.events);

  const [draftConfig, setDraftConfig] = useState<SiteConfigData>({
    ...siteConfig,
    developerAccount: {
      ...(siteConfig.developerAccount || DEFAULT_SITE_CONFIG.developerAccount),
      avatarUrl: siteConfig.developerAccount?.avatarUrl || '/developer.png',
    },
    adminAccount: {
      ...(siteConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount),
      avatarUrl: siteConfig.adminAccount?.avatarUrl || '/admin.png',
    },
  });

  const [uploadMode, setUploadMode] = useState<'device' | 'link'>('device');
  const [mediaLinkUrl, setMediaLinkUrl] = useState('');
  const [mediaTitleInput, setMediaTitleInput] = useState('');
  const [mediaTargetSection, setMediaTargetSection] = useState('Galeri & Publikasi Kegiatan');
  const [mediaTypeSelect, setMediaTypeSelect] = useState<'image' | 'video' | 'audio' | 'document'>('image');
  const universalFileInputRef = useRef<HTMLInputElement>(null);

  const [newLeaderName, setNewLeaderName] = useState('');
  const [newLeaderRole, setNewLeaderRole] = useState('');
  const [newLeaderMajor, setNewLeaderMajor] = useState('');
  const [newLeaderImg, setNewLeaderImg] = useState('');

  const [newDivisionTitle, setNewDivisionTitle] = useState('');
  const [newDivisionDesc, setNewDivisionDesc] = useState('');

  const [newProgramName, setNewProgramName] = useState('');

  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Prestasi');
  const [newNewsDate, setNewNewsDate] = useState('18 Mei 2025');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsImg, setNewNewsImg] = useState('');

  useEffect(() => {
    setEditMembers(stats.members);
    setEditAchievements(stats.achievements);
    setEditPrograms(stats.programs);
    setEditEvents(stats.events);
  }, [stats]);

  useEffect(() => {
    setDraftConfig((prev) => ({
      ...siteConfig,
      developerAccount: {
        ...(siteConfig.developerAccount || DEFAULT_SITE_CONFIG.developerAccount),
        avatarUrl: siteConfig.developerAccount?.avatarUrl || prev.developerAccount?.avatarUrl || '/developer.png',
      },
      adminAccount: {
        ...(siteConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount),
        avatarUrl: siteConfig.adminAccount?.avatarUrl || prev.adminAccount?.avatarUrl || '/admin.png',
      },
    }));
  }, [siteConfig]);

  useEffect(() => {
    if (userRole === 'admin') {
      if (!['home', 'agenda', 'berita', 'akun_biodata'].includes(windowFilter)) {
        setWindowFilter('home');
      }
      if (!['kepengurusan', 'bidang', 'pembinaan'].includes(homeSubFilter)) {
        setHomeSubFilter('kepengurusan');
      }
    }
  }, [userRole]);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4200);
  };

  const canAccessMainWindow = (wf: MainWindowFilter): boolean => {
    if (isDeveloper) return true;
    return wf === 'home' || wf === 'agenda' || wf === 'berita' || wf === 'akun_biodata';
  };

  const canAccessHomeSubFilter = (sub: HomeSubFilter): boolean => {
    if (isDeveloper) return true;
    return sub === 'kepengurusan' || sub === 'bidang' || sub === 'pembinaan';
  };

  const handleSelectMainWindow = (wf: MainWindowFilter) => {
    if (!canAccessMainWindow(wf)) {
      showNotification('🔒 Bagian ini terkunci untuk akun Admin.');
      return;
    }
    setWindowFilter(wf);
    if (wf === 'home' && isAdminOnly && !canAccessHomeSubFilter(homeSubFilter)) {
      setHomeSubFilter('kepengurusan');
    }
  };

  const handleSelectHomeSub = (sub: HomeSubFilter) => {
    if (!canAccessHomeSubFilter(sub)) {
      showNotification('🔒 Sub-bagian ini terkunci untuk akun Admin.');
      return;
    }
    setWindowFilter('home');
    setHomeSubFilter(sub);
  };

  const handleUpdateAccountField = (
    targetAccount: 'adminAccount' | 'developerAccount',
    field: keyof AccountProfileData,
    value: string | boolean
  ) => {
    const currentAcc = draftConfig[targetAccount] || DEFAULT_SITE_CONFIG[targetAccount];
    const nextAcc = { ...currentAcc, [field]: value };
    setDraftConfig({ ...draftConfig, [targetAccount]: nextAcc });
  };

  const handleAccountAvatarDeviceUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetAccount: 'adminAccount' | 'developerAccount',
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileFromDevice(file, (url) => {
      const currentAcc = draftConfig[targetAccount] || DEFAULT_SITE_CONFIG[targetAccount];
      const nextAcc = { ...currentAcc, avatarUrl: url };
      const nextCfg = { ...draftConfig, [targetAccount]: nextAcc };
      setDraftConfig(nextCfg);
      onUpdateSiteConfig(nextCfg);
      showNotification(`Foto profil ${label} ("${file.name}") berhasil diupload dari penyimpanan perangkat!`);
    });
    e.target.value = '';
  };

  const readFileFromDevice = (
    file: File,
    onLoaded: (url: string, fileName: string, mimeType: string, sizeLabel: string) => void
  ) => {
    const sizeStr = formatFileSize(file.size);
    if (file.size <= 3 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        onLoaded(reader.result as string, file.name, file.type || 'image/jpeg', sizeStr);
      };
      reader.readAsDataURL(file);
    } else {
      const objectUrl = URL.createObjectURL(file);
      onLoaded(objectUrl, file.name, file.type || 'application/octet-stream', sizeStr);
    }
  };

  const handleDirectConfigImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: keyof SiteConfigData,
    labelName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFileFromDevice(file, async (url) => {
      const isAmbassadorField =
        fieldKey === 'heroAmbassadorImage' ||
        fieldKey === 'historyMainImg' ||
        fieldKey === 'profileImg';
      const finalUrl = isAmbassadorField ? await removeImageBackgroundToCutout(url) : url;
      const next = { ...draftConfig, [fieldKey]: finalUrl };
      setDraftConfig(next);
      onUpdateSiteConfig(next);
      showNotification(`Foto ${labelName} ("${file.name}") berhasil diupload dalam mode 3D tanpa background!`);
    });
    e.target.value = '';
  };

  const detectMediaCategory = (fileName: string, mime: string): 'image' | 'video' | 'audio' | 'document' => {
    const lower = fileName.toLowerCase();
    if (mime.startsWith('image/') || /\.(png|jpg|jpeg|gif|webp|svg)$/.test(lower)) return 'image';
    if (mime.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/.test(lower)) return 'video';
    if (mime.startsWith('audio/') || /\.(mp3|wav|ogg|m4a)$/.test(lower)) return 'audio';
    return 'document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleContentDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const category = detectMediaCategory(file.name, file.type);
    readFileFromDevice(file, (resultUrl) => {
      if (category === 'image') {
        setNewContentImg(resultUrl);
      }
      setNewContentFileUrl(resultUrl);
      setNewContentFileName(file.name);
      setNewContentMimeType(file.type || 'application/octet-stream');
      if (!newContentTitle) {
        setNewContentTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
      showNotification(`File publikasi "${file.name}" berhasil dimuat dari perangkat.`);
    });
    e.target.value = '';
  };

  const handleUniversalDeviceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const category = detectMediaCategory(file.name, file.type);
      const nowStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

      readFileFromDevice(file, (url, fileName, mimeType, sizeStr) => {
        const newMedia: UploadedMediaItem = {
          id: `med-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: mediaTitleInput.trim() || fileName,
          type: category,
          mimeType,
          url,
          sizeLabel: sizeStr,
          uploadedAt: nowStr,
          sectionTarget: mediaTargetSection,
        };
        const updatedRepo = [newMedia, ...(draftConfig.mediaRepository || [])];
        const nextConfig = { ...draftConfig, mediaRepository: updatedRepo };
        setDraftConfig(nextConfig);
        onUpdateSiteConfig(nextConfig);
        setMediaTitleInput('');
        showNotification(`File "${fileName}" berhasil diupload dari penyimpanan perangkat!`);
      });
    });
    e.target.value = '';
  };

  const handleUniversalLinkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaLinkUrl.trim()) return;
    const detectedType = detectMediaCategory(mediaLinkUrl, '');
    const finalType = mediaTypeSelect || detectedType;
    const nowStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

    const newMedia: UploadedMediaItem = {
      id: `med-${Date.now()}`,
      name: mediaTitleInput.trim() || mediaLinkUrl.split('/').pop() || 'Tautan Eksternal UPTQ',
      type: finalType,
      mimeType: `link/${finalType}`,
      url: mediaLinkUrl.trim(),
      sizeLabel: 'External Link',
      uploadedAt: nowStr,
      sectionTarget: mediaTargetSection,
    };

    const updatedRepo = [newMedia, ...(draftConfig.mediaRepository || [])];
    const nextConfig = { ...draftConfig, mediaRepository: updatedRepo };
    setDraftConfig(nextConfig);
    onUpdateSiteConfig(nextConfig);
    setMediaLinkUrl('');
    setMediaTitleInput('');
    showNotification('Tautan media/dokumen berhasil ditambahkan ke website!');
  };

  const handleDeleteMediaItem = (id: string) => {
    const updatedRepo = (draftConfig.mediaRepository || []).filter((m) => m.id !== id);
    const nextConfig = { ...draftConfig, mediaRepository: updatedRepo };
    setDraftConfig(nextConfig);
    onUpdateSiteConfig(nextConfig);
    showNotification('File/tautan telah dihapus dari galeri & repositori.');
  };

  const handleApplyMediaToSection = (
    url: string,
    target: 'logo' | 'ambassador' | 'hero' | 'sejarah' | 'profil' | 'pembinaan'
  ) => {
    const next = { ...draftConfig };
    if (target === 'logo') next.brandLogoUrl = url;
    if (target === 'ambassador') next.heroAmbassadorImage = url;
    if (target === 'hero') next.heroBgImage = url;
    if (target === 'sejarah') next.historyMainImg = url;
    if (target === 'profil') next.profileImg = url;
    if (target === 'pembinaan') next.pembinaanImg = url;
    setDraftConfig(next);
    onUpdateSiteConfig(next);
    showNotification(`Gambar berhasil diterapkan ke bagian ${target.toUpperCase()} website!`);
  };

  const getDeveloperWhatsappUrl = () => {
    const rawPhone = (siteConfig.developerWhatsapp || siteConfig.phone || '6281234567890').replace(/[^0-9]/g, '');
    const normalizedPhone = rawPhone.startsWith('0') ? `62${rawPhone.slice(1)}` : rawPhone || '6281234567890';
    const autoText = "Assalamu'alaikum wr wb, terdapat kendala yaa akhi";
    return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(autoText)}`;
  };

  const getDeveloperGmailUrl = () => {
    const rawDevEmail = (siteConfig.developerAccount?.email || 'firman.sidiq216@gmail.com').trim();
    const devEmail =
      !rawDevEmail || rawDevEmail === 'developer@uptq.uinsgd.ac.id'
        ? 'firman.sidiq216@gmail.com'
        : rawDevEmail;
    const subject = 'Kendala Akses Portal Website UPTQ UIN Bandung';
    const body = "Assalamu'alaikum wr wb Developer UPTQ, terdapat kendala saat mengakses portal website.";
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(devEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userClean = usernameInput.trim();
    const passClean = passwordInput.trim();

    const devAcc = siteConfig.developerAccount || DEFAULT_SITE_CONFIG.developerAccount;
    const admAcc = siteConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount;

    const devUsername = (devAcc.username || 'UPTQJAYA').trim();
    const devPassword = (devAcc.password || 'F1R6M6N6').trim();

    const admEnabled = admAcc.isAccessEnabled !== false;
    const admUsername = (admAcc.username ?? 'UPTQJAYA').trim();
    const admPassword = (admAcc.password ?? 'Z4MZ4M4').trim();

    if (
      userClean.toUpperCase() === devUsername.toUpperCase() &&
      passClean === devPassword
    ) {
      setFailedLoginAttempts(0);
      setLoginError('');
      setShowWaLockoutPopup(false);
      setUsernameInput('');
      setPasswordInput('');
      setWindowFilter('dashboard_awal');
      onLogin('developer');
      showNotification('Ahlan Wa Sahlan Developer! Selamat datang di dashboard pengelolaan website.');
      return;
    }

    if (
      admEnabled &&
      admUsername.length > 0 &&
      admPassword.length > 0 &&
      userClean.toUpperCase() === admUsername.toUpperCase() &&
      passClean === admPassword
    ) {
      setFailedLoginAttempts(0);
      setLoginError('');
      setShowWaLockoutPopup(false);
      setUsernameInput('');
      setPasswordInput('');
      setWindowFilter('home');
      setHomeSubFilter('kepengurusan');
      onLogin('admin');
      showNotification('Ahlan Wa Sahlan Admin! Selamat datang di dashboard pengelolaan website.');
      return;
    }

    const nextAttempts = failedLoginAttempts + 1;
    setFailedLoginAttempts(nextAttempts);
    if (!admEnabled && userClean.toUpperCase() === (admUsername || 'UPTQJAYA').toUpperCase()) {
      setLoginError('Akses login Admin telah dihapus/dinonaktifkan oleh Developer');
    } else {
      setLoginError('Kode salah, harap periksa kembali');
    }
    if (nextAttempts >= 3) {
      setShowWaLockoutPopup(true);
      const waUrl = getDeveloperWhatsappUrl();
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = waUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 600);
    }
  };

  const handleUpdateSubmissionStatus = (id: string, status: 'Menunggu' | 'Diterima' | 'Selesai') => {
    onUpdateSubmissions(submissions.map((s) => (s.id === id ? { ...s, status } : s)));
    showNotification(`Status data #${id.slice(-4)} diperbarui menjadi "${status}".`);
  };

  const handleDeleteSubmission = (id: string) => {
    onUpdateSubmissions(submissions.filter((s) => s.id !== id));
    showNotification('Data permohonan telah dihapus.');
  };

  const handleEditOrderClick = (sub: ServiceSubmission) => {
    setEditingOrderId(sub.id);
    setNewOrderName(sub.name);
    setNewOrderPhone(sub.phone);
    setNewOrderEmail(sub.email);
    setNewOrderService(sub.service);
    setNewOrderMessage(sub.message);
    setIsAddOrderOpen(true);
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderName.trim()) return;

    if (editingOrderId) {
      onUpdateSubmissions(
        submissions.map((s) =>
          s.id === editingOrderId
            ? {
                ...s,
                name: newOrderName,
                phone: newOrderPhone,
                email: newOrderEmail,
                service: newOrderService,
                message: newOrderMessage,
              }
            : s
        )
      );
      showNotification('Data permohonan berhasil diperbarui.');
    } else {
      const newItem: ServiceSubmission = {
        id: `sub-${Date.now()}`,
        orderCode: `#${2632 + submissions.length}`,
        name: newOrderName,
        phone: newOrderPhone || '081234567890',
        email: newOrderEmail || 'mahasiswa@uinsgd.ac.id',
        service: newOrderService,
        message: newOrderMessage || 'Permohonan layanan terdaftar melalui dashboard admin.',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Menunggu',
      };
      onUpdateSubmissions([newItem, ...submissions]);
      setSelectedRowId(newItem.id);
      showNotification('Data permohonan baru berhasil ditambahkan.');
    }

    setEditingOrderId(null);
    setNewOrderName('');
    setNewOrderPhone('');
    setNewOrderEmail('');
    setNewOrderMessage('');
    setIsAddOrderOpen(false);
  };

  const handleAddOrUpdateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContentTitle.trim()) return;

    if (editingContentId) {
      onUpdateContents(
        contents.map((c) =>
          c.id === editingContentId
            ? {
                ...c,
                category: newContentCategory,
                title: newContentTitle,
                meta: newContentMeta || c.meta,
                img: newContentImg || c.img,
                alt: newContentTitle,
                fileUrl: newContentFileUrl || c.fileUrl,
                fileName: newContentFileName || c.fileName,
                mimeType: newContentMimeType || c.mimeType,
              }
            : c
        )
      );
      showNotification('Publikasi kegiatan berhasil diperbarui!');
    } else {
      const newItem: ContentItemData = {
        id: `c-${Date.now()}`,
        category: newContentCategory,
        title: newContentTitle,
        meta: newContentMeta || 'Redaksi UPTQ UIN SGD Bandung',
        img:
          newContentImg ||
          'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=700&q=85',
        alt: newContentTitle,
        fileUrl: newContentFileUrl || undefined,
        fileName: newContentFileName || undefined,
        mimeType: newContentMimeType || undefined,
      };
      onUpdateContents([newItem, ...contents]);
      showNotification('Publikasi kegiatan baru berhasil ditambahkan ke website!');
    }

    setEditingContentId(null);
    setNewContentTitle('');
    setNewContentMeta('');
    setNewContentImg('');
    setNewContentFileUrl('');
    setNewContentFileName('');
    setNewContentMimeType('');
  };

  const handleEditContentClick = (item: ContentItemData) => {
    setEditingContentId(item.id);
    setNewContentCategory(item.category);
    setNewContentTitle(item.title);
    setNewContentMeta(item.meta);
    setNewContentImg(item.img);
    setNewContentFileUrl(item.fileUrl || '');
    setNewContentFileName(item.fileName || '');
    setNewContentMimeType(item.mimeType || '');
  };

  const handleDeleteContent = (id: string) => {
    onUpdateContents(contents.filter((c) => c.id !== id));
    showNotification('Publikasi kegiatan berhasil dihapus.');
  };

  const handleAddOrUpdateAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgendaTitle.trim() || !newAgendaDay.trim()) return;

    if (editingAgendaId) {
      onUpdateAgendas(
        agendas.map((ag) =>
          ag.id === editingAgendaId
            ? {
                ...ag,
                day: newAgendaDay,
                monthYear: newAgendaMonthYear,
                title: newAgendaTitle,
                time: newAgendaTime,
                location: newAgendaLocation,
                tag: newAgendaTag,
              }
            : ag
        )
      );
      showNotification('Agenda kegiatan berhasil diperbarui.');
    } else {
      const newAgenda: AgendaItemData = {
        id: `ag-${Date.now()}`,
        day: newAgendaDay,
        monthYear: newAgendaMonthYear,
        title: newAgendaTitle,
        time: newAgendaTime,
        location: newAgendaLocation,
        tag: newAgendaTag,
      };
      onUpdateAgendas([newAgenda, ...agendas]);
      showNotification('Jadwal kegiatan baru berhasil ditambahkan.');
    }

    setEditingAgendaId(null);
    setNewAgendaTitle('');
    setNewAgendaDay('');
  };

  const handleEditAgendaClick = (ag: AgendaItemData) => {
    setEditingAgendaId(ag.id);
    setNewAgendaDay(ag.day);
    setNewAgendaMonthYear(ag.monthYear);
    setNewAgendaTitle(ag.title);
    setNewAgendaTime(ag.time);
    setNewAgendaLocation(ag.location);
    setNewAgendaTag(ag.tag);
  };

  const handleDeleteAgenda = (id: string) => {
    onUpdateAgendas(agendas.filter((a) => a.id !== id));
    showNotification('Agenda kegiatan berhasil dihapus.');
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats({
      members: Number(editMembers),
      achievements: Number(editAchievements),
      programs: Number(editPrograms),
      events: Number(editEvents),
    });
    showNotification('Statistik utama website berhasil diperbarui secara real-time!');
  };

  const handleSaveSiteConfig = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateSiteConfig(draftConfig);
    showNotification('Seluruh perubahan konten website berhasil disimpan dan diterapkan!');
  };

  const filteredSubmissions = submissions.filter((s) => {
    const matchesTab = orderTab === 'all' || s.status === orderTab;
    const matchesServiceFilter =
      windowFilter !== 'pelayanan' ||
      pelayananSubFilter === 'all' ||
      s.service.toLowerCase().includes(pelayananSubFilter.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.service.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q) ||
      s.phone.includes(q);
    return matchesTab && matchesServiceFilter && matchesQuery;
  });

  const itemsPerPage = 6;
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filteredContentsList = contents.filter((c) => {
    if (kontenSubFilter === 'all' || kontenSubFilter === 'upload') return true;
    return c.category === kontenSubFilter;
  });

  if (!isLoggedIn) {
    const developerWaLink = getDeveloperWhatsappUrl();
    const developerGmailLink = getDeveloperGmailUrl();

    return (
      <div className="uptq-cosmic-login-screen">
        <div className="uptq-nebula-glow-1"></div>
        <div className="uptq-nebula-glow-2"></div>
        <div className="uptq-diagonal-beam-1"></div>
        <div className="uptq-diagonal-beam-2"></div>

        <button
          type="button"
          onClick={onBackToWebsite}
          className="fixed top-5 left-5 z-30 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-bold text-white backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#f5c542]" />
          <span>Kembali ke Website</span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={smoothSpringTransition}
          className="uptq-glass-login-card"
        >
          <div className="uptq-card-internal-streak"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f5c542] to-[#e6ad19] text-[#02182c] font-serif font-bold text-3xl flex items-center justify-center shadow-[0_10px_28px_rgba(245,197,66,0.4)] mb-3 border-2 border-white/40 overflow-hidden">
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
            <span className="text-xs font-extrabold tracking-[0.18em] uppercase text-white/95">
              {siteConfig.brandTitle}
            </span>
            <span className="text-[10px] font-semibold text-sky-200/80 tracking-wider uppercase mt-0.5">
              Portal Akses Admin &amp; Developer
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5c542] tracking-wide mt-3 mb-6 drop-shadow-sm">
              Ahlan Wa Sahlan
            </h1>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left" noValidate>
              <div>
                <label className="block text-xs font-bold text-sky-100 mb-1.5 pl-1">
                  Username / ID Admin &amp; Developer
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Masukkan Username (contoh: UPTQJAYA)"
                  className={`uptq-neon-input ${loginError ? 'input-error' : ''}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-100 mb-1.5 pl-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Masukkan Password"
                    className={`uptq-neon-input pr-11 ${loginError ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-200/75 hover:text-white cursor-pointer p-1 transition-colors"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <AnimatePresence>
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      role="alert"
                      className="mt-2.5 px-3.5 py-2.5 rounded-xl bg-red-600/25 border border-red-500 text-red-400 text-xs font-extrabold flex items-center justify-between gap-2 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                        <span className="text-red-400">{loginError}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/30 text-red-200 shrink-0">
                        {failedLoginAttempts}/3
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-0.5 text-center">
                <a
                  href={developerGmailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white/8 hover:bg-white/15 border border-white/15 hover:border-[#f5c542]/60 text-xs font-semibold text-sky-100 hover:text-[#f5c542] transition-all cursor-pointer group w-full"
                >
                  <Mail className="w-3.5 h-3.5 text-[#f5c542] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="underline decoration-sky-200/40 group-hover:decoration-[#f5c542] underline-offset-4">
                    Hubungi developer jika terdapat kendala
                  </span>
                </a>
              </div>

              <button type="submit" className="uptq-login-submit-btn">
                Masuk Dashboard
              </button>
            </form>
          </div>
        </motion.div>

        <AnimatePresence>
          {showWaLockoutPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={smoothSpringTransition}
                className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border-2 border-red-400/80 p-7 text-center shadow-[0_25px_80px_rgba(0,0,0,0.65)] space-y-5 relative"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-400 text-red-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                  <AlertCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-500/25 border border-red-400/50 text-red-300 text-[11px] font-extrabold uppercase tracking-wider">
                    Peringatan Keamanan • 3x Gagal Login
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-snug">
                    Ada masalah saat login, segera hubungi developer
                  </h3>
                  <p className="text-xs text-sky-100/85 leading-relaxed">
                    Anda telah memasukkan kode akses yang salah sebanyak 3 kali. Sistem mengarahkan Anda langsung ke WhatsApp Developer dengan pesan otomatis siap kirim:
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/40 text-left text-xs text-emerald-200 font-medium">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                    Pesan Otomatis Siap Kirim di WhatsApp:
                  </span>
                  &ldquo;Assalamu&apos;alaikum wr wb, terdapat kendala yaa akhi&rdquo;
                </div>

                <div className="space-y-2.5 pt-1">
                  <a
                    href={developerGmailLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#f5c542] hover:bg-amber-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(245,197,66,0.35)] transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Hubungi Developer via Gmail (firman.sidiq216@gmail.com)</span>
                  </a>

                  <a
                    href={developerWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-2xl bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Hubungi Developer via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setShowWaLockoutPopup(false);
                      setFailedLoginAttempts(0);
                      setLoginError('');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-sky-200 cursor-pointer transition-colors"
                  >
                    Coba Masukkan Kembali Kode Login
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const activeAccountProfile: AccountProfileData = isDeveloper
    ? draftConfig.developerAccount || DEFAULT_SITE_CONFIG.developerAccount
    : draftConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount;

  const sidebarWindowFilters: {
    id: MainWindowFilter;
    label: string;
    icon: React.FC<{ className?: string }>;
    locked?: boolean;
    subItems?: { id: string; label: string; onSelect: () => void; isActive: boolean; locked?: boolean }[];
  }[] = [
    {
      id: 'dashboard_awal',
      label: '= Dashboard Awal',
      icon: LayoutGrid,
      locked: !canAccessMainWindow('dashboard_awal'),
    },
    {
      id: 'home',
      label: '1. Home & Organisasi',
      icon: Home,
      locked: !canAccessMainWindow('home'),
      subItems: [
        {
          id: 'sejarah',
          label: 'Sejarah',
          isActive: windowFilter === 'home' && homeSubFilter === 'sejarah',
          locked: !canAccessHomeSubFilter('sejarah'),
          onSelect: () => handleSelectHomeSub('sejarah'),
        },
        {
          id: 'visimisi',
          label: 'Visi Misi',
          isActive: windowFilter === 'home' && homeSubFilter === 'visimisi',
          locked: !canAccessHomeSubFilter('visimisi'),
          onSelect: () => handleSelectHomeSub('visimisi'),
        },
        {
          id: 'kepengurusan',
          label: 'Kepengurusan & Keanggotaan',
          isActive: windowFilter === 'home' && homeSubFilter === 'kepengurusan',
          locked: !canAccessHomeSubFilter('kepengurusan'),
          onSelect: () => handleSelectHomeSub('kepengurusan'),
        },
        {
          id: 'bidang',
          label: 'Bidang Organisasi',
          isActive: windowFilter === 'home' && homeSubFilter === 'bidang',
          locked: !canAccessHomeSubFilter('bidang'),
          onSelect: () => handleSelectHomeSub('bidang'),
        },
        {
          id: 'pembinaan',
          label: 'Pembinaan',
          isActive: windowFilter === 'home' && homeSubFilter === 'pembinaan',
          locked: !canAccessHomeSubFilter('pembinaan'),
          onSelect: () => handleSelectHomeSub('pembinaan'),
        },
        {
          id: 'hero',
          label: 'Logo & Brand Ambassador',
          isActive: windowFilter === 'home' && homeSubFilter === 'hero',
          locked: !canAccessHomeSubFilter('hero'),
          onSelect: () => handleSelectHomeSub('hero'),
        },
      ],
    },
    {
      id: 'profil',
      label: '2. Profil',
      icon: UserCheck,
      locked: !canAccessMainWindow('profil'),
    },
    {
      id: 'agenda',
      label: '3. Agenda',
      icon: Calendar,
      locked: !canAccessMainWindow('agenda'),
    },
    {
      id: 'berita',
      label: '4. Berita Terkini',
      icon: Newspaper,
      locked: !canAccessMainWindow('berita'),
    },
    {
      id: 'konten',
      label: '5. Konten',
      icon: Layers,
      locked: !canAccessMainWindow('konten'),
      subItems: [
        {
          id: 'event',
          label: 'Event',
          isActive: windowFilter === 'konten' && kontenSubFilter === 'event',
          locked: !canAccessMainWindow('konten'),
          onSelect: () => {
            if (!canAccessMainWindow('konten')) return handleSelectMainWindow('konten');
            setWindowFilter('konten');
            setKontenSubFilter('event');
            setNewContentCategory('event');
          },
        },
        {
          id: 'artikel',
          label: 'Artikel',
          isActive: windowFilter === 'konten' && kontenSubFilter === 'artikel',
          locked: !canAccessMainWindow('konten'),
          onSelect: () => {
            if (!canAccessMainWindow('konten')) return handleSelectMainWindow('konten');
            setWindowFilter('konten');
            setKontenSubFilter('artikel');
            setNewContentCategory('artikel');
          },
        },
        {
          id: 'lomba',
          label: 'Lomba',
          isActive: windowFilter === 'konten' && kontenSubFilter === 'lomba',
          locked: !canAccessMainWindow('konten'),
          onSelect: () => {
            if (!canAccessMainWindow('konten')) return handleSelectMainWindow('konten');
            setWindowFilter('konten');
            setKontenSubFilter('lomba');
            setNewContentCategory('lomba');
          },
        },
        {
          id: 'rekaman',
          label: 'Rekaman',
          isActive: windowFilter === 'konten' && kontenSubFilter === 'rekaman',
          locked: !canAccessMainWindow('konten'),
          onSelect: () => {
            if (!canAccessMainWindow('konten')) return handleSelectMainWindow('konten');
            setWindowFilter('konten');
            setKontenSubFilter('rekaman');
            setNewContentCategory('rekaman');
          },
        },
        {
          id: 'upload',
          label: 'Galeri & Upload Perangkat',
          isActive: windowFilter === 'konten' && kontenSubFilter === 'upload',
          locked: !canAccessMainWindow('konten'),
          onSelect: () => {
            if (!canAccessMainWindow('konten')) return handleSelectMainWindow('konten');
            setWindowFilter('konten');
            setKontenSubFilter('upload');
          },
        },
      ],
    },
    {
      id: 'pelayanan',
      label: '6. Pelayanan',
      icon: Briefcase,
      locked: !canAccessMainWindow('pelayanan'),
      subItems: [
        {
          id: 'Media Partner',
          label: 'Media Partner',
          isActive: windowFilter === 'pelayanan' && pelayananSubFilter === 'Media Partner',
          locked: !canAccessMainWindow('pelayanan'),
          onSelect: () => {
            if (!canAccessMainWindow('pelayanan')) return handleSelectMainWindow('pelayanan');
            setWindowFilter('pelayanan');
            setPelayananSubFilter('Media Partner');
            setNewOrderService('Media Partner');
          },
        },
        {
          id: 'Peminjaman Barang',
          label: 'Peminjaman Barang',
          isActive: windowFilter === 'pelayanan' && pelayananSubFilter === 'Peminjaman Barang',
          locked: !canAccessMainWindow('pelayanan'),
          onSelect: () => {
            if (!canAccessMainWindow('pelayanan')) return handleSelectMainWindow('pelayanan');
            setWindowFilter('pelayanan');
            setPelayananSubFilter('Peminjaman Barang');
            setNewOrderService('Peminjaman Barang');
          },
        },
        {
          id: 'Entertainment',
          label: 'Entertainment',
          isActive: windowFilter === 'pelayanan' && pelayananSubFilter === 'Entertainment',
          locked: !canAccessMainWindow('pelayanan'),
          onSelect: () => {
            if (!canAccessMainWindow('pelayanan')) return handleSelectMainWindow('pelayanan');
            setWindowFilter('pelayanan');
            setPelayananSubFilter('Entertainment');
            setNewOrderService('Entertainment');
          },
        },
      ],
    },
    {
      id: 'dashboard_bawah',
      label: '7. Dashboard Bawah',
      icon: MapPin,
      locked: !canAccessMainWindow('dashboard_bawah'),
      subItems: [
        {
          id: 'alamat',
          label: 'Alamat',
          isActive: windowFilter === 'dashboard_bawah' && bawahSubFilter === 'alamat',
          locked: !canAccessMainWindow('dashboard_bawah'),
          onSelect: () => {
            if (!canAccessMainWindow('dashboard_bawah')) return handleSelectMainWindow('dashboard_bawah');
            setWindowFilter('dashboard_bawah');
            setBawahSubFilter('alamat');
          },
        },
        {
          id: 'cp',
          label: 'Contact Person',
          isActive: windowFilter === 'dashboard_bawah' && bawahSubFilter === 'cp',
          locked: !canAccessMainWindow('dashboard_bawah'),
          onSelect: () => {
            if (!canAccessMainWindow('dashboard_bawah')) return handleSelectMainWindow('dashboard_bawah');
            setWindowFilter('dashboard_bawah');
            setBawahSubFilter('cp');
          },
        },
        {
          id: 'email',
          label: 'Email',
          isActive: windowFilter === 'dashboard_bawah' && bawahSubFilter === 'email',
          locked: !canAccessMainWindow('dashboard_bawah'),
          onSelect: () => {
            if (!canAccessMainWindow('dashboard_bawah')) return handleSelectMainWindow('dashboard_bawah');
            setWindowFilter('dashboard_bawah');
            setBawahSubFilter('email');
          },
        },
        {
          id: 'medsos',
          label: 'Media Sosial',
          isActive: windowFilter === 'dashboard_bawah' && bawahSubFilter === 'medsos',
          locked: !canAccessMainWindow('dashboard_bawah'),
          onSelect: () => {
            if (!canAccessMainWindow('dashboard_bawah')) return handleSelectMainWindow('dashboard_bawah');
            setWindowFilter('dashboard_bawah');
            setBawahSubFilter('medsos');
          },
        },
        {
          id: 'gmaps',
          label: 'Lokasi G Maps',
          isActive: windowFilter === 'dashboard_bawah' && bawahSubFilter === 'gmaps',
          locked: !canAccessMainWindow('dashboard_bawah'),
          onSelect: () => {
            if (!canAccessMainWindow('dashboard_bawah')) return handleSelectMainWindow('dashboard_bawah');
            setWindowFilter('dashboard_bawah');
            setBawahSubFilter('gmaps');
          },
        },
      ],
    },
    {
      id: 'akun_biodata',
      label: isDeveloper ? '8. Akun, Biodata & Akses' : '8. Biodata & Profil Admin',
      icon: UserCog,
      locked: false,
    },
  ];

  const renderOrderTableSection = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-6">
          {(
            [
              { id: 'all', label: 'All orders' },
              { id: 'Diterima', label: 'Dispatch' },
              { id: 'Menunggu', label: 'Pending' },
              { id: 'Selesai', label: 'Completed' },
            ] as const
          ).map((t) => {
            const active = orderTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setOrderTab(t.id);
                  setCurrentPage(1);
                }}
                className={`relative pb-2.5 text-xs font-bold transition-colors cursor-pointer ${
                  active ? 'text-[#0047CC]' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t.label}
                {active && (
                  <motion.span
                    layoutId="orderStatusActiveUnderline"
                    transition={smoothSpringTransition}
                    className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-[#0047CC] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-600 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-20 bg-transparent text-xs font-semibold text-slate-700 focus:outline-none"
              aria-label="Tanggal Mulai"
            />
          </div>
          <span className="text-slate-400 text-[11px] font-medium">To</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-600 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-20 bg-transparent text-xs font-semibold text-slate-700 focus:outline-none"
              aria-label="Tanggal Akhir"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingOrderId(null);
              setNewOrderName('');
              setNewOrderPhone('');
              setNewOrderEmail('');
              setNewOrderMessage('');
              setIsAddOrderOpen(!isAddOrderOpen);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#0047CC] hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAddOrderOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={smoothSpringTransition}
            onSubmit={handleSaveOrder}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                {editingOrderId ? 'Edit Data Permohonan Layanan' : 'Tambah Data Permohonan Layanan Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOrderOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Tutup ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                required
                placeholder="Nama Lengkap *"
                value={newOrderName}
                onChange={(e) => setNewOrderName(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0047CC]"
              />
              <input
                type="text"
                placeholder="Nomor WhatsApp"
                value={newOrderPhone}
                onChange={(e) => setNewOrderPhone(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0047CC]"
              />
              <input
                type="email"
                placeholder="Alamat Email"
                value={newOrderEmail}
                onChange={(e) => setNewOrderEmail(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0047CC]"
              />
              <select
                value={newOrderService}
                onChange={(e) => setNewOrderService(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0047CC]"
              >
                <option value="Media Partner">Media Partner</option>
                <option value="Peminjaman Barang">Peminjaman Barang</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Pendaftaran Anggota">Pendaftaran Anggota</option>
                <option value="Program Pembinaan">Program Pembinaan</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Catatan / Keperluan Layanan..."
                value={newOrderMessage}
                onChange={(e) => setNewOrderMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0047CC]"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shrink-0"
              >
                {editingOrderId ? 'Simpan Perubahan' : 'Simpan Data'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="hidden md:grid md:grid-cols-12 items-center px-5 py-2.5 text-[11px] font-bold text-slate-400">
        <div className="col-span-1 flex items-center gap-1">
          <span>ID</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Layanan / Keperluan</div>
        <div className="col-span-2 flex items-center gap-1">
          <span>Date</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        <div className="col-span-1">Kategori</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      <div className="space-y-2">
        {paginatedSubmissions.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            Tidak ada data permohonan yang sesuai dengan filter pencarian.
          </div>
        ) : (
          paginatedSubmissions.map((sub, idx) => {
            const isSelected = selectedRowId === sub.id;
            const isExpanded = expandedRowId === sub.id;
            const displayId = sub.orderCode || `#${2632 + idx}`;
            const avatars = [
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
              'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
            ];

            return (
              <motion.div
                key={sub.id}
                layout
                transition={smoothSpringTransition}
                className="space-y-1.5"
              >
                <div
                  onClick={() => setSelectedRowId(sub.id)}
                  className={`eproduct-table-row grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-0 px-5 py-3.5 rounded-xl cursor-pointer ${
                    isSelected
                      ? 'eproduct-row-selected'
                      : 'bg-white border border-slate-100 text-slate-700'
                  }`}
                >
                  <div
                    className={`col-span-1 text-xs font-extrabold tabular-nums ${
                      isSelected ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {displayId}
                  </div>

                  <div className="col-span-3 flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={avatars[idx % avatars.length]}
                      alt={sub.name}
                      className={`w-7 h-7 rounded-full object-cover shrink-0 ${
                        isSelected ? 'ring-2 ring-white/80' : 'ring-1 ring-slate-200'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold truncate ${
                        isSelected ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {sub.name}
                    </span>
                  </div>

                  <div
                    className={`col-span-3 text-xs truncate pr-4 ${
                      isSelected ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {sub.message}
                  </div>

                  <div
                    className={`col-span-2 text-xs font-medium tabular-nums ${
                      isSelected ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {sub.date}
                  </div>

                  <div
                    className={`col-span-1 text-[11px] font-bold ${
                      isSelected ? 'text-[#f5c542]' : 'text-slate-700'
                    }`}
                  >
                    {sub.service}
                  </div>

                  <div className="col-span-1">
                    {sub.status === 'Menunggu' && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                          isSelected ? 'text-white' : 'text-rose-500'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-rose-300' : 'bg-rose-500'
                          }`}
                        ></span>
                        Pending
                      </span>
                    )}
                    {sub.status === 'Diterima' && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                          isSelected ? 'text-[#f5c542]' : 'text-emerald-600'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-[#f5c542]' : 'bg-emerald-500'
                          }`}
                        ></span>
                        Dispatch
                      </span>
                    )}
                    {sub.status === 'Selesai' && (
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                          isSelected ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? 'bg-blue-200' : 'bg-slate-400'
                          }`}
                        ></span>
                        Completed
                      </span>
                    )}
                  </div>

                  <div
                    className="col-span-1 flex items-center justify-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleEditOrderClick(sub)}
                      title="Edit Data"
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? 'text-blue-100 hover:text-white hover:bg-white/15'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedRowId(isExpanded ? null : sub.id)}
                      title="Detail & Ubah Status"
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        isSelected
                          ? 'text-blue-100 hover:text-white hover:bg-white/15'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={smoothSpringTransition}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs overflow-hidden"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900">
                          Kategori Layanan: <span className="text-[#0047CC]">{sub.service}</span> • WhatsApp:{' '}
                          <span className="font-mono">{sub.phone}</span> • Email:{' '}
                          <span className="font-mono">{sub.email}</span>
                        </p>
                        <p className="text-slate-600">{sub.message}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <select
                          value={sub.status}
                          onChange={(e) =>
                            handleUpdateSubmissionStatus(
                              sub.id,
                              e.target.value as 'Menunggu' | 'Diterima' | 'Selesai'
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                        >
                          <option value="Menunggu">Pending</option>
                          <option value="Diterima">Dispatch</option>
                          <option value="Selesai">Completed</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleEditOrderClick(sub)}
                          className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSubmission(sub.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Hapus Data"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-between pt-3 text-xs text-slate-400">
        <div>
          Showing{' '}
          <span className="font-bold text-slate-700 tabular-nums">
            0{filteredSubmissions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–0
            {Math.min(currentPage * itemsPerPage, filteredSubmissions.length)}
          </span>{' '}
          of <span className="font-bold text-slate-700 tabular-nums">{filteredSubmissions.length}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {[1, 2, 3].map((pageNum) => {
            const isCurrent = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-bold tabular-nums transition-all cursor-pointer ${
                  isCurrent ? 'bg-[#0047CC] text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaUploaderSection = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#02182c]">
              Pusat Upload Galeri, Foto Logo, Brand Ambassador, Anggota &amp; Publikasi dari Perangkat
            </h3>
            <p className="text-xs text-slate-500">
              Unggah langsung dari penyimpanan perangkat yang sedang digunakan (PNG, JPG, GIF, DOC, DOCX, PDF, MP3, MP4, dll) atau melalui Link URL.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setUploadMode('device')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                uploadMode === 'device' ? 'bg-[#0047CC] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              <Upload className="w-3.5 h-3.5" /> Penyimpanan Perangkat
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('link')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                uploadMode === 'link' ? 'bg-[#0047CC] text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" /> Melalui Link URL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Judul / Nama Foto / Dokumen (Opsional)"
            value={mediaTitleInput}
            onChange={(e) => setMediaTitleInput(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs"
          />
          <input
            type="text"
            placeholder="Kategori (contoh: Galeri Kegiatan / Dokumentasi MTQ / Modul)"
            value={mediaTargetSection}
            onChange={(e) => setMediaTargetSection(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs"
          />
        </div>

        {uploadMode === 'device' ? (
          <div
            onClick={() => universalFileInputRef.current?.click()}
            className="p-7 rounded-2xl bg-white border-2 border-dashed border-[#0047CC]/40 hover:border-[#0047CC] hover:bg-blue-50/30 text-center cursor-pointer transition-all space-y-2"
          >
            <input
              ref={universalFileInputRef}
              type="file"
              multiple
              accept=".doc,.docx,.pdf,.png,.jpg,.jpeg,.gif,.webp,.svg,.mp3,.wav,.ogg,.mp4,.webm,.ppt,.pptx,.xls,.xlsx,image/*,audio/*,video/*,application/*"
              onChange={handleUniversalDeviceUpload}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0047CC] flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-extrabold text-[#02182c]">
              Klik untuk memilih foto / file dari penyimpanan perangkat yang sedang digunakan
            </p>
            <p className="text-xs text-slate-400">
              Setelah diunggah, Anda juga bisa langsung menjadikannya Foto Logo Website, Foto Brand Ambassador, Background Hero, Sejarah, atau Profil dengan 1 klik.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUniversalLinkUpload} className="flex flex-col sm:flex-row gap-3">
            <select
              value={mediaTypeSelect}
              onChange={(e) =>
                setMediaTypeSelect(e.target.value as 'image' | 'video' | 'audio' | 'document')
              }
              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold"
            >
              <option value="image">Gambar / Foto Galeri (PNG / JPG / GIF)</option>
              <option value="document">Dokumen (PDF / Word / Drive)</option>
              <option value="audio">Audio (MP3 / Murottal)</option>
              <option value="video">Video (MP4 / YouTube)</option>
            </select>
            <input
              type="url"
              required
              placeholder="Tempelkan link URL file / gambar / dokumen / video di sini..."
              value={mediaLinkUrl}
              onChange={(e) => setMediaLinkUrl(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
            >
              Simpan Link
            </button>
          </form>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          Daftar Galeri &amp; Berkas Tersimpan ({(draftConfig.mediaRepository || []).length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(draftConfig.mediaRepository || []).map((med) => (
            <motion.div
              key={med.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={smoothSpringTransition}
              className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047CC] flex items-center justify-center shrink-0">
                    {med.type === 'image' && <ImageIcon className="w-5 h-5" />}
                    {med.type === 'audio' && <Music className="w-5 h-5" />}
                    {med.type === 'video' && <Video className="w-5 h-5" />}
                    {med.type === 'document' && <FileText className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[#02182c] truncate">{med.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {med.sectionTarget} • {med.sizeLabel} • {med.uploadedAt}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteMediaItem(med.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                  title="Hapus File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {med.type === 'image' && (
                <div className="space-y-2">
                  <img
                    src={med.url}
                    alt={med.name}
                    className="w-full h-32 object-cover rounded-xl border border-slate-100"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleApplyMediaToSection(med.url, 'logo')}
                      className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold cursor-pointer"
                    >
                      Jadikan Logo Website
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyMediaToSection(med.url, 'ambassador')}
                      className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold cursor-pointer"
                    >
                      Foto Brand Ambassador
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyMediaToSection(med.url, 'hero')}
                      className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-[10px] font-bold cursor-pointer"
                    >
                      Background Hero
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyMediaToSection(med.url, 'sejarah')}
                      className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-[10px] font-bold cursor-pointer"
                    >
                      Foto Sejarah
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyMediaToSection(med.url, 'profil')}
                      className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-[10px] font-bold cursor-pointer"
                    >
                      Foto Profil
                    </button>
                  </div>
                </div>
              )}

              {med.type === 'audio' && <audio controls src={med.url} className="w-full h-8" />}

              {med.type === 'video' && (
                <video controls src={med.url} className="w-full h-36 rounded-xl bg-black" />
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <span className="text-slate-400 font-mono truncate max-w-[160px]">{med.mimeType}</span>
                <a
                  href={med.url}
                  download={med.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0047CC] hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Buka / Unduh
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="eproduct-dashboard-backdrop">
      <div className="eproduct-app-shell">
        <aside className={`eproduct-sidebar ${!isSidebarMenuVisible ? 'sidebar-collapsed' : ''}`}>
          <div className="overflow-y-auto max-h-[calc(100vh-140px)]">
            <div
              className={`pt-6 pb-4 flex items-center ${
                isSidebarMenuVisible ? 'px-5 justify-between' : 'px-0 justify-center'
              }`}
            >
              <AnimatePresence mode="wait">
                {isSidebarMenuVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-2.5 min-w-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f5c542] text-[#02182c] flex items-center justify-center font-serif font-bold text-lg shadow-xs shrink-0 overflow-hidden">
                      {draftConfig.brandLogoUrl ? (
                        <img
                          src={draftConfig.brandLogoUrl}
                          alt={draftConfig.brandTitle}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        'ق'
                      )}
                    </div>
                    <div className="truncate">
                      <span className="text-sm font-extrabold tracking-tight text-white block leading-none">
                        UPTQ BANDUNG
                      </span>
                      <span
                        className={`text-[9px] font-bold tracking-wider uppercase block mt-0.5 ${
                          isDeveloper ? 'text-[#f5c542]' : 'text-emerald-300'
                        }`}
                      >
                        {isDeveloper ? 'Developer' : 'Admin'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setIsSidebarMenuVisible(!isSidebarMenuVisible)}
                title={
                  isSidebarMenuVisible
                    ? 'Klik Garis Tiga untuk menyembunyikan (menutup) menu & tombol bawah'
                    : 'Klik Garis Tiga untuk memunculkan (membuka) menu & tombol bawah'
                }
                aria-label="Toggle buka tutup keterangan menu sidebar"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <nav
              className={`mt-1 space-y-1 ${isSidebarMenuVisible ? 'pl-3.5' : 'px-2'}`}
              aria-label="Filter Jendela Admin"
            >
              {sidebarWindowFilters.map((item) => {
                const Icon = item.icon;
                const isActive = windowFilter === item.id;
                const isLocked = Boolean(item.locked);
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectMainWindow(item.id)}
                      title={
                        !isSidebarMenuVisible
                          ? `${item.label}${isLocked ? ' (Khusus Developer)' : ''}`
                          : undefined
                      }
                      className={`eproduct-nav-item ${isActive ? 'active' : ''} ${
                        isLocked ? 'opacity-60' : ''
                      }`}
                    >
                      {isActive && isSidebarMenuVisible && (
                        <>
                          <span className="eproduct-curve-top"></span>
                          <span className="eproduct-curve-bottom"></span>
                        </>
                      )}
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                          isActive ? 'text-[#0047CC] scale-110' : 'text-blue-200'
                        }`}
                      />
                      {isSidebarMenuVisible && (
                        <span className="truncate flex-1 text-left">{item.label}</span>
                      )}
                      {isSidebarMenuVisible && isLocked && (
                        <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0 mr-2" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isSidebarMenuVisible && isActive && item.subItems && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={smoothSpringTransition}
                          className="ml-6 mr-3 my-1.5 pl-3 border-l border-white/25 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={sub.onSelect}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center justify-between ${
                                sub.isActive
                                  ? 'bg-[#f5c542] text-[#02182c] shadow-xs translate-x-0.5'
                                  : sub.locked
                                  ? 'text-blue-200/45 hover:bg-white/5'
                                  : 'text-blue-100/85 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <span>- {sub.label}</span>
                              {sub.locked && <Lock className="w-3 h-3 text-amber-300 shrink-0" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            {isSidebarMenuVisible ? (
              <motion.div
                key="sidebar-footer-open"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
                className="px-5 pb-6 pt-3 space-y-2 border-t border-white/10"
              >
                <button
                  type="button"
                  onClick={onBackToWebsite}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/12 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#f5c542]" />
                  <span>Lihat Website</span>
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/35 border border-rose-300/25 text-rose-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Sesi</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="sidebar-footer-closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pb-6 flex flex-col items-center gap-2.5"
              >
                <button
                  type="button"
                  onClick={() => setIsSidebarMenuVisible(true)}
                  title="Klik untuk membuka Lihat Website & Keluar Sesi"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        <div className="eproduct-workspace">
          <main className="space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-tight">
                    {windowFilter === 'dashboard_awal' && 'Dashboard Awal'}
                    {windowFilter === 'home' && '1. Home & Organisasi'}
                    {windowFilter === 'profil' && '2. Profil'}
                    {windowFilter === 'agenda' && '3. Agenda'}
                    {windowFilter === 'berita' && '4. Berita Terkini'}
                    {windowFilter === 'konten' && '5. Konten & Galeri'}
                    {windowFilter === 'pelayanan' && '6. Pelayanan'}
                    {windowFilter === 'dashboard_bawah' && '7. Dashboard Bawah'}
                    {windowFilter === 'akun_biodata' &&
                      (isDeveloper
                        ? '8. Manajemen Akun, Biodata, Password & Pemantauan'
                        : '8. Biodata Diri & Foto Profil Admin')}
                  </h1>
                </div>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {windowFilter === 'dashboard_awal' &&
                    `${filteredSubmissions.length} orders found • Upload cepat Logo, Brand Ambassador, Anggota, Galeri & Publikasi`}
                  {windowFilter === 'home' &&
                    (isDeveloper
                      ? 'Kelola Sejarah, Visi Misi, Kepengurusan & Keanggotaan, Bidang, Pembinaan, Logo & Brand Ambassador'
                      : 'Kelola Keanggotaan & Kepengurusan, Bidang Organisasi, serta Program Pembinaan')}
                  {windowFilter === 'profil' && 'Kelola informasi & upload foto Profil UPTQ dari perangkat'}
                  {windowFilter === 'agenda' && `${agendas.length} jadwal kegiatan & agenda terdekat`}
                  {windowFilter === 'berita' && `${draftConfig.newsList.length} publikasi berita terkini keluarga besar UPTQ`}
                  {windowFilter === 'konten' &&
                    `${contents.length} publikasi kegiatan (Event, Artikel, Lomba, Rekaman) & Galeri Perangkat`}
                  {windowFilter === 'pelayanan' &&
                    'Kelola Media Partner, Peminjaman Barang, Entertainment & permohonan masuk'}
                  {windowFilter === 'dashboard_bawah' &&
                    'Kelola Alamat, Contact Person, Email, Media Sosial & Lokasi Google Maps'}
                  {windowFilter === 'akun_biodata' &&
                    (isDeveloper
                      ? 'Ubah biodata & foto Developer, serta edit/hapus/ganti biodata, foto & akses login (Username/Password) Admin'
                      : 'Ubah biodata diri Admin & upload foto profil dari perangkat (Password diatur oleh Developer)')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSaveSiteConfig()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    aria-label="Notifikasi"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-xs space-y-2.5"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900 pb-2 border-b border-slate-100">
                          <span>Notifikasi Permohonan</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#0047CC]">
                            {submissions.filter((s) => s.status === 'Menunggu').length} Pending
                          </span>
                        </div>
                        {submissions.slice(0, 3).map((s) => (
                          <div
                            key={s.id}
                            onClick={() => {
                              if (isDeveloper) {
                                setWindowFilter('dashboard_awal');
                              } else {
                                setWindowFilter('home');
                                setHomeSubFilter('kepengurusan');
                              }
                              setSelectedRowId(s.id);
                              setShowNotifications(false);
                            }}
                            className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <p className="font-bold text-slate-800">{s.name}</p>
                            <p className="text-slate-500 truncate">
                              {s.service} — {s.date}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {showSearchBox ? (
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Cari data..."
                      className="bg-transparent text-xs text-slate-700 focus:outline-none w-28 sm:w-40"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowSearchBox(false);
                        setSearchQuery('');
                      }}
                      className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSearchBox(true)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                    aria-label="Cari"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <img
                      src={
                        activeAccountProfile.avatarUrl ||
                        (isDeveloper ? '/developer.png' : '/admin.png')
                      }
                      alt={activeAccountProfile.fullName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
                    />
                    <div className="hidden md:block text-left pr-1">
                      <p className="text-xs font-extrabold text-slate-800 leading-none truncate max-w-[130px]">
                        {activeAccountProfile.fullName}
                      </p>
                      <p className="text-[10px] font-bold text-[#0047CC] mt-0.5">
                        {isDeveloper ? 'Developer' : 'Admin'}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 text-xs"
                      >
                        <div className="px-3 py-2 border-b border-slate-100">
                          <p className="font-extrabold text-slate-900">{activeAccountProfile.fullName}</p>
                          <p className="text-[11px] text-slate-500 truncate">{activeAccountProfile.roleTitle}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileDropdown(false);
                            setWindowFilter('akun_biodata');
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-50 font-bold text-[#0047CC] flex items-center gap-2 mt-1 cursor-pointer"
                        >
                          <UserCog className="w-3.5 h-3.5" />{' '}
                          {isDeveloper ? 'Kelola Biodata & Akses Admin' : 'Edit Biodata & Upload Foto Diri'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileDropdown(false);
                            onBackToWebsite();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2 cursor-pointer"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#0047CC]" /> Lihat Website Utama
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowProfileDropdown(false);
                            onLogout();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 font-semibold text-rose-600 flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Keluar Sesi
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </header>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {sidebarWindowFilters.map((wf) => {
                  const active = windowFilter === wf.id;
                  const locked = Boolean(wf.locked);
                  return (
                    <button
                      key={wf.id}
                      type="button"
                      onClick={() => handleSelectMainWindow(wf.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        active
                          ? 'bg-[#0047CC] text-white shadow-xs scale-[1.02]'
                          : locked
                          ? 'bg-slate-100 text-slate-400 border border-slate-200/60'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
                      }`}
                    >
                      <span>{wf.label}</span>
                      {locked && <Lock className="w-3 h-3 text-amber-600" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {windowFilter === 'home' && (
                  <motion.div
                    key="sub-home"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/80"
                  >
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase px-2">
                      Sub-Jendela 1. Home:
                    </span>
                    {(
                      [
                        { id: 'sejarah', label: '- Sejarah' },
                        { id: 'visimisi', label: '- Visi Misi' },
                        { id: 'kepengurusan', label: '- Kepengurusan & Keanggotaan' },
                        { id: 'bidang', label: '- Bidang Organisasi' },
                        { id: 'pembinaan', label: '- Pembinaan' },
                        { id: 'hero', label: '📸 Logo Website & Brand Ambassador Atas' },
                      ] as const
                    ).map((sub) => {
                      const subLocked = !canAccessHomeSubFilter(sub.id);
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSelectHomeSub(sub.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            homeSubFilter === sub.id
                              ? 'bg-[#02182c] text-[#f5c542] shadow-xs'
                              : subLocked
                              ? 'bg-slate-100 text-slate-400 border border-slate-200/60'
                              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {subLocked && <Lock className="w-3 h-3 text-amber-600" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {windowFilter === 'konten' && (
                  <motion.div
                    key="sub-konten"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/80"
                  >
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase px-2">
                      Sub-Jendela 5. Konten:
                    </span>
                    {(
                      [
                        { id: 'all', label: 'Semua Publikasi' },
                        { id: 'event', label: '- Event' },
                        { id: 'artikel', label: '- Artikel' },
                        { id: 'lomba', label: '- Lomba' },
                        { id: 'rekaman', label: '- Rekaman' },
                        { id: 'upload', label: '📁 Galeri & Upload Penyimpanan Perangkat' },
                      ] as const
                    ).map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setKontenSubFilter(sub.id);
                          if (sub.id === 'event' || sub.id === 'artikel' || sub.id === 'lomba' || sub.id === 'rekaman') {
                            setNewContentCategory(sub.id);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          kontenSubFilter === sub.id
                            ? 'bg-[#02182c] text-[#f5c542] shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {windowFilter === 'pelayanan' && (
                  <motion.div
                    key="sub-pelayanan"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/80"
                  >
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase px-2">
                      Sub-Jendela 6. Pelayanan:
                    </span>
                    {(
                      [
                        { id: 'all', label: 'Semua Pelayanan' },
                        { id: 'Media Partner', label: '- Media Partner' },
                        { id: 'Peminjaman Barang', label: '- Peminjaman Barang' },
                        { id: 'Entertainment', label: '- Entertainment' },
                      ] as const
                    ).map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => {
                          setPelayananSubFilter(sub.id);
                          if (sub.id !== 'all') setNewOrderService(sub.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          pelayananSubFilter === sub.id
                            ? 'bg-[#02182c] text-[#f5c542] shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {windowFilter === 'dashboard_bawah' && (
                  <motion.div
                    key="sub-bawah"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/80"
                  >
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase px-2">
                      Sub-Jendela 7. Dashboard Bawah:
                    </span>
                    {(
                      [
                        { id: 'alamat', label: '- Alamat' },
                        { id: 'cp', label: '- Contact Person' },
                        { id: 'email', label: '- Email' },
                        { id: 'medsos', label: '- Media Sosial' },
                        { id: 'gmaps', label: '- Lokasi G Maps' },
                      ] as const
                    ).map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setBawahSubFilter(sub.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          bawahSubFilter === sub.id
                            ? 'bg-[#02182c] text-[#f5c542] shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {actionNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{actionNotice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActionNotice('')}
                    className="text-emerald-600 hover:text-emerald-900 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${windowFilter}-${homeSubFilter}-${kontenSubFilter}-${pelayananSubFilter}-${bawahSubFilter}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={smoothSpringTransition}
              >
                {windowFilter === 'dashboard_awal' && (
                  <div className="space-y-8">
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-amber-50/60 border border-blue-200/70 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-extrabold text-[#02182c] flex items-center gap-2">
                            <Camera className="w-4 h-4 text-[#0047CC]" />
                            <span>
                              Upload Cepat dari Penyimpanan Perangkat (Logo, Brand Ambassador, Anggota, Galeri &amp; Publikasi)
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500">
                            Pilih langsung foto dari penyimpanan perangkat yang sedang digunakan untuk mengganti tampilan website secara instan.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <label className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#0047CC] transition-all cursor-pointer flex items-center gap-3 shadow-2xs">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDirectConfigImageUpload(e, 'brandLogoUrl', 'Logo Website')}
                            className="hidden"
                          />
                          <div className="w-11 h-11 rounded-xl bg-amber-100 text-[#02182c] flex items-center justify-center font-serif font-bold text-lg shrink-0 overflow-hidden border border-amber-300">
                            {draftConfig.brandLogoUrl ? (
                              <img
                                src={draftConfig.brandLogoUrl}
                                alt="Logo"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              'ق'
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-extrabold text-[#02182c] block truncate">
                              Foto Logo Website
                            </span>
                            <span className="text-[11px] text-[#0047CC] font-bold flex items-center gap-1 mt-0.5">
                              <Upload className="w-3 h-3" /> Upload Perangkat
                            </span>
                          </div>
                        </label>

                        <label className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#0047CC] transition-all cursor-pointer flex items-center gap-3 shadow-2xs">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleDirectConfigImageUpload(e, 'heroAmbassadorImage', 'Brand Ambassador Atas')
                            }
                            className="hidden"
                          />
                          <img
                            src={draftConfig.heroAmbassadorImage}
                            alt="Brand Ambassador"
                            className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-extrabold text-[#02182c] block truncate">
                              Brand Ambassador Atas
                            </span>
                            <span className="text-[11px] text-[#0047CC] font-bold flex items-center gap-1 mt-0.5">
                              <Upload className="w-3 h-3" /> Upload Perangkat
                            </span>
                          </div>
                        </label>

                        <div
                          onClick={() => {
                            setWindowFilter('home');
                            setHomeSubFilter('kepengurusan');
                          }}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#0047CC] transition-all cursor-pointer flex items-center gap-3 shadow-2xs"
                        >
                          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0047CC] flex items-center justify-center shrink-0">
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-extrabold text-[#02182c] block truncate">
                              Foto Anggota ({draftConfig.leaders.length})
                            </span>
                            <span className="text-[11px] text-[#0047CC] font-bold flex items-center gap-1 mt-0.5">
                              <Upload className="w-3 h-3" /> Kelola &amp; Upload →
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            setWindowFilter('konten');
                            setKontenSubFilter('upload');
                          }}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#0047CC] transition-all cursor-pointer flex items-center gap-3 shadow-2xs"
                        >
                          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-extrabold text-[#02182c] block truncate">
                              Galeri &amp; Publikasi Kegiatan
                            </span>
                            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                              <Upload className="w-3 h-3" /> Upload Perangkat →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {renderOrderTableSection()}
                  </div>
                )}

                {windowFilter === 'home' && (
                  <div className="space-y-6">
                    {homeSubFilter === 'sejarah' && (
                      <form
                        onSubmit={handleSaveSiteConfig}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-extrabold text-[#02182c]">
                            1. Home — Edit Bagian Sejarah UPTQ
                          </h3>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                          >
                            Simpan Sejarah
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Label Kecil (Eyebrow)</label>
                            <input
                              type="text"
                              value={draftConfig.historyEyebrow}
                              onChange={(e) => setDraftConfig({ ...draftConfig, historyEyebrow: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Judul Sejarah</label>
                            <input
                              type="text"
                              value={draftConfig.historyTitle}
                              onChange={(e) => setDraftConfig({ ...draftConfig, historyTitle: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Kata Sorotan (Highlight)</label>
                            <input
                              type="text"
                              value={draftConfig.historyHighlight}
                              onChange={(e) => setDraftConfig({ ...draftConfig, historyHighlight: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 block mb-1">Paragraf Sejarah 1</label>
                          <textarea
                            rows={3}
                            value={draftConfig.historyP1}
                            onChange={(e) => setDraftConfig({ ...draftConfig, historyP1: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 block mb-1">Paragraf Sejarah 2</label>
                          <textarea
                            rows={3}
                            value={draftConfig.historyP2}
                            onChange={(e) => setDraftConfig({ ...draftConfig, historyP2: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                          />
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                          <label className="text-xs font-bold text-slate-600 block">
                            Foto Objek Orang Brand Ambassador — Bagian Sejarah (Link atau Upload dari Perangkat)
                          </label>
                          <div className="flex items-center gap-3">
                            <img
                              src={draftConfig.historyMainImg}
                              alt="Brand Ambassador Sejarah"
                              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={draftConfig.historyMainImg}
                                onChange={(e) => setDraftConfig({ ...draftConfig, historyMainImg: e.target.value })}
                                placeholder="Link URL Foto Brand Ambassador Sejarah..."
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                              />
                              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-xs font-bold cursor-pointer">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Foto Brand Ambassador dari Perangkat</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleDirectConfigImageUpload(e, 'historyMainImg', 'Brand Ambassador Sejarah')
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                    {homeSubFilter === 'visimisi' && (
                      <form
                        onSubmit={handleSaveSiteConfig}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-extrabold text-[#02182c]">
                            1. Home — Edit Visi &amp; Misi Organisasi
                          </h3>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                          >
                            Simpan Visi &amp; Misi
                          </button>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 block mb-1">Teks Visi UPTQ</label>
                          <textarea
                            rows={3}
                            value={draftConfig.visionText}
                            onChange={(e) => setDraftConfig({ ...draftConfig, visionText: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600 block">
                            Daftar Misi (Bisa Ditambah, Diedit &amp; Dihapus)
                          </label>
                          {draftConfig.missions.map((m, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={m}
                                onChange={(e) => {
                                  const next = [...draftConfig.missions];
                                  next[idx] = e.target.value;
                                  setDraftConfig({ ...draftConfig, missions: next });
                                }}
                                className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const next = draftConfig.missions.filter((_, i) => i !== idx);
                                  setDraftConfig({ ...draftConfig, missions: next });
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              setDraftConfig({
                                ...draftConfig,
                                missions: [...draftConfig.missions, 'Misi baru organisasi UPTQ...'],
                              })
                            }
                            className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#0047CC] text-xs font-bold cursor-pointer"
                          >
                            + Tambah Poin Misi
                          </button>
                        </div>
                      </form>
                    )}

                    {homeSubFilter === 'kepengurusan' && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                          <h3 className="text-base font-extrabold text-[#02182c]">
                            1. Home — Tambah / Edit / Hapus Foto Anggota &amp; Kepengurusan (Bisa Upload dari Perangkat)
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Nama Pengurus / Anggota *"
                              value={newLeaderName}
                              onChange={(e) => setNewLeaderName(e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Jabatan (contoh: Ketua Umum / Anggota)"
                              value={newLeaderRole}
                              onChange={(e) => setNewLeaderRole(e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Jurusan / Fakultas"
                              value={newLeaderMajor}
                              onChange={(e) => setNewLeaderMajor(e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <input
                              type="text"
                              placeholder="Link Foto Anggota (atau pilih dari penyimpanan perangkat →)"
                              value={newLeaderImg}
                              onChange={(e) => setNewLeaderImg(e.target.value)}
                              className="flex-1 min-w-[200px] px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                            <label className="px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-[#0047CC] border border-blue-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Foto Anggota dari Perangkat</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  readFileFromDevice(file, (url) => {
                                    setNewLeaderImg(url);
                                    showNotification(`Foto anggota "${file.name}" siap ditambahkan!`);
                                  });
                                  e.target.value = '';
                                }}
                                className="hidden"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                if (!newLeaderName.trim()) return;
                                const newLd: LeaderItemData = {
                                  id: `ld-${Date.now()}`,
                                  name: newLeaderName,
                                  role: newLeaderRole || 'Pengurus Inti',
                                  major: newLeaderMajor || 'UIN Sunan Gunung Djati',
                                  img:
                                    newLeaderImg ||
                                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85',
                                };
                                const next = { ...draftConfig, leaders: [...draftConfig.leaders, newLd] };
                                setDraftConfig(next);
                                onUpdateSiteConfig(next);
                                setNewLeaderName('');
                                setNewLeaderRole('');
                                setNewLeaderMajor('');
                                setNewLeaderImg('');
                                showNotification('Data & foto pengurus/anggota berhasil ditambahkan!');
                              }}
                              className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer shrink-0"
                            >
                              + Tambah Anggota
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {draftConfig.leaders.map((ld, idx) => (
                            <div key={ld.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={ld.img}
                                  alt={ld.name}
                                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                                />
                                <div className="flex-1 min-w-0 space-y-1">
                                  <input
                                    type="text"
                                    value={ld.name}
                                    onChange={(e) => {
                                      const next = [...draftConfig.leaders];
                                      next[idx] = { ...ld, name: e.target.value };
                                      setDraftConfig({ ...draftConfig, leaders: next });
                                    }}
                                    className="w-full font-extrabold text-xs text-[#02182c] border-b border-slate-200 focus:outline-none py-0.5"
                                  />
                                  <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-[10px] font-bold cursor-pointer">
                                    <Upload className="w-3 h-3" />
                                    <span>Ganti Foto dari Perangkat</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        readFileFromDevice(file, (url) => {
                                          const next = [...draftConfig.leaders];
                                          next[idx] = { ...ld, img: url };
                                          const nextCfg = { ...draftConfig, leaders: next };
                                          setDraftConfig(nextCfg);
                                          onUpdateSiteConfig(nextCfg);
                                          showNotification(`Foto ${ld.name} berhasil diganti dari perangkat!`);
                                        });
                                        e.target.value = '';
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = {
                                      ...draftConfig,
                                      leaders: draftConfig.leaders.filter((item) => item.id !== ld.id),
                                    };
                                    setDraftConfig(next);
                                    onUpdateSiteConfig(next);
                                    showNotification('Data pengurus/anggota dihapus.');
                                  }}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={ld.role}
                                  onChange={(e) => {
                                    const next = [...draftConfig.leaders];
                                    next[idx] = { ...ld, role: e.target.value };
                                    setDraftConfig({ ...draftConfig, leaders: next });
                                  }}
                                  className="text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg"
                                />
                                <input
                                  type="text"
                                  value={ld.major}
                                  onChange={(e) => {
                                    const next = [...draftConfig.leaders];
                                    next[idx] = { ...ld, major: e.target.value };
                                    setDraftConfig({ ...draftConfig, leaders: next });
                                  }}
                                  className="text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 mt-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                            <div>
                              <h4 className="text-sm font-extrabold text-[#02182c]">
                                Manajemen Keanggotaan Keluarga Besar UPTQ UIN Bandung
                              </h4>
                              <p className="text-xs text-slate-500">
                                Kelola jumlah anggota aktif serta data pendaftar keanggotaan baru yang masuk dari website.
                              </p>
                            </div>
                            <form onSubmit={handleSaveStats} className="flex items-center gap-2">
                              <label className="text-xs font-bold text-slate-600">Total Anggota Aktif:</label>
                              <input
                                type="number"
                                value={editMembers}
                                onChange={(e) => setEditMembers(Number(e.target.value))}
                                className="w-24 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-[#02182c]"
                              />
                              <button
                                type="submit"
                                className="px-3.5 py-1.5 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                              >
                                Update Jumlah
                              </button>
                            </form>
                          </div>

                          {renderOrderTableSection()}
                        </div>
                      </div>
                    )}

                    {homeSubFilter === 'bidang' && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <h3 className="text-base font-extrabold text-[#02182c]">
                            1. Home — Tambah / Edit / Hapus Bidang Organisasi
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Nama Bidang Baru (contoh: Bidang Humas)"
                              value={newDivisionTitle}
                              onChange={(e) => setNewDivisionTitle(e.target.value)}
                              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Deskripsi Tugas Bidang..."
                              value={newDivisionDesc}
                              onChange={(e) => setNewDivisionDesc(e.target.value)}
                              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!newDivisionTitle.trim()) return;
                                const newDiv: DivisionItemData = {
                                  id: `div-${Date.now()}`,
                                  number: String(draftConfig.divisions.length + 1).padStart(2, '0'),
                                  title: newDivisionTitle,
                                  description: newDivisionDesc || 'Melaksanakan program kerja strategis bidang UPTQ.',
                                  linkText: 'Lihat program',
                                  linkHref: '#pembinaan',
                                };
                                const next = { ...draftConfig, divisions: [...draftConfig.divisions, newDiv] };
                                setDraftConfig(next);
                                onUpdateSiteConfig(next);
                                setNewDivisionTitle('');
                                setNewDivisionDesc('');
                                showNotification('Bidang baru berhasil ditambahkan!');
                              }}
                              className="px-4 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                            >
                              + Tambah Bidang
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {draftConfig.divisions.map((div, idx) => (
                            <div key={div.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                              <div className="flex items-center justify-between">
                                <input
                                  type="text"
                                  value={div.title}
                                  onChange={(e) => {
                                    const next = [...draftConfig.divisions];
                                    next[idx] = { ...div, title: e.target.value };
                                    setDraftConfig({ ...draftConfig, divisions: next });
                                  }}
                                  className="font-extrabold text-xs text-[#02182c] border-b border-slate-200 focus:outline-none flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = {
                                      ...draftConfig,
                                      divisions: draftConfig.divisions.filter((d) => d.id !== div.id),
                                    };
                                    setDraftConfig(next);
                                    onUpdateSiteConfig(next);
                                    showNotification('Bidang organisasi dihapus.');
                                  }}
                                  className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <textarea
                                rows={2}
                                value={div.description}
                                onChange={(e) => {
                                  const next = [...draftConfig.divisions];
                                  next[idx] = { ...div, description: e.target.value };
                                  setDraftConfig({ ...draftConfig, divisions: next });
                                }}
                                className="w-full text-xs text-slate-600 bg-slate-50 p-2 rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {homeSubFilter === 'pembinaan' && (
                      <div className="space-y-6">
                        <form
                          onSubmit={handleSaveSiteConfig}
                          className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-extrabold text-[#02182c]">
                              1. Home — Edit Program Pembinaan UPTQ
                            </h3>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                            >
                              Simpan Pembinaan
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Judul Pembinaan</label>
                              <input
                                type="text"
                                value={draftConfig.pembinaanTitle}
                                onChange={(e) => setDraftConfig({ ...draftConfig, pembinaanTitle: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-600 block">
                                Foto Kegiatan Pembinaan (Link atau Upload Perangkat)
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={draftConfig.pembinaanImg}
                                  onChange={(e) => setDraftConfig({ ...draftConfig, pembinaanImg: e.target.value })}
                                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                                />
                                <label className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload Perangkat</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleDirectConfigImageUpload(e, 'pembinaanImg', 'Program Pembinaan')
                                    }
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Deskripsi Pembinaan</label>
                            <textarea
                              rows={2}
                              value={draftConfig.pembinaanDesc}
                              onChange={(e) => setDraftConfig({ ...draftConfig, pembinaanDesc: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-600 block">
                              Cabang Program Pembinaan (Tilawah, Tahfiz, Kaligrafi, dll)
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {draftConfig.programsList.map((prog, idx) => (
                                <div
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700"
                                >
                                  <span>{prog}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = draftConfig.programsList.filter((_, i) => i !== idx);
                                      setDraftConfig({ ...draftConfig, programsList: next });
                                    }}
                                    className="text-rose-500 hover:text-rose-700 cursor-pointer"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 max-w-md pt-1">
                              <input
                                type="text"
                                placeholder="Nama Cabang Pembinaan Baru..."
                                value={newProgramName}
                                onChange={(e) => setNewProgramName(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!newProgramName.trim()) return;
                                  setDraftConfig({
                                    ...draftConfig,
                                    programsList: [...draftConfig.programsList, newProgramName.trim()],
                                  });
                                  setNewProgramName('');
                                }}
                                className="px-4 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                              >
                                + Tambah Cabang
                              </button>
                            </div>
                          </div>
                        </form>

                        <form
                          onSubmit={handleSaveStats}
                          className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                        >
                          <h4 className="text-sm font-extrabold text-[#02182c]">
                            Edit Angka Statistik Capaian (Anggota, Prestasi, Program, Kegiatan)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Anggota Aktif</label>
                              <input
                                type="number"
                                value={editMembers}
                                onChange={(e) => setEditMembers(Number(e.target.value))}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-extrabold"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Prestasi Diraih</label>
                              <input
                                type="number"
                                value={editAchievements}
                                onChange={(e) => setEditAchievements(Number(e.target.value))}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-extrabold"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Program Pembinaan</label>
                              <input
                                type="number"
                                value={editPrograms}
                                onChange={(e) => setEditPrograms(Number(e.target.value))}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-extrabold"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Kegiatan Tahunan</label>
                              <input
                                type="number"
                                value={editEvents}
                                onChange={(e) => setEditEvents(Number(e.target.value))}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-extrabold"
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                          >
                            Simpan Statistik
                          </button>
                        </form>
                      </div>
                    )}

                    {homeSubFilter === 'hero' && (
                      <form
                        onSubmit={handleSaveSiteConfig}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-extrabold text-[#02182c]">
                              1. Home — Upload Foto Logo Website &amp; Brand Ambassador Paling Atas dari Perangkat
                            </h3>
                            <p className="text-xs text-slate-500">
                              Unggah langsung foto Logo Website dan foto Brand Ambassador dari penyimpanan perangkat yang sedang digunakan.
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                          >
                            Simpan Perubahan
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0047CC] block">
                              1. Foto Logo Website
                            </span>
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 rounded-2xl bg-[#f5c542] text-[#02182c] flex items-center justify-center font-serif font-bold text-2xl shrink-0 overflow-hidden border border-amber-300">
                                {draftConfig.brandLogoUrl ? (
                                  <img
                                    src={draftConfig.brandLogoUrl}
                                    alt="Logo Website"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  'ق'
                                )}
                              </div>
                              <div className="space-y-1.5">
                                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload dari Perangkat</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleDirectConfigImageUpload(e, 'brandLogoUrl', 'Logo Website')}
                                    className="hidden"
                                  />
                                </label>
                                {draftConfig.brandLogoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = { ...draftConfig, brandLogoUrl: '' };
                                      setDraftConfig(next);
                                      onUpdateSiteConfig(next);
                                      showNotification('Logo dikembalikan ke simbol ق default.');
                                    }}
                                    className="block text-[11px] text-rose-600 font-bold hover:underline cursor-pointer"
                                  >
                                    Reset ke Simbol ق
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 block">
                              2. Foto Brand Ambassador (Tengah Atas)
                            </span>
                            <div className="flex items-center gap-3">
                              <img
                                src={draftConfig.heroAmbassadorImage}
                                alt="Brand Ambassador"
                                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                              />
                              <div className="space-y-1.5">
                                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload dari Perangkat</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleDirectConfigImageUpload(e, 'heroAmbassadorImage', 'Brand Ambassador')
                                    }
                                    className="hidden"
                                  />
                                </label>
                                <span className="block text-[10px] text-slate-400">
                                  Tampil di tengah awal paling atas website
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block">
                              3. Foto Background Hero Atas
                            </span>
                            <div className="flex items-center gap-3">
                              <img
                                src={draftConfig.heroBgImage}
                                alt="Hero Background"
                                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                              />
                              <div className="space-y-1.5">
                                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-xs font-bold cursor-pointer">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload dari Perangkat</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleDirectConfigImageUpload(e, 'heroBgImage', 'Background Hero')
                                    }
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-200">
                          <div className="space-y-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0047CC] block">
                              Teks Kiri (UPTQ UIN BANDUNG)
                            </span>
                            <input
                              type="text"
                              value={draftConfig.heroLeftWebsiteTitle1 || ''}
                              onChange={(e) =>
                                setDraftConfig({ ...draftConfig, heroLeftWebsiteTitle1: e.target.value })
                              }
                              placeholder="Baris 1: UPTQ UIN"
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                            />
                            <input
                              type="text"
                              value={draftConfig.heroLeftWebsiteTitle2 || ''}
                              onChange={(e) =>
                                setDraftConfig({ ...draftConfig, heroLeftWebsiteTitle2: e.target.value })
                              }
                              placeholder="Baris 2: BANDUNG"
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                            />
                          </div>

                          <div className="space-y-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 block">
                              Teks Kanan (KABINET NAHDLATUL QURRA)
                            </span>
                            <input
                              type="text"
                              value={draftConfig.heroRightCabinetTitle1 || ''}
                              onChange={(e) =>
                                setDraftConfig({ ...draftConfig, heroRightCabinetTitle1: e.target.value })
                              }
                              placeholder="Baris 1: KABINET"
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                            />
                            <input
                              type="text"
                              value={draftConfig.heroRightCabinetTitle2 || ''}
                              onChange={(e) =>
                                setDraftConfig({ ...draftConfig, heroRightCabinetTitle2: e.target.value })
                              }
                              placeholder="Baris 2: NAHDLATUL QURRA"
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="text-xs font-extrabold uppercase tracking-wider text-[#02182c] block">
                                Slide Foto Brand Ambassador (Minimal 3 Foto — Maksimal 5 Foto Pose Berbeda)
                              </span>
                              <span className="text-[11px] text-slate-500">
                                Foto akan berganti otomatis seperti slide di halaman paling atas website (tanpa teks nama/jabatan).
                              </span>
                            </div>
                            {((draftConfig.heroAmbassadorImages || []).length < 5) && (
                              <label className="px-3.5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambah Foto Pose (Max 5)</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    readFileFromDevice(file, async (url) => {
                                      const cleanUrl = await removeImageBackgroundToCutout(url);
                                      const currentList =
                                        draftConfig.heroAmbassadorImages && draftConfig.heroAmbassadorImages.length >= 3
                                          ? [...draftConfig.heroAmbassadorImages]
                                          : [
                                              draftConfig.heroAmbassadorImage,
                                              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
                                              'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85',
                                            ];
                                      if (currentList.length >= 5) return;
                                      const nextList = [...currentList, cleanUrl].slice(0, 5);
                                      const next = { ...draftConfig, heroAmbassadorImages: nextList };
                                      setDraftConfig(next);
                                      onUpdateSiteConfig(next);
                                      showNotification(`Pose ke-${nextList.length} Brand Ambassador (3D Tanpa Background) berhasil ditambahkan!`);
                                    });
                                    e.target.value = '';
                                  }}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(draftConfig.heroAmbassadorImages && draftConfig.heroAmbassadorImages.length >= 3
                              ? draftConfig.heroAmbassadorImages.slice(0, 5)
                              : [
                                  draftConfig.heroAmbassadorImage,
                                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
                                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85',
                                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
                                ]
                            ).map((poseUrl, poseIdx, arr) => (
                              <div
                                key={`pose-slot-${poseIdx}`}
                                className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-extrabold text-[#0047CC]">
                                    Slide Pose #{poseIdx + 1}
                                  </span>
                                  {arr.length > 3 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const nextList = arr.filter((_, i) => i !== poseIdx);
                                        const next = {
                                          ...draftConfig,
                                          heroAmbassadorImages: nextList,
                                          heroAmbassadorImage: nextList[0] || draftConfig.heroAmbassadorImage,
                                        };
                                        setDraftConfig(next);
                                        onUpdateSiteConfig(next);
                                        showNotification(`Slide Pose #${poseIdx + 1} dihapus (tersisa ${nextList.length} foto).`);
                                      }}
                                      className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                                    >
                                      Hapus
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={poseUrl}
                                    alt={`Pose ${poseIdx + 1}`}
                                    className="w-14 h-16 rounded-xl object-cover object-top border border-slate-200 shrink-0"
                                  />
                                  <div className="flex-1 min-w-0 space-y-1.5">
                                    <input
                                      type="text"
                                      value={poseUrl}
                                      onChange={(e) => {
                                        const nextList = [...arr];
                                        nextList[poseIdx] = e.target.value;
                                        setDraftConfig({
                                          ...draftConfig,
                                          heroAmbassadorImages: nextList,
                                          heroAmbassadorImage: nextList[0] || draftConfig.heroAmbassadorImage,
                                        });
                                      }}
                                      placeholder="URL Foto Pose..."
                                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px]"
                                    />
                                    <label className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-[11px] font-bold cursor-pointer">
                                      <Upload className="w-3 h-3" />
                                      <span>Upload Perangkat</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          readFileFromDevice(file, async (url) => {
                                            const cleanUrl = await removeImageBackgroundToCutout(url);
                                            const nextList = [...arr];
                                            nextList[poseIdx] = cleanUrl;
                                            const next = {
                                              ...draftConfig,
                                              heroAmbassadorImages: nextList,
                                              heroAmbassadorImage: nextList[0] || draftConfig.heroAmbassadorImage,
                                            };
                                            setDraftConfig(next);
                                            onUpdateSiteConfig(next);
                                            showNotification(`Foto Pose #${poseIdx + 1} (3D Tanpa Background) berhasil diupload!`);
                                          });
                                          e.target.value = '';
                                        }}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                )}
