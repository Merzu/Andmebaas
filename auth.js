// === PersonalDB — Auth ===

function hashPass(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function isLoggedIn() {
  const session = sessionStorage.getItem('pdb_session');
  const user = localStorage.getItem('pdb_user');
  return session === 'ok' && !!user;
}

function doLogin() {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  const err = document.getElementById('loginError');

  if (!u || !p) {
    showLoginError('Palun täida kõik väljad.');
    return;
  }

  const stored = JSON.parse(localStorage.getItem('pdb_user') || '{}');
  if (!stored.username) {
    showLoginError('Konto pole seadistatud. Loo kõigepealt konto.');
    document.getElementById('setupHint').style.display = 'block';
    return;
  }

  if (stored.username === u && stored.password === hashPass(p)) {
    sessionStorage.setItem('pdb_session', 'ok');
    sessionStorage.setItem('pdb_username', u);
    window.location.href = 'app.html';
  } else {
    showLoginError('Vale kasutajanimi või parool.');
    document.getElementById('password').value = '';
    document.getElementById('password').focus();
  }
}

function showLoginError(msg) {
  const err = document.getElementById('loginError');
  err.textContent = msg;
  err.style.display = 'block';
  setTimeout(() => { err.style.display = 'none'; }, 4000);
}

function showSetup() {
  document.getElementById('setupForm').style.display = 'block';
  document.getElementById('setupHint').style.display = 'none';
}

function hideSetup() {
  document.getElementById('setupForm').style.display = 'none';
  document.getElementById('setupHint').style.display = 'block';
}

function doSetup() {
  const u = document.getElementById('newUser').value.trim();
  const p = document.getElementById('newPass').value;
  const p2 = document.getElementById('newPass2').value;

  if (!u || !p || !p2) {
    alert('Palun täida kõik väljad.');
    return;
  }
  if (u.length < 3) {
    alert('Kasutajanimi peab olema vähemalt 3 tähemärki.');
    return;
  }
  if (p.length < 6) {
    alert('Parool peab olema vähemalt 6 tähemärki.');
    return;
  }
  if (p !== p2) {
    alert('Paroolid ei kattu!');
    return;
  }

  const existing = localStorage.getItem('pdb_user');
  if (existing) {
    if (!confirm('Konto on juba olemas. Kas kirjutada üle?')) return;
  }

  localStorage.setItem('pdb_user', JSON.stringify({
    username: u,
    password: hashPass(p),
    created: new Date().toISOString()
  }));

  sessionStorage.setItem('pdb_session', 'ok');
  sessionStorage.setItem('pdb_username', u);
  alert('Konto loodud! Logid sisse...');
  window.location.href = 'app.html';
}

function doLogout() {
  if (confirm('Kas oled kindel, et soovid välja logida?')) {
    sessionStorage.removeItem('pdb_session');
    sessionStorage.removeItem('pdb_username');
    window.location.href = 'index.html';
  }
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function changePassword() {
  const cur = document.getElementById('curPass').value;
  const n1 = document.getElementById('chgPass1').value;
  const n2 = document.getElementById('chgPass2').value;
  const msg = document.getElementById('passMsg');

  const stored = JSON.parse(localStorage.getItem('pdb_user') || '{}');

  if (stored.password !== hashPass(cur)) {
    msg.style.color = '#ff4444';
    msg.textContent = '❌ Vale praegune parool.';
    return;
  }
  if (n1.length < 6) {
    msg.style.color = '#ff4444';
    msg.textContent = '❌ Uus parool peab olema vähemalt 6 tähemärki.';
    return;
  }
  if (n1 !== n2) {
    msg.style.color = '#ff4444';
    msg.textContent = '❌ Uued paroolid ei kattu.';
    return;
  }

  stored.password = hashPass(n1);
  localStorage.setItem('pdb_user', JSON.stringify(stored));

  msg.style.color = 'var(--accent)';
  msg.textContent = '✓ Parool muudetud!';
  document.getElementById('curPass').value = '';
  document.getElementById('chgPass1').value = '';
  document.getElementById('chgPass2').value = '';
}
