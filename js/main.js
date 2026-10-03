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