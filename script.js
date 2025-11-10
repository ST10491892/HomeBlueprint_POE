
/* NAVBAR TOGGLE */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}

/* SMOOTH SCROLL*/
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});

/* FADE-IN ON SCROLL */
const fadeEls = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* CONTACT FORM HANDLER (contact.html) */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector("button[type='submit']") || contactForm.querySelector(".btn");
    const name = (contactForm.querySelector('input[name="name"]') || {}).value || "";
    const email = (contactForm.querySelector('input[name="email"]') || {}).value || "";
    const message = (contactForm.querySelector('textarea[name="message"]') || {}).value || "";

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please complete the required fields (name, email, message).");
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    setTimeout(() => {
      alert("✅ Thank you! We'll contact you within 24 hours.");
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 900);
  });
}

/* PORTFOLIO FILTER (portfolio.html) */
const projectGrid = document.getElementById("projectGrid");
const filterBtns = document.querySelectorAll(".filter-btn");

if (projectGrid && filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active state from other buttons
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;

      // Filter HTML-based portfolio items
      const items = projectGrid.querySelectorAll(".portfolio-item");
      items.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === "all" || itemCategory === category) {
          item.style.display = "block";
          setTimeout(() => item.classList.add("visible"), 50); // fade-in animation
        } else {
          item.classList.remove("visible");
          setTimeout(() => (item.style.display = "none"), 300);
        }
      });
    });
  });
}

/* BACK TO TOP */
const backBtn = document.createElement("button");
backBtn.className = "back-to-top";
backBtn.innerHTML = "↑";
document.body.appendChild(backBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backBtn.classList.add("show");
  else backBtn.classList.remove("show");
});
backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* console */
console.log("%cHome Blueprint Studio — site scripts loaded", "color: #8B7355; font-weight:700;");
