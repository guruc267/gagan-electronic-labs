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
