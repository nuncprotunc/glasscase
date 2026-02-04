/**
 * Component System for GlassCase.org
 * Ensures Header, Footer, and Mobile Menu are consistent across all pages.
 */

const COMPONENTS = {
  header: `
    <nav>
      <div class="nav-inner">
        <div class="brand">
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#E8F4F8" stop-opacity="0.9" />
                <stop offset="50%" stop-color="#4A9FD8" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#3ABEF9" stop-opacity="0.9" />
              </linearGradient>
              <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#4A9FD8" stop-opacity="0.4" />
              </linearGradient>
            </defs>
            <path d="M 28 22 L 42 40 L 28 58 Z" fill="rgba(74, 159, 216, 0.08)" stroke="rgba(74, 159, 216, 0.15)" stroke-width="0.5" opacity="0.4"/>
            <line x1="8" y1="40" x2="30" y2="40" stroke="url(#lightBeam)" stroke-width="2" opacity="0.6" class="shimmer"/>
            <path d="M 30 20 L 45 40 L 30 60 Z" fill="url(#prismGrad)" stroke="#4A9FD8" stroke-width="1" class="prism-glow"/>
            <path d="M 32 28 L 42 40 L 32 52" fill="rgba(255, 255, 255, 0.3)"/>
            <line x1="45" y1="40" x2="72" y2="28" stroke="#4A9FD8" stroke-width="2" opacity="0.85" class="shimmer"/>
            <line x1="45" y1="40" x2="72" y2="40" stroke="#3ABEF9" stroke-width="2.5" opacity="0.9" class="shimmer"/>
            <line x1="45" y1="40" x2="72" y2="52" stroke="#F4C430" stroke-width="2" opacity="0.85" class="shimmer"/>
          </svg>
          <p class="brand-name"><span class="glass">Glass</span><span class="divider">/</span><span class="case">Case</span></p>
        </div>
        <div class="nav-right">
          <button class="mobile-menu-button" onclick="toggleMobileMenu()" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <nav class="desktop-nav">
            <a href="https://glasscase.org/">Home</a>
            <a href="/tools">Tools</a>
            <a href="/findings">Findings</a>
            <a href="/commentary">Commentary</a>
            <a href="/submissions">Submissions</a>
            <a href="/legal">Use &amp; Privacy</a>
          </nav>
        </div>
      </div>
    </nav>
  `,
  mobileMenu: `
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-header">
        <h2 class="mobile-menu-title">Glass/Case</h2>
        <p class="mobile-menu-subtitle">Making Integrity Visible</p>
      </div>
      <nav>
        <a href="https://glasscase.org/" onclick="closeMobileMenu()" data-nav="home">Home</a>
        <a href="/tools" onclick="closeMobileMenu()" data-nav="tools">Tools</a>
        <a href="/findings" onclick="closeMobileMenu()" data-nav="findings">Findings</a>
        <a href="/commentary" onclick="closeMobileMenu()" data-nav="commentary">Commentary</a>
        <a href="/submissions" onclick="closeMobileMenu()" data-nav="submissions">Submissions</a>
        <a href="/legal" onclick="closeMobileMenu()" data-nav="legal">Use &amp; Privacy</a>
      </nav>
    </div>
    <div class="mobile-menu-overlay" id="mobileMenuOverlay" onclick="closeMobileMenu()"></div>
  `,
  footer: `
    <div class="footer-top">
      <div class="footer-brand">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 0.5rem;">
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="footerPrismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#E8F4F8" stop-opacity="0.9" />
                <stop offset="50%" stop-color="#4A9FD8" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#3ABEF9" stop-opacity="0.9" />
              </linearGradient>
            </defs>
            <path d="M 30 20 L 45 40 L 30 60 Z" fill="url(#footerPrismGrad)" stroke="#4A9FD8" stroke-width="1" class="prism-glow"/>
            <line x1="45" y1="40" x2="72" y2="28" stroke="#4A9FD8" stroke-width="2" opacity="0.85" class="shimmer"/>
            <line x1="45" y1="40" x2="72" y2="40" stroke="#3ABEF9" stroke-width="2.5" opacity="0.9" class="shimmer"/>
            <line x1="45" y1="40" x2="72" y2="52" stroke="#F4C430" stroke-width="2" opacity="0.85" class="shimmer"/>
          </svg>
          <div style="font-family: 'Spectral', serif; font-style: italic; font-weight: 700; font-size: 18px; display: inline-flex; align-items: center; gap: 0.25em;">
            <span style="color: var(--ice-blue); display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 12px; background: linear-gradient(145deg, rgba(74, 159, 216, 0.18), rgba(58, 190, 249, 0.08)); border: 1px solid rgba(74, 159, 216, 0.5);">Glass</span><span style="color: rgba(166, 207, 242, 0.8); font-weight: 600; margin: 0 0.1em;">/</span><span style="font-family: 'JetBrains Mono', monospace; color: rgba(164, 188, 211, 0.92); font-weight: 600; font-style: normal; letter-spacing: 0.06em; text-transform: uppercase;">Case</span>
          </div>
        </div>
        <p class="footer-tagline">Making Integrity Visible</p>
        <p class="footer-tagline">Evidence systems across education and civic-tech, designed for fairness.</p>
      </div>
      <div class="footer-section">
        <h4>Site</h4>
        <div class="footer-links">
          <a href="https://glasscase.org/">Home</a>
          <a href="https://glasscase.org/#problem">Problem</a>
          <a href="https://glasscase.org/#available-now">Available Now</a>
          <a href="https://glasscase.org/#roadmap">Roadmap</a>
          <a href="/legal">Use &amp; Privacy</a>
        </div>
      </div>
      <div class="footer-section">
        <h4>Projects</h4>
        <div class="footer-links">
          <a href="/tools">Tools</a>
          <a href="/commentary">Commentary</a>
          <a href="/findings">Findings</a>
          <a href="/submissions">Submissions</a>
          <a href="https://lawandlearning.com">Law &amp; Learning</a>
        </div>
      </div>
      <div class="footer-section">
        <h4>Join the Community</h4>
        <p style="font-size: 0.875rem; color: var(--slate); margin-bottom: 1rem; line-height: 1.5;">Updates on evidence systems and civic-legal data/tech.</p>
        <a href="https://linkedin.com/company/glasscase-org" class="footer-cta">Follow on LinkedIn</a>
      </div>
    </div>
  `
};

