// === PersonalDB — Section Renderers ===

function renderSection(name) {
  switch(name) {
    case 'dashboard': renderDashboard(); break;
    case 'notes': renderNotes(); break;
    case 'commands': renderCommands(); break;
    case 'passwords': renderPasswords(); break;
    case 'network': renderNetwork(); break;
    case 'projects': renderProjects(); break;
    case 'tools': renderTools(); break;
    case 'subjects': renderSubjects(); break;
    case 'assignments': renderAssignments(); break;
    case 'grades': renderGrades(); break;
    case 'gallery': renderGallery(); break;
    case 'contacts': renderContacts(); break;
    case 'finances': renderFinances(); break;
    case 'general': renderGeneral(); break;
    case 'links': renderLinks(); break;
    case 'settings': renderSettings(); break;
  }
}

// ========== DASHBOARD ==========
function renderDashboard() {
  const stats = [
    { icon: '📝', label: 'MÄRKMED', num: Notes.getAll().length },
    { icon: '⌨️', label: 'KÄSUD', num: Commands.getAll().length },
    { icon: '💻', label: 'PROJEKTID', num: Projects.getAll().length },
    { icon: '📚', label: 'AINED', num: Subjects.getAll().length },
    { icon: '🖼️', label: 'PILDID', num: Gallery.getAll().length },
    { icon: '👤', label: 'KONTAKTID', num: Contacts.getAll().length },
    { icon: '🔐', label: 'PAROOLID', num: Passwords.getAll().length },
    { icon: '📋', label: 'KODUTÖÖD', num: Assignments.getAll().length },
  ];

  document.getElementById('statsGrid').innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  // Recent notes
  const recentNotes = Notes.getAll().slice(0, 4);
  document.getElementById('recentNotes').innerHTML = recentNotes.length
    ? recentNotes.map(n => `
        <div class="recent-item" onclick="showSection('notes')">
          <div class="ri-title">${escapeHtml(n.title || '(pealkirjata)')}</div>
          <div class="ri-meta">${timeAgo(n.createdAt)}</div>
        </div>
      `).join('')
    : '<div class="recent-item"><div class="ri-title" style="color:var(--text3)">' + t('no_notes') + '</div></div>';

  // Upcoming deadlines
  const deadlines = Assignments.getUpcoming();
  document.getElementById('upcomingDeadlines').innerHTML = deadlines.length
    ? deadlines.map(a => `
        <div class="recent-item" onclick="showSection('assignments')">
          <div class="ri-title">${escapeHtml(a.title)}</div>
          <div class="ri-meta">${deadlineBadge(a.deadline)} · ${escapeHtml(a.subject || '')}</div>
        </div>
      `).join('')
    : '<div class="recent-item"><div class="ri-title" style="color:var(--text3)">' + t('no_deadlines') + '</div></div>';

  // Recent projects
  const projects = Projects.getAll().slice(0, 4);
  document.getElementById('recentProjects').innerHTML = projects.length
    ? projects.map(p => `
        <div class="recent-item" onclick="showSection('projects')">
          <div class="ri-title">${escapeHtml(p.name)}</div>
          <div class="ri-meta">${escapeHtml(p.status || '')} · ${escapeHtml(p.stack || '').split(',')[0]}</div>
        </div>
      `).join('')
    : '<div class="recent-item"><div class="ri-title" style="color:var(--text3)">' + t('no_projects') + '</div></div>';
}

