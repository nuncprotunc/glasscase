/**
 * Component System for GlassCase.org
 * Ensures Header, Footer, and Mobile Menu are consistent across all pages.
 *
 * ── THEME LINTING RULES FOR THIS FILE ────────────────────────────────────
 *
 * All HTML injected by this file is shared across EVERY page in both
 * dark mode (default) and light mode.  Violating these rules will break
 * the theme on every page simultaneously.
 *
 * 1. NO hardcoded colours in template literals.
 *    WRONG:  style="color:#fff"
 *    WRONG:  style="background:#1A1F2E"
 *    RIGHT:  Use a CSS class defined in style.css with var() properties.
 *
 * 2. NO inline style attributes on any injected element.
 *    Inline styles cannot be overridden by [data-theme="light"] selectors.
 *
 * 3. ALL colours must come from CSS custom properties in style.css.
 *    Dark defaults live in :root {}
 *    Light overrides live in [data-theme="light"] {}
 *
 * 4. When adding new injected elements:
 *    - Add the dark-mode style to :root / the base class in style.css.
 *    - Add a [data-theme="light"] override in style.css if colours differ.
 *    - Never assume "it looks fine in dark mode" means light mode is safe.
 *
 * 5. Theme toggle must call gcInitThemeToggle() after injection.
 *    All elements with [data-theme-toggle] will be wired up automatically.
 *
 * 6. Giscus comments must be theme-synced from site theme via
 *    gcInitGiscusThemeBridge()/gcSyncGiscusTheme().
 *    Light mode uses "light_high_contrast" to keep metadata text readable.
 *
 * ─────────────────────────────────────────────────────────────────────────
 */

