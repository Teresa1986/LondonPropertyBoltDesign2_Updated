// Function to load and insert header and footer
async function loadComponents() {
  try {
    // Load header
    const headerResponse = await fetch('/components/header.html');
    if (!headerResponse.ok) {
      throw new Error(`HTTP error! status: ${headerResponse.status}`);
    }
    const headerHtml = await headerResponse.text();
    document.body.insertAdjacentHTML('afterbegin', headerHtml);

    // Load footer
    const footerResponse = await fetch('/components/footer.html');
    if (!footerResponse.ok) {
      throw new Error(`HTTP error! status: ${footerResponse.status}`);
    }
    const footerHtml = await footerResponse.text();
    document.body.insertAdjacentHTML('beforeend', footerHtml);

    // Ensure elements exist before initializing
    setTimeout(() => {
      initializeMobileMenu();
      highlightActiveNavLink();
      setupDropdownMenu();
    }, 100); // Small delay ensures the DOM updates properly

  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Function to highlight the active navigation link
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  const links = {
    "index.html": "home-link",
    "properties.html": "properties-link",
    "associatedcompanies.html": "associated-link",
    "people.html": "people-link",
    "financials.html": "financials-link",
    "contact.html": "contact-link"
  };

  setTimeout(() => {
    document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove("active"));

    if (links[currentPage]) {
      const activeLink = document.getElementById(links[currentPage]);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }, 50);
}

// Function to toggle mobile menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-links');

  if (mobileMenuBtn && navMenu) {
    // Ensure menu is hidden by default
    navMenu.classList.remove("show");

    mobileMenuBtn.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });
  }
}

// Function to setup dropdown menu
function setupDropdownMenu() {
  setTimeout(() => {
      const dropdownMenu = document.getElementById("dropdown-menu");
      const associatedLink = document.getElementById("associated-link");

      if (dropdownMenu && associatedLink) {
          const parentElement = associatedLink.parentElement;

          // Ensure dropdown starts hidden
          dropdownMenu.style.opacity = "0";
          dropdownMenu.style.visibility = "hidden";
          dropdownMenu.style.transform = "translateY(-10px)";
          dropdownMenu.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0.3s ease-out";

          // Show dropdown smoothly on hover (for desktops)
          parentElement.addEventListener("mouseenter", function () {
              dropdownMenu.style.opacity = "1";
              dropdownMenu.style.visibility = "visible";
              dropdownMenu.style.transform = "translateY(0)";
          });

          // Hide dropdown smoothly when mouse leaves (for desktops)
          parentElement.addEventListener("mouseleave", function () {
              dropdownMenu.style.opacity = "0";
              dropdownMenu.style.visibility = "hidden";
              dropdownMenu.style.transform = "translateY(-10px)";
          });

          // Toggle dropdown visibility on mobile click
          associatedLink.addEventListener("click", function (event) {
              event.preventDefault(); // Prevent link navigation
              dropdownMenu.classList.toggle("show");
          });

          // Close dropdown when clicking outside
          document.addEventListener("click", function (event) {
              if (!parentElement.contains(event.target)) {
                  dropdownMenu.style.opacity = "0";
                  dropdownMenu.style.visibility = "hidden";
                  dropdownMenu.style.transform = "translateY(-10px)";
              }
          });
      }
  }, 100);
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
