document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.querySelector(".nav-overlay");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (hamburger && header) {
    const body = document.body;
    const toggleNav = (forceClose = false) => {
      const isOpen = forceClose ? false : !body.classList.contains("nav-open");
      body.classList.toggle("nav-open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    };

    hamburger.addEventListener("click", () => toggleNav());
    overlay?.addEventListener("click", () => toggleNav(true));

    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        toggleNav(true);
      })
    );
  }

  const slides = Array.from(document.querySelectorAll(".testimonial"));
  const dots = Array.from(document.querySelectorAll(".slider-dot"));
  const prev = document.querySelector("[data-slider='prev']");
  const next = document.querySelector("[data-slider='next']");
  let index = 0;
  let timer;

  const setActive = () => {
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === index));
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
  };

  const showSlide = (i) => {
    index = (i + slides.length) % slides.length;
    setActive();
    restartTimer();
  };

  const restartTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(index + 1), 7000);
  };

  prev?.addEventListener("click", () => showSlide(index - 1));
  next?.addEventListener("click", () => showSlide(index + 1));

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => showSlide(idx));
  });

  setActive();
  restartTimer();

  // Update footer year dynamically
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
