const slider = document.getElementById('heroSlider');
const slides = slider.querySelectorAll('.hero__slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let currentIndex = 0;

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

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);