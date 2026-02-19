document.addEventListener("DOMContentLoaded", () => {

  /* ================= PROJECT FILTER ================= */
  window.filterProjects = function (type) {
    document.querySelectorAll(".project-card").forEach(card => {
      card.style.display =
        type === "all" || card.classList.contains(type)
          ? "block"
          : "none";
    });
  };

  /* ================= NAVBAR SHADOW ================= */
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (header) {
      header.style.boxShadow =
        window.scrollY > 20 ? "0 5px 15px rgba(0,0,0,.2)" : "none";
    }
  });

  /* ================= CONTACT FORM SUCCESS ================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      setTimeout(() => {
        const msg = document.querySelector(".success-message");
        if (msg) msg.style.display = "block";
        contactForm.reset();
      }, 800);
    });
  }

  /* ================= CUSTOMIZE PAGE ================= */
  const customForm = document.getElementById("customForm");
  if (!customForm) return; // stop JS here if not customize page

  const projectType = document.getElementById("projectType");
  const gramsBox = document.getElementById("gramsBox");
  const fixedCostBox = document.getElementById("fixedCostBox");
  const gramsInput = document.getElementById("grams");
  const totalCost = document.getElementById("totalCost");
  const estimatedField = document.getElementById("estimatedCostField");

  const fileInput = document.getElementById("designFiles");
  const driveLinksField = document.getElementById("driveLinks");

  const uploadBox = document.getElementById("uploadStatus");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const successMessage = document.getElementById("successMessage");

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

    uploadBox.style.display = "block";
    progressBar.style.width = "0%";
    progressText.innerText = "Uploading files to Google Drive...";

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

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyeFyaY0dDYDAESvfBEd5MgQWZGVBDR2jZulXwhuRBv5Fb-jaRsupgjVEGzuus0ksrVoQ/exec",
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

    progressBar.style.width = "85%";
    progressText.innerText = "Sending project details...";
    driveLinksField.value = result.links.join("\n");

    await fetch(customForm.action, {
      method: "POST",
      body: new FormData(customForm),
      headers: { Accept: "application/json" }
    });

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
