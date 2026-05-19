// === PersonalDB — App Init ===

window.onload = function() {
  if (!requireLogin()) return;

  const username = sessionStorage.getItem('pdb_username') || 'admin';
  document.getElementById('userBadge').textContent = username;

  loadTheme();
  showSection('dashboard');

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (document.getElementById('modalOverlay').classList.contains('open')) closeModal();
      if (document.getElementById('lightbox').classList.contains('open')) closeLightbox();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      showSection('search');
      setTimeout(() => document.getElementById('globalSearch')?.focus(), 100);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      openModal('note');
    }
  });

  if (window.innerWidth <= 768) {
    sidebarOpen = false;
  }

  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.querySelector('.hamburger');
      if (sidebar && hamburger && sidebar.classList.contains('mobile-open') &&
          !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
};
