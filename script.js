/* ===================================================================
   script.js — interactions for The Sai’s Café
   - Mobile nav toggle
   - Newsletter form handling (client-side)
   - Contact form validation
   - Gallery lightbox
   - Sticky subnav highlight (basic)
   =================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Populate current year in footers
  const year = new Date().getFullYear();
  ['year','yearAbout','yearMenu','yearGallery','yearContact'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  /* ---------------------------
     Mobile nav toggles
     --------------------------- */
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', function() {
      const nav = this.closest('.main-nav');
      if(!nav) return;
      const links = nav.querySelector('.nav-links');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if(links.style.display === 'flex') {
        links.style.display = '';
      } else {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.background = 'transparent';
        links.style.position = 'absolute';
        links.style.right = '18px';
        links.style.top = '62px';
        links.style.padding = '10px';
        links.style.borderRadius = '10px';
        links.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
      }
    });
  });

  /* ---------------------------
     Newsletter form
     --------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', function(e){
      e.preventDefault();
      const email = document.getElementById('newsletterEmail');
      if(!email) return;
      const val = email.value.trim();
      if(!validateEmail(val)){
        email.focus();
        alert('Please enter a valid email address.');
        return;
      }
      // Simulate subscription success (replace with real API integration)
      email.value = '';
      alert('Thanks — you are subscribed! (This is a demo: connect to your mailing service to store addresses.)');
    });
  }

  /* ---------------------------
     Contact form validation
     --------------------------- */
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const msgEl = document.getElementById('contactFormMessage');
      msgEl.textContent = '';

      if(!name || !email || !message){
        msgEl.textContent = 'Please complete all required fields.';
        msgEl.style.color = '#D96C45';
        return;
      }
      if(!validateEmail(email)){
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.style.color = '#D96C45';
        return;
      }

      // Demo: show success (replace with AJAX to server or Email API)
      msgEl.style.color = '#4A2C2A';
      msgEl.textContent = 'Thanks — your message has been sent! We will get back soon.';
      contactForm.reset();
    });
  }

  /* ---------------------------
     Gallery lightbox
     --------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if(galleryGrid && lightbox && lightboxImage && lightboxCaption){
    galleryGrid.addEventListener('click', function(e){
      const item = e.target.closest('.gallery-item');
      if(!item) return;
      const caption = item.dataset.caption || item.textContent || '';
      // For placeholders we show the caption text in the lightbox. When replaced with images, swap innerHTML with <img>.
      lightboxImage.innerHTML = `<div style="padding:24px;color:var(--muted);background:white;border-radius:12px;min-height:240px;display:flex;align-items:center;justify-content:center">${caption}</div>`;
      lightboxCaption.textContent = caption;
      lightbox.setAttribute('aria-hidden','false');
    });

    function closeLightbox(){
      lightbox.setAttribute('aria-hidden','true');
      lightboxImage.innerHTML = '';
      lightboxCaption.textContent = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------------------------
     Menu subnav highlight (very basic)
     --------------------------- */
  const menuSubnav = document.getElementById('menuSubnav');
  if(menuSubnav){
    const links = Array.from(menuSubnav.querySelectorAll('a'));
    const sections = links.map(l => document.querySelector(l.getAttribute('href')));
    window.addEventListener('scroll', function(){
      let idx = sections.findIndex(sec => {
        if(!sec) return false;
        const rect = sec.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });
      links.forEach((a,i) => {
        if(i === idx) a.classList.add('active');
        else a.classList.remove('active');
      });
    });
  }

  /* ---------------------------
     Utilities
     --------------------------- */
  function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});