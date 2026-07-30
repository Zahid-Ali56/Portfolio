// MENU TOGGLE 
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const closeBtn = document.getElementById("closeBtn");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.add("active");
  });
}

if (closeBtn && navLinks) {
  closeBtn.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
}


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


// SCROLL TO TOP
let scroll = document.querySelector(".scrolltop");

if (scroll) {
  scroll.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
// CERTIFICATES SLIDER WITH 3-CARD BATCH AUTO-ROTATE
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('certificatesContainer');
  const leftBtn = document.getElementById('scrollLeft');
  const rightBtn = document.getElementById('scrollRight');

  if (container) {
    let autoScrollInterval;

    // Calculate the total width of 3 cards combined
    const getBatchWidth = () => {
      const card = container.querySelector('.certificate-card');
      if (card) {
        // Individual card width plus gap (20px) multiplied by 3 cards
        return (card.offsetWidth + 20) * 3;
      }
      return container.clientWidth; // Fallback to full viewport width
    };

    // Slide Next (Batch of 3 Cards)
    const slideNext = () => {
      const scrollAmount = getBatchWidth();
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      // Reset scroll position to the beginning if reaching the end
      if (container.scrollLeft >= maxScrollLeft - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    // Slide Previous (Batch of 3 Cards)
    const slidePrev = () => {
      const scrollAmount = getBatchWidth();
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    // Start Auto-rotation Timer
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(slideNext, 5000); // 5 Seconds Interval
    };

    // Stop Auto-rotation Timer
    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    // Right Button Click Event Handler
    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        slideNext();
        stopAutoScroll();
        startAutoScroll(); // Reset rotation timer
      });
    }

    // Left Button Click Event Handler
    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        slidePrev();
        stopAutoScroll();
        startAutoScroll(); // Reset rotation timer
      });
    }

    // Pause Auto-rotation on Mouse Hover & Resume on Mouse Leave
    const wrapper = container.closest('.certificates-wrapper') || container;
    wrapper.addEventListener('mouseenter', stopAutoScroll);
    wrapper.addEventListener('mouseleave', startAutoScroll);

    // Initialize Auto-rotation
    startAutoScroll();
  }
});
