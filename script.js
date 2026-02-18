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
