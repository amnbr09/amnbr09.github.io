# Amrita Raghunath — Personal Portfolio & Academic Site

[![GitHub Pages](https://img.shields.io/badge/Live-amnbr09.github.io-10B981?style=flat&logo=github)](https://amnbr09.github.io)
[![Paper](https://img.shields.io/badge/IEEE_Access-2025-blue.svg)](https://doi.org/10.1109/ACCESS.2025.3554618)

A clean, minimalistic, and modern portfolio website for **Amrita Raghunath**, Machine Learning Researcher specializing in Computer Vision, Multimodal Sequence Modeling, Continuous Sign Language Recognition (ISL), and Accessibility AI.

Hosted live at: **[amnbr09.github.io](https://amnbr09.github.io)**

---

## 🌟 Key Features

- **Interactive Google Antigravity & Particle Physics Canvas**:
  - Custom HTML5 Canvas engine with 60+ FPS performance.
  - Interactive cursor repulsion, velocity physics, Brownian floating drift, proximity constellation lines, and click shockwave bursts.
  - Interactive 21-point MediaPipe Hand Landmark skeleton topology with 3D tilt tracking.
- **Bento Grid Architecture**:
  - Modular cards with frosted glassmorphism layers (`backdrop-filter: blur(16px)`).
  - Dynamic cursor spotlight glow (`--mouse-x`, `--mouse-y` radial highlights).
- **Academic & Research Highlights**:
  - Featured publication: **SignFlow: Toward Real-Time Recognition of Continuous ISL** (*IEEE Access 2025*).
  - Key metrics: **Word Error Rate: 19**, **6 FPS dynamic downsampling**, **3D CNN + Transformer fusion**.
  - One-click BibTeX copy with floating toast confirmation.
  - Filterable 8-project portfolio (Sign Language & CV, NLP & Low-Resource Translation, Accessibility AI).
- **Theme System**:
  - High-contrast Dark Mode (default Obsidian & Cyber Emerald) and crisp Light Mode (Ivory & Pine).
  - Persistent preference stored in `localStorage`.
- **Pure Static Stack**:
  - Vanilla HTML5, CSS3, and modern JavaScript.
  - Zero build steps or external package dependencies — lightning fast and 100% compatible with GitHub Pages.

---

## 📂 Project Structure

```text
amnbr09.github.io/
├── assets/
│   ├── amrita-profile.jpg             # Profile portrait photo
│   ├── Amrita_Raghunath_Resume.pdf    # Academic CV / Résumé
│   └── favicon.svg                    # Glowing gesture landmark favicon
├── index.html                         # Main portfolio single-page application
├── styles.css                         # Design system, themes, Bento Grid & Glassmorphism
├── script.js                          # Antigravity canvas physics, filters, theme & copy tools
├── contact.html                       # Redirect alias to #contact
├── projects.html                      # Redirect alias to #projects
├── publications.html                  # Redirect alias to #research
└── README.md
```

---

## 🚀 Deployment

To update and push changes to GitHub Pages:

```bash
git add .
git commit -m "Update portfolio with Antigravity physics and modern Bento grid"
git push origin main
```