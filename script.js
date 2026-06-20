// ===== КАСТОМНЫЙ КУРСОР =====
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    glowX += (mouseX - glowX) * 0.05;
    glowY += (mouseY - glowY) * 0.05;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Курсор при наведении на интерактивные элементы
const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .card-3d, .glitch-hover, .download-btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Курсор при клике
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

// ===== КЛИК-ВСПЫШКА =====
const clickFlash = document.getElementById('click-flash');
document.addEventListener('click', (e) => {
    clickFlash.style.left = e.clientX + 'px';
    clickFlash.style.top = e.clientY + 'px';
    clickFlash.classList.add('active');
    setTimeout(() => clickFlash.classList.remove('active'), 500);
});

// ===== ПЕЧАТНАЯ МАШИНКА =====
function typewriterEffect() {
    const elements = document.querySelectorAll('.typewriter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('typing')) return;
                el.classList.add('typing');
                
                const text = el.getAttribute('data-text') || el.textContent;
                const delay = parseInt(el.getAttribute('data-delay')) || 0;
                
                el.textContent = '';
                const cursor = document.createElement('span');
                cursor.classList.add('typewriter-cursor');
                el.appendChild(cursor);
                
                setTimeout(() => {
                    let i = 0;
                    const interval = setInterval(() => {
                        if (i < text.length) {
                            el.textContent = text.substring(0, i + 1);
                            el.appendChild(cursor);
                            i++;
                        } else {
                            clearInterval(interval);
                            setTimeout(() => cursor.remove(), 1500);
                        }
                    }, 60);
                }, delay);
                
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    elements.forEach(el => observer.observe(el));
}

// ===== МАГНИТНЫЕ КНОПКИ =====
function magneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = 'transform 0.1s ease';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

// ===== 3D-КАРТОЧКИ =====
function cards3D() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -15;
            const rotateY = (x - centerX) / centerX * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.boxShadow = `0 25px 70px rgba(123, 0, 255, 0.2)`;
            card.style.borderColor = 'rgba(123, 0, 255, 0.5)';
            
            const icon = card.querySelector('.feature-icon-wrapper');
            if (icon) icon.style.transform = 'scale(1.1) rotate(-5deg)';
            
            const glow = card.querySelector('.card-glow');
            if (glow) glow.style.opacity = '1';
            
            const heading = card.querySelector('h3');
            if (heading && heading.classList.contains('glitch-hover')) {
                heading.style.color = 'var(--purple-glow)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            
            const icon = card.querySelector('.feature-icon-wrapper');
            if (icon) icon.style.transform = '';
            
            const glow = card.querySelector('.card-glow');
            if (glow) glow.style.opacity = '0';
            
            const heading = card.querySelector('h3');
            if (heading && heading.classList.contains('glitch-hover')) {
                heading.style.color = '';
            }
        });
    });
}

