// Global variables
let currentSection = 'home';
let isAnimating = false;
let homeVariantTimer = null;
let currentHomeVariant = 1;

// DOM Elements
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const downloadBtn = document.querySelectorAll('.download-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const subNavBtns = document.querySelectorAll('.sub-nav-btn');
const homeVariants = document.querySelectorAll('.home-variant');
const clickableLogos = document.querySelectorAll('.clickable-logo');
const clickableCharacters = document.querySelectorAll('.clickable-character');
const backBtn = document.querySelector('.back-button');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const portfolioDetailContent = document.getElementById('portfolio-detail-scroll');

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeKeyboardControls();
    initializeAnimations();
    initializePortfolioInteractions();
    initializeDownloadButton();
    initializeHomeVariants();
    initializePortfolioDetail();
    initializePortfolioDetailInteractions();

    // Debug: Check if back button exists
    const backButtonDebug = document.querySelector('.back-button');
    if (backButtonDebug) {
        console.log('✅ Back button found:', backButtonDebug);
    } else {
        console.error('❌ Back button not found!');
    }

    // Set initial active section
    showSection('home');

    console.log('🚀 Sergio Portfolio initialized successfully!');
});

// Navigation functionality
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);

            if (targetSection !== currentSection && !isAnimating) {
                navigateToSection(targetSection);
            }
        });
    });
}

function navigateToSection(sectionId) {
    if (isAnimating) return;

    isAnimating = true;

    // Update active states
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    // Show new section with animation
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';

        // Use GSAP for smooth transition
        gsap.fromTo(targetSection,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    targetSection.classList.add('active');
                    currentSection = sectionId;
                    isAnimating = false;

                    // Trigger section-specific animations
                    animateSectionContent(sectionId);
                }
            }
        );
    }
}

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    currentSection = sectionId;
    animateSectionContent(sectionId);
}

// Keyboard controls (F and Z keys as mentioned in design)
function initializeKeyboardControls() {
    document.addEventListener('keydown', function(e) {
        // F key for fullscreen
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }

        // Z key for zoom/reset view
        if (e.key === 'z' || e.key === 'Z') {
            e.preventDefault();
            resetView();
        }

        // Arrow keys for navigation
        if (!isAnimating) {
            const sectionOrder = ['home', 'portfolio1', 'portfolio2', 'blog', 'about'];
            const currentIndex = sectionOrder.indexOf(currentSection);

            if (e.key === 'ArrowRight' && currentIndex < sectionOrder.length - 1) {
                navigateToSection(sectionOrder[currentIndex + 1]);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                navigateToSection(sectionOrder[currentIndex - 1]);
            }
        }
    });
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function resetView() {
    // Reset zoom and scroll position
    gsap.to(document.body, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
    });

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

// GSAP Animations for each section
function animateSectionContent(sectionId) {
    switch(sectionId) {
        case 'home':
            animateHomeSection();
            break;
        case 'portfolio1':
        case 'portfolio2':
            animatePortfolioSection();
            break;
        case 'blog':
            animateBlogSection();
            break;
        case 'about':
            animateAboutSection();
            break;
    }
}

function animateHomeSection() {
    // Animate hero title
    gsap.fromTo('.hero-title',
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out"
        }
    );

    // Animate hero description
    gsap.fromTo('.hero-description',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out"
        }
    );

    // Animate hero subtitle
    gsap.fromTo('.hero-subtitle',
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power2.out"
        }
    );

    // Animate hero image
    gsap.fromTo('.hero-image',
        {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        }
    );

    // Animate background title
    gsap.fromTo('.bg-title',
        {
            opacity: 0,
            scale: 1.1
        },
        {
            opacity: 0.35,
            scale: 1,
            duration: 1.2,
            delay: 0.1,
            ease: "power2.out"
        }
    );
}

function animatePortfolioSection() {
    // Animate sub navigation
    gsap.fromTo('.sub-nav',
        {
            opacity: 0,
            y: -20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out"
        }
    );

    // Animate portfolio cards with stagger
    gsap.fromTo('.portfolio-card',
        {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4,
            stagger: 0.2,
            ease: "power2.out"
        }
    );
}

function animateBlogSection() {
    // Animate content box
    gsap.fromTo('.content-box',
        {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        }
    );
}

function animateAboutSection() {
    // Animate content box
    gsap.fromTo('.content-box',
        {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        }
    );

    // Animate contact items with stagger
    gsap.fromTo('.contact-item',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }
    );
}

// Initialize scroll animations
function initializeAnimations() {
    // Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Portfolio interactions
function initializePortfolioInteractions() {
    // Sub navigation buttons
    subNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active state from all buttons in the same sub-nav
            this.parentElement.querySelectorAll('.sub-nav-btn').forEach(b => {
                b.classList.remove('active');
            });

            // Add active state to clicked button
            this.classList.add('active');

            // Navigate to appropriate portfolio section
            if (this.textContent.includes('系统性的作品集')) {
                navigateToSection('portfolio1');
            } else if (this.textContent.includes('日常的小练习')) {
                navigateToSection('portfolio2');
            }
        });
    });

    // Portfolio card hover effects
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('click', function() {
            // Add pulse animation on click
            gsap.to(this, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
}

// Download button functionality
function initializeDownloadButton() {
    downloadBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    // Simulate download (replace with actual download logic)
                    showNotification('简历与作品集下载即将开始...');
                }
            });
        });
    });
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'var(--nav-hover-bg)',
        color: 'var(--text-primary)',
        padding: '16px 24px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--shadow-medium)',
        zIndex: '10000',
        fontSize: '14px',
        fontFamily: 'var(--font-family-chinese)',
        opacity: '0',
        transform: 'translateY(20px)'
    });

    document.body.appendChild(notification);

    // Animate in
    gsap.to(notification, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
    });

    // Remove after delay
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Navigation hover effects
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });

    link.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    });
});

// Smooth scroll behavior for better UX
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

// Home variants functionality
function initializeHomeVariants() {
    // Start automatic rotation after 800ms (matching Figma timing)
    homeVariantTimer = setTimeout(() => {
        startHomeVariantRotation();
    }, 800);

    // Logo click - return to main home
    clickableLogos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            stopHomeVariantRotation();
            showHomeVariant(1);

            // Restart rotation after returning to variant 1
            homeVariantTimer = setTimeout(() => {
                startHomeVariantRotation();
            }, 800);
        });
    });

    // Character click - transition to next variant
    clickableCharacters.forEach(character => {
        character.addEventListener('click', function() {
            const currentVariant = this.closest('.home-variant');
            const currentVariantId = currentVariant.id;

            if (currentVariantId === 'home-variant-2') {
                // From variant 2, go to variant 3
                stopHomeVariantRotation();
                showHomeVariant(3);

                // Auto-return to home after 800ms
                setTimeout(() => {
                    showHomeVariant(1);
                    startHomeVariantRotation();
                }, 800);
            }
        });
    });
}

function startHomeVariantRotation() {
    stopHomeVariantRotation();

    homeVariantTimer = setTimeout(() => {
        showHomeVariant(2); // Show human form 1

        // Clear timer to prevent further automatic rotation
        // Now user must interact to see variant 3
    }, 800); // 0.8s timing from Figma
}

function stopHomeVariantRotation() {
    if (homeVariantTimer) {
        clearTimeout(homeVariantTimer);
        homeVariantTimer = null;
    }
}

