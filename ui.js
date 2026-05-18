// === PersonalDB — UI Utilities ===

function showToast(msg, type) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.className = 'toast' + (type === 'error' ? ' error' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 2500);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('✓ Kopeeritud!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✓ Kopeeritud!');
  });
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch(e) { return iso; }
}

function timeAgo(iso) {
  if (!iso) return '';
  const now = new Date();
  const then = new Date(iso);
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff/60) + 'm tagasi';
  if (diff < 86400) return Math.floor(diff/3600) + 'h tagasi';
  if (diff < 604800) return Math.floor(diff/86400) + 'p tagasi';
  return formatDate(iso);
}

function deadlineBadge(iso) {
  if (!iso) return '';
  const now = new Date();
  const deadline = new Date(iso);
  const diff = Math.floor((deadline - now) / 86400000);

  if (diff < 0) return `<span class="deadline-badge dl-urgent">AEGUNUD</span>`;
  if (diff === 0) return `<span class="deadline-badge dl-urgent">TÄNA!</span>`;
  if (diff <= 2) return `<span class="deadline-badge dl-urgent">${diff}p</span>`;
  if (diff <= 7) return `<span class="deadline-badge dl-soon">${diff}p</span>`;
  return `<span class="deadline-badge dl-ok">${diff}p</span>`;
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').toUpperCase().substr(0, 2);
}

function categoryColor(cat) {
  const map = {
    'Linux': 'accent', 'Bash': 'accent',
    'Windows': 'blue', 'PowerShell': 'blue',
    'Git': 'orange',
    'Docker': 'blue',
    'Network': 'purple',
    'Python': 'orange',
    'Muu': ''
  };
  return map[cat] || '';
}

function renderEmptyState(icon, text) {
  return `<div class="empty-state">
    <div class="empty-icon">${icon}</div>
    <p>${escapeHtml(text)}</p>
  </div>`;
}

// Sidebar & layout
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

  const titles = {
    dashboard: 'Dashboard',
    notes: 'Märkmed',
    search: 'Globaalne Otsing',
    commands: 'Käsud & Skriptid',
    passwords: 'Paroolid & Ligipääsud',
    network: 'Võrgu Info',
    projects: 'Projektid',
    tools: 'Tööriistad',
    subjects: 'Ained & Õppematerjal',
    assignments: 'Kodutööd & Tähtajad',
    grades: 'Hinded',
    gallery: 'Galerii',
    contacts: 'Kontaktid',
    finances: 'Rahandus',
    general: 'Üldinfo',
    links: 'Olulised Lingid',
    settings: 'Seaded'
  };

  document.getElementById('topbarTitle').textContent = titles[name] || name;

  renderSection(name);

  // Mobile: close sidebar on nav
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('mobile-open');
  }
}

function setTheme(t) {
  document.body.className = 'app-page' + (t === 'dark' ? '' : ' theme-' + t);
  localStorage.setItem('pdb_theme', t);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('theme' + t.charAt(0).toUpperCase() + t.slice(1));
  if (btn) btn.classList.add('active');
}

function loadTheme() {
  const t = localStorage.getItem('pdb_theme') || 'dark';
  setTheme(t);
}

// Lightbox
function openLightbox(src, caption) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption || '';
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// Modal overlay click
function closeModalOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
}

// Global search function
function globalSearchFn() {
  const q = document.getElementById('globalSearch').value.trim();
  const results = globalSearchAll(q);
  const container = document.getElementById('searchResults');

  if (!q || q.length < 2) {
    container.innerHTML = '<p style="color:var(--text3);font-size:13px;">Sisesta vähemalt 2 tähemärki...</p>';
    return;
  }

  if (results.length === 0) {
    container.innerHTML = renderEmptyState('🔍', 'Tulemusi ei leitud.');
    return;
  }

  container.innerHTML = results.map(r => `
    <div class="search-result-item" onclick="showSection('${r.section}')">
      <div class="sri-section">${r.label}</div>
      <div class="sri-title">${escapeHtml(r.title || '(pealkiri puudub)')}</div>
      ${r.preview ? `<div class="sri-preview">${escapeHtml(r.preview)}</div>` : ''}
    </div>
  `).join('');
}
