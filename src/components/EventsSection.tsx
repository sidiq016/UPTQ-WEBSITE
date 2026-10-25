import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/uptqData';
import { Calendar, Clock, MapPin, User, ArrowUpRight } from 'lucide-react';
import { EventItem } from '../types';

export const EventsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeEventModal, setActiveEventModal] = useState<EventItem | null>(null);

  const categories = ['All', 'Kompetisi', 'Kajian', 'Kaderisasi', 'Pelatihan'];

  const filteredEvents = UPCOMING_EVENTS.filter((e) => {
    if (selectedFilter === 'All') return true;
    return e.category === selectedFilter;
  });

  const generateGoogleCalendarLink = (event: EventItem) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nPembicara: ${event.speaker || '-'}\nLokasi: ${event.location}`);
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="agenda" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-700 font-bold">
              <span className="w-6 h-0.5 bg-emerald-600" />
              <span>Agenda & Program Kerja</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 [text-wrap:balance]">
              Kalender Kegiatan Qur'ani 2026
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Ikuti berbagai seminar, musabaqah internal, haflah tilawah akbar, dan pembinaan kader untuk mengasah ketrampilan seni Al-Qur'an Anda.
            </p>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-white transition-all hover:shadow-lg flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="text-emerald-700 font-bold uppercase tracking-wider">{event.category}</span>
                  <span className="font-mono text-sky-800 font-semibold">{event.status}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="pt-2 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-bold text-slate-900">{event.date}</span>
                    <span aria-hidden="true" className="text-slate-400">·</span>
                    <Clock className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>{event.location}</span>
                  </div>

                  {event.speaker && (
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{event.speaker}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200/80 flex items-center justify-between gap-4">
                <a
                  href={generateGoogleCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <span>Simpan ke Google Kalender</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveEventModal(event)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Detail Agenda
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Info */}
        {activeEventModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold">
                    {activeEventModal.category} · {activeEventModal.status}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {activeEventModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveEventModal(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeEventModal.description}
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div>
                  <strong className="text-slate-900">Tanggal:</strong> {activeEventModal.date} ({activeEventModal.time})
                </div>
                <div>
                  <strong className="text-slate-900">Lokasi:</strong> {activeEventModal.location}
                </div>
                <div>
                  <strong className="text-slate-900">Narasumber / Dewan Hakim:</strong> {activeEventModal.speaker || '-'}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <a
                  href={generateGoogleCalendarLink(activeEventModal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-md"
                >
                  <span>Tambah ke Kalender</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveEventModal(null)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
