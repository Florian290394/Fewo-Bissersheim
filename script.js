// Advanced gallery without pagination
const images = [
  { src: 'img/Wohnzimmer 1.jpeg', alt: 'Schlafzimmer' },
  { src: 'img/Wohnzimmer 2.jpeg', alt: 'Wohnzimmer' },
  { src: 'img/Eingang 1.jpeg', alt: 'Küche' },
  { src: 'img/Küche 1.jpeg', alt: 'Balkon' },
  { src: 'img/Bad 1.jpeg', alt: 'Badezimmer' },
  { src: 'img/Schlafzimmer 2.jpeg', alt: 'Essbereich' },
  { src: 'img/Schlafzimmer 3.jpeg', alt: 'Garten' },
  { src: 'img/Garten 1.jpeg', alt: 'Aussicht' }
];
// FullCalendar: Belegte Zeiträume einfach als Objekte im Array pflegen!
const bookingEvents = [
  // Einzelne Tage
  { title: 'Belegt', start: '2025-07-28', end: '2025-08-04', display: 'background', color: '#e74c3c' },
  { title: 'Belegt', start: '2025-08-13', end: '2025-08-18', display: 'background', color: '#e74c3c' },
  { title: 'Belegt', start: '2025-08-28', end: '2025-09-01', display: 'background', color: '#e74c3c' },
  { title: 'Belegt', start: '2025-06-13', end: '2025-06-16', display: 'background', color: '#e74c3c' },
  { title: 'Belegt', start: '2026-05-01', end: '2026-05-04', display: 'background', color: '#e74c3c' },
];
function renderGallery() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  gallery.innerHTML = '';
  images.forEach(img => {
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = img.alt;
    el.className = 'gallery-img';
    el.tabIndex = 0;
    el.addEventListener('click', () => showModal(img.src, img.alt));
    gallery.appendChild(el);
  });
}

function showModal(src, alt) {
  let currentIndex = images.findIndex(img => img.src === src);
  let modal = document.createElement('div');
  modal.className = 'img-modal'; // <-- Klasse war wieder weg
  function updateModal(index) {
    const img = images[index];
    modal.querySelector('.img-modal-img').src = img.src;
    modal.querySelector('.img-modal-img').alt = img.alt;
  }
  modal.innerHTML = `
    <div class="img-modal-content">
      <button class="img-modal-arrow img-modal-arrow-left" title="Vorheriges Bild">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 21L10.5 14L17.5 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <img src="${src}" alt="${alt}" class="img-modal-img">
      <button class="img-modal-arrow img-modal-arrow-right" title="Nächstes Bild">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 7L17.5 14L10.5 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="img-modal-close" title="Schließen">&times;</span>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  // Close
  modal.querySelector('.img-modal-close').onclick = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  };
  // Navigation
  modal.querySelector('.img-modal-arrow-left').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal(currentIndex);
  };
  modal.querySelector('.img-modal-arrow-right').onclick = (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateModal(currentIndex);
  };
  // Keyboard navigation
  modal.tabIndex = -1;
  modal.focus();
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModal(currentIndex);
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      updateModal(currentIndex);
    } else if (e.key === 'Escape') {
      modal.remove();
      document.body.style.overflow = '';
    }
  });
}



function renderBookingCalendar() {
  const calendarEl = document.getElementById('booking-calendar');
  if (!calendarEl) return;
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'de',
    height: 350,
    buttonText: {
      today: 'Heute'
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: bookingEvents,
    eventDisplay: 'background',
    selectable: false,
    editable: false,
    dayMaxEvents: true,
    fixedWeekCount: false,
    firstDay: 1,
    eventColor: '#e74c3c',
    eventBackgroundColor: '#e74c3c',
    eventBorderColor: '#e74c3c',
    eventTextColor: '#fff',
    dayCellClassNames: function(arg) {
      // Optionale Anpassung für belegte Tage
      return '';
    }
  });
  calendar.render();
}

function setupMobileNav() {
  const nav = document.getElementById('main-nav');
  const navToggle = document.querySelector('.nav-toggle');
  if (!nav || !navToggle) return;

  navToggle.addEventListener('click', function() {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Schließe Menü beim Klick auf Link (nur mobil)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Nur einen einzigen DOMContentLoaded-Handler verwenden!
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  renderBookingCalendar();
  setupMobileNav();
  // Smooth scrolling für die Navigation
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      // Kein history.pushState mehr, damit kein Hash in der URL steht
    });
  });
  window.addEventListener('scroll', highlightNav);
  highlightNav();
  // Scroll-nach-oben-Button anzeigen/ausblenden
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-top-button';
  scrollButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;
  scrollButton.title = "Nach oben scrollen";
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(scrollButton);
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });

  // Adjust list style position
  const ulElements = document.querySelectorAll('ul');
  ulElements.forEach(ul => {
    ul.style.listStylePosition = 'inside';
  });
});

// Funktion, um aktiven Navigationslink zu markieren
function highlightNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  // Ermittle die aktuelle Scroll-Position
  const fromTop = window.scrollY + 150; // Offset, damit Abschnitt etwas früher aktiviert wird
  
  // Entferne die aktive Klasse von allen Links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Prüfe, welcher Abschnitt aktuell im Viewport ist
  let currentSection = null;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Markiere den entsprechenden Link
  if (currentSection) {
    const activeLink = document.querySelector(`nav a[href="#${currentSection}"]`);
    if (activeLink) activeLink.classList.add('active');
  }
}

// Modal styles (wiederhergestellt)
const style = document.createElement('style');
style.innerHTML = `
.img-modal {
  position: fixed;
  z-index: 1000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(166,187,212,0.85); /* Pastel blue background */
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s;
}
.img-modal-content {
  position: relative;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 90vw;
  max-height: 80vh;
  box-shadow: 0 8px 32px rgba(166,187,212,0.18);
}
.img-modal-content img {
  max-width: 80vw;
  max-height: 60vh;
  border-radius: 0.7rem;
  display: block;
}
.img-modal-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;
  color: var(--primary);
  cursor: pointer;
  font-weight: bold;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scroll-Top-Button Styling */
.scroll-top-button {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(166,187,212,0.3);
  z-index: 100;
}

.scroll-top-button svg {
  width: 1.2rem;
  height: 1.2rem;
}

.scroll-top-button.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-top-button:hover {
  background: var(--dark-shade);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(166,187,212,0.4);
}
`;
document.head.appendChild(style);
