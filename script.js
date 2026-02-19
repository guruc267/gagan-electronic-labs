function filterProjects(type) {
  document.querySelectorAll(".project-card").forEach(card => {
    if (type === "all" || card.classList.contains(type)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


function validateForm(){
  if(!name.value || !email.value || !message.value){
    alert("Please fill all fields");
    return false;
  }
  return true;
}
// Navbar shadow on scroll
window.addEventListener("scroll",()=>{
  document.querySelector("header").style.boxShadow =
    window.scrollY > 20 ? "0 5px 15px rgba(0,0,0,.2)" : "none";
});
const toggle = document.getElementById("darkToggle");

// Load saved theme
if(localStorage.theme === "dark"){
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.theme = "dark";
    toggle.textContent = "☀️";
  } else {
    localStorage.theme = "light";
    toggle.textContent = "🌙";
  }
});
// Success animation after submit
const form = document.getElementById("contactForm");

if(form){
  form.addEventListener("submit", () => {
    setTimeout(() => {
      document.querySelector(".success-message").style.display = "block";
      form.reset();
    }, 1000);
  });
}

// ================= PRICE CALCULATOR =================
const projectType = document.getElementById("projectType");
const printFields = document.getElementById("printFields");
const electronicsFields = document.getElementById("electronicsFields");
const priceText = document.getElementById("price");

function updatePrice() {
  let price = 0;

  if (projectType.value === "3d") {
    const weight = document.getElementById("weight").value || 0;
    price = weight * 10;
  }

  if (projectType.value === "electronics" || projectType.value === "lora") {
    const hours = document.getElementById("hours").value || 0;
    price = hours * 500;
  }

  priceText.textContent = `₹${price}`;
}

if (projectType) {
  projectType.addEventListener("change", () => {
    printFields.style.display = "none";
    electronicsFields.style.display = "none";

    if (projectType.value === "3d") {
      printFields.style.display = "block";
    }

    if (projectType.value === "electronics" || projectType.value === "lora") {
      electronicsFields.style.display = "block";
    }

    updatePrice();
  });
}

document.addEventListener("input", updatePrice);


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Instant Cost Estimator | GAGAN ELECTRONIC LABS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- LOTTIE -->
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

  <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- ================= HEADER ================= -->
<header>
  <h1>GAGAN ELECTRONIC LABS</h1>
  <nav>
    <a href="index.html">Home</a>
    <a href="projects.html">Projects</a>
    <a href="customize.html">Customize</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>

<!-- ================= CUSTOMIZE SECTION ================= -->
<section class="customize-section">

  <!-- LEFT : FORM CARD -->
  <div class="customize-card">
    <h2>Instant Project Cost Estimator</h2>
    <p class="subtitle">
      Get a quick estimate before submitting your project.
    </p>

    <!-- FORM (CONNECTED TO FORMSPREE) -->
    <form
      class="custom-form"
      action="https://formspree.io/f/mqedljpp"
      method="POST"
    >

      <!-- EMAIL -->
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
      >

      <!-- PROJECT TYPE -->
      <select
        id="projectType"
        name="project_type"
        onchange="handleProjectType()"
        required
      >
        <option value="">Select Project Type</option>
        <option value="3D Printing">3D Printing</option>
        <option value="Electronics / IoT">Electronics / IoT</option>
        <option value="Robotics">Robotics</option>
        <option value="LoRa / EV Systems">LoRa / EV Systems</option>
        <option value="MATLAB / Simulation">MATLAB / Simulation</option>
      </select>

      <!-- FILE UPLOAD -->
      <div class="upload-box">
        <label>Upload Design Files</label>
        <input
          type="file"
          name="design_files"
          accept=".stl,.step,.pdf"
          multiple
        >
        <small>Accepted formats: STL, STEP, PDF</small>
      </div>

      <!-- GRAMS (ONLY FOR 3D PRINTING) -->
      <div class="calc-box" id="gramsBox" style="display:none;">
        <input
          type="number"
          id="grams"
          name="print_weight_grams"
          placeholder="3D Print Weight (grams)"
          oninput="calculateCost()"
        >
        <span>₹10 / gram + ₹50 service charge</span>
      </div>

      <!-- FIXED PRICE INFO -->
      <div class="fixed-cost" id="fixedCostBox" style="display:none;">
        <strong>Average Project Cost</strong>
        <p>₹1500 – ₹3000 (final cost after review)</p>
      </div>

      <!-- FINAL COST -->
      <div class="price-box">
        Estimated Cost:
        <span>₹<span id="totalCost">0</span></span>
      </div>

      <!-- HIDDEN FIELD FOR EMAIL -->
      <input
        type="hidden"
        name="estimated_cost"
        id="estimatedCostField"
        value="₹0"
      >

      <button type="submit" class="btn full-btn">
        Submit Project Request
      </button>

    </form>
  </div>

  <!-- RIGHT : LOTTIE -->
  <div class="contact-illustration">
    <lottie-player
      src="https://assets8.lottiefiles.com/packages/lf20_0yfsb3a1.json"
      background="transparent"
      speed="1"
      loop
      autoplay>
    </lottie-player>
  </div>

</section>

<!-- ================= FOOTER ================= -->
<footer>
  © 2026 Gagan Electronic Labs. All Rights Reserved.
</footer>

<a href="https://wa.me/916301509299" class="whatsapp" target="_blank">💬</a>

<!-- ================= SCRIPT ================= -->
<script>
function handleProjectType() {
  const type = document.getElementById("projectType").value;
  const gramsBox = document.getElementById("gramsBox");
  const fixedBox = document.getElementById("fixedCostBox");
  const total = document.getElementById("totalCost");
  const hidden = document.getElementById("estimatedCostField");

  if (type === "3D Printing") {
    gramsBox.style.display = "flex";
    fixedBox.style.display = "none";
    total.innerText = 50;
    hidden.value = "₹50 (Base Service Charge)";
  } else if (type) {
    gramsBox.style.display = "none";
    fixedBox.style.display = "block";
    total.innerText = 1500;
    hidden.value = "₹1500 - 3000(Average Project Cost deside after review)";
  } else {
    gramsBox.style.display = "none";
    fixedBox.style.display = "none";
    total.innerText = 0;
    hidden.value = "₹0";
  }
}

function calculateCost() {
  const grams = document.getElementById("grams").value || 0;
  const cost = (grams * 10) + 50;
  document.getElementById("totalCost").innerText = cost;
  document.getElementById("estimatedCostField").value = "₹" + cost;
}
</script>

</body>
</html>
// other JS code above (price calc, form logic, etc.)

/* ================= PROJECT FILTER ================= */
function filterProjects(type) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type)
        ? "block"
        : "none";
  });
}

/* ================= NAVBAR SHADOW ================= */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    header.style.boxShadow =
      window.scrollY > 20 ? "0 5px 15px rgba(0,0,0,.2)" : "none";
  }
});

/* ================= DARK MODE (OPTIONAL) ================= */
const toggle = document.getElementById("darkToggle");
if (toggle) {
  if (localStorage.theme === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.theme =
      document.body.classList.contains("dark") ? "dark" : "light";
    toggle.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customForm");
  if (!form) return; // SAFE now

  const fileInput = document.getElementById("designFiles");
  const driveLinksField = document.getElementById("driveLinks");

  const uploadBox = document.getElementById("uploadStatus");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
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

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(() => {
      progressBar.style.width = "100%";
      progressText.innerText = "Done!";
      successMessage.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Project Request";
      form.reset();
    });
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


