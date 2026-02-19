/* ======================================================
   SAFE GLOBAL UTILITIES
====================================================== */
function $(id) {
  return document.getElementById(id);
}

/* ======================================================
   PROJECT FILTER (Projects Page)
====================================================== */
window.filterProjects = function (type) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
};

/* ======================================================
   NAVBAR SHADOW (All Pages)
====================================================== */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    header.style.boxShadow =
      window.scrollY > 20 ? "0 5px 15px rgba(0,0,0,.2)" : "none";
  }
});

/* ======================================================
   DARK MODE (Optional)
====================================================== */
const darkToggle = $("darkToggle");
if (darkToggle) {
  if (localStorage.theme === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️";
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.theme =
      document.body.classList.contains("dark") ? "dark" : "light";
    darkToggle.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* ======================================================
   CONTACT FORM SUCCESS (Contact Page)
====================================================== */
const contactForm = $("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    setTimeout(() => {
      const msg = document.querySelector(".success-message");
      if (msg) msg.style.display = "block";
      contactForm.reset();
    }, 800);
  });
}

/* ======================================================
   CUSTOMIZE PAGE LOGIC (FINAL FIXED)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const customForm = $("customForm");
  if (!customForm) return; // ✅ run only on customize page

  const projectType = $("projectType");
  const gramsBox = $("gramsBox");
  const fixedCostBox = $("fixedCostBox");
  const gramsInput = $("grams");
  const totalCost = $("totalCost");
  const estimatedField = $("estimatedCostField");

  const driveInput = $("driveLinkInput");
  const driveStatus = $("driveStatus");
  const submitBtn = customForm.querySelector("button[type='submit']");

  /* ======================================================
     PRICE LOGIC (FIXED)
  ======================================================= */

  window.handleProjectType = function () {
    const type = projectType.value;

    if (type === "3D Printing") {
      gramsBox.style.display = "flex";
      fixedCostBox.style.display = "none";

      animatePrice(totalCost, 0, 50);
      estimatedField.value = "₹50 (Base Service Charge)";

      if (gramsInput) gramsInput.value = "";
    }
    else if (type) {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "block";

      animatePrice(totalCost, 50, 1500);
      estimatedField.value = "₹1500 – ₹3000 (After Review)";
    }
    else {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "none";

      totalCost.innerText = "0";
      estimatedField.value = "₹0";
    }
  };

  /* ---------- LIVE 3D PRINT COST ---------- */
  if (gramsInput) {
    gramsInput.addEventListener("input", () => {
      const grams = parseFloat(gramsInput.value);

      if (isNaN(grams) || grams <= 0) {
        totalCost.innerText = "50";
        estimatedField.value = "₹50 (Base Service Charge)";
        return;
      }

      const cost = grams * 10 + 50;
      totalCost.innerText = cost;
      estimatedField.value = "₹" + cost;
    });
  }

  /* ======================================================
     GOOGLE DRIVE LINK – UX POLISH
  ======================================================= */
  if (driveInput && submitBtn) {
    submitBtn.disabled = true;

    const DRIVE_REGEX =
      /^https?:\/\/(drive\.google\.com)\/(file\/d\/|drive\/folders\/).+/;

    driveInput.addEventListener("input", () => {
      const value = driveInput.value.trim();

      if (DRIVE_REGEX.test(value)) {
        driveInput.classList.remove("drive-link-invalid");
        driveInput.classList.add("drive-link-valid");

        if (driveStatus) {
          driveStatus.textContent = "✔";
          driveStatus.className = "drive-status valid";
        }

        submitBtn.disabled = false;
      } else {
        driveInput.classList.remove("drive-link-valid");
        driveInput.classList.add("drive-link-invalid");

        if (driveStatus) {
          driveStatus.textContent = "✖";
          driveStatus.className = "drive-status invalid";
        }

        submitBtn.disabled = true;
      }
    });
  }

  /* ======================================================
     FORM SUBMIT
  ======================================================= */
  customForm.addEventListener("submit", () => {
    // Formspree will handle submission naturally
  });
});
/* ======================================================
   PRICE COUNTER ANIMATION
====================================================== */
function animatePrice(element, from, to, duration = 400) {
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(from + (to - from) * progress);
    element.innerText = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

