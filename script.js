const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const currentSlideLabel = document.querySelector(".current-slide");
const totalSlidesLabel = document.querySelector(".total-slides");
const progressBar = document.querySelector(".bottombar");
const progressFill = document.querySelector(".progress-fill");

let activeSlide = 0;

function showSlide(index) {
  if (index < 0 || index >= slides.length || index === activeSlide) {
    return;
  }

  slides[activeSlide].classList.remove("is-active");
  slides[activeSlide].setAttribute("aria-hidden", "true");
  slides[activeSlide].inert = true;

  activeSlide = index;
  slides[activeSlide].classList.add("is-active");
  slides[activeSlide].setAttribute("aria-hidden", "false");
  slides[activeSlide].inert = false;
  currentSlideLabel.textContent = String(activeSlide + 1).padStart(2, "0");
  previousButton.disabled = activeSlide === 0;
  nextButton.disabled = activeSlide === slides.length - 1;
  slides[activeSlide].setAttribute("aria-label", `Slajd ${activeSlide + 1} z ${slides.length}`);
  progressFill.style.width = `${((activeSlide + 1) / slides.length) * 100}%`;
  progressBar.classList.toggle("is-last-slide", activeSlide === slides.length - 1);
}

totalSlidesLabel.textContent = String(slides.length).padStart(2, "0");
slides.forEach((slide, index) => {
  const isActive = index === activeSlide;
  slide.setAttribute("aria-label", `Slajd ${index + 1} z ${slides.length}`);
  slide.setAttribute("aria-hidden", String(!isActive));
  slide.inert = !isActive;
});
previousButton.disabled = true;
nextButton.disabled = slides.length <= 1;
progressFill.style.width = `${100 / slides.length}%`;

previousButton.addEventListener("click", () => showSlide(activeSlide - 1));
nextButton.addEventListener("click", () => showSlide(activeSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showSlide(activeSlide + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    showSlide(activeSlide - 1);
  } else if (event.key === "Home") {
    showSlide(0);
  } else if (event.key === "End") {
    showSlide(slides.length - 1);
  }
});
