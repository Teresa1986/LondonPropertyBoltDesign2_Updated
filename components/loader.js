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
function initializeOfficeCarousel() {
  const images = [
    "src/Image/Dean Bradley/Dean-02.jpg",
    "src/Image/Dean Bradley/Dean-03.jpg",
    "src/Image/Dean Bradley/Dean-04.jpg",
    // Add more images if needed
  ];
  let currentIndex = 0;
  const carouselImage = document.getElementById("carouselImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let intervalId;

  function showImage(index) {
    carouselImage.src = images[index];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  prevBtn.onclick = function () {
    prevImage();
    resetInterval();
  };
  nextBtn.onclick = function () {
    nextImage();
    resetInterval();
  };

  function startInterval() {
    intervalId = setInterval(nextImage, 3000); // Change image every 3 seconds
  }

  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  showImage(currentIndex);
  startInterval();
}

function initializeResidentialCarousels() {
  // Chelsea Cloisters Carousel
  const chelseaImages = [
    "src/Image/Residential/Chelsea Cloisters/Cloisters-01.jpg",
    "src/Image/Residential/Chelsea Cloisters/Cloisters-02.jpg",
    "src/Image/Residential/Chelsea Cloisters/Cloisters-03.jpg",
    // Add more images as needed
  ];
  let chelseaIndex = 0;
  const chelseaImg = document.getElementById("chelseaCarouselImage");
  const chelseaPrev = document.getElementById("chelseaPrevBtn");
  const chelseaNext = document.getElementById("chelseaNextBtn");
  let chelseaInterval;

  function showChelseaImage(idx) {
    chelseaImg.src = chelseaImages[idx];
  }
  function nextChelsea() {
    chelseaIndex = (chelseaIndex + 1) % chelseaImages.length;
    showChelseaImage(chelseaIndex);
  }
  function prevChelsea() {
    chelseaIndex =
      (chelseaIndex - 1 + chelseaImages.length) % chelseaImages.length;
    showChelseaImage(chelseaIndex);
  }
  chelseaPrev.onclick = function () {
    prevChelsea();
    resetChelseaInterval();
  };
  chelseaNext.onclick = function () {
    nextChelsea();
    resetChelseaInterval();
  };
  function startChelseaInterval() {
    chelseaInterval = setInterval(nextChelsea, 3000);
  }
  function resetChelseaInterval() {
    clearInterval(chelseaInterval);
    startChelseaInterval();
  }
  showChelseaImage(chelseaIndex);
  startChelseaInterval();

  // Empire Court Carousel
  const empireImages = [
    "src/Image/Residential/Empire Court/Empire-02.jpg",
    "src/Image/Residential/Empire Court/Empire-03.jpg",
    "src/Image/Residential/Empire Court/Empire-04.jpg",
    // Add more images as needed
  ];
  let empireIndex = 0;
  const empireImg = document.getElementById("empireCarouselImage");
  const empirePrev = document.getElementById("empirePrevBtn");
  const empireNext = document.getElementById("empireNextBtn");
  let empireInterval;

  function showEmpireImage(idx) {
    empireImg.src = empireImages[idx];
  }
  function nextEmpire() {
    empireIndex = (empireIndex + 1) % empireImages.length;
    showEmpireImage(empireIndex);
  }
  function prevEmpire() {
    empireIndex = (empireIndex - 1 + empireImages.length) % empireImages.length;
    showEmpireImage(empireIndex);
  }
  empirePrev.onclick = function () {
    prevEmpire();
    resetEmpireInterval();
  };
  empireNext.onclick = function () {
    nextEmpire();
    resetEmpireInterval();
  };
  function startEmpireInterval() {
    empireInterval = setInterval(nextEmpire, 3000);
  }
  function resetEmpireInterval() {
    clearInterval(empireInterval);
    startEmpireInterval();
  }
  showEmpireImage(empireIndex);
  startEmpireInterval();
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
function initializeOfficeCarousel() {
  const images = [
    "src/Image/Dean Bradley/Dean-02.jpg",
    "src/Image/Dean Bradley/Dean-03.jpg",
    "src/Image/Dean Bradley/Dean-04.jpg",
    // Add more images if needed
  ];
  let currentIndex = 0;
  const carouselImage = document.getElementById("carouselImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let intervalId;

  function showImage(index) {
    carouselImage.src = images[index];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  prevBtn.onclick = function () {
    prevImage();
    resetInterval();
  };
  nextBtn.onclick = function () {
    nextImage();
    resetInterval();
  };

  function startInterval() {
    intervalId = setInterval(nextImage, 3000); // Change image every 3 seconds
  }

  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  showImage(currentIndex);
  startInterval();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeTabs();
  initializeResidentialCarousels();
});

function initializeTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = tab.dataset.tab;

      // Remove active class from all
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      // Activate clicked tab
      tab.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

function initializeResidentialCarousels() {
  setupCarousel({
    images: [
      "src/Image/Residential/Chelsea Cloisters/Cloisters-01.jpg",
      "src/Image/Residential/Chelsea Cloisters/Cloisters-02.jpg",
      "src/Image/Residential/Chelsea Cloisters/Cloisters-04.jpg"
    ],
    imgId: "chelseaCarouselImage",
    prevBtnId: "chelseaPrevBtn",
    nextBtnId: "chelseaNextBtn"
  });

  setupCarousel({
    images: [
      "src/Image/Residential/Empire Court/Empire-02.jpg",
      "src/Image/Residential/Empire Court/Empire-05.jpg",
      "src/Image/Residential/Empire Court/Empire-08.jpg",
      "src/Image/Residential/Empire Court/Empire-09.jpg",
      "src/Image/Residential/Empire Court/Empire-11.jpg",
      "src/Image/Residential/Empire Court/Empire-13.jpg",
    ],
    imgId: "empireCarouselImage",
    prevBtnId: "empirePrevBtn",
    nextBtnId: "empireNextBtn"
  });

  setupCarousel({
    images: [
      "src/Image/Residential/Endsleigh Court/Endsleigh-01.jpg",
      "src/Image/Residential/Endsleigh Court/Endsleigh-02.jpg",
      "src/Image/Residential/Endsleigh Court/Endsleigh-03.jpg",
      "src/Image/Residential/Endsleigh Court/Endsleigh-04.jpg",
      "src/Image/Residential/Endsleigh Court/Endsleigh-05.jpg",
      "src/Image/Residential/Endsleigh Court/Endsleigh-06.jpg",
      
    ],
    imgId: "endsleighCarouselImage",
    prevBtnId: "endsleighPrevBtn",
    nextBtnId: "endsleighNextBtn"
  });
}

function setupCarousel({ images, imgId, prevBtnId, nextBtnId }) {
  let index = 0;
  const imgElement = document.getElementById(imgId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  let interval;

  function showImage(idx) {
    if (imgElement) {
      imgElement.src = images[idx];
    }
  }

  function nextImage() {
    index = (index + 1) % images.length;
    showImage(index);
  }

  function prevImage() {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  }

  function startAutoScroll() {
    interval = setInterval(nextImage, 3000);
  }

  function resetAutoScroll() {
    clearInterval(interval);
    startAutoScroll();
  }

  if (imgElement && prevBtn && nextBtn) {
    showImage(index);
    startAutoScroll();

    nextBtn.addEventListener("click", () => {
      nextImage();
      resetAutoScroll();
    });

    prevBtn.addEventListener("click", () => {
      prevImage();
      resetAutoScroll();
    });
  } else {
    console.warn(`Carousel elements not found for ${imgId}`);
  }
}




function initializeTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = tab.dataset.tab;

      // Remove active class from all
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      // Activate clicked tab
      tab.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });
}


// Run component loading and tab initialization on DOM load

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

document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
  highlightActiveNavLink();

  setTimeout(() => {
    initializeOfficeCarousel();
    initializeResidentialCarousels(); // Initialize the Chelsea carousel
    initializeResidentialTabs();
  }, 300);
});
