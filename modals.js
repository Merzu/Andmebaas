// === PersonalDB — Modal Forms ===

let currentModal = null;
let currentEditId = null;

const modalConfigs = {
  note: {
    title: 'Märkus',
    fields: [
      { id: 'title', label: 'Pealkiri', type: 'text', placeholder: 'Märkuse pealkiri', required: true },
      { id: 'content', label: 'Sisu', type: 'textarea', placeholder: 'Kirjuta siia...', rows: 6 },
      { id: 'tags', label: 'Sildid (komaga eraldatud)', type: 'text', placeholder: 'nt: IT, kool, isiklik' }
    ],
    collection: 'notes',
    section: 'notes'
  },
  command: {
    title: 'Käsk / Skript',
    fields: [
      { id: 'name', label: 'Nimetus', type: 'text', placeholder: 'nt: Docker konteinerid', required: true },
      { id: 'category', label: 'Kategooria', type: 'select', options: ['Linux','Windows','Git','Docker','Network','Python','Bash','PowerShell','Muu'] },
      { id: 'command', label: 'Käsk / Kood', type: 'textarea', placeholder: 'docker ps -a', rows: 4, mono: true, required: true },
      { id: 'description', label: 'Selgitus', type: 'textarea', placeholder: 'Mida see käsk teeb?', rows: 3 }
    ],
    collection: 'commands',
    section: 'commands'
  },
  password: {
    title: 'Parool / Ligipääs',
    fields: [
      { id: 'service', label: 'Teenus / Sait', type: 'text', placeholder: 'nt: GitHub, Google', required: true },
      { id: 'username', label: 'Kasutajanimi / Email', type: 'text', placeholder: 'kasutaja@email.com' },
      { id: 'password', label: 'Parool', type: 'text', placeholder: 'parool' },
      { id: 'url', label: 'URL', type: 'url', placeholder: 'https://...' },
      { id: 'notes', label: 'Märkused', type: 'textarea', placeholder: '2FA, taastekoodid jms', rows: 3 }
    ],
    collection: 'passwords',
    section: 'passwords'
  },
  network: {
    title: 'Võrguseade / Info',
    fields: [
      { id: 'name', label: 'Nimetus', type: 'text', placeholder: 'nt: Kodu router', required: true },
      { id: 'type', label: 'Tüüp', type: 'select', options: ['Router','Switch','Server','PC','Laptop','Printer','NAS','Muu'] },
      { id: 'ip', label: 'IP Aadress', type: 'text', placeholder: '192.168.1.1' },
      { id: 'mac', label: 'MAC Aadress', type: 'text', placeholder: 'aa:bb:cc:dd:ee:ff' },
      { id: 'subnet', label: 'Alamvõrk', type: 'text', placeholder: '255.255.255.0' },
      { id: 'gateway', label: 'Gateway', type: 'text', placeholder: '192.168.1.254' },
      { id: 'dns', label: 'DNS', type: 'text', placeholder: '8.8.8.8' },
      { id: 'ssid', label: 'SSID (WiFi nimi)', type: 'text', placeholder: 'KoduVõrk' },
      { id: 'port', label: 'Port(id)', type: 'text', placeholder: '22, 80, 443' },
      { id: 'notes', label: 'Märkused', type: 'textarea', placeholder: 'Lisainfo...', rows: 3 }
    ],
    collection: 'network',
    section: 'network'
  },
  project: {
    title: 'Projekt',
    fields: [
      { id: 'name', label: 'Projekti nimi', type: 'text', placeholder: 'Minu Projekt', required: true },
      { id: 'status', label: 'Staatus', type: 'select', options: ['Aktiivne','Tegemisel','Paus','Lõpetatud','Idee'] },
      { id: 'description', label: 'Kirjeldus', type: 'textarea', placeholder: 'Mida see projekt teeb?', rows: 4 },
      { id: 'stack', label: 'Tehnoloogiad (komaga)', type: 'text', placeholder: 'Python, React, Docker' },
      { id: 'github', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/kasutaja/repo' },
      { id: 'url', label: 'Live URL', type: 'url', placeholder: 'https://minu-sait.ee' },
      { id: 'notes', label: 'Märkused', type: 'textarea', placeholder: 'TODO, probleemid jms', rows: 3 }
    ],
    collection: 'projects',
    section: 'projects'
  },
  tool: {
    title: 'Tööriist',
    fields: [
      { id: 'name', label: 'Nimi', type: 'text', placeholder: 'VS Code', required: true },
      { id: 'icon', label: 'Emoji ikoon', type: 'text', placeholder: '🔧' },
      { id: 'description', label: 'Kirjeldus', type: 'text', placeholder: 'Mida see tööriist teeb' },
      { id: 'url', label: 'URL / allalaadimislink', type: 'url', placeholder: 'https://...' }
    ],
    collection: 'tools',
    section: 'tools'
  },
  subject: {
    title: 'Aine',
    fields: [
      { id: 'name', label: 'Aine nimi', type: 'text', placeholder: 'Matemaatika', required: true },
      { id: 'teacher', label: 'Õpetaja / Lektor', type: 'text', placeholder: 'Jaan Tamm' },
      { id: 'credits', label: 'EAP / Ainepunktid', type: 'number', placeholder: '6' },
      { id: 'schedule', label: 'Tunniplaan', type: 'text', placeholder: 'T 10:00, N 14:00' },
      { id: 'resources', label: 'Õppematerjalid / Lingid', type: 'textarea', placeholder: 'Õpiku nimi, veebiaadressid...', rows: 3 },
      { id: 'notes', label: 'Märkused', type: 'textarea', placeholder: 'Eksami info, nõuded jms', rows: 3 }
    ],
    collection: 'subjects',
    section: 'subjects'
  },
  assignment: {
    title: 'Kodutöö / Ülesanne',
    fields: [
      { id: 'title', label: 'Ülesande nimi', type: 'text', placeholder: 'Matemaatika kodutöö', required: true },
      { id: 'subject', label: 'Aine', type: 'text', placeholder: 'Matemaatika' },
      { id: 'deadline', label: 'Tähtaeg', type: 'date' },
      { id: 'status', label: 'Staatus', type: 'select', options: ['Tegemata','Tegemisel','Tehtud'] },
      { id: 'description', label: 'Kirjeldus / Nõuded', type: 'textarea', placeholder: 'Mida on vaja teha?', rows: 4 }
    ],
    collection: 'assignments',
    section: 'assignments'
  },
  grade: {
    title: 'Hinne',
    fields: [
      { id: 'subject', label: 'Aine', type: 'text', placeholder: 'Matemaatika', required: true },
      { id: 'assignment', label: 'Töö liik', type: 'text', placeholder: 'Eksam, kontrolltöö, kodutöö...' },
      { id: 'score', label: 'Hinne / Punktid', type: 'text', placeholder: 'A, 5, 85/100', required: true },
      { id: 'date', label: 'Kuupäev', type: 'date' },
      { id: 'notes', label: 'Kommentaar', type: 'textarea', placeholder: 'Märkused hinde kohta', rows: 2 }
    ],
    collection: 'grades',
    section: 'grades'
  },
  gallery: {
    title: 'Pilt',
    fields: [
      { id: 'caption', label: 'Pealkiri / Kirjeldus', type: 'text', placeholder: 'Pildi kirjeldus', required: true },
      { id: 'album', label: 'Album', type: 'select', options: ['Kool','Eraelu','Projektid','Muu'] },
      { id: 'src', label: 'Pildi URL (või paste base64)', type: 'text', placeholder: 'https://... või data:image/...' },
      { id: 'date', label: 'Kuupäev', type: 'date' }
    ],
    collection: 'gallery',
    section: 'gallery',
    extraHtml: `<div class="form-group">
      <label>Laadi pilt üles (alternatiiv URL-ile)</label>
      <input type="file" id="galleryFile" accept="image/*" onchange="handleGalleryUpload(event)" style="color:var(--text2)">
    </div>`
  },
  contact: {
    title: 'Kontakt',
    fields: [
      { id: 'name', label: 'Täisnimi', type: 'text', placeholder: 'Jaan Tamm', required: true },
      { id: 'role', label: 'Ametinimetus / Roll', type: 'text', placeholder: 'IT spetsialist' },
      { id: 'company', label: 'Ettevõte / Kool', type: 'text', placeholder: 'Ettevõte OÜ' },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'jaan@email.com' },
      { id: 'phone', label: 'Telefon', type: 'text', placeholder: '+372 5555 5555' },
      { id: 'address', label: 'Aadress', type: 'text', placeholder: 'Tallinn, Estonia' },
      { id: 'notes', label: 'Märkused', type: 'textarea', placeholder: 'Kust tuttav, millal kohtusime...', rows: 3 }
    ],
    collection: 'contacts',
    section: 'contacts'
  },
  finance: {
    title: 'Finantskanne',
    fields: [
      { id: 'description', label: 'Kirjeldus', type: 'text', placeholder: 'Palk, rent, toit...', required: true },
      { id: 'amount', label: 'Summa (€)', type: 'number', placeholder: '0.00' },
      { id: 'type', label: 'Tüüp', type: 'select', options: ['Tulu','Kulu'] },
      { id: 'category', label: 'Kategooria', type: 'text', placeholder: 'Toit, Transport, Sissetulek...' },
      { id: 'date', label: 'Kuupäev', type: 'date' },
      { id: 'notes', label: 'Märkused', type: 'text', placeholder: 'Lisainfo' }
    ],
    collection: 'finances',
    section: 'finances'
  },
  info: {
    title: 'Üldinfo',
    fields: [
      { id: 'title', label: 'Pealkiri', type: 'text', placeholder: 'Info pealkiri', required: true },
      { id: 'category', label: 'Kategooria', type: 'text', placeholder: 'IT, Isiklik, Seadused, Tervishoid...' },
      { id: 'content', label: 'Sisu', type: 'textarea', placeholder: 'Kirjuta siia kõik oluline info...', rows: 8 }
    ],
    collection: 'general',
    section: 'general'
  },
  link: {
    title: 'Link',
    fields: [
      { id: 'name', label: 'Nimi', type: 'text', placeholder: 'Google', required: true },
      { id: 'url', label: 'URL', type: 'url', placeholder: 'https://...', required: true },
      { id: 'icon', label: 'Emoji ikoon', type: 'text', placeholder: '🔗' },
      { id: 'description', label: 'Kirjeldus', type: 'text', placeholder: 'Milleks see link on?' },
      { id: 'category', label: 'Kategooria', type: 'text', placeholder: 'IT, Kool, Töö...' }
    ],
    collection: 'links',
    section: 'links'
  }
};

