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


