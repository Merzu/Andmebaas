// === PersonalDB — App Init ===

window.onload = function() {
  if (!requireLogin()) return;

  // Set username badge
  const username = sessionStorage.getItem('pdb_username') || 'kasutaja';
  document.getElementById('userBadge').textContent = username;

  // Load theme
  loadTheme();

  // Show dashboard
  showSection('dashboard');

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // ESC closes modal
    if (e.key === 'Escape') {
      if (document.getElementById('modalOverlay').classList.contains('open')) {
        closeModal();
      }
      if (document.getElementById('lightbox').classList.contains('open')) {
        closeLightbox();
      }
    }

    // Ctrl+K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      showSection('search');
      setTimeout(() => document.getElementById('globalSearch')?.focus(), 100);
    }

    // Ctrl+N for new note
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      openModal('note');
    }
  });

  // Responsive sidebar
  if (window.innerWidth <= 768) {
    sidebarOpen = false;
  }

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.querySelector('.hamburger');
      if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
};
