/**
 * Amrita Raghunath — Modern Portfolio & Academic Site
 * Interactive Neural Network & Synaptic Signal Propagation Physics Engine
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // 1. Theme Management (High-Contrast Dark Mode & Crisp Light Mode)
  // ---------------------------------------------------------------------------
  const root = document.documentElement;
  const THEME_STORAGE_KEY = "amrita_theme_pref";
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(THEME_STORAGE_KEY, next);
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Interactive Neural Network & Synaptic Activation Canvas Engine
  // ---------------------------------------------------------------------------
  const canvas = document.getElementById("confetti-canvas") || document.getElementById("neural-canvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let animationFrameId = null;
    let isPaused = false;

    // Mouse coordinates (Synaptic stimulus probe)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
      isHovered: false
    };

    // Color palette for neural activation & synaptic transmitters
    const NEURAL_COLORS = {
      neuronBase: "#10B981",       // Core Emerald
      neuronActive: "#34D399",     // Bright Mint
      neuronAccent: "#38BDF8",     // Electric Cyan
      signalPulse: "#6EE7B7",      // Glowing Synaptic Packet
      synapseLine: "rgba(52, 211, 153, 0.16)",
      synapseActive: "rgba(56, 189, 248, 0.45)"
    };

    // Neuron Class
    class Neuron {
      constructor(x, y) {
        this.homeX = x !== undefined ? x : Math.random() * width;
        this.homeY = y !== undefined ? y : Math.random() * height;
        this.x = this.homeX;
        this.y = this.homeY;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        
        // Neuron properties
        this.radius = Math.random() * 2.5 + 2.0; // 2px to 4.5px
        this.baseRadius = this.radius;
        this.activation = Math.random() * 0.3; // Potential: 0.0 to 1.0
        this.activationDecay = 0.015;
        this.type = Math.random() > 0.8 ? "core" : "relay"; // Core or Relay neuron
        this.color = this.type === "core" ? NEURAL_COLORS.neuronAccent : NEURAL_COLORS.neuronBase;
        this.phase = Math.random() * Math.PI * 2;
        this.mass = Math.random() * 0.5 + 0.8;
      }

      stimulate(intensity = 0.8) {
        this.activation = Math.min(1.0, this.activation + intensity);
      }

      update() {
        this.phase += 0.018;

        // Gentle Brownian floating drift
        const driftX = Math.cos(this.phase) * 0.45;
        const driftY = Math.sin(this.phase) * 0.45;

        // Mouse stimulus / Antigravity deflection
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.isHovered && dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 4.8;
          const angle = Math.atan2(dy, dx);
          this.vx += (Math.cos(angle) * force) / this.mass;
          this.vy += (Math.sin(angle) * force) / this.mass;

          // Excite neuron when probe gets near
          this.stimulate(0.06);
        }

        // Elastic return force toward home coordinate
        const returnDx = (this.homeX + driftX) - this.x;
        const returnDy = (this.homeY + driftY) - this.y;
        this.vx += returnDx * 0.02;
        this.vy += returnDy * 0.02;

        // Friction & Velocity damping
        this.vx *= 0.94;
        this.vy *= 0.94;

        this.x += this.vx;
        this.y += this.vy;

        // Activation decay
        if (this.activation > 0.05) {
          this.activation -= this.activationDecay;
        } else {
          this.activation = 0.05;
        }

        // Spontaneous baseline neural firing
        if (Math.random() < 0.003) {
          this.stimulate(0.6);
        }
      }

      draw(context) {
        const glowRadius = this.radius + this.activation * 5.0;
        
        // Synaptic halo glow
        if (this.activation > 0.2) {
          context.beginPath();
          context.arc(this.x, this.y, glowRadius * 2, 0, Math.PI * 2);
          context.fillStyle = this.color;
          context.globalAlpha = this.activation * 0.25;
          context.fill();
        }

        // Neuron Body
        context.beginPath();
        context.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
        context.fillStyle = this.activation > 0.4 ? NEURAL_COLORS.neuronActive : this.color;
        context.globalAlpha = Math.min(1.0, 0.4 + this.activation * 0.6);
        context.fill();

        // Inner glowing core
        context.beginPath();
        context.arc(this.x, this.y, Math.max(1, this.radius * 0.6), 0, Math.PI * 2);
        context.fillStyle = "#FFFFFF";
        context.globalAlpha = Math.min(1.0, 0.3 + this.activation * 0.7);
        context.fill();

        context.globalAlpha = 1.0;
      }
    }

    // Synaptic Signal Pulse (Action Potential Traveling along Axon)
    class SignalPulse {
      constructor(fromNeuron, toNeuron, speed = 0.035) {
        this.from = fromNeuron;
        this.to = toNeuron;
        this.progress = 0; // 0.0 to 1.0
        this.speed = speed + Math.random() * 0.02;
        this.isDone = false;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1.0) {
          this.progress = 1.0;
          this.isDone = true;
          // Fire target neuron upon arrival!
          this.to.stimulate(0.5);
        }
      }

      draw(context) {
        if (this.isDone) return;
        const currentX = this.from.x + (this.to.x - this.from.x) * this.progress;
        const currentY = this.from.y + (this.to.y - this.from.y) * this.progress;

        context.beginPath();
        context.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
        context.fillStyle = NEURAL_COLORS.signalPulse;
        context.globalAlpha = 0.9;
        context.shadowColor = NEURAL_COLORS.neuronActive;
        context.shadowBlur = 8;
        context.fill();
        context.shadowBlur = 0;
        context.globalAlpha = 1.0;
      }
    }

    let neurons = [];
    let signalPulses = [];
    const MAX_SYNAPSE_DIST = 145;

    function initNetwork() {
      neurons = [];
      signalPulses = [];

      // Grid/organic distribution density
      const neuronCount = Math.min(Math.floor((width * height) / 13000), 75);

      for (let i = 0; i < neuronCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        neurons.push(new Neuron(x, y));
      }
    }

    // Trigger Neural Spike Wave (Propagate signals from a source coordinate)
    function triggerNeuralWave(originX, originY, intensity = 1.0) {
      neurons.forEach((neuron) => {
        const dx = neuron.x - originX;
        const dy = neuron.y - originY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 320) {
          const impulse = (1 - dist / 320) * 14 * intensity;
          const angle = Math.atan2(dy, dx);
          neuron.vx += Math.cos(angle) * impulse;
          neuron.vy += Math.sin(angle) * impulse;
          neuron.stimulate(0.9);

          // Find adjacent neighbors and fire synaptic signal pulses
          neurons.forEach((other) => {
            if (other !== neuron) {
              const d = Math.sqrt((neuron.x - other.x) ** 2 + (neuron.y - other.y) ** 2);
              if (d < MAX_SYNAPSE_DIST && signalPulses.length < 50 && Math.random() < 0.45) {
                signalPulses.push(new SignalPulse(neuron, other));
              }
            }
          });
        }
      });
    }

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initNetwork();
    }

    window.addEventListener("resize", debounce(resizeCanvas, 150));
    resizeCanvas();

    // Mouse Tracking
    window.addEventListener("pointermove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovered = true;
    });

    window.addEventListener("pointerleave", () => {
      mouse.isHovered = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Window Click: Trigger Neural Activation Wave
    window.addEventListener("click", (e) => {
      if (e.target.closest("button, a, input, textarea, pre")) return;
      triggerNeuralWave(e.clientX, e.clientY, 1.2);
    });

    // Neural Wave Trigger Button in Top Header
    const neuralWaveBtn = document.getElementById("neural-wave-btn") || document.getElementById("confetti-burst-btn");
    if (neuralWaveBtn) {
      neuralWaveBtn.addEventListener("click", (e) => {
        const rect = neuralWaveBtn.getBoundingClientRect();
        triggerNeuralWave(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.5);
      });
    }

    // Animation Loop
    function render() {
      if (!isPaused) {
        ctx.clearRect(0, 0, width, height);

        // 1. Update Neurons
        for (let i = 0; i < neurons.length; i++) {
          neurons[i].update();
        }

        // 2. Draw Synaptic Axon Connections
        for (let i = 0; i < neurons.length; i++) {
          for (let j = i + 1; j < neurons.length; j++) {
            const dx = neurons[i].x - neurons[j].x;
            const dy = neurons[i].y - neurons[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_SYNAPSE_DIST) {
              const maxActivation = Math.max(neurons[i].activation, neurons[j].activation);
              const baseAlpha = (1 - dist / MAX_SYNAPSE_DIST) * 0.25;
              const lineAlpha = baseAlpha + maxActivation * 0.45;

              ctx.beginPath();
              ctx.moveTo(neurons[i].x, neurons[i].y);
              ctx.lineTo(neurons[j].x, neurons[j].y);

              if (maxActivation > 0.4) {
                ctx.strokeStyle = NEURAL_COLORS.synapseActive;
                ctx.lineWidth = 1.4;
              } else {
                ctx.strokeStyle = NEURAL_COLORS.synapseLine;
                ctx.lineWidth = 1.0;
              }

              ctx.globalAlpha = Math.min(0.9, lineAlpha);
              ctx.stroke();

              // Spontaneous signal pulse propagation between active synapses
              if (maxActivation > 0.6 && signalPulses.length < 40 && Math.random() < 0.015) {
                signalPulses.push(new SignalPulse(neurons[i], neurons[j]));
              }
            }
          }
        }

        // 3. Update & Draw Synaptic Signal Pulses
        for (let i = signalPulses.length - 1; i >= 0; i--) {
          signalPulses[i].update();
          signalPulses[i].draw(ctx);
          if (signalPulses[i].isDone) {
            signalPulses.splice(i, 1);
          }
        }

        // 4. Draw Neurons on top
        for (let i = 0; i < neurons.length; i++) {
          neurons[i].draw(ctx);
        }

        ctx.globalAlpha = 1.0;
      }
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    // Pause when tab is inactive to preserve CPU / battery
    document.addEventListener("visibilitychange", () => {
      isPaused = document.hidden;
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Spotlight Radial Glow on Bento & Project Cards
  // ---------------------------------------------------------------------------
  const interactiveCards = document.querySelectorAll(".bento-card, .project-card, .timeline-content, .contact-row-item");

  interactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Project Filtering System
  // ---------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Toast Notification & Copy Utilities (Email, Phone, BibTeX, DOI)
  // ---------------------------------------------------------------------------
  const toast = document.getElementById("toast-banner");
  const toastText = document.getElementById("toast-text");
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  // Copy via data-copy attribute
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.addEventListener("click", () => {
      const textToCopy = el.getAttribute("data-copy");
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          showToast("Failed to copy to clipboard");
        });
      }
    });
  });

  // Copy BibTeX
  const copyBibtexBtn = document.getElementById("copy-bibtex-btn");
  const bibtexCodeBlock = document.getElementById("bibtex-content");

  if (copyBibtexBtn && bibtexCodeBlock) {
    copyBibtexBtn.addEventListener("click", () => {
      const bibtexText = bibtexCodeBlock.textContent.trim();
      navigator.clipboard.writeText(bibtexText).then(() => {
        showToast("BibTeX citation copied to clipboard!");
      });
    });
  }

  // Toggle BibTeX snippet view
  const toggleBibtexBtn = document.getElementById("toggle-bibtex-btn");
  if (toggleBibtexBtn && bibtexCodeBlock) {
    toggleBibtexBtn.addEventListener("click", () => {
      const isHidden = bibtexCodeBlock.style.display === "none";
      bibtexCodeBlock.style.display = isHidden ? "block" : "none";
      toggleBibtexBtn.textContent = isHidden ? "Hide BibTeX" : "View BibTeX";
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Mobile Menu Drawer
  // ---------------------------------------------------------------------------
  const navToggleBtn = document.getElementById("nav-toggle-btn");
  const navMenu = document.getElementById("nav-menu");

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
        navMenu.classList.remove("open");
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 7. Scrollspy & Sticky Header Shadow
  // ---------------------------------------------------------------------------
  const siteHeader = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (siteHeader) {
      if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    let currentSectionId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });

  // ---------------------------------------------------------------------------
  // Helper: Debounce
  // ---------------------------------------------------------------------------
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

})();
