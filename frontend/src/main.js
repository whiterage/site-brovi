// Импорт базовых стилей
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/page-specific.css';
import './styles/mobile.css';
import './styles/tablet.css';

// Лого и иконка: над фото — белые, над белым — перелив #333 → #8f8f8f → #333
const header = document.getElementById('header');
const heroVisual = document.getElementById('hero-visual');
if (header && heroVisual) {
  const updateHeaderState = () => {
    const headerHeight = header.offsetHeight;
    const heroBottom = heroVisual.getBoundingClientRect().bottom;
    const overImage = heroBottom > headerHeight;
    header.classList.toggle('header--over-image', overImage);
    header.classList.toggle('header--over-white', !overImage);
  };
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('resize', updateHeaderState);
}