function injectComponents() {
  const headerEl = document.getElementById('shared-header');
  const mobileMenuEl = document.getElementById('shared-mobile-menu');
  const footerEl = document.getElementById('shared-footer');

  if (headerEl) headerEl.innerHTML = COMPONENTS.header;
  if (mobileMenuEl) mobileMenuEl.innerHTML = COMPONENTS.mobileMenu;
  if (footerEl) footerEl.innerHTML = COMPONENTS.footer;

  // Initialize outbound links for the newly injected content
  if (typeof initOutboundLinks === 'function') {
    initOutboundLinks();
  }

  // Set active state for mobile menu
  const currentPath = window.location.pathname;
  let activeNav = '';
  if (currentPath === '/' || currentPath === '/index.html') activeNav = 'home';
  else if (currentPath.includes('tools') || currentPath.includes('consideration-matrix') || currentPath.includes('redaction-taxonomy')) activeNav = 'tools';
  else if (currentPath.includes('findings')) activeNav = 'findings';
  else if (currentPath.includes('commentary')) activeNav = 'commentary';
  else if (currentPath.includes('submissions')) activeNav = 'submissions';
  else if (currentPath.includes('legal')) activeNav = 'legal';

  if (activeNav) {
    const activeLink = document.querySelector(".mobile-menu [data-nav='" + activeNav + "']");
    if (activeLink) activeLink.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', injectComponents);