// ========== NOTES ==========
function renderNotes(filter, tagFilter) {
  let notes = Notes.getAll();
  const q = filter || document.getElementById('noteSearch')?.value?.toLowerCase() || '';
  const tag = tagFilter || document.getElementById('noteTagFilter')?.value || '';

  if (q) notes = notes.filter(n => n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q) || n.tags?.toLowerCase().includes(q));
  if (tag) notes = notes.filter(n => n.tags?.toLowerCase().includes(tag.toLowerCase()));

  // Update tag filter
  const allTags = [...new Set(Notes.getAll().flatMap(n => (n.tags || '').split(',').map(t => t.trim()).filter(Boolean)))];
  const tagSel = document.getElementById('noteTagFilter');
  if (tagSel) {
    const curVal = tagSel.value;
    tagSel.innerHTML = '<option value="">Kõik sildid</option>' + allTags.map(t => `<option value="${escapeHtml(t)}" ${t === curVal ? 'selected' : ''}>${escapeHtml(t)}</option>`).join('');
  }

  const container = document.getElementById('notesList');
  if (!notes.length) { container.innerHTML = renderEmptyState('📝', t('empty_notes')); return; }

  container.innerHTML = notes.map(n => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('note','${n.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('notes','${n.id}','notes')" title="Kustuta">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(n.title || '(pealkirjata)')}</div>
      <div class="card-subtitle">${timeAgo(n.createdAt)}</div>
      <div class="card-body">${escapeHtml(n.content || '').replace(/\n/g, '<br>')}</div>
      ${n.tags ? `<div class="card-tags">${n.tags.split(',').map(t => `<span class="tag">${escapeHtml(t.trim())}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');
}

function filterNotes() { renderNotes(); }

// ========== COMMANDS ==========
function renderCommands(searchVal, catVal) {
  let cmds = Commands.getAll();
  const q = searchVal || document.getElementById('cmdSearch')?.value?.toLowerCase() || '';
  const cat = catVal || document.getElementById('cmdCatFilter')?.value || '';

  if (q) cmds = cmds.filter(c => c.name?.toLowerCase().includes(q) || c.command?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q));
  if (cat) cmds = cmds.filter(c => c.category === cat);

  const container = document.getElementById('commandsList');
  if (!cmds.length) { container.innerHTML = renderEmptyState('⌨️', t('empty_commands')); return; }

  container.innerHTML = cmds.map(c => `
    <div class="cmd-card">
      <div class="cmd-header">
        <div class="cmd-meta">
          <div class="cmd-name">${escapeHtml(c.name)}</div>
          <div class="cmd-cat"><span class="tag ${categoryColor(c.category)}">${escapeHtml(c.category || 'Muu')}</span></div>
        </div>
        <div style="display:flex;gap:4px;flex-shrink:0">
          <button class="btn-icon copy" onclick="copyToClipboard('${escapeHtml(c.command).replace(/'/g, "\\'")}')" title="Kopeeri">📋</button>
          <button class="btn-icon" onclick="openEditModal('command','${c.id}')" title="Muuda">✏️</button>
          <button class="btn-icon del" onclick="confirmDelete('commands','${c.id}','commands')" title="Kustuta">🗑️</button>
        </div>
      </div>
      <div class="cmd-code" onclick="copyToClipboard('${escapeHtml(c.command).replace(/'/g, "\\'")}')">${escapeHtml(c.command)}</div>
      ${c.description ? `<div class="cmd-desc">${escapeHtml(c.description)}</div>` : ''}
    </div>
  `).join('');
}

function filterCommands() { renderCommands(); }

// ========== PASSWORDS ==========
function renderPasswords() {
  let passes = Passwords.getAll();
  const q = document.getElementById('passSearch')?.value?.toLowerCase() || '';
  if (q) passes = passes.filter(p => p.service?.toLowerCase().includes(q) || p.username?.toLowerCase().includes(q));

  const container = document.getElementById('passwordsList');
  if (!passes.length) { container.innerHTML = renderEmptyState('🔐', t('empty_passwords')); return; }

  container.innerHTML = passes.map(p => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon copy" onclick="copyToClipboard('${escapeHtml(p.password).replace(/'/g, "\\'")}')" title="Kopeeri parool">📋</button>
        <button class="btn-icon" onclick="openEditModal('password','${p.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('passwords','${p.id}','passwords')" title="Kustuta">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(p.service)}</div>
      <div class="card-subtitle">${escapeHtml(p.username || '')}</div>
      <div style="margin:8px 0">
        <span style="font-family:var(--font-mono);font-size:13px;" class="pass-hidden" title="Klõpsa kuvamiseks">${escapeHtml(p.password || '')}</span>
      </div>
      ${p.url ? `<a href="${escapeHtml(p.url)}" target="_blank" style="font-size:12px;color:var(--accent2);font-family:var(--font-mono);">🔗 ${escapeHtml(p.url)}</a>` : ''}
      ${p.notes ? `<div class="card-body" style="margin-top:8px">${escapeHtml(p.notes)}</div>` : ''}
      <div style="margin-top:8px;font-size:11px;color:var(--text3);font-family:var(--font-mono);">Muudetud: ${formatDate(p.updatedAt || p.createdAt)}</div>
    </div>
  `).join('');
}

function filterPasswords() { renderPasswords(); }

// ========== NETWORK ==========
function renderNetwork() {
  const nets = Network.getAll();
  const container = document.getElementById('networkList');
  if (!nets.length) { container.innerHTML = renderEmptyState('🌐', t('empty_network')); return; }

  container.innerHTML = nets.map(n => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('network','${n.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('network','${n.id}','network')" title="Kustuta">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(n.name)}</div>
      <div class="card-subtitle"><span class="tag blue">${escapeHtml(n.type || 'Seade')}</span></div>
      <div class="card-body" style="font-family:var(--font-mono);font-size:12px;margin-top:8px">
        ${n.ip ? `<div>IP: <strong>${escapeHtml(n.ip)}</strong> <button class="btn-icon copy" style="display:inline-flex;width:22px;height:22px;font-size:11px;" onclick="copyToClipboard('${n.ip}')">📋</button></div>` : ''}
        ${n.mac ? `<div>MAC: ${escapeHtml(n.mac)}</div>` : ''}
        ${n.subnet ? `<div>Subnet: ${escapeHtml(n.subnet)}</div>` : ''}
        ${n.gateway ? `<div>Gateway: ${escapeHtml(n.gateway)}</div>` : ''}
        ${n.dns ? `<div>DNS: ${escapeHtml(n.dns)}</div>` : ''}
        ${n.ssid ? `<div>SSID: ${escapeHtml(n.ssid)}</div>` : ''}
        ${n.port ? `<div>Port: ${escapeHtml(n.port)}</div>` : ''}
      </div>
      ${n.notes ? `<div class="card-body">${escapeHtml(n.notes)}</div>` : ''}
    </div>
  `).join('');
}

