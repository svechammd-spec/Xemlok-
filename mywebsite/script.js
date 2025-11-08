// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if it's the About link with dropdown
        if (this.classList.contains('about-link')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dropdown toggle for About link
document.addEventListener('DOMContentLoaded', () => {
    const aboutLink = document.querySelector('.about-link');
    const dropdownParent = document.querySelector('.dropdown-parent');
    
    if (aboutLink && dropdownParent) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownParent.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownParent.contains(e.target)) {
                dropdownParent.classList.remove('active');
            }
        });
    }
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 30px rgba(238, 178, 45, 0.3)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Button click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Analyze Token button in hero
    const analyzeButtons = document.querySelectorAll('.btn-primary');
    analyzeButtons.forEach(btn => {
        if (btn.textContent === 'ANALYZE TOKEN') {
            btn.addEventListener('click', () => {
                document.querySelector('#analytics').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

    // Learn More button
    const learnMoreBtn = document.querySelector('.btn-secondary');
    if (learnMoreBtn && learnMoreBtn.textContent === 'LEARN MORE') {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('#features').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Navigate to analyse page button functionality (only on main page)
    const goAnalyseBtn = document.querySelector('.btn-go-analyse');
    const searchInput = document.querySelector('.token-search');
    
    if (goAnalyseBtn && searchInput) {
        goAnalyseBtn.addEventListener('click', () => {
            window.location.href = 'analyse.html';
        });

        // Allow Enter key to trigger navigation
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.location.href = 'analyse.html';
            }
        });
    }
});

// Add parallax effect to hero visual
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const coinScanner = document.querySelector('.coin-scanner');
    if (coinScanner) {
        coinScanner.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-column, .stat-card, .stat-item, .about, .features, .analytics-demo, .about-content h2, .about-content p, .search-container, .stats-grid');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Initialize cosmic starfield
    initStarfield();
});

// Particle physics animation
function initStarfield() {
    const canvas = document.getElementById('waveCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configuration
    const CONFIG = {
        density: 0.00012,
        maxSpeed: 0.3,
        linkDist: 140,
        linkWidth: 1.1,
        mouseRadius: 180,
        mouseForce: 0.06,
        inertia: 0.98,
        dotSize: [1, 2.2],
        wrap: true
    };
    
    // Size and DPR
    const state = { w: 0, h: 0, dpr: Math.max(1, window.devicePixelRatio || 1) };
    
    function resize() {
        const {clientWidth, clientHeight} = canvas;
        state.w = clientWidth * state.dpr;
        state.h = clientHeight * state.dpr;
        canvas.width = state.w;
        canvas.height = state.h;
        ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
        rebuild();
    }
    
    new ResizeObserver(resize).observe(canvas);
    
    // Particles
    let particles = [];
    
    function rebuild() {
        const cssW = state.w / state.dpr, cssH = state.h / state.dpr;
        const targetCount = Math.round(cssW * cssH * CONFIG.density);
        if (particles.length > targetCount) particles.length = targetCount;
        
        while (particles.length < targetCount) {
            particles.push({
                x: Math.random() * cssW,
                y: Math.random() * cssH,
                vx: (Math.random() * 2 - 1) * CONFIG.maxSpeed,
                vy: (Math.random() * 2 - 1) * CONFIG.maxSpeed,
                r: lerp(CONFIG.dotSize[0], CONFIG.dotSize[1], Math.random())
            });
        }
    }
    
    // Mouse interaction
    const mouse = { x: 0, y: 0, active: false };
    const toCanvasSpace = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left);
        mouse.y = (e.clientY - rect.top);
    };
    window.addEventListener('pointermove', (e) => { mouse.active = true; toCanvasSpace(e); });
    window.addEventListener('pointerdown', (e) => { mouse.active = true; toCanvasSpace(e); });
    window.addEventListener('pointerleave', () => { mouse.active = false; });
    
    // Animation loop
    function tick() {
        const cssW = state.w / state.dpr, cssH = state.h / state.dpr;
        
        // Physics
        for (let p of particles) {
            // Mouse attraction
            if (mouse.active) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.hypot(dx, dy);
                if (dist < CONFIG.mouseRadius) {
                    const strength = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
                    p.vx += dx / (dist + 0.0001) * strength;
                    p.vy += dy / (dist + 0.0001) * strength;
                }
            }
            
            // Limit max speed
            const sp = Math.hypot(p.vx, p.vy);
            const maxSp = CONFIG.maxSpeed * 2.3;
            if (sp > maxSp) { p.vx *= maxSp / sp; p.vy *= maxSp / sp; }
            
            // Inertia
            p.vx *= CONFIG.inertia;
            p.vy *= CONFIG.inertia;
            
            // Move
            p.x += p.vx;
            p.y += p.vy;
            
            // Edge wrapping
            if (CONFIG.wrap) {
                if (p.x < -5) p.x = cssW + 5;
                if (p.x > cssW + 5) p.x = -5;
                if (p.y < -5) p.y = cssH + 5;
                if (p.y > cssH + 5) p.y = -5;
            }
        }
        
        // Draw
        ctx.clearRect(0, 0, cssW, cssH);
        
        // Lines
        ctx.lineWidth = CONFIG.linkWidth;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d = Math.hypot(dx, dy);
                if (d < CONFIG.linkDist) {
                    ctx.globalAlpha = (1 - d / CONFIG.linkDist);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
        
        // Dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(tick);
    }
    
    function lerp(a, b, t) { return a + (b - a) * t; }
    
    resize();
    requestAnimationFrame(tick);
}
