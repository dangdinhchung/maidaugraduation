// Detect if device is mobile/touch device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || (window.matchMedia && window.matchMedia("(max-width: 768px)").matches)
        || ('ontouchstart' in window);
}

// Create floating particles (reduced on mobile)
function createParticles() {
    const container = document.querySelector('.particles-container');
    const particleCount = isMobileDevice() ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Create confetti (reduced on mobile)
function createConfetti() {
    const confettiCount = isMobileDevice() ? 10 : 20;
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 8 + 's';
        confetti.style.animationDuration = (6 + Math.random() * 4) + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
    }
}

// Create sparkles (reduced on mobile)
function createSparkles() {
    const sparkleInterval = isMobileDevice() ? 1000 : 500;
    
    setInterval(() => {
        const card = document.querySelector('.invitation-card');
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        card.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, sparkleInterval);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    // Reset scroll position on page load
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    createParticles();
    createConfetti();
    createSparkles();
    createBalloons();
    createShootingStars();

    // Add entrance animation to detail sections
    const sections = document.querySelectorAll('.detail-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
});

// Disable hover effects on mobile (CSS hover will handle desktop)
if (isMobileDevice()) {
    const card = document.querySelector('.invitation-card');
    card.style.pointerEvents = 'auto';
}

// Envelope Open Animation
const envelopeOverlay = document.getElementById('envelopeOverlay');
const envelope = document.getElementById('envelope');
const openButton = document.getElementById('openButton');
const envelopeContainer = document.querySelector('.envelope-container');
let isEnvelopeOpened = false;

function openEnvelope() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Play background music
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5; // Set volume to 50%
        backgroundMusic.play().catch(error => {
            console.log('Autoplay prevented, user interaction required:', error);
        });
    }

    // Add opened class to trigger animation
    envelope.classList.add('opened');

    // Create confetti effect
    setTimeout(() => {
        createEnvelopeConfetti();
    }, 600);

    // Create fireworks effect
    setTimeout(() => {
        createFireworks();
    }, 800);

    // Hide overlay after animation
    setTimeout(() => {
        envelopeOverlay.classList.add('hidden');
        // Reset scroll position to top
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Show invitation card container
        const mainContainer = document.getElementById('mainContainer');
        if (mainContainer) {
            mainContainer.classList.remove('hidden');
            mainContainer.classList.add('show');
        }
        
        // Start continuous fireworks for invitation card
        startContinuousFireworks();
    }, 2000);
}

// Click handlers (disabled - envelope auto-opens now)
// if (envelope) {
//     envelope.addEventListener('click', openEnvelope);
// }

// if (openButton) {
//     openButton.addEventListener('click', openEnvelope);
// }

// if (envelopeContainer) {
//     envelopeContainer.addEventListener('click', openEnvelope);
// }

// Create confetti for envelope opening
function createEnvelopeConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#667eea', '#764ba2'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '2000';
        confetti.style.pointerEvents = 'none';
        
        const angle = Math.random() * 360;
        const velocity = 100 + Math.random() * 200;
        const x = Math.cos(angle * Math.PI / 180) * velocity;
        const y = Math.sin(angle * Math.PI / 180) * velocity;
        
        confetti.style.transform = `translate(${x}px, ${y}px)`;
        confetti.style.transition = 'all 1.5s ease-out';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.opacity = '0';
            confetti.style.transform = `translate(${x * 2}px, ${y * 2 + 200}px) rotate(720deg)`;
        }, 10);

        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
}

// Create fireworks effect
function createFireworks() {
    const fireworkColors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#95e1d3', '#667eea', '#764ba2', '#ff9ff3', '#54a0ff'];
    const fireworkCount = 5; // Number of fireworks
    const particleCount = 30; // Particles per firework

    for (let f = 0; f < fireworkCount; f++) {
        setTimeout(() => {
            // Random position for each firework (spread across screen)
            const x = 30 + (Math.random() * 40); // 30% to 70% of screen width
            const y = 20 + (Math.random() * 30); // 20% to 50% of screen height
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                
                const angle = (360 / particleCount) * i;
                const velocity = 150 + Math.random() * 100;
                const distance = velocity;
                
                const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
                particle.style.backgroundColor = color;
                particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
                
                const radians = (angle * Math.PI) / 180;
                const xOffset = Math.cos(radians) * distance;
                const yOffset = Math.sin(radians) * distance;
                
                particle.style.left = x + '%';
                particle.style.top = y + '%';
                particle.style.transform = `translate(0, 0)`;
                particle.style.setProperty('--x-end', xOffset + 'px');
                particle.style.setProperty('--y-end', yOffset + 'px');
                
                document.body.appendChild(particle);
                
                // Animate particle
                setTimeout(() => {
                    particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                    particle.style.opacity = '0';
                }, 10);
                
                // Remove particle
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
        }, f * 300); // Stagger fireworks by 300ms
    }
}

