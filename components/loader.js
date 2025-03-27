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
      setupDropdownMenu(); // Setup mobile dropdown menu
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
    const propertiesDropdown = document.querySelector('.properties-dropdown');
    const dropdownMenu = document.querySelector('.properties-menu');
    
    if (propertiesDropdown && dropdownMenu) {
      // Toggle active class on click for mobile
      propertiesDropdown.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent link navigation
        propertiesDropdown.classList.toggle('active'); // Toggle active state for mobile
      });
      
      // Optionally close the dropdown when clicking outside
      document.addEventListener("click", function (event) {
        if (!propertiesDropdown.contains(event.target)) {
          propertiesDropdown.classList.remove('active'); // Close dropdown when clicking outside
        }
      });

      // Add click event to submenu items for mobile to mimic hover effect
      const menuItems = dropdownMenu.querySelectorAll("li");
      menuItems.forEach(item => {
        item.addEventListener("click", function () {
          // Toggle the active class to simulate hover
          item.classList.toggle("active");

          // Optionally close the dropdown after selection (if you want to hide after click)
          dropdownMenu.classList.remove("show");
        });
      });
    }
  }, 100);
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
