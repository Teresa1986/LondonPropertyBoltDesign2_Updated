// Load components: header and footer
async function loadComponents() {
  try {
    // Load header
    const headerResponse = await fetch("/components/header.html");
    if (!headerResponse.ok) {
      throw new Error(`HTTP error! status: ${headerResponse.status}`);
    }
    const headerHtml = await headerResponse.text();
    document.body.insertAdjacentHTML("afterbegin", headerHtml);

    // Load footer
    const footerResponse = await fetch("/components/footer.html");
    if (!footerResponse.ok) {
      throw new Error(`HTTP error! status: ${footerResponse.status}`);
    }
    const footerHtml = await footerResponse.text();
    document.body.insertAdjacentHTML("beforeend", footerHtml);

    // After components load, initialize features
    setTimeout(() => {
      initializeMobileMenu();
      highlightActiveNavLink();
      setupDropdownMenu();
      initializeOwlCarousel(); // ✅ Initialize carousel
    }, 100); // Delay to ensure DOM updates
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

// Highlight active navigation link based on current page
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const currentPage = currentPath.split("/").pop();

  const links = {
    "index.html": "home-link",
    "properties.html": "properties-link",
    "retail.html": "properties-link",
    "office.html": "properties-link",
    "leisure.html": "properties-link",
    "residential.html": "properties-link",
    "associatedcompanies.html": "associated-link",
    "people.html": "people-link",
    "financials.html": "financials-link",
    "contact.html": "contact-link",
  };

  setTimeout(() => {
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href").toLowerCase() === currentPath) {
        link.classList.add("active");
      }
    });

    if (links[currentPage]) {
      const activeLink = document.getElementById(links[currentPage]);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }, 50);
}

// Initialize mobile menu toggle
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-links");

  if (mobileMenuBtn && navMenu) {
    navMenu.classList.remove("show");
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
}

// Setup dropdown menu for "Properties"
function setupDropdownMenu() {
  setTimeout(() => {
    const propertiesDropdown = document.querySelector(".properties-dropdown");
    const dropdownMenu = document.querySelector(".properties-menu");

    if (propertiesDropdown && dropdownMenu) {
      propertiesDropdown.addEventListener("mouseenter", function () {
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
        dropdownMenu.style.transform = "translateY(0)";
        propertiesDropdown.classList.add("active");
      });

      dropdownMenu.addEventListener("mouseenter", function () {
        propertiesDropdown.classList.add("active");
      });

      dropdownMenu.querySelectorAll("a").forEach((item) => {
        item.addEventListener("click", function () {
          propertiesDropdown.classList.add("active");
        });
      });

      propertiesDropdown.addEventListener("mouseleave", function () {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
        dropdownMenu.style.transform = "translateY(-10px)";
      });
    }
  }, 100);
}

// Initialize Owl Carousel
function initializeOwlCarousel() {
  if (typeof $ !== "undefined" && $(".owl-carousel").length > 0) {
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  }
}

// Handle team-photo image fallback
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".team-photo").forEach((img) => {
    if (img.src.includes("/src/Image/whitebg.png")) {
      const teamCard = img.closest(".team-card");
      img.style.display = "none";

      if (teamCard) {
        teamCard.style.backgroundColor = "#f9f9f9";
        teamCard.style.display = "flex";
        teamCard.style.flexDirection = "column";
        teamCard.style.justifyContent = "center";
        teamCard.style.alignItems = "center";
        teamCard.style.textAlign = "center";
      }
    }
  });
});

// Run component loading and active link highlight on DOM load
document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
  highlightActiveNavLink();
});
