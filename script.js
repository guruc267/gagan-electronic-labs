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
   DARK MODE (SAFE – OPTIONAL)
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
   CUSTOMIZE PAGE LOGIC
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const customForm = $("customForm");
  if (!customForm) return; // 🔐 Exit if not customize page

  const projectType = $("projectType");
  const gramsBox = $("gramsBox");
  const fixedCostBox = $("fixedCostBox");
  const gramsInput = $("grams");
  const totalCost = $("totalCost");
  const estimatedField = $("estimatedCostField");

  const fileInput = $("designFiles");
  const driveLinksField = $("driveLinks");

  const uploadBox = $("uploadStatus");
  const progressBar = $("progressBar");
  const progressText = $("progressText");
  const successMessage = $("successMessage");

  /* ================= PRICE LOGIC ================= */
  window.handleProjectType = function () {
    const type = projectType.value;

    if (type === "3D Printing") {
      gramsBox.style.display = "flex";
      fixedCostBox.style.display = "none";
      totalCost.innerText = "50";
      estimatedField.value = "₹50 (Base Service Charge)";
    } else if (type) {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "block";
      totalCost.innerText = "1500";
      estimatedField.value = "₹1500 – ₹3000 (After Review)";
    } else {
      gramsBox.style.display = "none";
      fixedCostBox.style.display = "none";
      totalCost.innerText = "0";
      estimatedField.value = "₹0";
    }
  };

  window.calculateCost = function () {
    const grams = gramsInput.value || 0;
    const cost = grams * 10 + 50;
    totalCost.innerText = cost;
    estimatedField.value = "₹" + cost;
  };

  /* ================= FORM SUBMIT ================= */
  customForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = customForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerText = "Uploading...";

    /* ---------- FILE SIZE LIMIT (CRITICAL FIX) ---------- */
    const MAX_TOTAL_SIZE = 2 * 1024 * 1024; // 2 MB
    let totalSize = 0;

    for (const file of fileInput.files) {
      totalSize += file.size;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      alert("Total file size must be under 2 MB. Please compress your files.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Project Request";
      return;
    }

    /* ---------- UI ---------- */
    uploadBox.style.display = "block";
    progressBar.style.width = "0%";
    progressText.innerText = "Uploading files to Google Drive...";

    /* ---------- BASE64 ---------- */
    const files = [];
    let completed = 0;

    for (const file of fileInput.files) {
      const base64 = await toBase64(file);
      files.push({
        name: file.name,
        type: file.type,
        base64: base64.split(",")[1]
      });

      completed++;
      progressBar.style.width =
        Math.round((completed / fileInput.files.length) * 60) + "%";
    }

    /* ---------- GOOGLE DRIVE ---------- */
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby09YCTP4uBgjqJ05HoNY-3kDHPhBQQ5eHs1ItsKnVBHq3Q0D01sep8mIWoEOzi3-5p/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files })
      }
    );

    const result = await response.json();
    if (!result.success) {
      alert("Upload failed. Please try again.");
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Project Request";
      return;
    }

    /* ---------- FORMSPREE ---------- */
    progressBar.style.width = "85%";
    progressText.innerText = "Sending project details...";
    driveLinksField.value = result.links.join("\n");

    await fetch(customForm.action, {
      method: "POST",
      body: new FormData(customForm),
      headers: { Accept: "application/json" }
    });

    /* ---------- DONE ---------- */
    progressBar.style.width = "100%";
    progressText.innerText = "Done!";
    successMessage.style.display = "block";
    submitBtn.innerText = "Submitted";
    customForm.reset();
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