function openModal(type, existingData) {
  const config = modalConfigs[type];
  if (!config) return;

  currentModal = type;
  currentEditId = null;

  document.getElementById('modalTitle').textContent = '+ Lisa: ' + config.title;
  renderModalForm(config, null);
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modalSaveBtn').onclick = () => saveModalData(type);

  setTimeout(() => {
    const firstInput = document.querySelector('#modalBody input, #modalBody textarea');
    if (firstInput) firstInput.focus();
  }, 100);
}

function openEditModal(type, id) {
  const config = modalConfigs[type];
  if (!config) return;

  const item = getItem(config.collection, id);
  if (!item) return;

  currentModal = type;
  currentEditId = id;

  document.getElementById('modalTitle').textContent = '✏️ Muuda: ' + config.title;
  renderModalForm(config, item);
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modalSaveBtn').onclick = () => saveModalData(type);
}

function renderModalForm(config, data) {
  let html = '';

  config.fields.forEach(f => {
    const val = data ? (data[f.id] || '') : '';
    html += `<div class="form-group">
      <label>${escapeHtml(f.label)}${f.required ? ' <span style="color:var(--accent)">*</span>' : ''}</label>`;

    if (f.type === 'textarea') {
      html += `<textarea id="mf_${f.id}" placeholder="${escapeHtml(f.placeholder || '')}" rows="${f.rows || 4}" ${f.mono ? 'style="font-family:var(--font-mono)"' : ''}>${escapeHtml(val)}</textarea>`;
    } else if (f.type === 'select') {
      html += `<select id="mf_${f.id}">
        ${f.options.map(o => `<option value="${escapeHtml(o)}" ${val === o ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
      </select>`;
    } else {
      html += `<input type="${f.type}" id="mf_${f.id}" placeholder="${escapeHtml(f.placeholder || '')}" value="${escapeHtml(val)}" ${f.mono ? 'style="font-family:var(--font-mono)"' : ''}>`;
    }

    html += '</div>';
  });

  if (config.extraHtml) html += config.extraHtml;

  document.getElementById('modalBody').innerHTML = html;
}

function saveModalData(type) {
  const config = modalConfigs[type];
  if (!config) return;

  const data = {};
  let valid = true;

  config.fields.forEach(f => {
    const el = document.getElementById('mf_' + f.id);
    if (!el) return;
    data[f.id] = el.value.trim();
    if (f.required && !data[f.id]) {
      el.style.borderColor = 'var(--accent3)';
      valid = false;
      setTimeout(() => el.style.borderColor = '', 2000);
    }
  });

  if (!valid) {
    showToast('❌ Täida kohustuslikud väljad!', 'error');
    return;
  }

  if (currentEditId) {
    updateItem(config.collection, currentEditId, data);
    showToast('✓ Uuendatud!');
  } else {
    addItem(config.collection, data);
    showToast('✓ Lisatud!');
  }

  closeModal();
  renderSection(config.section);
  if (config.section !== 'dashboard') renderDashboard();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  currentModal = null;
  currentEditId = null;
}

function handleGalleryUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const srcInput = document.getElementById('mf_src');
    if (srcInput) srcInput.value = e.target.result;
    showToast('✓ Pilt laetud! Salvesta kirje.');
  };
  reader.readAsDataURL(file);
}