const COMPONENTS = {
  header: `<nav class="gc-header">
      <div class="nav-inner">
        <a href="https://glasscase.org/" class="brand" aria-label="GlassCase home">
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
        </a>
        <div class="nav-right">
          <nav class="desktop-nav">
            <a href="/position/">Position Paper</a>
            <a href="/tools">Tools</a>
            <a href="/findings">Findings</a>
            <a href="/commentary">Commentary</a>
            <a href="/submissions">Submissions</a>
            <a href="/legal">Use &amp; Privacy</a>
            <a href="https://lightkey.org" target="_blank" rel="noopener">LightKey</a>
          </nav>
          <button class="gc-reading-toggle" id="gcReadingToggle"
                  aria-pressed="false"
                  aria-label="Toggle relaxed reading spacing"
                  title="Wider line spacing for easier reading">
            <span class="toggle-icon" aria-hidden="true">Aa</span>
            <span>Relaxed reading</span>
          </button>
          <button id="theme-toggle" class="gc-theme-toggle" data-theme-toggle aria-label="Switch to light mode" type="button">☼</button>
          <button class="mobile-menu-button" onclick="toggleMobileMenu()" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  `,
  mobileMenu: `
    <div class="mobile-menu" id="mobileMenu">
      <button class="mobile-menu-close" type="button" onclick="closeMobileMenu()" aria-label="Close menu">×</button>
      <div class="mobile-menu-header">
        <span class="mobile-menu-title">GlassCase</span>
        <div class="mobile-menu-divider"></div>
      </div>
      <div class="mobile-menu-theme-wrap">
        <button class="gc-theme-toggle mobile-menu-theme-toggle" data-theme-toggle aria-label="Switch to light mode" type="button">☼</button>
      </div>
      <nav>
        <a href="/position/" onclick="closeMobileMenu()" data-nav="position">Position Paper</a>
        <a href="/tools" onclick="closeMobileMenu()" data-nav="tools">Tools</a>
        <a href="/findings" onclick="closeMobileMenu()" data-nav="findings">Findings</a>
        <a href="/commentary" onclick="closeMobileMenu()" data-nav="commentary">Commentary</a>
        <a href="/submissions" onclick="closeMobileMenu()" data-nav="submissions">Submissions</a>
        <a href="/legal" onclick="closeMobileMenu()" data-nav="legal">Use &amp; Privacy</a>
        <a href="https://lightkey.org" onclick="closeMobileMenu()" data-nav="lightkey">LightKey</a>
      </nav>
    </div>
    <div class="mobile-menu-overlay" id="mobileMenuOverlay" onclick="closeMobileMenu()"></div>
  `,
  footer: `
    <div class="footer-top">
      <div class="footer-brand">
        <a href="https://glasscase.org/" class="brand" aria-label="GlassCase home">
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="footerPrismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#E8F4F8" stop-opacity="0.9" />
                <stop offset="50%" stop-color="#4A9FD8" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#3ABEF9" stop-opacity="0.9" />
              </linearGradient>
              <linearGradient id="footerLightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#4A9FD8" stop-opacity="0.4" />
              </linearGradient>
            </defs>
            <path d="M 28 22 L 42 40 L 28 58 Z" fill="rgba(74, 159, 216, 0.08)" stroke="rgba(74, 159, 216, 0.15)" stroke-width="0.5" opacity="0.4"/>
            <line x1="8" y1="40" x2="30" y2="40" stroke="url(#footerLightBeam)" stroke-width="2" opacity="0.6" class="shimmer"/>
            <path d="M 30 20 L 45 40 L 30 60 Z" fill="url(#footerPrismGrad)" stroke="#4A9FD8" stroke-width="1" class="prism-glow"/>
            <path d="M 32 28 L 42 40 L 32 52" fill="rgba(255, 255, 255, 0.3)"/>
            <line x1="45" y1="40" x2="72" y2="28" stroke="#4A9FD8" stroke-width="2" opacity="0.85" class="shimmer"/>
            <line x1="45" y1="40" x2="72" y2="40" stroke="#3ABEF9" stroke-width="2.5" opacity="0.9" class="shimmer"/>
            <line x1="45" y1="40" x2="72" y2="52" stroke="#F4C430" stroke-width="2" opacity="0.85" class="shimmer"/>
          </svg>
          <p class="brand-name"><span class="glass">Glass</span><span class="divider">/</span><span class="case">Case</span></p>
        </a>
        <p class="footer-tagline">Making Integrity Visible</p>
        <p class="footer-tagline">Evidence systems across education and civic-tech, designed for fairness.</p>
      </div>
      <div class="footer-section">
        <h4>Site</h4>
        <div class="footer-links">
          <a href="https://glasscase.org/">Home</a>
          <a href="/position/">Position Paper</a>
          <a href="https://glasscase.org/#problem">Problem</a>
          <a href="https://glasscase.org/#available-now">Available Now</a>
          <a href="https://glasscase.org/#roadmap">Roadmap</a>
          <a href="/legal">Use &amp; Privacy</a>
          <a href="#" onclick="if(typeof resetAnalyticsConsent==='function')resetAnalyticsConsent();return false;">Cookie Settings</a>
        </div>
      </div>
      <div class="footer-section">
        <h4>Projects</h4>
        <div class="footer-links">
          <a href="/tools">Tools</a>
          <a href="/findings">Findings</a>
          <a href="/commentary">Commentary</a>
          <a href="/submissions">Submissions</a>
          <a href="https://lightkey.org">LightKey</a>
        </div>
      </div>
      <div class="footer-section">
        <h4>Join the Community</h4>
        <p class="footer-community-note">Updates on evidence systems and civic-legal data/tech.</p>
        <a href="https://linkedin.com/company/glasscase-org" class="footer-cta">Follow on LinkedIn</a>
      </div>
    </div>
  `
};

function gcGetGiscusTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light_high_contrast'
    : 'dark';
}

function gcSyncGiscusTheme() {
  const giscusScript = document.querySelector('script[src="https://giscus.app/client.js"]');
  if (!giscusScript) return;

  const theme = gcGetGiscusTheme();
  if (giscusScript.getAttribute('data-theme') !== theme) {
    giscusScript.setAttribute('data-theme', theme);
  }

  const giscusFrame = document.querySelector('iframe.giscus-frame');
  if (giscusFrame && giscusFrame.contentWindow) {
    giscusFrame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme } } },
      'https://giscus.app'
    );
  }
}

