// MENU TOGGLE 
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const closeBtn = document.getElementById("closeBtn");

menuToggle.addEventListener("click", () => {
  navLinks.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
});



// SKILLS  
document.addEventListener("DOMContentLoaded", () => {
  const skillFills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute("data-fill");
        fill.style.width = width;
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => observer.observe(fill));
});


// scroll to top
let scroll = document.querySelector(".scrolltop");

scroll.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})