// Continuous fireworks for invitation card (lighter, less frequent)
let continuousFireworksInterval = null;

function startContinuousFireworks() {
    // Clear any existing interval
    if (continuousFireworksInterval) {
        clearInterval(continuousFireworksInterval);
    }

    // Create multiple, lighter fireworks every 3-4 seconds
    continuousFireworksInterval = setInterval(() => {
        // Create 2-3 fireworks at once
        const fireworkCount = 2 + Math.floor(Math.random() * 2); // 2 or 3 fireworks
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                createLightFirework();
            }, i * 200); // Stagger by 200ms
        }
    }, 3500); // Every 3.5 seconds
}

function createLightFirework() {
    // Random position (spread across entire screen - left, right, top, bottom, center)
    // Random zone: 0 = left, 1 = right, 2 = center, 3 = top, 4 = bottom
    const zone = Math.floor(Math.random() * 5);
    let x, y;
    
    switch(zone) {
        case 0: // Left side
            x = 10 + (Math.random() * 20); // 10% to 30% of screen width
            y = 20 + (Math.random() * 60); // 20% to 80% of screen height
            break;
        case 1: // Right side
            x = 70 + (Math.random() * 20); // 70% to 90% of screen width
            y = 20 + (Math.random() * 60); // 20% to 80% of screen height
            break;
        case 2: // Center (around invitation card)
            x = 40 + (Math.random() * 20); // 40% to 60% of screen width
            y = 30 + (Math.random() * 20); // 30% to 50% of screen height
            break;
        case 3: // Top area
            x = 20 + (Math.random() * 60); // 20% to 80% of screen width
            y = 10 + (Math.random() * 20); // 10% to 30% of screen height
            break;
        case 4: // Bottom area
            x = 20 + (Math.random() * 60); // 20% to 80% of screen width
            y = 70 + (Math.random() * 20); // 70% to 90% of screen height
            break;
        default:
            x = 40 + (Math.random() * 20);
            y = 30 + (Math.random() * 20);
    }
    
    // Random firework type: 0 = circular, 1 = star, 2 = heart, 3 = willow, 4 = ring
    const fireworkType = Math.floor(Math.random() * 5);
    
    switch(fireworkType) {
        case 0:
            createCircularFirework(x, y);
            break;
        case 1:
            createStarFirework(x, y);
            break;
        case 2:
            createHeartFirework(x, y);
            break;
        case 3:
            createWillowFirework(x, y);
            break;
        case 4:
            createRingFirework(x, y);
            break;
    }
}

// Circular firework (classic round burst)
function createCircularFirework(x, y) {
    const fireworkColors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#667eea', '#764ba2'];
    const particleCount = 24;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(x, y, fireworkColors);
        const angle = (360 / particleCount) * i;
        const velocity = 80 + Math.random() * 60;
        const radians = (angle * Math.PI) / 180;
        const xOffset = Math.cos(radians) * velocity;
        const yOffset = Math.sin(radians) * velocity;
        
        animateParticle(particle, xOffset, yOffset);
    }
}

// Star firework (5-pointed star pattern)
function createStarFirework(x, y) {
    const fireworkColors = ['#ffd700', '#ff9ff3', '#54a0ff', '#ff6b6b', '#667eea'];
    const points = 5;
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(x, y, fireworkColors);
        const angle = (360 / points) * (i % points) + (Math.floor(i / points) * 10);
        const distance = 60 + (Math.floor(i / points) * 25) + Math.random() * 30;
        const radians = (angle * Math.PI) / 180;
        const xOffset = Math.cos(radians) * distance;
        const yOffset = Math.sin(radians) * distance;
        
        animateParticle(particle, xOffset, yOffset);
    }
}

// Heart firework (heart shape)
function createHeartFirework(x, y) {
    const fireworkColors = ['#ff6b6b', '#ff9ff3', '#ffd700', '#ff4757', '#ff6348'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(x, y, fireworkColors);
        const t = (i / particleCount) * Math.PI * 2;
        const distance = 70 + Math.random() * 40;
        
        // Heart parametric equation
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        const scale = distance / 20;
        const xOffset = heartX * scale;
        const yOffset = heartY * scale;
        
        animateParticle(particle, xOffset, yOffset);
    }
}

// Willow firework (trails falling down)
function createWillowFirework(x, y) {
    const fireworkColors = ['#4ecdc4', '#95e1d3', '#54a0ff', '#667eea', '#764ba2'];
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(x, y, fireworkColors);
        const angle = -90 + (Math.random() * 60 - 30); // Mostly downward with spread
        const distance = 100 + Math.random() * 80;
        const radians = (angle * Math.PI) / 180;
        const xOffset = Math.cos(radians) * distance + (Math.random() * 40 - 20);
        const yOffset = Math.sin(radians) * distance;
        
        // Make particles longer for trail effect
        particle.style.width = '4px';
        particle.style.height = '12px';
        particle.style.borderRadius = '50%';
        
        animateParticle(particle, xOffset, yOffset, 2000);
    }
}