function showHomeVariant(variantNumber) {
    // Hide all variants
    homeVariants.forEach(variant => {
        variant.classList.remove('active');
        gsap.to(variant, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    // Show selected variant with fade in
    const targetVariant = document.getElementById(`home-variant-${variantNumber}`);
    if (targetVariant) {
        targetVariant.classList.add('active');
        gsap.fromTo(targetVariant,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            }
        );

        currentHomeVariant = variantNumber;

        // Animate content for the specific variant
        if (variantNumber === 1) {
            animateHomeVariant1();
        } else if (variantNumber === 2) {
            animateHomeVariant2();
        } else if (variantNumber === 3) {
            animateHomeVariant3();
        }
    }
}

function animateHomeVariant1() {
    // Animate animated GIF variant
    gsap.fromTo('.animated-gif',
        {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        }
    );
}

function animateHomeVariant2() {
    // Animate human form 1
    gsap.fromTo('.clickable-character',
        {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out"
        }
    );
}

function animateHomeVariant3() {
    // Animate human form 2
    gsap.fromTo('#home-variant-3 .hero-image',
        {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            onComplete: () => {
                // After showing variant 3, auto-return to variant 1 after 800ms (matching Figma)
                setTimeout(() => {
                    showHomeVariant(1);
                    // Restart the automatic rotation cycle
                    setTimeout(() => {
                        startHomeVariantRotation();
                    }, 800);
                }, 800);
            }
        }
    );
}

// Portfolio detail functionality
function initializePortfolioDetail() {
    // Back button functionality
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // Add click animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    // Navigate to portfolio2 with transition
                    navigateToSection('portfolio2');
                }
            });

            // Visual feedback during transition
            gsap.to('.portfolio-detail-content', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in"
            });
        });

        // Add hover sound effect simulation
        backBtn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                x: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        backBtn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }

    // Scroll to top button
    if (scrollToTopBtn && portfolioDetailContent) {
        scrollToTopBtn.addEventListener('click', function() {
            gsap.to(portfolioDetailContent, {
                scrollTop: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Show/hide scroll to top button based on scroll position
        portfolioDetailContent.addEventListener('scroll', function() {
            if (this.scrollTop > 200) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }

    // Initialize portfolio image link interactions
    initializePortfolioImageLinks();
}

// Portfolio image link interactions - REMOVED
// Based on Figma analysis, the portfolio images in 作品2.1 should not have click interactions
function initializePortfolioImageLinks() {
    // Remove click interactions from portfolio detail images
    const portfolioImages = document.querySelectorAll('.portfolio-image-item');
    portfolioImages.forEach(imageItem => {
        imageItem.style.cursor = 'default';

        // Remove any existing click handlers
        const newImageItem = imageItem.cloneNode(true);
        imageItem.parentNode.replaceChild(newImageItem, imageItem);
    });
}

// Show portfolio link confirmation modal
function showPortfolioLinkConfirmation(cardTitle, cardIndex, portfolioSection) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('link-confirmation-modal');
    if (!modal) {
        modal = createLinkConfirmationModal();
        document.body.appendChild(modal);
    }

    // Update modal content
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const confirmBtn = modal.querySelector('.confirm-link-btn');

    modalTitle.textContent = '作品链接跳转';
    modalDescription.textContent = `即将跳转到 "${cardTitle}" 的外部链接页面，请确认是否继续？`;

    // Define external links for portfolio items
    const portfolio1Links = [
        'https://example.com/kaopeixia-mobile-5-0', // 考培侠移动端5.0
        'https://example.com/shili-personal-portfolio', // 十李个人作品集
        null // 第三个卡片跳转到详情页，不是外部链接
    ];

    const portfolio2Links = [
        'https://example.com/manfen-font-design', // 满分字体设计
        'https://example.com/zoule-app-interaction', // 奏乐App交互与动效
        'https://example.com/zhaodezhobei-animation', // 找得着北标签栏动效设计
    ];

    const links = portfolioSection === 'portfolio1' ? portfolio1Links : portfolio2Links;

    // For the third card in portfolio1, we handle navigation separately
    if (portfolioSection === 'portfolio1' && cardIndex === 2) {
        return; // This should navigate to portfolio-detail, handled separately
    }

    confirmBtn.onclick = function() {
        const targetLink = links[cardIndex] || 'https://example.com';
        window.open(targetLink, '_blank');
        closeModal();
    };

    // Show modal with animation
    gsap.fromTo(modal,
        {
            opacity: 0,
            scale: 0.9
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        }
    );

    modal.style.display = 'flex';
}

// Show link confirmation modal (for other uses)
function showLinkConfirmationModal(workTitle, imageIndex) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('link-confirmation-modal');
    if (!modal) {
        modal = createLinkConfirmationModal();
        document.body.appendChild(modal);
    }

    // Update modal content
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const confirmBtn = modal.querySelector('.confirm-link-btn');

    modalTitle.textContent = '跳转确认';
    modalDescription.textContent = `即将跳转到 "${workTitle}" 的外部链接页面，请确认是否继续？`;

    // Update confirm button with specific link based on image
    const externalLinks = [
        'https://example.com/qixi', // 七夕
        'https://example.com/siliuji', // 四六级
        'https://example.com/ielts', // 雅思
        'https://example.com/frame54', // Frame 54
        'https://example.com/zuopin', // 长图作品
        'https://example.com/tokyo', // 东京残奥会
        'https://example.com/ji', // 季羡林110周年
        'https://example.com/ji2' // 季羡林110周年2
    ];

    confirmBtn.onclick = function() {
        window.open(externalLinks[imageIndex] || 'https://example.com', '_blank');
        closeModal();
    };

    // Show modal with animation
    gsap.fromTo(modal,
        {
            opacity: 0,
            scale: 0.9
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        }
    );

    modal.style.display = 'flex';
}

// Create link confirmation modal
function createLinkConfirmationModal() {
    const modal = document.createElement('div');
    modal.id = 'link-confirmation-modal';
    modal.className = 'link-modal-overlay';

    modal.innerHTML = `
        <div class="link-modal">
            <div class="modal-header">
                <h3 class="modal-title">跳转确认</h3>
                <button class="modal-close-btn" onclick="closeModal()">✕</button>
            </div>
            <div class="modal-content">
                <p class="modal-description">即将跳转到外部链接页面，请确认是否继续？</p>
                <div class="modal-actions">
                    <button class="cancel-link-btn" onclick="closeModal()">取消</button>
                    <button class="confirm-link-btn">确认跳转</button>
                </div>
            </div>
        </div>
    `;

    // Close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    return modal;
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('link-confirmation-modal');
    if (modal) {
        gsap.to(modal, {
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    }
}

// Enhanced portfolio card interactions for detail navigation
function initializePortfolioDetailInteractions() {
    // Initialize portfolio card interactions
    const allPortfolioCards = document.querySelectorAll('.portfolio-card');

    allPortfolioCards.forEach((card, index) => {
        // All portfolio cards should have click interactions for external links
        card.style.cursor = 'pointer';

        // Remove existing handlers and add new ones
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);

        const updatedCard = document.querySelectorAll('.portfolio-card')[index];

        updatedCard.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const cardTitle = this.querySelector('.card-title').textContent;
            const cardIndex = Array.from(this.parentNode.children).indexOf(this);

            // Special case: third card in portfolio1 should navigate to portfolio-detail
            if (this.closest('#portfolio1') && cardIndex === 2) {
                navigateToSection('portfolio-detail');
            } else {
                // Other cards should show external link confirmation
                showPortfolioLinkConfirmation(cardTitle, cardIndex, this.closest('#portfolio1') ? 'portfolio1' : 'portfolio2');
            }
        });
    });

    // Initialize external link handlers for other elements
    initializeExternalLinks();
}

// Initialize external links for blog, contact, etc.
function initializeExternalLinks() {
    // Blog external link
    const blogLink = document.querySelector('.blog-link');
    if (blogLink) {
        blogLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLinkConfirmationModal('语雀博客', 'blog');
        });
    }

    // Contact links
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.querySelector('.contact-icon').alt;
            showLinkConfirmationModal(contactType, 'contact');
        });
    });

    // Social media links
    const socialLinks = [
        { selector: '.contact-item:nth-child(3)', url: 'https://twitter.com', name: 'Twitter' },
        { selector: '.contact-item:nth-child(4)', url: 'https://figma.com/@lgy', name: 'Figma' }
    ];

    socialLinks.forEach(link => {
        const element = document.querySelector(link.selector);
        if (element) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                window.open(link.url, '_blank');
            });
        }
    });
}

// Performance optimization: Throttle scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }

    scrollTimer = setTimeout(() => {
        // Add scroll-based animations here if needed
    }, 16); // ~60fps
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    showNotification('页面出现了一个小问题，请刷新重试');
});

// Console Easter egg
console.log('%c🎨 Sergio Portfolio', 'font-size: 20px; color: #ff6262; font-weight: bold;');
console.log('%c欢迎来到三秋十李的个人作品集！', 'font-size: 14px; color: #66c7f2;');
console.log('%cDesigned with passion and built with modern web technologies.', 'font-size: 12px; color: #ffffff;');