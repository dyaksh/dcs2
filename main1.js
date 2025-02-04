(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", function() {
  const marqueeSection = document.getElementById("anniversary-marquee");
  const currentDate = new Date();
  const endDate = new Date('2024-08-31'); // Set the end date for the marquee display

  if (currentDate > endDate) {
    marqueeSection.style.display = 'none';
  }
});
/* Function for the  logo load for client and partner section */
document.addEventListener('DOMContentLoaded', () => {
  // Load client logos
  const clientLogosContainer = document.getElementById('client-logos');
  fetch('listImages.php?type=clients')
    .then(response => response.json())
    .then(images => {
      images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.path;
        img.alt = image.name;
        clientLogosContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching client images:', error));

  // Load partner logos
  const partnerLogosContainer = document.getElementById('partner-logos');
  fetch('listImages.php?type=partners')
    .then(response => response.json())
    .then(images => {
      images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.path;
        img.alt = image.name;
        partnerLogosContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching partner images:', error));
});


/*-- Marquee text  --*/
document.addEventListener('DOMContentLoaded', () => {
  fetch('Slider.txt')
    .then(response => response.text())
    .then(text => {
      const marquee = document.getElementById('marquee-text');
      marquee.innerHTML = text;
    })
    .catch(error => console.error('Error fetching anniversary text:', error));
});

/**
 * Team
 */

    document.addEventListener('DOMContentLoaded', function() {
      const teamMembersContainer = document.getElementById('team-members');

      // Function to fetch and display team members
      function fetchTeamData() {
        fetch('team.txt') // Adjust path as needed
          .then(response => response.text())
          .then(data => {
            const members = data.trim().split('\n');
            let cardHtml = '';

            members.forEach(member => {
              const [imageName, fullName, profession, linkedin, twitter, instagram, facebook] = member.split(',');

              cardHtml += `
               <div class="swiper-slide">
  <div class="card-item">
    <div class="user-image-wrapper">
      <img src="./assets/img/team/${imageName.trim()}" alt="${fullName.trim()}" class="user-image">
    </div>
    <h2 class="user-name">${fullName.trim()}</h2>
    <p class="user-profession">${profession.trim()}</p>
    <div class="social-links">
      <a href="${linkedin.trim() ? linkedin.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>
      <a href="${twitter.trim() ? twitter.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-twitter"></i></a>
      <a href="${facebook.trim() ? facebook.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
      <a href="${instagram.trim() ? instagram.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-instagram"></i></a>
    </div>
  </div>
</div>

              `;
            });

            teamMembersContainer.innerHTML = cardHtml;

            // Initialize Swiper for team slider
            new Swiper('.team-slider', {
              slidesPerView: 1,
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              breakpoints: {
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              },
              autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
            });
          })
          .catch(error => console.error('Error fetching team data:', error));
      }

      // Call the function to fetch team data
      fetchTeamData();
    });

/* Offices */
document.addEventListener("DOMContentLoaded", () => {
  const officeCards = document.getElementById('officeCards');
  
  if (!officeCards) {
      console.error('Error: officeCards element not found');
      return;
  }

  fetch('offices.txt')
      .then(response => response.text())
      .then(data => {
          const lines = data.split('\n');
          
          lines.forEach(line => {
              const [image, location, phone, email, address] = line.split('|');
              
              if (!image || !location || !phone || !email || !address) {
                  console.error('Error: Missing data in line:', line);
                  return;
              }

              const card = document.createElement('div');
              card.classList.add('office-card');
              
              card.innerHTML = `
                  <img src="assets/img/offices/${image}" alt="${location}">
                  <div class="office-card-content">
                      <h3>${location}</h3>
                      <p>${address}</p>
                      <p>${phone}</p>
                      <a href="mailto:${email}">${email}</a>
                  </div>
              `;
              
              officeCards.appendChild(card);
          });
      })
      .catch(error => console.error('Error fetching office data:', error));
});

/** career */
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('career-modal');
  var openModalButton = document.getElementById('open-career-form');
  var closeModalButton = document.querySelector('.close');

  openModalButton.addEventListener('click', function() {
    modal.style.display = 'block';
  });

  closeModalButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});