// ========== PROJECTS ==========
function renderProjects() {
  let projs = Projects.getAll();
  const status = document.getElementById('projStatus')?.value || '';
  if (status) projs = projs.filter(p => p.status === status);

  const container = document.getElementById('projectsList');
  if (!projs.length) { container.innerHTML = renderEmptyState('💻', t('empty_projects')); return; }

  const statusClass = { 'Aktiivne': 'active', 'Paus': 'pause', 'Lõpetatud': 'done', 'Idee': 'idea' };

  container.innerHTML = projs.map(p => `
    <div class="project-card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('project','${p.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('projects','${p.id}','projects')" title="Kustuta">🗑️</button>
      </div>
      <div class="project-status status-${statusClass[p.status] || 'active'}">${escapeHtml(p.status || 'Aktiivne')}</div>
      <div class="project-title">${escapeHtml(p.name)}</div>
      <div class="project-desc">${escapeHtml(p.description || '')}</div>
      ${p.stack ? `<div class="project-stack">${p.stack.split(',').map(s => `<span class="tag blue">${escapeHtml(s.trim())}</span>`).join('')}</div>` : ''}
      ${p.github ? `<a href="${escapeHtml(p.github)}" target="_blank" class="project-link">🐙 GitHub</a>` : ''}
      ${p.url ? `<a href="${escapeHtml(p.url)}" target="_blank" class="project-link" style="margin-left:10px">🌐 Live</a>` : ''}
      <div style="font-size:11px;color:var(--text3);margin-top:12px;font-family:var(--font-mono)">Loodud: ${formatDate(p.createdAt)}</div>
    </div>
  `).join('');
}