// ===== ПАРАЛЛАКС-СЛОИ =====
function parallaxLayers() {
    const parallaxEls = document.querySelectorAll('[data-parallax-depth]');
    
    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (e.clientX - centerX) / centerX;
        const offsetY = (e.clientY - centerY) / centerY;
        
        parallaxEls.forEach(el => {
            const depth = parseFloat(el.getAttribute('data-parallax-depth'));
            const moveX = offsetX * depth * 80;
            const moveY = offsetY * depth * 80;
            
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// ===== ПАРАЛЛАКС ДЛЯ МОКАПА =====
document.addEventListener('mousemove', (e) => {
    const mouseXp = e.clientX / window.innerWidth - 0.5;
    const mouseYp = e.clientY / window.innerHeight - 0.5;
    
    const floatingMockup = document.querySelector('.floating-mockup');
    if (floatingMockup && !floatingMockup.closest('.card-3d:hover')) {
        floatingMockup.style.transform = `translateY(-18px) rotateY(${mouseXp * 10}deg) rotateX(${-mouseYp * 10}deg)`;
    }
});

// ===== МОРФИНГ ЧАСТИЦ (собираются в логотип при скролле) =====
function particleMorph() {
    const particles = document.querySelectorAll('.particle');
    const logo = document.querySelector('.logo-text');
    
    if (!logo) return;
    
    window.addEventListener('scroll', () => {
        const logoRect = logo.getBoundingClientRect();
        const logoCenterX = logoRect.left + logoRect.width / 2;
        const logoCenterY = logoRect.top + logoRect.height / 2;
        
        const distance = Math.abs(logoCenterY - window.innerHeight / 2);
        const maxDistance = window.innerHeight;
        const factor = Math.max(0, 1 - distance / maxDistance);
        
        particles.forEach((particle, i) => {
            if (factor > 0.3) {
                const angle = (i / particles.length) * Math.PI * 2;
                const radius = 60 + factor * 40;
                const tx = Math.cos(angle) * radius;
                const ty = Math.sin(angle) * radius;
                
                particle.style.transition = 'all 0.8s ease';
                particle.style.left = (logoCenterX + tx) + 'px';
                particle.style.top = (logoCenterY + ty) + 'px';
                particle.style.opacity = factor * 0.6;
            }
        });
    });
}

// ===== STARFIELD CANVAS =====
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const starCount = 250;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random();
        this.opacitySpeed = (Math.random() - 0.5) * 0.015;
        this.isPurple = Math.random() > 0.75;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.opacitySpeed;
        
        if (this.opacity <= 0.1 || this.opacity >= 1) {
            this.opacitySpeed = -this.opacitySpeed;
        }
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isPurple ? '#9d3aff' : '#ffffff';
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.strokeStyle = `rgba(123, 0, 255, ${0.06 * (1 - distance / 120)})`;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles-container');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 6) + 's';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 12000);
}

setInterval(createParticle, 400);
for (let i = 0; i < 15; i++) {
    setTimeout(createParticle, Math.random() * 3000);
}

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL REVEAL АНИМАЦИИ =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        } else {
            entry.target.classList.remove('revealed');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.classList.add('scroll-reveal', `delay-${i + 1}`);
    revealObserver.observe(el);
});

document.querySelector('.anarchy-card')?.classList.add('scroll-scale');
if (document.querySelector('.anarchy-card')) {
    revealObserver.observe(document.querySelector('.anarchy-card'));
}

document.querySelector('.specs-container')?.classList.add('scroll-reveal');
if (document.querySelector('.specs-container')) {
    revealObserver.observe(document.querySelector('.specs-container'));
}

document.querySelector('.servers-info')?.classList.add('scroll-reveal-left');
if (document.querySelector('.servers-info')) {
    revealObserver.observe(document.querySelector('.servers-info'));
}

document.querySelectorAll('.server-item').forEach((el, i) => {
    el.classList.add('scroll-reveal', `delay-${i + 1}`);
    revealObserver.observe(el);
});

document.querySelector('.download-card')?.classList.add('scroll-scale');
if (document.querySelector('.download-card')) {
    revealObserver.observe(document.querySelector('.download-card'));
}

document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('wave-reveal');
    revealObserver.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== DOWNLOAD BUTTONS =====
const downloadButtons = document.querySelectorAll('.download-btn');

downloadButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => { this.style.transform = ''; }, 200);
        
        if (this.classList.contains('primary-dl')) {
            const ripple = this.querySelector('.btn-ripple');
            if (ripple) {
                ripple.style.width = '500px';
                ripple.style.height = '500px';
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 600);
            }
        }
    });
});

// ===== ANARCHY SYMBOL =====
const anarchySymbol = document.querySelector('.anarchy-symbol');
if (anarchySymbol) {
    anarchySymbol.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(15deg)';
        this.style.borderColor = '#9d3aff';
        this.style.boxShadow = '0 0 80px rgba(123, 0, 255, 0.8)';
    });
    
    anarchySymbol.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
}

// ===== ЗАПУСК ВСЕХ СИСТЕМ =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => { document.body.style.opacity = '1'; }, 80);
    
    typewriterEffect();
    magneticButtons();
    cards3D();
    parallaxLayers();
    particleMorph();
    
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 500);
});

console.log('AquaMC Launcher - All systems online.');
