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