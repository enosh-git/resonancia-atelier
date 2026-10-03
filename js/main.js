// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  mobileNav.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
});

navClose.addEventListener('click', () => {
  mobileNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
});


const slider = document.getElementById('heroSlider');
const slides = slider.querySelectorAll('.hero__slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let currentIndex = 0;
const SLIDE_INTERVAL = 5000; // 5 seconds
let autoSlideTimer = null;

function showSlide(index) {
  slides[currentIndex].classList.remove('hero__slide--active');
  slides[index].classList.add('hero__slide--active');
  currentIndex = index;
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  const newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

function startAutoSlide() {
  autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
}

function stopAutoSlide() {
  clearInterval(autoSlideTimer);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();


/* Main portfolio: progress bar (mobile) */
const portfolioViewport = document.querySelector('.mainPortfolio__viewport');
const portfolioThumb = document.querySelector('.mainPortfolio__progress-thumb');
const portfolioItems = document.querySelectorAll('.mainPortfolio__item');

if (portfolioViewport && portfolioThumb && portfolioItems.length) {
  // Thumb width = one item's share of the track (5 items -> 20%)
  portfolioThumb.style.width = `${100 / portfolioItems.length}%`;

  portfolioViewport.addEventListener('scroll', () => {
    const maxScroll = portfolioViewport.scrollWidth - portfolioViewport.clientWidth;
    const progress = maxScroll > 0 ? portfolioViewport.scrollLeft / maxScroll : 0;

    // translateX % is relative to the thumb's own width,
    // so it can travel (items - 1) thumb-widths
    const travel = (portfolioItems.length - 1) * 100;
    portfolioThumb.style.transform = `translateX(${progress * travel}%)`;
  });
}

/* Main portfolio: arrow slider (tablet and desktop, looping) */
const portfolioSection = document.querySelector('.mainPortfolio');
const portfolioTrack = document.querySelector('.mainPortfolio__track');
const portfolioPrev = document.getElementById('portfolioPrev');
const portfolioNext = document.getElementById('portfolioNext');
const mobileQuery = window.matchMedia('(max-width: 767px)');

let portfolioIndex = 0;

function getVisibleCount() {
  const value = getComputedStyle(portfolioSection).getPropertyValue('--portfolio-visible');
  return parseInt(value, 10) || 1;
}

function getLastIndex() {
  const items = portfolioTrack.querySelectorAll('.mainPortfolio__item');
  return Math.max(items.length - getVisibleCount(), 0);
}

function updatePortfolioSlider() {
  // On mobile the viewport scrolls by swiping, so no transform
  if (mobileQuery.matches) {
    portfolioTrack.style.transform = '';
    return;
  }

  const items = portfolioTrack.querySelectorAll('.mainPortfolio__item');
  const step = items[1].offsetLeft - items[0].offsetLeft; // item width + gap
  portfolioTrack.style.transform = `translateX(-${portfolioIndex * step}px)`;
}

if (portfolioSection && portfolioTrack && portfolioPrev && portfolioNext) {
  portfolioNext.addEventListener('click', () => {
    portfolioIndex = portfolioIndex >= getLastIndex() ? 0 : portfolioIndex + 1;
    updatePortfolioSlider();
  });

  portfolioPrev.addEventListener('click', () => {
    portfolioIndex = portfolioIndex <= 0 ? getLastIndex() : portfolioIndex - 1;
    updatePortfolioSlider();
  });

  // The visible count can change when the screen resizes, so start over
  window.addEventListener('resize', () => {
    portfolioIndex = 0;
    portfolioViewport.scrollLeft = 0;
    updatePortfolioSlider();
  });
}