document.addEventListener("DOMContentLoaded", function () {

  // --- Dynamic Header Blur on Scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Mobile Hamburger Nav ---
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close nav when a link is tapped
    siteNav.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // --- Scroll Progress Bar + Reading Ring + Pill Fade ---
  const bar = document.getElementById("myBar");
  const ringCircle = document.getElementById("ring-progress-circle");
  const readingRing = document.getElementById("reading-ring");
  const heroPill = document.getElementById("hero-pill");

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = (winScroll / height) * 100;

    // Top progress bar
    if (bar) bar.style.width = pct + "%";

    // Circular reading ring (post pages)
    if (ringCircle && readingRing) {
      const circumference = 99.9;
      const scrolled = winScroll;
      const totalH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = totalH > 0 ? Math.min(scrolled / totalH, 1) : 0;
      const offset = circumference - progress * circumference;
      ringCircle.style.strokeDashoffset = offset;
      // Show ring after scrolling past 5% of the page
      readingRing.classList.toggle('visible', progress > 0.03);
    }

    // Hero pill fades out as you scroll toward header
    if (heroPill) {
      const fadeStart = 80;
      const fadeEnd = 300;
      const opacity = Math.max(0, 1 - (winScroll - fadeStart) / (fadeEnd - fadeStart));
      heroPill.style.opacity = opacity;
    }

    // Canvas dims slightly as user scrolls into the Toys section
    // Fades from 1 → 0.25 between 60vh and 180vh of scroll
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
      const vh = window.innerHeight;
      const fadeStart = vh * 0.6;
      const fadeEnd = vh * 1.8;
      const canvasOpacity = Math.max(0.22, 1 - (winScroll - fadeStart) / (fadeEnd - fadeStart));
      canvasContainer.style.opacity = canvasOpacity;
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ----------------------------------------------------------------
  // GSAP Scroll Animations
  // Using fromTo instead of from so elements are ALWAYS visible as
  // a fallback — this fixes the intermittent "cards disappear" bug.
  // ----------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Generic fade-up elements
    gsap.utils.toArray('.gsap-fade-up').forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out"
        }
      );
    });

    // Staggered project cards — always rendered visible first, then animated
    const grid = document.querySelector('.projects-grid');
    if (grid) {
      const cards = grid.querySelectorAll('.project-card');
      // Set initial state explicitly
      gsap.set(cards, { y: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: grid,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out"
          });
        }
      });
    }

    // Section headings scale-in
    gsap.utils.toArray('.section-heading').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          opacity: 1, y: 0, duration: 0.8, ease: "expo.out"
        }
      );
    });

    // Post editorial content paragraphs stagger
    const editorial = document.querySelector('.editorial-content');
    if (editorial) {
      const children = editorial.querySelectorAll('p, h2, h3, h4, figure, pre');
      gsap.fromTo(children,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: { trigger: editorial, start: "top 90%", once: true },
          opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out"
        }
      );
    }
  }

  // ----------------------------------------------------------------
  // Three.js Interactive Data Nodes + floating lines
  // ----------------------------------------------------------------
  const canvasContainer = document.getElementById('canvas-container');
  if (typeof THREE !== 'undefined' && canvasContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // --- Particles ---
    const particleCount = 280;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 14;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.035, color: 0x06b6d4,
      transparent: true, opacity: 0.75,
      blending: THREE.AdditiveBlending, depthWrite: false
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // --- Connecting lines between nearby nodes (structural feel) ---
    const linePositions = [];
    const posArr = particlesGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.0) {
          linePositions.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
          linePositions.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    camera.position.z = 5;

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      targetX += (mouseX * 0.3 - targetX) * 0.04;
      targetY += (-mouseY * 0.2 - targetY) * 0.04;

      particlesMesh.rotation.y = t * 0.04 + targetX;
      particlesMesh.rotation.x = t * 0.015 + targetY;
      particlesMesh.position.y = Math.sin(t * 0.4) * 0.15;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ----------------------------------------------------------------
  // Typewriter Animation — fires on scroll into view, then
  // reveals subtitle and scroll hint after line finishes
  // ----------------------------------------------------------------
  const typeTarget = document.getElementById("typewriter-text");
  const heroSection = document.querySelector('.hero-section');

  if (typeTarget && heroSection) {
    let started = false;

    // The hero always fills the viewport, so we start on load (after a brief pause)
    // but we don't re-trigger. Subtitle fades in AFTER typing completes.
    function startTyping() {
      if (started) return;
      started = true;

      const phrase1 = "Engineering ";
      const phrase2 = "Intelligence";
      let i = 0;

      function typePhase1() {
        if (i < phrase1.length) {
          typeTarget.innerHTML += phrase1[i++];
          setTimeout(typePhase1, Math.random() * 45 + 40);
        } else {
          // Insert gradient span for word 2
          typeTarget.innerHTML += '<span class="text-gradient" id="grad-type"></span>';
          i = 0;
          setTimeout(typePhase2, 80);
        }
      }

      function typePhase2() {
        const gradEl = document.getElementById("grad-type");
        if (!gradEl) return;
        if (i < phrase2.length) {
          gradEl.textContent += phrase2[i++];
          setTimeout(typePhase2, Math.random() * 45 + 40);
        } else {
          // Typing done — fade in subtitle + scroll hint
          const subtitle = document.getElementById("hero-subtitle");
          const hint = document.querySelector('.hero-scroll-hint');
          if (subtitle) {
            subtitle.style.transition = "opacity 0.8s ease";
            subtitle.style.opacity = "1";
          }
          if (hint && typeof gsap !== 'undefined') {
            gsap.fromTo(hint, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
          } else if (hint) {
            hint.style.opacity = "1";
          }
        }
      }

      // Short delay so Three.js renders first
      setTimeout(typePhase1, 600);
    }

    // Fire immediately since hero is the first thing visible
    startTyping();
  }

  // ----------------------------------------------------------------
  // Terminal Glitch Effect on project card hover buttons
  // ----------------------------------------------------------------
  const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@!%&*_=+<>';

  document.querySelectorAll('.glitch-btn').forEach(btn => {
    const originalText = btn.getAttribute('data-label');
    let glitchTimer = null;
    let isGlitching = false;

    btn.addEventListener('mouseenter', () => {
      if (isGlitching) return;
      isGlitching = true;
      let iteration = 0;
      const maxIterations = originalText.length * 3;

      clearInterval(glitchTimer);
      glitchTimer = setInterval(() => {
        btn.textContent = originalText.split('').map((char, index) => {
          if (char === '_' || char === '.' || char === ' ') return char;
          if (index < iteration / 3) return originalText[index];
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('');

        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(glitchTimer);
          btn.textContent = originalText;
          isGlitching = false;
        }
      }, 30);
    });

    btn.addEventListener('mouseleave', () => {
      clearInterval(glitchTimer);
      btn.textContent = originalText;
      isGlitching = false;
    });
  });

});
