/* ==========================================================================
   RunnSeegaa Coming Soon - Main JavaScript (Crossfading BG & 3D Shoes)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Floating Particles Generator ---
  const particlesContainer = document.getElementById('particles');
  const particleCount = 25;

  if (particlesContainer) {
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.opacity = Math.random() * 0.5 + 0.25;
      particlesContainer.appendChild(particle);
    }
  }

  // --- 2. Interactive Parallax & 3D Depth Shift ---
  const bgSlides = document.querySelectorAll('.bg-slide');
  const line1 = document.querySelector('.text-3d.line-1');
  const line2 = document.querySelector('.text-3d.line-2');
  const shoe1 = document.getElementById('shoe1');
  const shoe2 = document.getElementById('shoe2');
  const shoe3 = document.getElementById('shoe3');
  const shoe4 = document.getElementById('shoe4');

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalized [-1, 1] range relative to screen center
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Smooth RAF animation loop for 3D depth shifting
  function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    // Background landscape slides subtle movement
    bgSlides.forEach((slide) => {
      slide.style.transform = `scale(1.05) translate(${currentX * -14}px, ${currentY * -14}px)`;
    });

    // 3D "COMING SOON" text tilts in perspective space
    if (line1 && line2) {
      const rotX = currentY * -9;
      const rotY = currentX * 11;
      
      line1.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(35px)`;
      line2.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(55px)`;
    }

    // Floating 3D parallax depth for 4 shoe cards
    if (shoe1) shoe1.style.marginTop = `${currentY * 20}px`;
    if (shoe2) shoe2.style.marginTop = `${currentY * -25}px`;
    if (shoe3) shoe3.style.marginTop = `${currentY * -18}px`;
    if (shoe4) shoe4.style.marginTop = `${currentY * 22}px`;

    requestAnimationFrame(animateParallax);
  }
  animateParallax();

  // --- 3. Background Fade-In / Fade-Out Crossfade Slideshow ---
  let currentSlideIndex = 0;

  function nextBgSlide() {
    if (!bgSlides.length) return;
    bgSlides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % bgSlides.length;
    bgSlides[currentSlideIndex].classList.add('active');
  }

  // Crossfade every 4.5 seconds
  setInterval(nextBgSlide, 4500);



});
