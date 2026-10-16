// name=assets/js/gallery.js
// Lightweight JS to initialize Swiper and a simple lightbox for the gallery.

document.addEventListener('DOMContentLoaded', function(){

  // Init Swiper (hero carousel) - requires the Swiper script included on the page
  if (window.Swiper) {
    new Swiper('.swiper-container', {
      loop: true,
      speed: 900,
      autoplay: { delay: 5000, disableOnInteraction: false },
      effect: 'fade',
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      a11y: { enabled: true }
    });
  }

  // Simple lightbox
  const gallery = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let items = Array.from(gallery);
  let current = -1;

  function open(index){
    const el = items[index];
    const full = el.dataset.full || el.src;
    lightboxImg.src = full;
    lightboxImg.alt = el.alt || '';
    caption.textContent = el.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    current = index;
    // Preload next/prev images
    [index-1, index+1].forEach(i=>{
      const idx = (i + items.length) % items.length;
      const src = items[idx].dataset.full || items[idx].src;
      const iimg = new Image(); iimg.src = src;
    });
  }
  function close(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }
  function showNext(dir){
    const nextIndex = (current + dir + items.length) % items.length;
    open(nextIndex);
  }

  items.forEach((img, idx) => {
    img.addEventListener('click', () => open(idx));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(idx); });
    img.setAttribute('tabindex','0');
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    }
  });

  // Close lightbox when clicking backdrop (but not when clicking image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

});
