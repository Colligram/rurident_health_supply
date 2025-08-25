// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the storytelling animation
    initStorytellingAnimation();
    
    // Initialize responsive behavior
    handleResponsiveUpdates();
});

function initStorytellingAnimation() {
    // Create a main timeline for the entire storytelling sequence
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".storytelling-section",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1, // Smooth scrubbing, 1 second catch-up
            pin: false,
            anticipatePin: 1,
            onUpdate: (self) => {
                // Optional: Add any custom logic during scroll
                console.log("Animation progress:", self.progress);
            }
        }
    });

    // Set initial states for all animated elements
    gsap.set("#background", { opacity: 0, scale: 1.1 });
    gsap.set("#dental-chair", { x: -400, opacity: 0 });
    gsap.set("#patient", { opacity: 0, scale: 0.8, y: 50 });
    gsap.set("#dentist", { x: 400, opacity: 0 });
    gsap.set(".dental-tool", { opacity: 0, y: -100, rotation: 45, scale: 0.5 });
    gsap.set(".text-overlay", { opacity: 0, y: 50, scale: 0.9 });

    // Animation Sequence
    
    // 1. Background fades in and scales to normal (0-15% of scroll)
    mainTimeline.to("#background", {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        ease: "power2.out"
    }, 0);

    // 2. Dental chair slides in from left (15-30% of scroll)
    mainTimeline.to("#dental-chair", {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
    }, 0.2);

    // 3. Patient fades in and scales up (30-45% of scroll)
    mainTimeline.to("#patient", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
    }, 0.5);

    // 4. Comfort text appears
    mainTimeline.to("#text-comfort", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
    }, 0.7);

    // 5. Dentist slides in from right (45-60% of scroll)
    mainTimeline.to("#dentist", {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
    }, 1);

    // 6. Technology text appears
    mainTimeline.to("#text-technology", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
    }, 1.2);

    // 7. Dental tools float in one by one (60-85% of scroll)
    mainTimeline.to("#tool-1", {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, 1.5);

    mainTimeline.to("#tool-2", {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, 1.7);

    mainTimeline.to("#tool-3", {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, 1.9);

    mainTimeline.to("#tool-4", {
        opacity: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, 2.1);

    // 8. Final background fully visible and expertise text (85-100% of scroll)
    mainTimeline.to("#background", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, 2.3);

    mainTimeline.to("#text-expertise", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
    }, 2.5);

    // Add subtle floating animations for tools (continuous)
    gsap.to(".dental-tool", {
        y: "+=10",
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
    });

    // Add subtle breathing animation for patient
    gsap.to("#patient", {
        scale: 1.02,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });
}

// Create parallax effect for background
function createParallaxEffect() {
    gsap.to(".clinic-background", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".storytelling-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Handle responsive updates
function handleResponsiveUpdates() {
    // Update animations on window resize
    window.addEventListener('resize', gsap.utils.debounce(() => {
        ScrollTrigger.refresh();
    }, 300));
}

// Create entrance animations for service cards
function initServiceCardsAnimation() {
    gsap.fromTo(".service-card", {
        opacity: 0,
        y: 50,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
}

// Initialize additional animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        createParallaxEffect();
        initServiceCardsAnimation();
    }, 100);
});

// Performance optimization: Reduce animation complexity on mobile
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable some complex animations on mobile for better performance
        gsap.set(".dental-tool", { 
            rotation: 0  // Remove rotation animations on mobile
        });
        
        // Simplify easing functions
        ScrollTrigger.batch(".text-overlay", {
            onEnter: elements => gsap.to(elements, {
                opacity: 1, 
                y: 0, 
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
            })
        });
    }
}

// Call mobile optimization
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', gsap.utils.debounce(optimizeForMobile, 300));

// Debug helper (remove in production)
function enableDebugMode() {
    if (window.location.search.includes('debug=true')) {
        // Add visual indicators for scroll trigger points
        ScrollTrigger.addEventListener("refresh", () => {
            console.log("ScrollTrigger refreshed");
        });
        
        // Log animation progress
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.vars.onUpdate = (self) => {
                console.log(`${trigger.trigger.id || 'unnamed'}: ${Math.round(self.progress * 100)}%`);
            };
        });
    }
}

// Initialize debug mode
enableDebugMode();

// Smooth scroll behavior for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: target,
                ease: "power2.inOut"
            });
        }
    });
});

// Preload optimization
function preloadCriticalAssets() {
    const imageUrls = [
        'assets/clinic-background.png',
        'assets/dental-chair.png',
        'assets/patient.png',
        'assets/dentist.png',
        'assets/dental-mirror.png',
        'assets/dental-probe.png',
        'assets/dental-light.png',
        'assets/dental-suction.png'
    ];
    
    imageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadCriticalAssets);