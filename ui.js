// === PersonalDB — UI Utilities ===

// ========== TRANSLATIONS ==========
const TRANSLATIONS = {
  et: {
    nav_main: 'PÕHI', nav_dashboard: 'Dashboard', nav_notes: 'Märkmed', nav_search: 'Otsing',
    nav_it: 'IT TÖÖRIISTAD', nav_commands: 'Käsud & Skriptid', nav_passwords: 'Paroolid & Ligipääsud',
    nav_network: 'Võrgu Info', nav_projects: 'Projektid', nav_tools: 'Tööriistad & Lingid',
    nav_school: 'KOOL', nav_subjects: 'Ained & Õppematerjal', nav_assignments: 'Kodutööd & Tähtajad',
    nav_grades: 'Hinded', nav_personal: 'ISIKLIK', nav_gallery: 'Galerii', nav_contacts: 'Kontaktid',
    nav_finances: 'Rahandus', nav_general: 'Üldinfo', nav_links: 'Olulised Lingid',
    nav_system: 'SÜSTEEM', nav_settings: 'Seaded', nav_logout: 'Logi välja',
    export: 'Eksport', import: 'Import',
    set_theme: 'Teema', set_brightness: 'Heledus', set_language: 'Keel / Language',
    set_password: 'Muuda parooli', set_curpass: 'Praegune parool', set_newpass: 'Uus parool',
    set_repeatpass: 'Korda', set_changepass: 'Muuda parool', set_data: 'Andmed',
    set_data_desc: 'Kustuta kõik andmed (tagasipööramatu)', set_deleteall: 'Kustuta kõik andmed',
    set_stats: 'Statistika', theme_dark: 'Tume', theme_light: 'Hele', theme_cyber: 'Cyber',
    section_titles: {
      dashboard:'Dashboard', notes:'Märkmed', search:'Globaalne Otsing',
      commands:'Käsud & Skriptid', passwords:'Paroolid & Ligipääsud', network:'Võrgu Info',
      projects:'Projektid', tools:'Tööriistad', subjects:'Ained & Õppematerjal',
      assignments:'Kodutööd & Tähtajad', grades:'Hinded', gallery:'Galerii',
      contacts:'Kontaktid', finances:'Rahandus', general:'Üldinfo',
      links:'Olulised Lingid', settings:'Seaded'
    },
    toast_copied:'✓ Kopeeritud!', toast_exported:'✓ Andmed eksporditud!',
    toast_imported:'✓ Andmed imporditud! Laadin uuesti...', toast_import_err:'❌ Vigane fail!',
    toast_deleted:'✓ Kustutatud!', toast_saved:'✓ Salvestatud!',
    toast_updated:'✓ Uuendatud!', toast_added:'✓ Lisatud!',
    confirm_delete:'Kustuta see kirje?',
    confirm_import:'See kirjutab üle kõik praegused andmed. Jätka?',
    confirm_clearall:'Kustuta KÕIK andmed? Seda ei saa tagasi võtta!',
    confirm_clearall2:'Oled absoluutselt kindel?',
    confirm_logout:'Kas oled kindel, et soovid välja logida?',
    empty_notes:'Märkmeid pole. Lisa esimene!', empty_commands:'Käske pole. Lisa esimene!',
    empty_passwords:'Paroole pole. Lisa esimene!', empty_network:'Võrguinfot pole. Lisa esimene!',
    empty_projects:'Projekte pole. Lisa esimene!', empty_tools:'Tööriistu pole. Lisa esimene!',
    empty_subjects:'Aineid pole. Lisa esimene!', empty_assignments:'Kodutöid pole. Lisa esimene!',
    empty_grades:'Hindeid pole. Lisa esimene!', empty_gallery:'Pilte pole. Lisa esimene!',
    empty_contacts:'Kontakte pole. Lisa esimene!', empty_finances:'Kandeid pole. Lisa esimene!',
    empty_general:'Üldinfot pole. Lisa esimene!', empty_links:'Linke pole. Lisa esimene!',
    search_hint:'Sisesta vähemalt 2 tähemärki...', search_empty:'Tulemusi ei leitud.',
    recent_notes:'📝 Viimased märkmed', recent_deadlines:'📋 Lähenevad tähtajad',
    recent_projects:'💻 Viimased projektid', no_notes:'Märkmeid pole veel',
    no_deadlines:'Lähenevaid tähtaegu pole', no_projects:'Projekte pole veel',
    overview:'Ülevaade', deadline_expired:'AEGUNUD', deadline_today:'TÄNA!',
    days_sfx:'p tagasi', hours_sfx:'h tagasi', mins_sfx:'m tagasi', just_now:'äsja',
    grade_avg_label:'Keskmine hinne', grades_total:'hinnet kokku',
    pass_changed:'✓ Parool muudetud!', data_cleared:'Kõik andmed kustutatud.',
    modal_add:'+ Lisa: ', modal_edit:'✏️ Muuda: ',
    btn_cancel:'Tühista', btn_save:'Salvesta',
    req_fields_err:'❌ Täida kohustuslikud väljad!',
    gallery_loaded:'✓ Pilt laetud! Salvesta kirje.',
    pass_wrong:'❌ Vale praegune parool.',
    pass_short:'❌ Uus parool peab olema vähemalt 6 tähemärki.',
    pass_mismatch:'❌ Uued paroolid ei kattu.',
    filter_all:'Kõik', filter_all_tags:'Kõik sildid',
    filter_all_cats:'Kõik kategooriad', filter_all_statuses:'Kõik staatused',
    filter_all_albums:'Kõik albumid'
  },
  en: {
    nav_main:'MAIN', nav_dashboard:'Dashboard', nav_notes:'Notes', nav_search:'Search',
    nav_it:'IT TOOLS', nav_commands:'Commands & Scripts', nav_passwords:'Passwords & Access',
    nav_network:'Network Info', nav_projects:'Projects', nav_tools:'Tools & Links',
    nav_school:'SCHOOL', nav_subjects:'Subjects & Materials', nav_assignments:'Homework & Deadlines',
    nav_grades:'Grades', nav_personal:'PERSONAL', nav_gallery:'Gallery', nav_contacts:'Contacts',
    nav_finances:'Finances', nav_general:'General Info', nav_links:'Important Links',
    nav_system:'SYSTEM', nav_settings:'Settings', nav_logout:'Log out',
    export:'Export', import:'Import',
    set_theme:'Theme', set_brightness:'Brightness', set_language:'Language / Keel',
    set_password:'Change password', set_curpass:'Current password', set_newpass:'New password',
    set_repeatpass:'Repeat', set_changepass:'Change password', set_data:'Data',
    set_data_desc:'Delete all data (irreversible)', set_deleteall:'Delete all data',
    set_stats:'Statistics', theme_dark:'Dark', theme_light:'Light', theme_cyber:'Cyber',
    section_titles: {
      dashboard:'Dashboard', notes:'Notes', search:'Global Search',
      commands:'Commands & Scripts', passwords:'Passwords & Access', network:'Network Info',
      projects:'Projects', tools:'Tools', subjects:'Subjects & Materials',
      assignments:'Homework & Deadlines', grades:'Grades', gallery:'Gallery',
      contacts:'Contacts', finances:'Finances', general:'General Info',
      links:'Important Links', settings:'Settings'
    },
    toast_copied:'✓ Copied!', toast_exported:'✓ Data exported!',
    toast_imported:'✓ Data imported! Reloading...', toast_import_err:'❌ Invalid file!',
    toast_deleted:'✓ Deleted!', toast_saved:'✓ Saved!',
    toast_updated:'✓ Updated!', toast_added:'✓ Added!',
    confirm_delete:'Delete this entry?',
    confirm_import:'This will overwrite all current data. Continue?',
    confirm_clearall:'Delete ALL data? This cannot be undone!',
    confirm_clearall2:'Are you absolutely sure?',
    confirm_logout:'Are you sure you want to log out?',
    empty_notes:'No notes yet. Add the first one!', empty_commands:'No commands yet. Add the first one!',
    empty_passwords:'No passwords yet. Add the first one!', empty_network:'No network info. Add the first one!',
    empty_projects:'No projects yet. Add the first one!', empty_tools:'No tools yet. Add the first one!',
    empty_subjects:'No subjects yet. Add the first one!', empty_assignments:'No assignments yet. Add the first one!',
    empty_grades:'No grades yet. Add the first one!', empty_gallery:'No images yet. Add the first one!',
    empty_contacts:'No contacts yet. Add the first one!', empty_finances:'No entries yet. Add the first one!',
    empty_general:'No general info. Add the first one!', empty_links:'No links yet. Add the first one!',
    search_hint:'Type at least 2 characters...', search_empty:'No results found.',
    recent_notes:'📝 Recent notes', recent_deadlines:'📋 Upcoming deadlines',
    recent_projects:'💻 Recent projects', no_notes:'No notes yet',
    no_deadlines:'No upcoming deadlines', no_projects:'No projects yet',
    overview:'Overview', deadline_expired:'EXPIRED', deadline_today:'TODAY!',
    days_sfx:'d ago', hours_sfx:'h ago', mins_sfx:'m ago', just_now:'just now',
    grade_avg_label:'Average grade', grades_total:'grades total',
    pass_changed:'✓ Password changed!', data_cleared:'All data deleted.',
    modal_add:'+ Add: ', modal_edit:'✏️ Edit: ',
    btn_cancel:'Cancel', btn_save:'Save',
    req_fields_err:'❌ Fill in required fields!',
    gallery_loaded:'✓ Image loaded! Save the entry.',
    pass_wrong:'❌ Wrong current password.',
    pass_short:'❌ New password must be at least 6 characters.',
    pass_mismatch:'❌ New passwords do not match.',
    filter_all:'All', filter_all_tags:'All tags',
    filter_all_cats:'All categories', filter_all_statuses:'All statuses',
    filter_all_albums:'All albums'
  }
};

let currentLang = localStorage.getItem('pdb_lang') || 'et';

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['et'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const tr = TRANSLATIONS[currentLang]?.[key];
    if (tr !== undefined) el.textContent = tr;
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('pdb_lang', lang);
  applyTranslations();
  updateLangBtn();
  updateLangOptBtns();
  // Re-render active section
  const active = document.querySelector('.nav-item.active[data-section]');
  if (active) {
    const sec = active.getAttribute('data-section');
    if (sec) {
      const titles = t('section_titles');
      document.getElementById('topbarTitle').textContent = titles[sec] || sec;
      renderSection(sec);
    }
  }
  showToast(lang === 'et' ? '🇪🇪 Eesti keel' : '🇬🇧 English');
}

function toggleLang() {
  setLang(currentLang === 'et' ? 'en' : 'et');
}

function updateLangBtn() {
  const flagEl = document.getElementById('langFlag');
  const labelEl = document.getElementById('langLabel');
  if (!flagEl || !labelEl) return;
  if (currentLang === 'et') {
    flagEl.textContent = '🇬🇧'; labelEl.textContent = 'EN';
  } else {
    flagEl.textContent = '🇪🇪'; labelEl.textContent = 'ET';
  }
}

function updateLangOptBtns() {
  const etBtn = document.getElementById('langOptEt');
  const enBtn = document.getElementById('langOptEn');
  if (etBtn) etBtn.classList.toggle('active', currentLang === 'et');
  if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');
}