// Ring firework (concentric circles)
function createRingFirework(x, y) {
    const fireworkColors = ['#ffd700', '#ff9ff3', '#54a0ff', '#4ecdc4', '#667eea'];
    const rings = 3;
    const particlesPerRing = 16;
    
    for (let ring = 0; ring < rings; ring++) {
        for (let i = 0; i < particlesPerRing; i++) {
            const particle = createParticle(x, y, fireworkColors);
            const angle = (360 / particlesPerRing) * i;
            const distance = (ring + 1) * 50 + Math.random() * 20;
            const radians = (angle * Math.PI) / 180;
            const xOffset = Math.cos(radians) * distance;
            const yOffset = Math.sin(radians) * distance;
            
            // Delay rings for cascade effect
            setTimeout(() => {
                animateParticle(particle, xOffset, yOffset);
            }, ring * 100);
        }
    }
}

// Helper function to create particle
function createParticle(x, y, colors) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 8px ${color}, 0 0 15px ${color}`;
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.transform = `translate(0, 0)`;
    
    document.body.appendChild(particle);
    return particle;
}

// Helper function to animate particle
function animateParticle(particle, xOffset, yOffset, duration = 1500) {
    setTimeout(() => {
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, duration);
}

// Countdown Timer
function updateCountdown() {
    // Target date: December 9, 2025 at 10:00 AM (Vietnam time)
    const targetDate = new Date('2025-12-09T10:00:00+07:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate time units
    const days = distance > 0 ? Math.floor(distance / (1000 * 60 * 60 * 24)) : 0;
    const hours = distance > 0 ? Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0;
    const minutes = distance > 0 ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) : 0;
    const seconds = distance > 0 ? Math.floor((distance % (1000 * 60)) / 1000) : 0;

    // Update countdown overlay
    updateNumberWithAnimation('countdown-days', days);
    updateNumberWithAnimation('countdown-hours', hours);
    updateNumberWithAnimation('countdown-minutes', minutes);
    updateNumberWithAnimation('countdown-seconds', seconds);

    // Update invitation card countdown (if elements exist)
    const invitationDays = document.getElementById('days');
    const invitationHours = document.getElementById('hours');
    const invitationMinutes = document.getElementById('minutes');
    const invitationSeconds = document.getElementById('seconds');
    
    if (invitationDays) updateNumberWithAnimation('days', days);
    if (invitationHours) updateNumberWithAnimation('hours', hours);
    if (invitationMinutes) updateNumberWithAnimation('minutes', minutes);
    if (invitationSeconds) updateNumberWithAnimation('seconds', seconds);
}

function updateNumberWithAnimation(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const oldValue = parseInt(element.textContent) || 0;
    
    if (oldValue !== value) {
        element.style.transform = 'scale(1.2)';
        element.style.opacity = '0.5';
        
        setTimeout(() => {
            element.textContent = value.toString().padStart(2, '0');
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 150);
    } else {
        element.textContent = value.toString().padStart(2, '0');
    }
}

// Open invitation (hide countdown, show envelope and auto-open)
function openInvitation() {
    const countdownOverlay = document.getElementById('countdown-overlay');
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    
    if (countdownOverlay && envelopeOverlay) {
        // Hide countdown overlay
        countdownOverlay.classList.add('hidden');
        
        // Reset scroll position
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Show envelope overlay
        setTimeout(() => {
            envelopeOverlay.classList.remove('hidden');
            
            // Auto-open envelope after envelope appears
            setTimeout(() => {
                if (!isEnvelopeOpened) {
                    openEnvelope();
                }
            }, 600); // Wait for envelope to appear, then open
        }, 300);
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Open invitation button handler
const openInvitationBtn = document.getElementById('openInvitationBtn');
if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', openInvitation);
}

// Create floating balloons
function createBalloons() {
    const balloonCount = isMobileDevice() ? 3 : 6;
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.animationDelay = Math.random() * 15 + 's';
        balloon.style.animationDuration = (12 + Math.random() * 8) + 's';
        document.body.appendChild(balloon);
    }
}

// Create shooting stars
function createShootingStars() {
    const starCount = isMobileDevice() ? 2 : 5;
    
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.left = Math.random() * 50 + '%';
            star.style.top = Math.random() * 50 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 4000);
        }, i * 1000);
    }

    // Create new stars periodically
    setInterval(() => {
        if (!isMobileDevice()) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.left = Math.random() * 50 + '%';
            star.style.top = Math.random() * 50 + '%';
            star.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 4000);
        }
    }, 8000);
}

