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

/* Аккордеон: раскрыть по клику на шапку, закрыть только по стрелке; при открытии — футер уходит в поток под аккордеон */
const obuchenieMain = document.getElementById('obuchenie') || document.querySelector('.obuchenie');

function updateAccordionOpenState() {
  const anyOpen = document.querySelector('.obuchenie__accordion.is-open');
  if (obuchenieMain) {
    if (anyOpen) {
      obuchenieMain.classList.add('obuchenie--accordion-open');
      /* После перерасчёта высоты страницы браузер может сдвинуть scroll — фиксируем вверх */
      requestAnimationFrame(() => window.scrollTo(0, 0));
      setTimeout(() => window.scrollTo(0, 0), 0);
    } else {
      obuchenieMain.classList.remove('obuchenie--accordion-open');
    }
  }
}

document.querySelectorAll('.obuchenie__accordion').forEach((accordion) => {
  const header = accordion.querySelector('.obuchenie__accordion-header');
  const arrow = accordion.querySelector('.obuchenie__accordion-arrow');
  if (!header || !arrow) return;

  header.addEventListener('click', (e) => {
    const isOpen = accordion.classList.contains('is-open');
    if (arrow.contains(e.target)) {
      e.stopPropagation();
      accordion.classList.toggle('is-open');
      header.setAttribute('aria-expanded', accordion.classList.contains('is-open'));
    } else if (!isOpen) {
      accordion.classList.add('is-open');
      header.setAttribute('aria-expanded', 'true');
    }
    updateAccordionOpenState();
  });
});
