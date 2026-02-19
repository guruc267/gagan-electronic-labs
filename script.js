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
