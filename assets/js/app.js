/**
 * Application Main Script
 * Handles SPA navigation and dynamic content switching
 */

// Section metadata configuration
const SECTION_CONFIG = {
    home: {
        title: '📚 Spring Boot REST API Documentation',
        subtitle: 'Version 3.2.0 | Updated: October 2025',
        pageTitle: 'Spring Boot REST API Documentation v3.2'
    },
    services: {
        title: 'Our Services',
        subtitle: 'Professional Development Solutions',
        pageTitle: 'Services - Our Professional Services'
    },
    projects: {
        title: 'Our Projects',
        subtitle: 'Showcasing Excellence in Software Development',
        pageTitle: 'Projects - Our Portfolio'
    },
    about: {
        title: 'About Us',
        subtitle: 'Building the Future Together',
        pageTitle: 'About - Our Company Story'
    },
    pricing: {
        title: 'Pricing Plans',
        subtitle: 'Choose the Perfect Plan for Your Business',
        pageTitle: 'Pricing - Service Plans & Packages'
    },
    contact: {
        title: 'Contact Us',
        subtitle: 'We\'d Love to Hear From You',
        pageTitle: 'Contact - Get in Touch'
    }
};

/**
 * Navigation Manager Class
 * Handles all navigation-related functionality
 */
class NavigationManager {
    constructor() {
        this.currentSection = 'home';
        this.init();
    }

    /**
     * Initialize the navigation system
     */
    init() {
        // Set up event listeners
        this.setupEventListeners();

        // Handle initial page load
        this.handleInitialLoad();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.section) {
                this.showSection(event.state.section);
            } else {
                const hash = window.location.hash.substring(1);
                this.showSection(hash || 'home');
            }
        });
    }

    /**
     * Handle initial page load
     */
    handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        if (hash && SECTION_CONFIG[hash]) {
            this.showSection(hash);
        } else {
            // Set initial state
            history.replaceState({ section: 'home' }, '', '#home');
        }
    }

    /**
     * Show a specific section
     * @param {string} sectionId - The ID of the section to show
     */
    showSection(sectionId) {
        // Validate section ID
        if (!SECTION_CONFIG[sectionId]) {
            console.error(`Invalid section ID: ${sectionId}`);
            return;
        }

        // Hide all sections
        this.hideAllSections();

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Update navigation
        this.updateNavigation(sectionId);

        // Update header
        this.updateHeader(sectionId);

        // Scroll to top
        this.scrollToTop();

        // Update URL
        this.updateURL(sectionId);
    }

    /**
     * Hide all content sections
     */
    hideAllSections() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
    }

    /**
     * Update navigation active state
     * @param {string} sectionId - The active section ID
     */
    updateNavigation(sectionId) {
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Update header content
     * @param {string} sectionId - The section ID
     */
    updateHeader(sectionId) {
        const headerData = SECTION_CONFIG[sectionId];
        if (headerData) {
            const titleElement = document.getElementById('header-title');
            const subtitleElement = document.getElementById('header-subtitle');

            if (titleElement) titleElement.textContent = headerData.title;
            if (subtitleElement) subtitleElement.textContent = headerData.subtitle;

            // Update browser tab title
            document.title = headerData.pageTitle;
        }
    }

    /**
     * Scroll to top of page with smooth animation
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Update browser URL without reload
     * @param {string} sectionId - The section ID
     */
    updateURL(sectionId) {
        history.pushState(
            { section: sectionId },
            '',
            `#${sectionId}`
        );
    }
}

/**
 * Form Handler Class
 * Handles form submissions (if needed in future)
 */
class FormHandler {
    constructor() {
        this.setupFormListeners();
    }

    /**
     * Set up form event listeners
     */
    setupFormListeners() {
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmit(e);
            });
        }
    }

    /**
     * Handle contact form submission
     * @param {Event} event - The form submit event
     */
    handleContactFormSubmit(event) {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // TODO: Implement actual form submission logic
        console.log('Form submitted:', data);

        // Show success message (placeholder)
        alert('Thank you for your message! We will get back to you soon.');
        event.target.reset();
    }
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation manager
    const navigationManager = new NavigationManager();

    // Initialize form handler
    const formHandler = new FormHandler();

    // Make showSection globally accessible for inline onclick handlers
    window.showSection = (sectionId) => {
        navigationManager.showSection(sectionId);
    };

    // Log initialization
    console.log('Application initialized successfully');
});
