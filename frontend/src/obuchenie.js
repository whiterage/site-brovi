/**
 * Точка входа для страницы «Обучение» (obuchenie.html).
 * Подключает стили и логику меню (открытие/закрытие панели).
 */
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/obuchenie.css';

const navPanel = document.getElementById('nav-panel');
const navBtn = document.getElementById('obuchenie-nav-btn');
const navClose = document.getElementById('nav-panel-close');

function openNav() {
  if (!navPanel) return;
  navPanel.classList.add('is-open');
  navPanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  if (!navPanel) return;
  navPanel.classList.remove('is-open');
  navPanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (navBtn) navBtn.focus({ preventScroll: true });
}

if (navBtn && navPanel) {
  navBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (navPanel.classList.contains('is-open')) closeNav();
    else openNav();
  });
}

if (navClose && navPanel) {
  navClose.addEventListener('click', closeNav);
}