function gcInitGiscusThemeBridge() {
  const giscusScript = document.querySelector('script[src="https://giscus.app/client.js"]');
  if (!giscusScript) return;

  gcSyncGiscusTheme();

  // Giscus iframe is async; retry briefly so the first render picks up site theme.
  let attempts = 0;
  const retryTimer = setInterval(function() {
    attempts += 1;
    gcSyncGiscusTheme();
    if (document.querySelector('iframe.giscus-frame') || attempts >= 20) {
      clearInterval(retryTimer);
    }
  }, 150);
}

function injectComponents() {
  const headerEl = document.getElementById('shared-header');
  const mobileMenuEl = document.getElementById('shared-mobile-menu');
  const footerEl = document.getElementById('shared-footer');

  if (headerEl) headerEl.outerHTML = COMPONENTS.header;
  if (mobileMenuEl) mobileMenuEl.outerHTML = COMPONENTS.mobileMenu;
  if (footerEl) footerEl.outerHTML = COMPONENTS.footer;

  // Initialize outbound links for the newly injected content
  if (typeof initOutboundLinks === 'function') {
    initOutboundLinks();
  }

  // Set active state for mobile menu
  const currentPath = window.location.pathname;
  let activeNav = '';
  if (currentPath === '/' || currentPath === '/index.html') activeNav = 'home';
  else if (currentPath.includes('tools') || currentPath.includes('consideration-matrix') || currentPath.includes('redaction-taxonomy') || currentPath.includes('stress-mapper')) activeNav = 'tools';
  else if (currentPath.includes('findings')) activeNav = 'findings';
  else if (currentPath.includes('commentary')) activeNav = 'commentary';
  else if (currentPath.includes('submissions')) activeNav = 'submissions';
  else if (currentPath.includes('position')) activeNav = 'position';
  else if (currentPath.includes('legal')) activeNav = 'legal';

  if (activeNav) {
    const activeLink = document.querySelector(".mobile-menu [data-nav='" + activeNav + "']");
    if (activeLink) activeLink.classList.add('active');
  }

  gcInitThemeToggle();
  gcInitReadingToggle();
  gcInitGiscusThemeBridge();
}

function gcInitThemeToggle() {
  const btns = Array.from(document.querySelectorAll('[data-theme-toggle]'));
  if (!btns.length) return;

  let transitionTimer = null;

  function applyTheme(theme, animate) {
    const root = document.documentElement;
    if (animate) {
      root.setAttribute('data-theme-transitioning', '');
      if (transitionTimer) clearTimeout(transitionTimer);
    } else {
      root.removeAttribute('data-theme-transitioning');
    }

    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      btns.forEach(function(btn) {
        btn.textContent = '☾';
        btn.setAttribute('aria-label', 'Switch to dark mode');
      });
      try {
        localStorage.setItem('glasscase-theme', 'light');
      } catch (_) {}
    } else {
      root.removeAttribute('data-theme');
      btns.forEach(function(btn) {
        btn.textContent = '☼';
        btn.setAttribute('aria-label', 'Switch to light mode');
      });
      try {
        localStorage.setItem('glasscase-theme', 'dark');
      } catch (_) {}
    }

    if (animate) {
      transitionTimer = setTimeout(function() {
        root.removeAttribute('data-theme-transitioning');
      }, 400);
    }

    gcSyncGiscusTheme();
  }

  let saved = null;
  try {
    saved = localStorage.getItem('glasscase-theme');
  } catch (_) {
    saved = null;
  }

  const initial = saved === 'light' || document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(initial, false);

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light', true);
    });
  });
}

function gcInitReadingToggle() {
  const btn = document.getElementById('gcReadingToggle');
  if (!btn) return;
  btn.addEventListener('click', function() {
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    document.body.classList.toggle('reading-relaxed', !pressed);
  });
}

document.addEventListener('DOMContentLoaded', injectComponents);
