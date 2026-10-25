import React from 'react';

/**
 * Official Logos of UIN Sunan Gunung Djati Bandung
 * 1. Kementerian Agama Republik Indonesia (Kemenag)
 * 2. UIN Sunan Gunung Djati Bandung
 * 3. Akreditasi Unggul BAN-PT
 * 4. Badan Layanan Umum (BLU)
 */

export const KemenagLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Kementerian Agama Republik Indonesia"
  >
    <title>Kementerian Agama Republik Indonesia</title>
    {/* Outer Green Pentagon / Shield */}
    <path
      d="M50 4 L92 28 L76 88 L50 96 L24 88 L8 28 Z"
      fill="#0d6537"
      stroke="#f59e0b"
      strokeWidth="2.5"
    />
    <path
      d="M50 9 L87 31 L73 84 L50 91 L27 84 L13 31 Z"
      fill="#117942"
    />
    {/* Inner Sun Rays / Star */}
    <circle cx="50" cy="50" r="28" fill="#fef08a" opacity="0.15" />
    <circle cx="50" cy="48" r="20" stroke="#f59e0b" strokeWidth="2" fill="#0d6537" />
    {/* Scale / Timbangan */}
    <path d="M50 34 V58" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M38 40 H62" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Pans */}
    <path d="M34 40 L38 48 L42 40 Z" fill="#f59e0b" />
    <path d="M58 40 L62 48 L66 40 Z" fill="#f59e0b" />
    {/* Open Holy Book (Al-Qur'an) */}
    <path
      d="M40 60 Q50 63 50 67 Q50 63 60 60 L58 54 Q50 57 50 52 Q50 57 42 54 Z"
      fill="#ffffff"
      stroke="#f59e0b"
      strokeWidth="1.2"
    />
    {/* Star on top */}
    <polygon
      points="50,22 52,27 57,27 53,30 55,35 50,32 45,35 47,30 43,27 48,27"
      fill="#fbbf24"
    />
    {/* Text Ribbon */}
    <path d="M30 78 Q50 83 70 78" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UinSgdLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="UIN Sunan Gunung Djati Bandung"
  >
    <title>UIN Sunan Gunung Djati Bandung</title>
    {/* 8-Petal Lotus / Flower Geometry */}
    <g fill="#0b7a44" stroke="#f59e0b" strokeWidth="1.5">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M50 10 C56 22 62 32 50 42 C38 32 44 22 50 10 Z"
          transform={`rotate(${angle} 50 50)`}
          fill="#10864c"
        />
      ))}
    </g>
    {/* Outer Green Ring */}
    <circle cx="50" cy="50" r="32" fill="#0d6537" stroke="#f59e0b" strokeWidth="2" />
    {/* Yellow/Golden Middle Ring */}
    <circle cx="50" cy="50" r="26" fill="#fef9c3" stroke="#d97706" strokeWidth="1.5" />
    {/* Dome and Book motif */}
    <path
      d="M50 32 C43 32 38 38 38 46 H62 C62 38 57 32 50 32 Z"
      fill="#0d6537"
    />
    <path
      d="M36 50 Q50 54 50 60 Q50 54 64 50 L62 46 Q50 49 50 44 Q50 49 38 46 Z"
      fill="#117942"
      stroke="#f59e0b"
      strokeWidth="1"
    />
    {/* Center Diamond */}
    <polygon points="50,30 52,33 50,36 48,33" fill="#fbbf24" />
    {/* Small Star */}
    <circle cx="50" cy="40" r="2.5" fill="#fef08a" />
    {/* Lower Text indicator */}
    <text
      x="50"
      y="70"
      fontSize="7"
      fontWeight="900"
      textAnchor="middle"
      fill="#0d6537"
      fontFamily="sans-serif"
    >
      UIN SGD
    </text>
  </svg>
);

export const AkreditasiUnggulLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Akreditasi Institusi Unggul BAN-PT"
  >
    <title>Akreditasi Institusi Unggul BAN-PT</title>
    {/* Outer Golden Seal with Scalloped Edges */}
    <circle cx="50" cy="50" r="44" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
    <circle cx="50" cy="50" r="39" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
    <circle cx="50" cy="50" r="34" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
    {/* Laurel Wreath */}
    <path
      d="M26 50 C26 36 34 26 44 24 M26 50 C26 64 34 74 44 76"
      stroke="#d97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M74 50 C74 36 66 26 56 24 M74 50 C74 64 66 74 56 76"
      stroke="#d97706"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Stars */}
    <g fill="#f59e0b">
      <polygon points="50,23 51,25 53,25 51.5,26.5 52,28.5 50,27 48,28.5 48.5,26.5 47,25 49,25" />
    </g>
    {/* Center Typography */}
    <text
      x="50"
      y="43"
      fontSize="6.5"
      fontWeight="800"
      textAnchor="middle"
      fill="#92400e"
      letterSpacing="0.08em"
      fontFamily="sans-serif"
    >
      AKREDITASI
    </text>
    <text
      x="50"
      y="55"
      fontSize="10"
      fontWeight="900"
      textAnchor="middle"
      fill="#b45309"
      fontFamily="sans-serif"
    >
      UNGGUL
    </text>
    <text
      x="50"
      y="65"
      fontSize="6"
      fontWeight="700"
      textAnchor="middle"
      fill="#78350f"
      fontFamily="sans-serif"
    >
      BAN-PT
    </text>
  </svg>
);

export const BluLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Badan Layanan Umum (BLU) Kemenkeu RI"
  >
    <title>Badan Layanan Umum (BLU) Kemenkeu RI</title>
    {/* Dynamic Blue Speed Swirl */}
    <circle cx="50" cy="50" r="44" fill="#0284c7" />
    {/* Gradient Wave Effect */}
    <path
      d="M14 62 C32 40 68 36 88 56 C74 68 40 76 14 62 Z"
      fill="#38bdf8"
      opacity="0.85"
    />
    <path
      d="M20 74 C40 50 78 48 86 64 C68 82 34 84 20 74 Z"
      fill="#0369a1"
    />
    {/* Bold BLU letters */}
    <text
      x="50"
      y="46"
      fontSize="22"
      fontWeight="900"
      textAnchor="middle"
      fill="#ffffff"
      fontStyle="italic"
      fontFamily="sans-serif"
    >
      BLU
    </text>
    {/* Subtitle */}
    <text
      x="50"
      y="58"
      fontSize="5.5"
      fontWeight="800"
      textAnchor="middle"
      fill="#e0f2fe"
      letterSpacing="0.05em"
      fontFamily="sans-serif"
    >
      SPEED · VIGOR · ACCURACY
    </text>
  </svg>
);
