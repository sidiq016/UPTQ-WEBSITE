{windowFilter === 'profil' && (
                  <form
                    onSubmit={handleSaveSiteConfig}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#02182c]">
                        2. Profil — Edit Profil UPTQ UIN Sunan Gunung Djati Bandung
                      </h3>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                      >
                        Simpan Profil
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 block mb-1">Label Eyebrow Profil</label>
                        <input
                          type="text"
                          value={draftConfig.profileEyebrow}
                          onChange={(e) => setDraftConfig({ ...draftConfig, profileEyebrow: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 block mb-1">Judul Utama Profil</label>
                        <input
                          type="text"
                          value={draftConfig.profileTitle}
                          onChange={(e) => setDraftConfig({ ...draftConfig, profileTitle: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 block mb-1">
                        Deskripsi Lengkap Profil UPTQ
                      </label>
                      <textarea
                        rows={4}
                        value={draftConfig.profileDesc}
                        onChange={(e) => setDraftConfig({ ...draftConfig, profileDesc: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 block mb-1">Kutipan (Quote) Profil</label>
                        <input
                          type="text"
                          value={draftConfig.profileQuote}
                          onChange={(e) => setDraftConfig({ ...draftConfig, profileQuote: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 block">
                          Foto Objek Orang Brand Ambassador — Bagian Profil UPTQ (Link atau Upload dari Perangkat)
                        </label>
                        <div className="flex items-center gap-2">
                          <img
                            src={draftConfig.profileImg}
                            alt="Profil"
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <input
                            type="text"
                            value={draftConfig.profileImg}
                            onChange={(e) => setDraftConfig({ ...draftConfig, profileImg: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                          />
                          <label className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Perangkat</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleDirectConfigImageUpload(e, 'profileImg', 'Profil UPTQ')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {windowFilter === 'agenda' && (
                  <div className="space-y-6">
                    <form
                      onSubmit={handleAddOrUpdateAgenda}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                    >
                      <h3 className="text-base font-extrabold text-[#02182c]">
                        {editingAgendaId ? '3. Agenda — Edit Jadwal Kegiatan' : '3. Agenda — Tambah Agenda Terdekat'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Tanggal (contoh: 14) *"
                          value={newAgendaDay}
                          onChange={(e) => setNewAgendaDay(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Bulan & Tahun (Juni 2025)"
                          value={newAgendaMonthYear}
                          onChange={(e) => setNewAgendaMonthYear(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Nama Agenda Kegiatan *"
                          value={newAgendaTitle}
                          onChange={(e) => setNewAgendaTitle(e.target.value)}
                          className="sm:col-span-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Waktu (08.00–12.00 WIB)"
                          value={newAgendaTime}
                          onChange={(e) => setNewAgendaTime(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Lokasi Kegiatan"
                          value={newAgendaLocation}
                          onChange={(e) => setNewAgendaLocation(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                        >
                          {editingAgendaId ? 'Simpan Perubahan' : '+ Tambah Agenda'}
                        </button>
                      </div>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {agendas.map((ag) => (
                        <div
                          key={ag.id}
                          className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0047CC] flex flex-col items-center justify-center font-black text-sm shrink-0">
                              <span>{ag.day}</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-extrabold text-[#02182c]">{ag.title}</h4>
                              <p className="text-[11px] text-slate-400">
                                {ag.monthYear} • {ag.time} • {ag.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditAgendaClick(ag)}
                              className="p-2 text-slate-400 hover:text-[#0047CC] cursor-pointer"
                              title="Edit Agenda"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteAgenda(ag.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                              title="Hapus Agenda"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {windowFilter === 'berita' && (
                  <div className="space-y-5">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <h3 className="text-base font-extrabold text-[#02182c]">
                        4. Berita — Tambah / Edit / Hapus Publikasi Berita (Bisa Upload Foto dari Perangkat)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input
                          type="text"
                          placeholder="Judul Berita *"
                          value={newNewsTitle}
                          onChange={(e) => setNewNewsTitle(e.target.value)}
                          className="sm:col-span-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Kategori (Prestasi / Kaderisasi)"
                          value={newNewsCategory}
                          onChange={(e) => setNewNewsCategory(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Tanggal (18 Mei 2025)"
                          value={newNewsDate}
                          onChange={(e) => setNewNewsDate(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="text"
                          placeholder="Ringkasan Berita..."
                          value={newNewsExcerpt}
                          onChange={(e) => setNewNewsExcerpt(e.target.value)}
                          className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="URL Foto Berita (atau upload dari perangkat →)"
                          value={newNewsImg}
                          onChange={(e) => setNewNewsImg(e.target.value)}
                          className="flex-1 min-w-[180px] px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                        <label className="px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 text-[#0047CC] border border-blue-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Foto dari Perangkat</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              readFileFromDevice(file, (url) => {
                                setNewNewsImg(url);
                                showNotification(`Foto berita "${file.name}" berhasil dimuat dari perangkat!`);
                              });
                              e.target.value = '';
                            }}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newNewsTitle.trim()) return;
                            const item: NewsItemData = {
                              id: `nw-${Date.now()}`,
                              category: newNewsCategory || 'Prestasi',
                              date: newNewsDate,
                              author: 'Redaksi UPTQ',
                              title: newNewsTitle,
                              excerpt: newNewsExcerpt || 'Berita kegiatan terbaru keluarga besar UPTQ UIN Bandung.',
                              img:
                                newNewsImg ||
                                'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1000&q=85',
                            };
                            const next = { ...draftConfig, newsList: [item, ...draftConfig.newsList] };
                            setDraftConfig(next);
                            onUpdateSiteConfig(next);
                            setNewNewsTitle('');
                            setNewNewsExcerpt('');
                            setNewNewsImg('');
                            showNotification('Berita baru berhasil dipublikasikan!');
                          }}
                          className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                        >
                          + Publikasikan Berita
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {draftConfig.newsList.map((nw, idx) => (
                        <div key={nw.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
                          <div className="flex items-center justify-between gap-3">
                            <img
                              src={nw.img}
                              alt={nw.title}
                              className="w-16 h-12 rounded-lg object-cover shrink-0 border border-slate-100"
                            />
                            <input
                              type="text"
                              value={nw.title}
                              onChange={(e) => {
                                const next = [...draftConfig.newsList];
                                next[idx] = { ...nw, title: e.target.value };
                                setDraftConfig({ ...draftConfig, newsList: next });
                              }}
                              className="font-extrabold text-xs text-[#02182c] border-b border-slate-200 focus:outline-none flex-1 py-1"
                            />
                            <label className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047CC] text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0">
                              <Upload className="w-3 h-3" />
                              <span>Ganti Foto (Perangkat)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  readFileFromDevice(file, (url) => {
                                    const next = [...draftConfig.newsList];
                                    next[idx] = { ...nw, img: url };
                                    const nextCfg = { ...draftConfig, newsList: next };
                                    setDraftConfig(nextCfg);
                                    onUpdateSiteConfig(nextCfg);
                                    showNotification('Foto berita berhasil diganti dari perangkat!');
                                  });
                                  e.target.value = '';
                                }}
                                className="hidden"
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const next = {
                                  ...draftConfig,
                                  newsList: draftConfig.newsList.filter((item) => item.id !== nw.id),
                                };
                                setDraftConfig(next);
                                onUpdateSiteConfig(next);
                                showNotification('Berita dihapus.');
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={nw.excerpt}
                            onChange={(e) => {
                              const next = [...draftConfig.newsList];
                              next[idx] = { ...nw, excerpt: e.target.value };
                              setDraftConfig({ ...draftConfig, newsList: next });
                            }}
                            className="w-full text-xs text-slate-600 bg-slate-50 p-2 rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {windowFilter === 'konten' && (
                  <div className="space-y-6">
                    {kontenSubFilter === 'upload' ? (
                      renderMediaUploaderSection()
                    ) : (
                      <>
                        <form
                          onSubmit={handleAddOrUpdateContent}
                          className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-extrabold text-[#02182c]">
                              {editingContentId
                                ? '5. Konten — Edit Publikasi Kegiatan'
                                : `5. Konten — Tambah Publikasi Kegiatan (${
                                    kontenSubFilter === 'all'
                                      ? 'Event / Artikel / Lomba / Rekaman'
                                      : kontenSubFilter.toUpperCase()
                                  })`}
                            </h3>
                            {editingContentId && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingContentId(null);
                                  setNewContentTitle('');
                                  setNewContentMeta('');
                                  setNewContentImg('');
                                  setNewContentFileUrl('');
                                }}
                                className="text-xs font-bold text-rose-600 cursor-pointer"
                              >
                                Batal Edit
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <select
                              value={newContentCategory}
                              onChange={(e) =>
                                setNewContentCategory(
                                  e.target.value as 'event' | 'artikel' | 'lomba' | 'rekaman'
                                )
                              }
                              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                            >
                              <option value="event">Kategori: Event</option>
                              <option value="artikel">Kategori: Artikel</option>
                              <option value="lomba">Kategori: Lomba</option>
                              <option value="rekaman">Kategori: Rekaman Audio/Video</option>
                            </select>
                            <input
                              type="text"
                              required
                              placeholder="Judul Publikasi Kegiatan *"
                              value={newContentTitle}
                              onChange={(e) => setNewContentTitle(e.target.value)}
                              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                            <input
                              type="text"
                              placeholder="Keterangan Waktu / Penulis / Durasi"
                              value={newContentMeta}
                              onChange={(e) => setNewContentMeta(e.target.value)}
                              className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Link Foto Sampul (atau upload foto dari perangkat →)"
                                value={newContentImg}
                                onChange={(e) => setNewContentImg(e.target.value)}
                                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs"
                              />
                              <input
                                ref={contentThumbInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  readFileFromDevice(file, (url) => {
                                    setNewContentImg(url);
                                    showNotification(`Foto sampul "${file.name}" berhasil dimuat dari perangkat!`);
                                  });
                                  e.target.value = '';
                                }}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => contentThumbInputRef.current?.click()}
                                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0047CC] border border-blue-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                              >
                                <Camera className="w-3.5 h-3.5" />
                                <span>Foto Perangkat</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                ref={contentFileInputRef}
                                type="file"
                                accept=".doc,.docx,.pdf,.png,.jpg,.jpeg,.gif,.mp3,.mp4,.wav,.webm,image/*,audio/*,video/*,application/pdf"
                                onChange={handleContentDeviceFileUpload}
                                className="hidden"
                              />
                              <button
                                type="button"
                                onClick={() => contentFileInputRef.current?.click()}
                                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0047CC] border border-blue-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <Upload className="w-4 h-4" />
                                <span className="truncate">
                                  {newContentFileName || 'Upload Berkas/Media dari Perangkat'}
                                </span>
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer shrink-0"
                              >
                                {editingContentId ? 'Update' : '+ Publikasikan'}
                              </button>
                            </div>
                          </div>
                        </form>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredContentsList.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              transition={smoothSpringTransition}
                              className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs flex flex-col justify-between"
                            >
                              <div>
                                <div className="relative h-36 bg-slate-100">
                                  <img src={item.img} alt={item.alt} className="w-full h-full object-cover" />
                                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#02182c]/85 text-[#f5c542] text-[10px] font-bold uppercase">
                                    {item.category}
                                  </span>
                                  <label className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-[#0047CC] text-[10px] font-bold flex items-center gap-1 shadow-sm cursor-pointer">
                                    <Upload className="w-3 h-3" />
                                    <span>Ganti Foto</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        readFileFromDevice(file, (url) => {
                                          onUpdateContents(
                                            contents.map((c) => (c.id === item.id ? { ...c, img: url } : c))
                                          );
                                          showNotification(`Foto publikasi "${item.title}" berhasil diganti dari perangkat!`);
                                        });
                                        e.target.value = '';
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                <div className="p-4">
                                  <h4 className="text-sm font-extrabold text-[#02182c] line-clamp-1">{item.title}</h4>
                                  <p className="text-xs text-slate-400 mt-1">{item.meta}</p>
                                </div>
                              </div>
                              <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={() => handleEditContentClick(item)}
                                  className="text-xs font-bold text-[#0047CC] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteContent(item.id)}
                                  className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {windowFilter === 'pelayanan' && (
                  <div className="space-y-8">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-extrabold text-[#02182c]">
                            6. Pelayanan — Edit Kartu Layanan Website (Media Partner, Peminjaman Barang, Entertainment)
                          </h3>
                          <p className="text-xs text-slate-500">
                            Ubah judul, deskripsi, maupun upload gambar kartu pelayanan langsung dari penyimpanan perangkat.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSaveSiteConfig()}
                          className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                        >
                          Simpan Kartu Pelayanan
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {draftConfig.servicesList
                          .filter(
                            (srv) =>
                              pelayananSubFilter === 'all' ||
                              srv.title.toLowerCase() === pelayananSubFilter.toLowerCase()
                          )
                          .map((srv) => {
                            const realIdx = draftConfig.servicesList.findIndex((s) => s.id === srv.id);
                            return (
                              <div
                                key={srv.id}
                                className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3"
                              >
                                <div className="relative">
                                  <img
                                    src={srv.img}
                                    alt={srv.title}
                                    className="w-full h-32 object-cover rounded-xl border border-slate-100"
                                  />
                                  <label className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-[#0047CC] text-[10px] font-bold flex items-center gap-1 shadow-sm cursor-pointer">
                                    <Upload className="w-3 h-3" />
                                    <span>Upload Foto Perangkat</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        readFileFromDevice(file, (url) => {
                                          const next = [...draftConfig.servicesList];
                                          next[realIdx] = { ...srv, img: url };
                                          const nextCfg = { ...draftConfig, servicesList: next };
                                          setDraftConfig(nextCfg);
                                          onUpdateSiteConfig(nextCfg);
                                          showNotification(`Foto layanan ${srv.title} berhasil diupload dari perangkat!`);
                                        });
                                        e.target.value = '';
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                <div>
                                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                                    Nama Layanan
                                  </label>
                                  <input
                                    type="text"
                                    value={srv.title}
                                    onChange={(e) => {
                                      const next = [...draftConfig.servicesList];
                                      next[realIdx] = { ...srv, title: e.target.value };
                                      setDraftConfig({ ...draftConfig, servicesList: next });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-extrabold"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                                    Deskripsi Layanan
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={srv.description}
                                    onChange={(e) => {
                                      const next = [...draftConfig.servicesList];
                                      next[realIdx] = { ...srv, description: e.target.value };
                                      setDraftConfig({ ...draftConfig, servicesList: next });
                                    }}
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-800">
                        Daftar Permohonan Layanan Masuk (
                        {pelayananSubFilter === 'all' ? 'Semua Pelayanan' : pelayananSubFilter})
                      </h3>
                      {renderOrderTableSection()}
                    </div>
                  </div>
                )}

                {windowFilter === 'dashboard_bawah' && (
                  <form
                    onSubmit={handleSaveSiteConfig}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-[#02182c]">
                          7. Dashboard Bawah — Kelola Alamat, Contact Person, Email, Media Sosial &amp; Lokasi G Maps
                        </h3>
                        <p className="text-xs text-slate-500">
                          Perubahan pada bagian ini langsung diterapkan ke bagian bawah (Footer &amp; Peta) website utama.
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#0047CC] text-white text-xs font-bold cursor-pointer"
                      >
                        Simpan Dashboard Bawah
                      </button>
                    </div>

                    {bawahSubFilter === 'alamat' && (
                      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#0047CC] font-extrabold text-xs uppercase tracking-wider">
                          <MapPin className="w-4 h-4" />
                          <span>Sub-Jendela: Alamat Sekretariat &amp; Deskripsi Bawah</span>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 block mb-1">
                            Alamat Lengkap Sekretariat UPTQ
                          </label>
                          <input
                            type="text"
                            value={draftConfig.address}
                            onChange={(e) => setDraftConfig({ ...draftConfig, address: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 block mb-1">
                            Deskripsi Singkat Organisasi di Footer
                          </label>
                          <textarea
                            rows={2}
                            value={draftConfig.footerAbout}
                            onChange={(e) => setDraftConfig({ ...draftConfig, footerAbout: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                          />
                        </div>
                      </div>
                    )}

                    {bawahSubFilter === 'cp' && (
                      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#0047CC] font-extrabold text-xs uppercase tracking-wider">
                          <Phone className="w-4 h-4" />
                          <span>Sub-Jendela: Contact Person &amp; WhatsApp Developer</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                              Nama Contact Person (Humas / Admin)
                            </label>
                            <input
                              type="text"
                              value={draftConfig.contactPersonName || ''}
                              onChange={(e) => setDraftConfig({ ...draftConfig, contactPersonName: e.target.value })}
                              placeholder="Contoh: Humas UPTQ UIN SGD Bandung"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                              Nomor Telepon / WhatsApp Resmi
                            </label>
                            <input
                              type="text"
                              value={draftConfig.phone}
                              onChange={(e) => setDraftConfig({ ...draftConfig, phone: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                              Jam Operasional Pelayanan
                            </label>
                            <input
                              type="text"
                              value={draftConfig.workHours}
                              onChange={(e) => setDraftConfig({ ...draftConfig, workHours: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                              Nomor WhatsApp Developer (Tujuan Otomatis Saat 3x Salah Login)
                            </label>
                            <input
                              type="text"
                              value={draftConfig.developerWhatsapp || ''}
                              onChange={(e) => setDraftConfig({ ...draftConfig, developerWhatsapp: e.target.value })}
                              placeholder="Contoh: 6281234567890"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {bawahSubFilter === 'email' && (
                      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#0047CC] font-extrabold text-xs uppercase tracking-wider">
                          <Mail className="w-4 h-4" />
                          <span>Sub-Jendela: Email Resmi Organisasi</span>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-600 block mb-1">
                            Alamat Email Resmi UPTQ UIN SGD Bandung
                          </label>
                          <input
                            type="email"
                            value={draftConfig.email}
                            onChange={(e) => setDraftConfig({ ...draftConfig, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold"
                          />
                        </div>
                      </div>
                    )}

                    {bawahSubFilter === 'medsos' && (
                      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#0047CC] font-extrabold text-xs uppercase tracking-wider">
                          <Share2 className="w-4 h-4" />
                          <span>Sub-Jendela: Tautan Media Sosial Resmi</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">URL Instagram</label>
                            <input
                              type="url"
                              value={draftConfig.instagramUrl}
                              onChange={(e) => setDraftConfig({ ...draftConfig, instagramUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">URL YouTube</label>
                            <input
                              type="url"
                              value={draftConfig.youtubeUrl}
                              onChange={(e) => setDraftConfig({ ...draftConfig, youtubeUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">URL TikTok</label>
                            <input
                              type="url"
                              value={draftConfig.tiktokUrl}
                              onChange={(e) => setDraftConfig({ ...draftConfig, tiktokUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">URL Facebook</label>
                            <input
                              type="url"
                              value={draftConfig.facebookUrl}
                              onChange={(e) => setDraftConfig({ ...draftConfig, facebookUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {bawahSubFilter === 'gmaps' && (
                      <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#0047CC] font-extrabold text-xs uppercase tracking-wider">
                          <MapPin className="w-4 h-4" />
                          <span>Sub-Jendela: Lokasi Google Maps</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                              URL Embed Peta Google Maps (Iframe)
                            </label>
                            <input
                              type="text"
                              value={
                                draftConfig.gmapsEmbedUrl ||
                                'https://www.google.com/maps?q=UIN%20Sunan%20Gunung%20Djati%20Bandung&output=embed'
                              }
                              onChange={(e) => setDraftConfig({ ...draftConfig, gmapsEmbedUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">
                              Tautan Langsung Google Maps
                            </label>
                            <input
                              type="text"
                              value={
                                draftConfig.gmapsLinkUrl ||
                                'https://maps.google.com/?q=UIN+Sunan+Gunung+Djati+Bandung'
                              }
                              onChange={(e) => setDraftConfig({ ...draftConfig, gmapsLinkUrl: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-200 h-56">
                          <iframe
                            title="Pratinjau Lokasi Google Maps UPTQ"
                            src={
                              draftConfig.gmapsEmbedUrl ||
                              'https://www.google.com/maps?q=UIN%20Sunan%20Gunung%20Djati%20Bandung&output=embed'
                            }
                            className="w-full h-full border-0"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {windowFilter === 'akun_biodata' && (
                  <div className="space-y-6">
                    {isDeveloper && (
                      <>
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0047CC] flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Panel Pemantauan Seluruh Isi Website (Khusus Developer)</span>
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                              <span className="text-slate-400 font-bold block">Status Login Admin</span>
                              <span
                                className={`text-sm font-extrabold mt-0.5 block ${
                                  draftConfig.adminAccount?.isAccessEnabled !== false &&
                                  (draftConfig.adminAccount?.username || '').trim() !== ''
                                    ? 'text-emerald-600'
                                    : 'text-rose-600'
                                }`}
                              >
                                {draftConfig.adminAccount?.isAccessEnabled !== false &&
                                (draftConfig.adminAccount?.username || '').trim() !== ''
                                  ? `AKTIF (${draftConfig.adminAccount?.username})`
                                  : 'DIHAPUS / NONAKTIF'}
                              </span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                              <span className="text-slate-400 font-bold block">Kepengurusan &amp; Anggota</span>
                              <span className="text-sm font-extrabold text-[#02182c] mt-0.5 block">
                                {draftConfig.leaders.length} Pengurus • {stats.members} Anggota
                              </span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                              <span className="text-slate-400 font-bold block">Agenda &amp; Berita Terkini</span>
                              <span className="text-sm font-extrabold text-[#02182c] mt-0.5 block">
                                {agendas.length} Agenda • {draftConfig.newsList.length} Berita
                              </span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                              <span className="text-slate-400 font-bold block">Konten &amp; Layanan Masuk</span>
                              <span className="text-sm font-extrabold text-[#02182c] mt-0.5 block">
                                {contents.length} Konten • {submissions.length} Permohonan
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 border-2 border-blue-200/80 space-y-5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                            <div>
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0047CC]">
                                <KeyRound className="w-3.5 h-3.5" /> Wewenang Eksklusif Developer
                              </span>
                              <h3 className="text-base font-extrabold text-[#02182c] mt-0.5">
                                Kelola Penuh Akun Admin: Username, Password, Biodata &amp; Foto Profil Admin
                              </h3>
                              <p className="text-xs text-slate-500">
                                Developer bebas membuat, menentukan, mengedit, mengganti, maupun menghapus Username &amp; Password akses login Admin serta biodata dan foto Admin.
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const nextAdmin: AccountProfileData = {
                                    ...DEFAULT_SITE_CONFIG.adminAccount,
                                    username: 'UPTQJAYA',
                                    password: 'Z4MZ4M4',
                                    isAccessEnabled: true,
                                    avatarUrl: '/admiin.png',
                                  };
                                  const nextCfg = { ...draftConfig, adminAccount: nextAdmin };
                                  setDraftConfig(nextCfg);
                                  onUpdateSiteConfig(nextCfg);
                                  showNotification(
                                    'Akses login & biodata Admin dikembalikan ke default (Username: UPTQJAYA / Password: Z4MZ4M4).'
                                  );
                                }}
                                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold cursor-pointer"
                              >
                                Reset Default Admin
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const currentAdm = draftConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount;
                                  const nextAdm: AccountProfileData = {
                                    ...currentAdm,
                                    isAccessEnabled: Boolean(
                                      (draftConfig.adminAccount?.username || '').trim() &&
                                        (draftConfig.adminAccount?.password || '').trim()
                                    ),
                                  };
                                  const nextCfg = { ...draftConfig, adminAccount: nextAdm };
                                  setDraftConfig(nextCfg);
                                  onUpdateSiteConfig(nextCfg);
                                  showNotification('Perubahan akun, password & biodata Admin berhasil disimpan oleh Developer!');
                                }}
                                className="px-5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                              >
                                Simpan Pengaturan Admin
                              </button>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#02182c]">
                                  1. Pengaturan Username &amp; Password Login Admin (Ditentukan oleh Developer)
                                </h4>
                                <p className="text-[11px] text-slate-500">
                                  Default Admin — Username: <code className="font-mono font-bold">UPTQJAYA</code> | Password:{' '}
                                  <code className="font-mono font-bold">Z4MZ4M4</code>
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                    draftConfig.adminAccount?.isAccessEnabled !== false &&
                                    (draftConfig.adminAccount?.username || '').trim() !== '' &&
                                    (draftConfig.adminAccount?.password || '').trim() !== ''
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-rose-100 text-rose-700'
                                  }`}
                                >
                                  {draftConfig.adminAccount?.isAccessEnabled !== false &&
                                  (draftConfig.adminAccount?.username || '').trim() !== '' &&
                                  (draftConfig.adminAccount?.password || '').trim() !== ''
                                    ? 'Akses Login Admin: AKTIF'
                                    : 'Akses Login Admin: DIHAPUS / NONAKTIF'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentAdm = draftConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount;
                                    const nextAdm: AccountProfileData = {
                                      ...currentAdm,
                                      username: '',
                                      password: '',
                                      isAccessEnabled: false,
                                    };
                                    const nextCfg = { ...draftConfig, adminAccount: nextAdm };
                                    setDraftConfig(nextCfg);
                                    onUpdateSiteConfig(nextCfg);
                                    showNotification(
                                      'Username & Password akses login Admin telah DIHAPUS oleh Developer. Admin tidak dapat login hingga dibuat kembali.'
                                    );
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Hapus Akses Login Admin</span>
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-600 block mb-1">
                                  Username Login Admin
                                </label>
                                <input
                                  type="text"
                                  value={draftConfig.adminAccount?.username ?? ''}
                                  onChange={(e) => {
                                    const nextAdm: AccountProfileData = {
                                      ...(draftConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount),
                                      username: e.target.value,
                                      isAccessEnabled: true,
                                    };
                                    setDraftConfig({ ...draftConfig, adminAccount: nextAdm });
                                  }}
                                  placeholder="Masukkan Username Admin (contoh: UPTQJAYA)"
                                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-600 block mb-1">
                                  Password Login Admin (Hanya Developer yang Bisa Membuat/Mengedit)
                                </label>
                                <div className="relative">
                                  <input
                                    type={showAdminPassEdit ? 'text' : 'password'}
                                    value={draftConfig.adminAccount?.password ?? ''}
                                    onChange={(e) => {
                                      const nextAdm: AccountProfileData = {
                                        ...(draftConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount),
                                        password: e.target.value,
                                        isAccessEnabled: true,
                                      };
                                      setDraftConfig({ ...draftConfig, adminAccount: nextAdm });
                                    }}
                                    placeholder="Masukkan Password Admin (contoh: Z4MZ4M4)"
                                    className="w-full px-3.5 py-2 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowAdminPassEdit(!showAdminPassEdit)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                                  >
                                    {showAdminPassEdit ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#02182c]">
                                2. Biodata Diri &amp; Foto Profil Admin (Default: /admiin.png)
                              </h4>
                              <button
                                type="button"
                                onClick={() => {
                                  const currentAdm = draftConfig.adminAccount || DEFAULT_SITE_CONFIG.adminAccount;
                                  const nextAdm: AccountProfileData = {
                                    ...currentAdm,
                                    fullName: 'Admin UPTQ',
                                    roleTitle: 'Administrator Portal',
                                    avatarUrl: '/admiin.png',
                                  };
                                  const nextCfg = { ...draftConfig, adminAccount: nextAdm };
                                  setDraftConfig(nextCfg);
                                  onUpdateSiteConfig(nextCfg);
                                  showNotification('Biodata & foto Admin diset ke default.');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Reset Foto Admin ke /admiin.png</span>
                              </button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              <img
                                src={
                                  draftConfig.adminAccount?.avatarUrl ||
                                  '/admiin.png'
                                }
                                alt="Foto Admin"
                                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shrink-0"
                              />
                              <div className="flex-1 w-full space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <label className="px-3.5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Upload / Ganti Foto Admin dari Perangkat</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleAccountAvatarDeviceUpload(e, 'adminAccount', 'Admin')
                                      }
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  value={draftConfig.adminAccount?.avatarUrl || ''}
                                  onChange={(e) =>
                                    handleUpdateAccountField('adminAccount', 'avatarUrl', e.target.value)
                                  }
                                  placeholder="/admiin.png"
                                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap Admin</label>
                                <input
                                  type="text"
                                  value={draftConfig.adminAccount?.fullName || ''}
                                  onChange={(e) =>
                                    handleUpdateAccountField('adminAccount', 'fullName', e.target.value)
                                  }
                                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-600 block mb-1">Jabatan / Peran Admin</label>
                                <input
                                  type="text"
                                  value={draftConfig.adminAccount?.roleTitle || ''}
                                  onChange={(e) =>
                                    handleUpdateAccountField('adminAccount', 'roleTitle', e.target.value)
                                  }
                                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-600 block mb-1">NIM / NIP / ID Admin</label>
                                <input
                                  type="text"
                                  value={draftConfig.adminAccount?.nimOrNip || ''}
                                  onChange={(e) =>
                                    handleUpdateAccountField('adminAccount', 'nimOrNip', e.target.value)
                                  }
                                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <form
                          onSubmit={handleSaveSiteConfig}
                          className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h3 className="text-base font-extrabold text-[#02182c]">
                                Biodata Diri, Foto Profil Developer (Default: /developer.png) &amp; Akses Login
                              </h3>
                              <p className="text-xs text-slate-500">
                                Ubah biodata Developer serta upload foto profil Developer langsung dari penyimpanan perangkat.
                              </p>
                            </div>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                            >
                              Simpan Biodata &amp; Akses Developer
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <img
                              src={
                                draftConfig.developerAccount?.avatarUrl ||
                                '/developer.png'
                              }
                              alt="Foto Developer"
                              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-300 shrink-0"
                            />
                            <div className="flex-1 w-full space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <label className="px-3.5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload Foto Profil Developer dari Perangkat</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleAccountAvatarDeviceUpload(e, 'developerAccount', 'Developer')
                                    }
                                    className="hidden"
                                  />
                                </label>
                              </div>
                              <input
                                type="text"
                                value={draftConfig.developerAccount?.avatarUrl || ''}
                                onChange={(e) =>
                                  handleUpdateAccountField('developerAccount', 'avatarUrl', e.target.value)
                                }
                                placeholder="/developer.png"
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-200">
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">
                                Username Login Developer (Default: UPTQJAYA)
                              </label>
                              <input
                                type="text"
                                value={draftConfig.developerAccount?.username || ''}
                                onChange={(e) =>
                                  handleUpdateAccountField('developerAccount', 'username', e.target.value)
                                }
                                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">
                                Password Login Developer (Default: F1R6M6N6)
                              </label>
                              <div className="relative">
                                <input
                                  type={showDevPassEdit ? 'text' : 'password'}
                                  value={draftConfig.developerAccount?.password || ''}
                                  onChange={(e) =>
                                    handleUpdateAccountField('developerAccount', 'password', e.target.value)
                                  }
                                  className="w-full px-3.5 py-2 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowDevPassEdit(!showDevPassEdit)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                                >
                                  {showDevPassEdit ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap Developer</label>
                              <input
                                type="text"
                                value={draftConfig.developerAccount?.fullName || ''}
                                onChange={(e) =>
                                  handleUpdateAccountField('developerAccount', 'fullName', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">Jabatan / Role Developer</label>
                              <input
                                type="text"
                                value={draftConfig.developerAccount?.roleTitle || ''}
                                onChange={(e) =>
                                  handleUpdateAccountField('developerAccount', 'roleTitle', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-600 block mb-1">ID / NIP Developer</label>
                              <input
                                type="text"
                                value={draftConfig.developerAccount?.nimOrNip || ''}
                                onChange={(e) =>
                                  handleUpdateAccountField('developerAccount', 'nimOrNip', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                              />
                            </div>
                          </div>
                        </form>
                      </>
                    )}

                    {isAdminOnly && (
                      <form
                        onSubmit={handleSaveSiteConfig}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h3 className="text-base font-extrabold text-[#02182c]">
                              Biodata Diri &amp; Foto Profil Admin (Upload dari Penyimpanan Perangkat)
                            </h3>
                            <p className="text-xs text-slate-500">
                              Silakan perbarui biodata diri Anda dan unggah foto profil langsung dari perangkat.
                            </p>
                          </div>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Simpan Biodata &amp; Foto Admin
                          </button>
                        </div>

                        <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <img
                            src={
                              draftConfig.adminAccount?.avatarUrl ||
                              '/admiin.png'
                            }
                            alt="Foto Profil Admin"
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-300 shrink-0"
                          />
                          <div className="flex-1 w-full space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="px-4 py-2 rounded-xl bg-[#0047CC] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Foto Profil dari Penyimpanan Perangkat</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleAccountAvatarDeviceUpload(e, 'adminAccount', 'Admin')
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={draftConfig.adminAccount?.avatarUrl || ''}
                              onChange={(e) =>
                                handleUpdateAccountField('adminAccount', 'avatarUrl', e.target.value)
                              }
                              placeholder="/admiin.png"
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap Admin</label>
                            <input
                              type="text"
                              value={draftConfig.adminAccount?.fullName || ''}
                              onChange={(e) =>
                                handleUpdateAccountField('adminAccount', 'fullName', e.target.value)
                              }
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">Jabatan / Peran di UPTQ</label>
                            <input
                              type="text"
                              value={draftConfig.adminAccount?.roleTitle || ''}
                              onChange={(e) =>
                                handleUpdateAccountField('adminAccount', 'roleTitle', e.target.value)
                              }
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-600 block mb-1">NIM / NIP / ID Pengurus</label>
                            <input
                              type="text"
                              value={draftConfig.adminAccount?.nimOrNip || ''}
                              onChange={(e) =>
                                handleUpdateAccountField('adminAccount', 'nimOrNip', e.target.value)
                              }
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};
