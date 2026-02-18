function filterProjects(type){
  document.querySelectorAll('.card').forEach(card=>{
    card.style.display =
      type==='all' || card.classList.contains(type) ? 'block' : 'none';
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

