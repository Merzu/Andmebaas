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

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function doLogout() {
  if (confirm('Kas oled kindel, et soovid välja logida?')) {
    sessionStorage.removeItem('pdb_session');
    sessionStorage.removeItem('pdb_username');
    window.location.href = 'index.html';
  }
}

function changePassword() {
  const cur = document.getElementById('curPass').value;
  const n1 = document.getElementById('chgPass1').value;
  const n2 = document.getElementById('chgPass2').value;
  const msg = document.getElementById('passMsg');

  const stored = JSON.parse(localStorage.getItem('pdb_user') || '{}');

  if (stored.password !== hashPass(cur)) {
    msg.style.color = '#f05b7a';
    msg.textContent = '❌ Vale praegune parool.';
    return;
  }
  if (n1.length < 6) {
    msg.style.color = '#f05b7a';
    msg.textContent = '❌ Uus parool peab olema vähemalt 6 tähemärki.';
    return;
  }
  if (n1 !== n2) {
    msg.style.color = '#f05b7a';
    msg.textContent = '❌ Uued paroolid ei kattu.';
    return;
  }

  stored.password = hashPass(n1);
  localStorage.setItem('pdb_user', JSON.stringify(stored));

  msg.style.color = '#00e5b4';
  msg.textContent = '✓ Parool muudetud!';
  document.getElementById('curPass').value = '';
  document.getElementById('chgPass1').value = '';
  document.getElementById('chgPass2').value = '';
}
