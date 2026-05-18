// === PersonalDB — Database (localStorage) ===

const DB_KEY = 'pdb_data';

function getDB() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
  } catch(e) {
    return {};
  }
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getCollection(name) {
  const db = getDB();
  return db[name] || [];
}

function saveCollection(name, arr) {
  const db = getDB();
  db[name] = arr;
  saveDB(db);
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Generic CRUD
function addItem(collection, item) {
  const arr = getCollection(collection);
  item.id = genId();
  item.createdAt = new Date().toISOString();
  arr.unshift(item);
  saveCollection(collection, arr);
  return item;
}

function updateItem(collection, id, updates) {
  const arr = getCollection(collection);
  const idx = arr.findIndex(x => x.id === id);
  if (idx !== -1) {
    arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
    saveCollection(collection, arr);
    return arr[idx];
  }
  return null;
}

function deleteItem(collection, id) {
  const arr = getCollection(collection).filter(x => x.id !== id);
  saveCollection(collection, arr);
}

function getItem(collection, id) {
  return getCollection(collection).find(x => x.id === id) || null;
}

// === NOTES ===
const Notes = {
  getAll: () => getCollection('notes'),
  add: (data) => addItem('notes', data),
  update: (id, data) => updateItem('notes', id, data),
  delete: (id) => deleteItem('notes', id),
  search: (q) => getCollection('notes').filter(n =>
    n.title?.toLowerCase().includes(q) ||
    n.content?.toLowerCase().includes(q) ||
    n.tags?.toLowerCase().includes(q)
  )
};

// === COMMANDS ===
const Commands = {
  getAll: () => getCollection('commands'),
  add: (data) => addItem('commands', data),
  update: (id, data) => updateItem('commands', id, data),
  delete: (id) => deleteItem('commands', id),
  search: (q) => getCollection('commands').filter(c =>
    c.name?.toLowerCase().includes(q) ||
    c.command?.toLowerCase().includes(q) ||
    c.description?.toLowerCase().includes(q) ||
    c.category?.toLowerCase().includes(q)
  )
};

// === PASSWORDS ===
const Passwords = {
  getAll: () => getCollection('passwords'),
  add: (data) => addItem('passwords', data),
  update: (id, data) => updateItem('passwords', id, data),
  delete: (id) => deleteItem('passwords', id),
  search: (q) => getCollection('passwords').filter(p =>
    p.service?.toLowerCase().includes(q) ||
    p.username?.toLowerCase().includes(q) ||
    p.notes?.toLowerCase().includes(q)
  )
};

// === NETWORK ===
const Network = {
  getAll: () => getCollection('network'),
  add: (data) => addItem('network', data),
  update: (id, data) => updateItem('network', id, data),
  delete: (id) => deleteItem('network', id)
};

// === PROJECTS ===
const Projects = {
  getAll: () => getCollection('projects'),
  add: (data) => addItem('projects', data),
  update: (id, data) => updateItem('projects', id, data),
  delete: (id) => deleteItem('projects', id),
  search: (q) => getCollection('projects').filter(p =>
    p.name?.toLowerCase().includes(q) ||
    p.description?.toLowerCase().includes(q)
  )
};

// === TOOLS ===
const Tools = {
  getAll: () => getCollection('tools'),
  add: (data) => addItem('tools', data),
  update: (id, data) => updateItem('tools', id, data),
  delete: (id) => deleteItem('tools', id)
};

// === SUBJECTS ===
const Subjects = {
  getAll: () => getCollection('subjects'),
  add: (data) => addItem('subjects', data),
  update: (id, data) => updateItem('subjects', id, data),
  delete: (id) => deleteItem('subjects', id)
};

// === ASSIGNMENTS ===
const Assignments = {
  getAll: () => getCollection('assignments'),
  add: (data) => addItem('assignments', data),
  update: (id, data) => updateItem('assignments', id, data),
  delete: (id) => deleteItem('assignments', id),
  getUpcoming: () => {
    const now = new Date();
    return getCollection('assignments')
      .filter(a => !a.done && a.deadline)
      .sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5);
  }
};

// === GRADES ===
const Grades = {
  getAll: () => getCollection('grades'),
  add: (data) => addItem('grades', data),
  update: (id, data) => updateItem('grades', id, data),
  delete: (id) => deleteItem('grades', id),
  getAverage: () => {
    const grades = getCollection('grades').filter(g => g.score && !isNaN(Number(g.score)));
    if (grades.length === 0) return null;
    const sum = grades.reduce((acc, g) => acc + Number(g.score), 0);
    return (sum / grades.length).toFixed(2);
  }
};