function filterProjects() { renderProjects(); }

// ========== TOOLS ==========
function renderTools() {
  const tools = Tools.getAll();
  const container = document.getElementById('toolsList');
  if (!tools.length) { container.innerHTML = renderEmptyState('🛠️', t('empty_tools')); return; }

  container.innerHTML = tools.map(t => `
    <div class="tool-card" onclick="${t.url ? `window.open('${escapeHtml(t.url)}','_blank')` : ''}">
      <button class="tool-del" onclick="event.stopPropagation();confirmDelete('tools','${t.id}','tools')">✕</button>
      <div class="tool-icon">${escapeHtml(t.icon || '🔧')}</div>
      <div class="tool-name">${escapeHtml(t.name)}</div>
      <div class="tool-desc">${escapeHtml(t.description || '')}</div>
    </div>
  `).join('');
}

// ========== SUBJECTS ==========
function renderSubjects() {
  const subs = Subjects.getAll();
  const container = document.getElementById('subjectsList');
  if (!subs.length) { container.innerHTML = renderEmptyState('📚', t('empty_subjects')); return; }

  container.innerHTML = subs.map(s => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('subject','${s.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('subjects','${s.id}','subjects')" title="Kustuta">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(s.name)}</div>
      <div class="card-subtitle">${escapeHtml(s.teacher || '')} ${s.credits ? '· ' + s.credits + ' EAP' : ''}</div>
      <div class="card-body">${escapeHtml(s.notes || '')}</div>
      ${s.resources ? `<div style="margin-top:8px;font-size:12px;color:var(--accent2)">${escapeHtml(s.resources)}</div>` : ''}
    </div>
  `).join('');
}

// ========== ASSIGNMENTS ==========
function renderAssignments() {
  let assigns = Assignments.getAll();
  const filter = document.getElementById('assignFilter')?.value || '';

  if (filter === 'Tegemata') assigns = assigns.filter(a => !a.status || a.status === 'Tegemata');
  else if (filter === 'Tegemisel') assigns = assigns.filter(a => a.status === 'Tegemisel');
  else if (filter === 'Tehtud') assigns = assigns.filter(a => a.done || a.status === 'Tehtud');

  assigns.sort((a,b) => {
    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const container = document.getElementById('assignmentsList');
  if (!assigns.length) { container.innerHTML = renderEmptyState('📋', t('empty_assignments')); return; }

  container.innerHTML = assigns.map(a => `
    <div class="assign-item ${a.done ? 'done' : ''}">
      <div class="assign-cb" onclick="toggleAssignment('${a.id}')">${a.done ? '✓' : ''}</div>
      <div class="assign-body">
        <div class="assign-title">${escapeHtml(a.title)}</div>
        <div class="assign-meta">${escapeHtml(a.subject || '')} ${a.deadline ? '· ' + formatDate(a.deadline) : ''}</div>
      </div>
      ${a.deadline && !a.done ? deadlineBadge(a.deadline) : ''}
      <div style="display:flex;gap:4px">
        <button class="btn-icon" onclick="openEditModal('assignment','${a.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('assignments','${a.id}','assignments')">🗑️</button>
      </div>
    </div>
  `).join('');
}

function filterAssignments() { renderAssignments(); }

function toggleAssignment(id) {
  const a = getItem('assignments', id);
  if (a) {
    updateItem('assignments', id, { done: !a.done });
    renderAssignments();
  }
}

// ========== GRADES ==========
function renderGrades() {
  const grades = Grades.getAll();
  const avg = Grades.getAverage();

  const avgEl = document.getElementById('gradeAvg');
  if (avg) {
    avgEl.innerHTML = `
      <div class="grade-avg-num">${avg}</div>
      <div>
        <div style="font-size:15px;font-weight:700">${t('grade_avg_label')}</div>
        <div class="grade-avg-label">${grades.length} ${t('grades_total')}</div>
      </div>
    `;
  } else {
    avgEl.innerHTML = '';
  }

  const container = document.getElementById('gradesList');
  if (!grades.length) { container.innerHTML = renderEmptyState('🎓', t('empty_grades')); return; }

  container.innerHTML = grades.map(g => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('grade','${g.id}')" title="Muuda">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('grades','${g.id}','grades')">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(g.subject)}</div>
      <div class="card-subtitle">${escapeHtml(g.assignment || '')} · ${formatDate(g.date)}</div>
      <div class="grade-score">${escapeHtml(String(g.score))}</div>
      ${g.notes ? `<div class="card-body">${escapeHtml(g.notes)}</div>` : ''}
    </div>
  `).join('');
}

// ========== GALLERY ==========
function renderGallery() {
  let items = Gallery.getAll();
  const filter = document.getElementById('galleryFilter')?.value || '';
  if (filter) items = items.filter(i => i.album === filter);

  const container = document.getElementById('galleryGrid');
  if (!items.length) { container.innerHTML = renderEmptyState('🖼️', t('empty_gallery')); return; }

  container.innerHTML = items.map(item => `
    <div class="gallery-item">
      <button class="gallery-del" onclick="confirmDelete('gallery','${item.id}','gallery')" title="Kustuta">✕</button>
      ${item.src
        ? `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.caption || '')}" onclick="openLightbox('${escapeHtml(item.src)}','${escapeHtml(item.caption || '')}')" loading="lazy">`
        : `<div class="gallery-placeholder">🖼️</div>`
      }
      <div class="gallery-item-overlay">
        <div class="gallery-caption">${escapeHtml(item.caption || '')}</div>
        <div class="gallery-album">${escapeHtml(item.album || '')}</div>
      </div>
    </div>
  `).join('');
}

function filterGallery() { renderGallery(); }

// ========== CONTACTS ==========
function renderContacts() {
  let contacts = Contacts.getAll();
  const q = document.getElementById('contactSearch')?.value?.toLowerCase() || '';
  if (q) contacts = contacts.filter(c => c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q));

  contacts.sort((a,b) => (a.name || '').localeCompare(b.name || ''));

  const container = document.getElementById('contactsList');
  if (!contacts.length) { container.innerHTML = renderEmptyState('👤', t('empty_contacts')); return; }

  container.innerHTML = contacts.map(c => `
    <div class="contact-card">
      <div class="contact-avatar">${initials(c.name)}</div>
      <div class="contact-info">
        <div class="contact-name">${escapeHtml(c.name)}</div>
        <div class="contact-role">${escapeHtml(c.role || c.company || '')}</div>
        ${c.email ? `<div class="contact-detail">✉️ <a href="mailto:${escapeHtml(c.email)}" style="color:var(--accent2);font-size:12px;">${escapeHtml(c.email)}</a></div>` : ''}
        ${c.phone ? `<div class="contact-detail">📱 ${escapeHtml(c.phone)}</div>` : ''}
        ${c.notes ? `<div class="contact-detail" style="font-size:11px;color:var(--text3)">💬 ${escapeHtml(c.notes)}</div>` : ''}
      </div>
      <div class="card-actions" style="position:absolute;top:12px;right:12px">
        <button class="btn-icon" onclick="openEditModal('contact','${c.id}')">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('contacts','${c.id}','contacts')">🗑️</button>
      </div>
    </div>
  `).join('');
}

function filterContacts() { renderContacts(); }

// ========== FINANCES ==========
function renderFinances() {
  const summary = Finances.getSummary();
  document.getElementById('financeSummary').innerHTML = `
    <div class="fin-stat fin-income">
      <div class="fin-stat-label">TULU</div>
      <div class="fin-stat-value">+€${summary.income.toFixed(2)}</div>
    </div>
    <div class="fin-stat fin-expense">
      <div class="fin-stat-label">KULU</div>
      <div class="fin-stat-value">-€${summary.expense.toFixed(2)}</div>
    </div>
    <div class="fin-stat fin-total">
      <div class="fin-stat-label">JÄÄK</div>
      <div class="fin-stat-value">€${summary.total.toFixed(2)}</div>
    </div>
  `;

  let finances = Finances.getAll();
  const filter = document.getElementById('financeFilter')?.value || '';
  if (filter) finances = finances.filter(f => f.type === filter);

  const container = document.getElementById('financesList');
  if (!finances.length) { container.innerHTML = renderEmptyState('💰', t('empty_finances')); return; }

  container.innerHTML = finances.map(f => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('finance','${f.id}')">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('finances','${f.id}','finances')">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(f.description)}</div>
      <div class="card-subtitle">${formatDate(f.date)} · <span class="fin-badge ${f.type === 'Tulu' ? 'in' : 'out'}">${escapeHtml(f.type)}</span></div>
      <div style="font-size:22px;font-weight:800;color:${f.type === 'Tulu' ? 'var(--accent)' : '#ff4444'};margin:8px 0">
        ${f.type === 'Tulu' ? '+' : '-'}€${Number(f.amount || 0).toFixed(2)}
      </div>
      ${f.category ? `<span class="tag">${escapeHtml(f.category)}</span>` : ''}
    </div>
  `).join('');
}