// ========== CLOCK ==========
function startClock() {
  function tick() {
    const now = new Date();
    const timeEl = document.getElementById('clockTime');
    const dateEl = document.getElementById('clockDate');
    if (!timeEl || !dateEl) return;

    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    timeEl.textContent = `${hh}:${mm}:${ss}`;

    if (currentLang === 'et') {
      const days = ['Pühapäev','Esmaspäev','Teisipäev','Kolmapäev','Neljapäev','Reede','Laupäev'];
      const months = ['jaan','veebr','märts','apr','mai','juuni','juuli','aug','sept','okt','nov','dets'];
      dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;
    } else {
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ========== BRIGHTNESS ==========
function setBrightness(val) {
  const v = Math.max(30, Math.min(100, Number(val)));
  document.documentElement.style.filter = v < 100 ? `brightness(${v}%)` : '';
  localStorage.setItem('pdb_brightness', v);
  const el = document.getElementById('brightnessVal');
  if (el) el.textContent = v;
  const slider = document.getElementById('brightnessSlider');
  if (slider) slider.value = v;
}

function loadBrightness() {
  const saved = localStorage.getItem('pdb_brightness');
  if (saved) setBrightness(Number(saved));
}

// ========== TOAST ==========
function showToast(msg, type) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'error' ? ' error' : '');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0'; el.style.transition = 'opacity 0.3s';
    setTimeout(() => el.remove(), 300);
  }, 2500);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast(t('toast_copied'))).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    showToast(t('toast_copied'));
  });
}

