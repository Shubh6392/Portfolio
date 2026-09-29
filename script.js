/* Small, focused helpers keep interactions easy to customize. */
const root = document.documentElement;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const themeToggle = document.querySelector("#theme-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hide the loading screen when the document is ready, with a short visual beat.
window.addEventListener("load", () => {
  window.setTimeout(() => document.querySelector("#preloader")?.classList.add("is-hidden"), 250);
});

// Restore the visitor's theme choice; dark is the default on a fresh visit.
function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.innerHTML = `<i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i>`;
}

const savedTheme = localStorage.getItem("nitish-portfolio-theme");
applyTheme(savedTheme === "light" ? "light" : "dark");
themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("nitish-portfolio-theme", nextTheme);
});

// Cycle through the three specialties in the hero headline.
const typedRole = document.querySelector("#typed-role");
const roles = ["Full Stack Developer", "Salesforce Developer", "Competitive Programmer"];
let roleIndex = 0;
let characterIndex = roles[0].length;
let deletingRole = true;

function typeNextCharacter() {
  const currentRole = roles[roleIndex];
  typedRole.textContent = currentRole.slice(0, characterIndex);

  if (deletingRole && characterIndex === 0) {
    deletingRole = false;
    roleIndex = (roleIndex + 1) % roles.length;
  } else if (!deletingRole && characterIndex === roles[roleIndex].length) {
    deletingRole = true;
    window.setTimeout(typeNextCharacter, 1500);
    return;
  }

  characterIndex += deletingRole ? -1 : 1;
  window.setTimeout(typeNextCharacter, deletingRole ? 38 : 72);
}

if (!prefersReducedMotion) window.setTimeout(typeNextCharacter, 1800);

// Add a blurred header on scroll and keep the current section reflected in the nav.
const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-link")];
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-38% 0px -52% 0px", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

// Mobile navigation supports both pointer and keyboard activation.
function closeMenu() {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}" aria-hidden="true"></i>`;
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest(".nav-link")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  const eventPath = event.composedPath();
  if (!eventPath.includes(navLinks) && !eventPath.includes(menuToggle)) closeMenu();
});

// Reveal elements as they enter view. A visible fallback keeps content readable without JS observers.
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
revealElements.forEach((element) => revealObserver.observe(element));

// Animate stat values once, when the stat row is visible.
function animateCounter(element) {
  const target = Number(element.dataset.counter);
  const suffix = element.dataset.suffix || "";
  const duration = prefersReducedMotion ? 0 : 1300;
  const startTime = performance.now();
  function draw(now) {
    const progress = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - progress) ** 4;
    element.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
    if (progress < 1) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.7 });
document.querySelectorAll("[data-counter]").forEach((counter) => counterObserver.observe(counter));

// Read progress values from HTML data attributes so skill levels stay easy to edit.
document.querySelectorAll(".skill-fill").forEach((bar) => {
  const level = Math.min(100, Math.max(0, Number(bar.dataset.level) || 0));
  bar.style.setProperty("--skill-level", `${level}%`);
});
const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.24 });
document.querySelectorAll(".skill-card").forEach((card) => skillObserver.observe(card));

// Gentle pointer tilt adds depth on mouse devices without affecting touch screens.
if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-3px)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

// Front-end validation demo; connect EmailJS or Formspree to actually deliver submissions.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validators = {
  name: (value) => value.trim().length >= 2 ? "" : "Please enter at least 2 characters.",
  email: (value) => emailPattern.test(value.trim()) ? "" : "Enter a valid email address.",
  message: (value) => value.trim().length >= 10 ? "" : "Please enter at least 10 characters."
};

function validateField(field) {
  const error = validators[field.name](field.value);
  const errorElement = document.querySelector(`#${field.name}-error`);
  errorElement.textContent = error;
  field.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

Object.keys(validators).forEach((fieldName) => {
  const field = contactForm.elements[fieldName];
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") validateField(field);
    formStatus.textContent = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fieldsAreValid = Object.keys(validators).map((fieldName) => validateField(contactForm.elements[fieldName])).every(Boolean);
  if (!fieldsAreValid) {
    formStatus.textContent = "Please fix the highlighted fields.";
    formStatus.style.color = "#ff8795";
    contactForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  formStatus.style.color = "";
  formStatus.textContent = "Thanks! This demo validated your message. Connect a form service to receive it.";
  contactForm.reset();
  Object.keys(validators).forEach((fieldName) => contactForm.elements[fieldName].removeAttribute("aria-invalid"));
});

// Keep the footer year current without requiring an annual edit.
document.querySelector("#copyright-year").textContent = new Date().getFullYear();