function filterFinances() { renderFinances(); }

// ========== GENERAL ==========
function renderGeneral() {
  const items = General.getAll();
  const container = document.getElementById('generalList');
  if (!items.length) { container.innerHTML = renderEmptyState('ℹ️', t('empty_general')); return; }

  container.innerHTML = items.map(item => `
    <div class="card">
      <div class="card-actions">
        <button class="btn-icon" onclick="openEditModal('info','${item.id}')">✏️</button>
        <button class="btn-icon del" onclick="confirmDelete('general','${item.id}','general')">🗑️</button>
      </div>
      <div class="card-title">${escapeHtml(item.title)}</div>
      <div class="card-subtitle"><span class="tag">${escapeHtml(item.category || 'Üldine')}</span></div>
      <div class="card-body">${escapeHtml(item.content || '').replace(/\n/g, '<br>')}</div>
    </div>
  `).join('');
}

// ========== LINKS ==========
function renderLinks() {
  const links = Links.getAll();
  const container = document.getElementById('linksList');
  if (!links.length) { container.innerHTML = renderEmptyState('🔗', t('empty_links')); return; }

  container.innerHTML = links.map(l => `
    <a class="link-card" href="${escapeHtml(l.url || '#')}" target="_blank">
      <button class="tool-del" onclick="event.stopPropagation();event.preventDefault();confirmDelete('links','${l.id}','links')">✕</button>
      <div class="tool-icon">${escapeHtml(l.icon || '🔗')}</div>
      <div class="tool-name">${escapeHtml(l.name)}</div>
      <div class="tool-desc">${escapeHtml(l.description || '')}</div>
      <div style="font-size:10px;color:var(--text3);margin-top:6px;font-family:var(--font-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(l.url || '')}</div>
    </a>
  `).join('');
}

// ========== SETTINGS ==========
function renderSettings() {
  const stats = getDataStats();
  document.getElementById('dataStats').innerHTML = Object.entries(stats)
    .map(([k, v]) => `<div class="data-stat-row"><span>${k}</span><span>${v}</span></div>`)
    .join('');

  const curTheme = localStorage.getItem('pdb_theme') || 'dark';
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('theme' + curTheme.charAt(0).toUpperCase() + curTheme.slice(1));
  if (btn) btn.classList.add('active');
}

// ========== HELPER ==========
function confirmDelete(collection, id, sectionName) {
  if (confirm(t('confirm_delete'))) {
    deleteItem(collection, id);
    showToast(t('toast_deleted'));
    renderSection(sectionName);
    if (sectionName === 'dashboard') renderDashboard();
  }
}
