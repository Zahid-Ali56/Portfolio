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

// SKILLS ANIMATION
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
const scrollBtn = document.querySelector(".scrolltop");

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// CERTIFICATES SLIDER & PROJECTS SEE MORE TOGGLE
document.addEventListener("DOMContentLoaded", () => {

  // 1. CERTIFICATES SLIDER LOGIC
  const container = document.getElementById('certificatesContainer');
  const leftBtn = document.getElementById('scrollLeft');
  const rightBtn = document.getElementById('scrollRight');

  if (container) {
    let autoScrollInterval;

    const getBatchWidth = () => {
      const card = container.querySelector('.certificate-card');
      if (card) {
        return (card.offsetWidth + 20) * 3;
      }
      return container.clientWidth;
    };

    const slideNext = () => {
      const scrollAmount = getBatchWidth();
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const slidePrev = () => {
      const scrollAmount = getBatchWidth();
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(slideNext, 5000);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        slideNext();
        stopAutoScroll();
        startAutoScroll();
      });
    }

    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        slidePrev();
        stopAutoScroll();
        startAutoScroll();
      });
    }

    const wrapper = container.closest('.certificates-wrapper') || container;
    wrapper.addEventListener('mouseenter', stopAutoScroll);
    wrapper.addEventListener('mouseleave', startAutoScroll);

    startAutoScroll();
  }

  // 2. PROJECTS "SEE MORE / SEE LESS" LOGIC
  const projectCards = document.querySelectorAll(".project-card");
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const maxInitialVisible = 6; // Initial visible projects limit

  if (projectCards.length > maxInitialVisible) {
    // Hide extra projects beyond initial 6 (index >= 6)
    projectCards.forEach((card, index) => {
      if (index >= maxInitialVisible) {
        card.classList.add("is-hidden");
      }
    });

    if (seeMoreBtn) {
      seeMoreBtn.style.display = "inline-block"; // Show button if > 6 projects
      seeMoreBtn.addEventListener("click", () => {
        const isExpanded = seeMoreBtn.getAttribute("data-expanded") === "true";

        if (!isExpanded) {
          // Show all projects
          projectCards.forEach(card => card.classList.remove("is-hidden"));
          seeMoreBtn.textContent = "See Less Projects";
          seeMoreBtn.setAttribute("data-expanded", "true");
        } else {
          // Hide back to initial 6 projects
          projectCards.forEach((card, index) => {
            if (index >= maxInitialVisible) {
              card.classList.add("is-hidden");
            }
          });
          seeMoreBtn.textContent = "See More Projects";
          seeMoreBtn.setAttribute("data-expanded", "false");

          // Smooth scroll back to top of projects section
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  } else if (seeMoreBtn) {
    // Hide button if total projects are 6 or fewer
    seeMoreBtn.style.display = "none";
  }
});