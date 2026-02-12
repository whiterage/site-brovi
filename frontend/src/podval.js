/**
 * Точка входа для страницы «Подвал» (контент + обратная связь и контакты внизу).
 * Подключает стили и логику меню.
 */
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/obuchenie.css';
import './styles/podval.css';

const navPanel = document.getElementById('nav-panel');
const navBtn = document.getElementById('podval-nav-btn');
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

document.querySelectorAll('.nav-panel__link').forEach((link) => {
  link.addEventListener('click', () => closeNav());
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navPanel && navPanel.classList.contains('is-open')) closeNav();
});

// Полноэкранный просмотр фото по клику
const fullscreen = document.getElementById('podval-fullscreen');
const fullscreenImg = document.getElementById('podval-fullscreen-img');
const fullscreenClose = document.getElementById('podval-fullscreen-close');

function openFullscreen(src) {
  if (!fullscreen || !fullscreenImg) return;
  fullscreenImg.src = src;
  fullscreen.classList.add('is-open');
  fullscreen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('podval-fullscreen-open');
}

function closeFullscreen() {
  if (!fullscreen) return;
  fullscreen.classList.remove('is-open');
  fullscreen.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('podval-fullscreen-open');
}

document.querySelectorAll('.podval__content img[class*="podval__img"]').forEach((img) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // data-fullscreen-src — ссылка на фото в высоком разрешении для полноэкранного просмотра
    const src = img.dataset.fullscreenSrc || img.getAttribute('src') || img.currentSrc;
    if (src) openFullscreen(src);
  });
});

if (fullscreenClose) {
  fullscreenClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeFullscreen();
  });
}

if (fullscreen) {
  fullscreen.addEventListener('click', () => closeFullscreen());
  fullscreenImg?.addEventListener('click', (e) => e.stopPropagation());
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && fullscreen?.classList.contains('is-open')) closeFullscreen();
});
