/**
 * Shared JavaScript for GlassCase.org
 * Handles: Mobile menu, Outbound link behavior
 */

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const button = document.querySelector('.mobile-menu-button');
    if (!menu || !overlay || !button) return;

    const isOpen = menu.classList.contains('active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        menu.classList.add('active');
        overlay.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const button = document.querySelector('.mobile-menu-button');
    if (!menu || !overlay || !button) return;
    
    menu.classList.remove('active');
    overlay.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function initOutboundLinks() {
    const internalHosts = new Set([
        window.location.host,
        'glasscase.org',
        'www.glasscase.org'
    ]);

    document.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (!href) return;
        if (href.startsWith('#') || href.startsWith('/#')) return;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

        let url;
        try {
            url = new URL(href, window.location.href);
        } catch {
            return;
        }

        if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
        if (internalHosts.has(url.host)) return;

        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initOutboundLinks();
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});
