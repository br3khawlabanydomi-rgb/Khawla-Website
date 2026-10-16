## feat: gallery enhancement

This change adds a hero carousel and a responsive gallery with a lightbox to showcase images in an attractive way.

What's included

- components/gallery-section.html — a self-contained hero + gallery component (includes Swiper placeholders)
- assets/css/gallery.css — styles for the hero, grid, and lightbox
- assets/js/gallery.js — Swiper initialization and lightbox logic

How to use

1. Add your images to the /agents folder. The component references files like /agents/photo1.jpg and /agents/photo1-thumb.jpg — either upload images with those names or edit components/gallery-section.html to point to the actual paths.
2. Include the component in the page where you want the gallery. Ensure the Swiper CDN links and local css/js are also included (they are at the bottom of components/gallery-section.html).

Preview

Checkout branch feat/gallery-enhancement and open the page that includes the component.

I confirm these changes were prepared and pushed to the branch feat/gallery-enhancement.
