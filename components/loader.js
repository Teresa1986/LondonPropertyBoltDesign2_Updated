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

    // Ensure elements exist before initializing features
    setTimeout(() => {
      initializeMobileMenu();
      highlightActiveNavLink();  // ✅ Ensure this runs after header is loaded
      setupDropdownMenu(); // ✅ Setup mobile dropdown menu
    }, 100); // Small delay ensures DOM updates properly

  } catch (error) {
    console.error('Error loading components:', error);
  }
}

// Function to highlight the active navigation link
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const currentPage = currentPath.split("/").pop(); // Extract filename from URL

  // Mapping pages to their respective nav link IDs
  const links = {
    "index.html": "home-link",
    "properties.html": "properties-link",
    "retail.html": "properties-link",  // Keep Properties active for submenu pages
    "office.html": "properties-link",
    "leisure.html": "properties-link",
    "residential.html": "properties-link",
    "associatedcompanies.html": "associated-link",
    "people.html": "people-link",
    "financials.html": "financials-link",
    "contact.html": "contact-link"
  };

  setTimeout(() => {
    // Remove active class from all links
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.classList.remove("active");

      // Check if the link matches the current page
      if (link.getAttribute("href").toLowerCase() === currentPath) {
        link.classList.add("active");
      }
    });

    // If the current page is mapped, activate the corresponding link
    if (links[currentPage]) {
      const activeLink = document.getElementById(links[currentPage]);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }, 50);
}

// Ensure this function runs after components are loaded
document.addEventListener('DOMContentLoaded', highlightActiveNavLink);


// Function to toggle mobile menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-links');

  if (mobileMenuBtn && navMenu) {
    navMenu.classList.remove("show");
    mobileMenuBtn.addEventListener('click', () => {
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
      // Show dropdown on hover
      propertiesDropdown.addEventListener("mouseenter", function () {
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
        dropdownMenu.style.transform = "translateY(0)";
        propertiesDropdown.classList.add("active"); // Keep Properties link active
      });

      // Keep Properties active when submenu is hovered
      dropdownMenu.addEventListener("mouseenter", function () {
        propertiesDropdown.classList.add("active");
      });

      // Keep Properties active even after submenu item is clicked
      dropdownMenu.querySelectorAll("a").forEach(item => {
        item.addEventListener("click", function () {
          propertiesDropdown.classList.add("active"); // Keep active after clicking
        });
      });

      // Hide dropdown when leaving
      propertiesDropdown.addEventListener("mouseleave", function () {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
        dropdownMenu.style.transform = "translateY(-10px)";
      });
    }
  }, 100);
}


// Handle team-photo image logic
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.team-photo').forEach(img => {
    if (img.src.includes('/src/Image/whitebg.png')) {
      const teamCard = img.closest('.team-card');
      img.style.display = 'none';

      if (teamCard) {
        teamCard.style.backgroundColor = '#f9f9f9';
        teamCard.style.display = 'flex';
        teamCard.style.flexDirection = 'column';
        teamCard.style.justifyContent = 'center';
        teamCard.style.alignItems = 'center';
        teamCard.style.textAlign = 'center';
      }
    }
  });
});

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
