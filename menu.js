// menu.js
document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('menu');
  const btn = document.querySelector('.menu-icon');

  if (!menu || !btn) return;

  btn.addEventListener('click', function() {
    menu.classList.toggle('open');
  });

  // fecha com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
    }
  });
});
