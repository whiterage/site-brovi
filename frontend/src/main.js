// Импорт базовых стилей
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/page-specific.css';
import './styles/mobile.css';
import './styles/tablet.css';

// Хедер понимает фон: на ВСЕХ изображениях — белый лого/кнопка, на остальном (текст, белый фон) — альтернативный цвет
const header = document.getElementById('header');
if (header) {
  const imageZoneSelectors = [
    '.hero__visual',
    '.hero__cards',
    '.alina__slider',
    '.masters__card',
    '.aesthetics__img',
    '.pricelist__rect',
    '.pricelist2__rect',
    '.permanent__rect',
    '.feedback__reviews',
  ];
  const updateHeaderState = () => {
    const rect = header.getBoundingClientRect();
    const centerX = (rect.left + rect.right) / 2;
    const midY = rect.top + rect.height / 2;
    const elements = document.elementsFromPoint(centerX, midY);
    const underHeader = elements.find((el) => !header.contains(el));
    const overImage = underHeader
      ? imageZoneSelectors.some((sel) => underHeader.closest(sel))
      : false;
    header.classList.toggle('header--over-image', overImage);
    header.classList.toggle('header--over-white', !overImage);
  };
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('resize', updateHeaderState);
}

// Слайдер фотографий в секции Alina: кнопки «назад»/«вперёд» + свайп пальцем на мобилке
const alinaSlides = document.getElementById('alina-slides');
const alinaPrev = document.getElementById('alina-prev');
const alinaNext = document.getElementById('alina-next');
if (alinaSlides && alinaPrev && alinaNext) {
  const slides = alinaSlides.querySelectorAll('.alina__slide');
  let currentIndex = 0;
  const totalSlides = slides.length;
  const swipeThreshold = 50;

  const updateSlider = (dragPx = 0) => {
    const offset = (currentIndex * 100) / totalSlides;
    alinaSlides.style.transform = dragPx
      ? `translateX(calc(-${offset}% + ${dragPx}px))`
      : `translateX(-${offset}%)`;
    slides.forEach((slide, i) => {
      slide.classList.toggle('alina__slide--current', i === currentIndex);
    });
  };

  const goPrev = () => {
    currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    updateSlider();
  };
  const goNext = () => {
    currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    updateSlider();
  };

  alinaPrev.addEventListener('click', goPrev);
  alinaNext.addEventListener('click', goNext);

  // Свайп пальцем (мобилка)
  const slider = alinaSlides.closest('.alina__slider');
  if (slider) {
    let touchStartX = 0;
    let touchStartY = 0;

    slider.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        alinaSlides.classList.add('alina__slides--dragging');
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchmove',
      (e) => {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          if (e.cancelable) e.preventDefault();
          updateSlider(dx);
        }
      },
      { passive: false }
    );

    slider.addEventListener('touchend', (e) => {
      alinaSlides.classList.remove('alina__slides--dragging');
      const endX = e.changedTouches[0].clientX;
      const dragPx = endX - touchStartX;
      if (dragPx < -swipeThreshold) goNext();
      else if (dragPx > swipeThreshold) goPrev();
      else updateSlider(0);
    });
  }

  updateSlider();
}

// Окно отзывов в секции feedback: вертикальный свайп как барабан револьвера (зацикленный)
const feedbackReviews = document.getElementById('feedback-reviews');
const feedbackReviewsTrack = document.getElementById('feedback-reviews-track');
if (feedbackReviews && feedbackReviewsTrack) {
  const originalSlides = Array.from(feedbackReviewsTrack.querySelectorAll('.feedback__reviews-slide'));
  originalSlides.forEach((slide) => {
    feedbackReviewsTrack.appendChild(slide.cloneNode(true));
  });
  const reviewSlides = feedbackReviewsTrack.querySelectorAll('.feedback__reviews-slide');
  const totalReviews = reviewSlides.length;
  const startSlideSrc = 'IMG_6619'; /* при загрузке по центру — карточка с этим изображением */
  let reviewIndex = 0;
  reviewSlides.forEach((slide, i) => {
    const img = slide.querySelector('img');
    if (img && img.getAttribute('src') && img.getAttribute('src').includes(startSlideSrc) && reviewIndex === 0) reviewIndex = i;
  });
  const reviewSlideHeight = 150;
  const reviewGap = 12;
  const reviewStep = reviewSlideHeight + reviewGap;
  const reviewSwipeThreshold = 40;
  const loopSize = originalSlides.length; /* после последней — снова первая */

  const updateReviewsSlider = (dragPx = 0, noTransition = false) => {
    if (noTransition) feedbackReviewsTrack.classList.add('feedback__reviews-track--jump');
    const offset = reviewIndex * reviewStep;
    feedbackReviewsTrack.style.transform = dragPx
      ? `translateY(calc(-${offset}px + ${dragPx}px))`
      : `translateY(-${offset}px)`;
    reviewSlides.forEach((slide, i) => {
      slide.classList.toggle('feedback__reviews-slide--current', i === reviewIndex);
    });
    if (noTransition) {
      feedbackReviewsTrack.offsetHeight;
      feedbackReviewsTrack.classList.remove('feedback__reviews-track--jump');
    }
  };

  let touchStartY = 0;

  feedbackReviews.addEventListener(
    'touchstart',
    (e) => {
      touchStartY = e.touches[0].clientY;
      feedbackReviewsTrack.classList.add('feedback__reviews-track--dragging');
    },
    { passive: true }
  );

  feedbackReviews.addEventListener(
    'touchmove',
    (e) => {
      const dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dy) > 10) {
        if (e.cancelable) e.preventDefault();
        updateReviewsSlider(dy);
      }
    },
    { passive: false }
  );

  feedbackReviews.addEventListener('touchend', (e) => {
    feedbackReviewsTrack.classList.remove('feedback__reviews-track--dragging');
    const endY = e.changedTouches[0].clientY;
    const dragPx = endY - touchStartY;
    if (dragPx < -reviewSwipeThreshold) {
      if (reviewIndex >= totalReviews - 1) {
        reviewIndex = loopSize;
        updateReviewsSlider(0, true);
      } else {
        reviewIndex += 1;
        updateReviewsSlider(0);
      }
    } else if (dragPx > reviewSwipeThreshold) {
      if (reviewIndex <= 0) {
        reviewIndex = totalReviews - 1;
        updateReviewsSlider(0, true);
      } else {
        reviewIndex -= 1;
        updateReviewsSlider(0);
      }
    } else {
      updateReviewsSlider(0);
    }
  });

  updateReviewsSlider(0);
}