// ========== DATE HELPERS ==========
function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return currentLang === 'et'
      ? d.toLocaleDateString('et-EE', {day:'2-digit',month:'2-digit',year:'numeric'})
      : d.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'});
  } catch(e) { return iso; }
}

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Math.floor((new Date() - new Date(iso)) / 1000);
  if (diff < 60) return t('just_now');
  if (diff < 3600) return Math.floor(diff/60) + t('mins_sfx');
  if (diff < 86400) return Math.floor(diff/3600) + t('hours_sfx');
  if (diff < 604800) return Math.floor(diff/86400) + t('days_sfx');
  return formatDate(iso);
}

function deadlineBadge(iso) {
  if (!iso) return '';
  const diff = Math.floor((new Date(iso) - new Date()) / 86400000);
  if (diff < 0) return `<span class="deadline-badge dl-urgent">${t('deadline_expired')}</span>`;
  if (diff === 0) return `<span class="deadline-badge dl-urgent">${t('deadline_today')}</span>`;
  if (diff <= 2) return `<span class="deadline-badge dl-urgent">${diff}d</span>`;
  if (diff <= 7) return `<span class="deadline-badge dl-soon">${diff}d</span>`;
  return `<span class="deadline-badge dl-ok">${diff}d</span>`;
}

// ========== HTML UTILS ==========
function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substr(0,2);
}

function categoryColor(cat) {
  const map = {Linux:'accent',Bash:'accent',Windows:'blue',PowerShell:'blue',Git:'orange',Docker:'blue',Network:'purple',Python:'orange'};
  return map[cat] || '';
}

function renderEmptyState(icon, text) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><p>${escapeHtml(text)}</p></div>`;
}

// ========== LAYOUT ==========
let sidebarOpen = true;

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const topbar = document.getElementById('topbar');
  const main = document.getElementById('mainContent');
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('mobile-open');
  } else {
    sidebarOpen = !sidebarOpen;
    if (sidebarOpen) {
      sidebar.classList.remove('collapsed');
      topbar.classList.remove('full');
      main.classList.remove('full');
    } else {
      sidebar.classList.add('collapsed');
      topbar.classList.add('full');
      main.classList.add('full');
    }
  }
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const sec = document.getElementById('sec-' + name);
  if (sec) sec.classList.add('active');

  const navItem = document.querySelector(`[data-section="${name}"]`);
  if (navItem) navItem.classList.add('active');

  const titles = t('section_titles');
  document.getElementById('topbarTitle').textContent = titles[name] || name;
  renderSection(name);

  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('mobile-open');
  }
}

// ========== THEME ==========
function setTheme(theme) {
  document.body.className = 'app-page' + (theme === 'dark' ? '' : ' theme-' + theme);
  localStorage.setItem('pdb_theme', theme);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('theme' + theme.charAt(0).toUpperCase() + theme.slice(1));
  if (btn) btn.classList.add('active');
}

function loadTheme() {
  setTheme(localStorage.getItem('pdb_theme') || 'dark');
}

// ========== LIGHTBOX ==========
function openLightbox(src, caption) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption || '';
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ========== GLOBAL SEARCH ==========
function globalSearchFn() {
  const q = document.getElementById('globalSearch').value.trim();
  const results = globalSearchAll(q);
  const container = document.getElementById('searchResults');
  if (!q || q.length < 2) {
    container.innerHTML = `<p style="color:var(--text3);font-size:13px;">${t('search_hint')}</p>`;
    return;
  }
  if (results.length === 0) {
    container.innerHTML = renderEmptyState('🔍', t('search_empty'));
    return;
  }
  container.innerHTML = results.map(r => `
    <div class="search-result-item" onclick="showSection('${r.section}')">
      <div class="sri-section">${r.label}</div>
      <div class="sri-title">${escapeHtml(r.title || '')}</div>
      ${r.preview ? `<div class="sri-preview">${escapeHtml(r.preview)}</div>` : ''}
    </div>
  `).join('');
}