// === GALLERY ===
const Gallery = {
  getAll: () => getCollection('gallery'),
  add: (data) => addItem('gallery', data),
  update: (id, data) => updateItem('gallery', id, data),
  delete: (id) => deleteItem('gallery', id)
};

// === CONTACTS ===
const Contacts = {
  getAll: () => getCollection('contacts'),
  add: (data) => addItem('contacts', data),
  update: (id, data) => updateItem('contacts', id, data),
  delete: (id) => deleteItem('contacts', id),
  search: (q) => getCollection('contacts').filter(c =>
    c.name?.toLowerCase().includes(q) ||
    c.email?.toLowerCase().includes(q) ||
    c.phone?.toLowerCase().includes(q) ||
    c.role?.toLowerCase().includes(q)
  )
};

// === FINANCES ===
const Finances = {
  getAll: () => getCollection('finances'),
  add: (data) => addItem('finances', data),
  update: (id, data) => updateItem('finances', id, data),
  delete: (id) => deleteItem('finances', id),
  getSummary: () => {
    const all = getCollection('finances');
    const income = all.filter(f => f.type === 'Tulu').reduce((s,f) => s + Number(f.amount || 0), 0);
    const expense = all.filter(f => f.type === 'Kulu').reduce((s,f) => s + Number(f.amount || 0), 0);
    return { income, expense, total: income - expense };
  }
};

// === GENERAL INFO ===
const General = {
  getAll: () => getCollection('general'),
  add: (data) => addItem('general', data),
  update: (id, data) => updateItem('general', id, data),
  delete: (id) => deleteItem('general', id),
  search: (q) => getCollection('general').filter(g =>
    g.title?.toLowerCase().includes(q) ||
    g.content?.toLowerCase().includes(q) ||
    g.category?.toLowerCase().includes(q)
  )
};

// === LINKS ===
const Links = {
  getAll: () => getCollection('links'),
  add: (data) => addItem('links', data),
  update: (id, data) => updateItem('links', id, data),
  delete: (id) => deleteItem('links', id)
};

// === EXPORT / IMPORT ===
function exportData() {
  const db = getDB();
  const exportObj = {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    data: db
  };
  const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `personaldb_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✓ Andmed eksporditud!');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      let data = parsed;

      if (parsed.data) {
        data = parsed.data;
      }

      if (!confirm('See kirjutab üle kõik praegused andmed. Jätka?')) return;

      saveDB(data);
      showToast('✓ Andmed imporditud! Laadin uuesti...');
      setTimeout(() => window.location.reload(), 1000);
    } catch(err) {
      showToast('❌ Vigane fail!', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function clearAllData() {
  if (confirm('Kustuta KÕIK andmed? Seda ei saa tagasi võtta!')) {
    if (confirm('Oled absoluutselt kindel?')) {
      localStorage.removeItem(DB_KEY);
      showToast('Kõik andmed kustutatud.');
      setTimeout(() => window.location.reload(), 1000);
    }
  }
}

function getDataStats() {
  return {
    'Märkmed': Notes.getAll().length,
    'Käsud': Commands.getAll().length,
    'Paroolid': Passwords.getAll().length,
    'Projektid': Projects.getAll().length,
    'Pildid': Gallery.getAll().length,
    'Kontaktid': Contacts.getAll().length,
    'Kodutööd': Assignments.getAll().length,
    'Hinded': Grades.getAll().length,
    'Lingid': Links.getAll().length
  };
}

// Global search
function globalSearchAll(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results = [];

  const add = (section, label, items) => {
    items.forEach(item => {
      const title = item.name || item.title || item.service || item.command || '';
      const preview = item.content || item.description || item.notes || item.command || '';
      results.push({ section, label, title, preview: preview.substr(0, 80), id: item.id });
    });
  };

  add('notes', '📝 Märkmed', Notes.search(q));
  add('commands', '⌨️ Käsud', Commands.search(q));
  add('passwords', '🔐 Paroolid', Passwords.search(q));
  add('projects', '💻 Projektid', Projects.search(q));
  add('contacts', '👤 Kontaktid', Contacts.search(q));
  add('general', 'ℹ️ Üldinfo', General.search(q));

  return results;
}
