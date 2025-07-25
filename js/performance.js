// Performance Optimization Module
class PerformanceOptimizer {
    constructor() {
        this.observers = new Map();
        this.loadedSections = new Set();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupOptimizations());
        } else {
            this.setupOptimizations();
        }
    }

    setupOptimizations() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupCriticalResourceHints();
        this.setupPerformanceMetrics();
        this.optimizeScrolling();
    }

    setupLazyLoading() {
        // Lazy load non-critical sections
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loadedSections.has(entry.target)) {
                    this.loadSection(entry.target);
                    this.loadedSections.add(entry.target);
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe sections that can be lazy loaded
        document.querySelectorAll('.segment-card, .tab-content:not(.active)').forEach(section => {
            if (!section.classList.contains('critical')) {
                lazyObserver.observe(section);
            }
        });

        this.observers.set('lazy', lazyObserver);
    }

    loadSection(section) {
        // Add loading animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Simulate loading (replace with actual content loading logic)
        requestAnimationFrame(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });

        // Load any images in this section
        this.loadImagesInSection(section);
    }

    setupImageOptimization() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px'
        });

        // Observe images with data-src (lazy loading)
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        this.observers.set('images', imageObserver);
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        const image = new Image();
        image.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        image.onerror = () => {
            img.classList.add('error');
        };
        image.src = src;
    }

    loadImagesInSection(section) {
        const images = section.querySelectorAll('img[data-src]');
        images.forEach(img => this.loadImage(img));
    }

    setupCriticalResourceHints() {
        // Preload critical resources
        const criticalResources = [
            'https://www.gov.uk/assets/govuk-frontend/govuk-frontend-5.4.1.min.css',
            'https://www.gov.uk/assets/govuk-frontend/govuk-frontend-5.4.1.min.js'
        ];

        criticalResources.forEach(resource => {
            if (!document.querySelector(`link[href="${resource}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 'script';
                document.head.appendChild(link);
            }
        });

        // DNS prefetch for external domains
        const externalDomains = [
            'tvecnfdqakrevzaeifpk.supabase.co'
        ];

        externalDomains.forEach(domain => {
            if (!document.querySelector(`link[rel="dns-prefetch"][href*="${domain}"]`)) {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = `//${domain}`;
                document.head.appendChild(link);
            }
        });
    }

    setupPerformanceMetrics() {
        // Measure and report performance metrics
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const metrics = this.collectMetrics();
                    this.reportMetrics(metrics);
                }, 1000);
            });
        }
    }

    collectMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
            totalLoadTime: navigation.loadEventEnd - navigation.navigationStart
        };
    }

    reportMetrics(metrics) {
        // Log metrics for debugging
        console.group('Performance Metrics');
        console.log('DOM Content Loaded:', Math.round(metrics.domContentLoaded), 'ms');
        console.log('Load Complete:', Math.round(metrics.loadComplete), 'ms');
        console.log('First Paint:', Math.round(metrics.firstPaint), 'ms');
        console.log('First Contentful Paint:', Math.round(metrics.firstContentfulPaint), 'ms');
        console.log('Total Load Time:', Math.round(metrics.totalLoadTime), 'ms');
        console.groupEnd();

        // You could send these to an analytics service
        // this.sendToAnalytics(metrics);
    }

    optimizeScrolling() {
        let ticking = false;

        const updateScrollPosition = () => {
            // Optimize scroll-based animations
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Update any scroll-dependent elements
            document.querySelectorAll('[data-scroll-effect]').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                const elementVisible = (elementTop < scrollTop + windowHeight) && (elementTop + rect.height > scrollTop);

                if (elementVisible && !element.classList.contains('in-view')) {
                    element.classList.add('in-view');
                }
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Public API
    preloadSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section && !this.loadedSections.has(section)) {
            this.loadSection(section);
            this.loadedSections.add(section);
        }
    }

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }

    getPerformanceScore() {
        const metrics = this.collectMetrics();
        
        // Simple scoring algorithm
        let score = 100;
        if (metrics.firstContentfulPaint > 2000) score -= 20;
        if (metrics.totalLoadTime > 5000) score -= 30;
        if (metrics.domContentLoaded > 1000) score -= 10;
        
        return Math.max(0, score);
    }
}

// Initialize Performance Optimizer
window.performanceOptimizer = new PerformanceOptimizer();