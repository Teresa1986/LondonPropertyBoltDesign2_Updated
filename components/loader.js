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

    // Initialize mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');

    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('show');
      });
    }

    // Add active class to the current page link (moved inside loadComponents)
    highlightActiveNavLink();

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

  // Wait for the header to be inserted before manipulating nav links
  setTimeout(() => {
    // Remove active class from all links
    document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove("active"));

    // Add active class to the current page link
    if (links[currentPage]) {
      const activeLink = document.getElementById(links[currentPage]);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }, 100); // Small delay to ensure elements are present
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);
