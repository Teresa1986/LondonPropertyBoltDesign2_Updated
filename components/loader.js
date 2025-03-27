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
      // Show the dropdown on hover (desktop view)
      propertiesDropdown.addEventListener("mouseenter", function () {
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
        dropdownMenu.style.transform = "translateY(0)";
      });

      propertiesDropdown.addEventListener("mouseleave", function () {
        dropdownMenu.style.opacity = "0";
        dropdownMenu.style.visibility = "hidden";
        dropdownMenu.style.transform = "translateY(-10px)";
      });

      // Toggle the dropdown on click (mobile view)
      propertiesDropdown.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent link navigation for the dropdown toggle
        propertiesDropdown.classList.toggle('active'); // Toggle active state for mobile
      });

      // Close the dropdown if clicking outside
      document.addEventListener("click", function (event) {
        if (!propertiesDropdown.contains(event.target)) {
          propertiesDropdown.classList.remove('active'); // Close dropdown
        }
      });

      // Click events for submenu items
      const menuItems = dropdownMenu.querySelectorAll("li");
      menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
          // Allow the link to be clicked
          const link = item.querySelector('a');
          if (link) {
            window.location.href = link.href; // Navigate to the link's destination
          }

          // Optionally close the dropdown after clicking an item
          dropdownMenu.classList.remove("show");
        });
      });
    }
  }, 100);
}

// Function to handle team-photo image logic and background color
document.addEventListener('DOMContentLoaded', function() {
  // Select all images with the class 'team-photo'
  const teamPhotos = document.querySelectorAll('.team-photo');

  // Loop through each image
  teamPhotos.forEach(function(img) {
    // Check if the image source matches '/src/Image/whitebg.png'
    if (img.src.includes('/src/Image/whitebg.png')) {
      // Find the parent element (team-card)
      const teamCard = img.closest('.team-card');

      // Remove the image tag
      img.style.display = 'none';

      // Set the background color of the team-card to #f9f9f9
      if (teamCard) {
        teamCard.style.backgroundColor = '#f9f9f9';
          // Center the content inside the team-card
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