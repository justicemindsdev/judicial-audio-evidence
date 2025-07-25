// Link Tracking System - Monitors user engagement and generates analytics
class LinkTrackingSystem {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = [];
        this.currentPage = window.location.pathname;
        this.init();
    }

    init() {
        this.trackPageView();
        this.setupEventListeners();
        this.trackUserBehavior();
        this.startSessionTracking();
    }

    generateSessionId() {
        return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    trackPageView() {
        const event = {
            type: 'page_view',
            timestamp: Date.now(),
            page: this.currentPage,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    setupEventListeners() {
        // Track toggle expansions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.violation-header')) {
                const errorId = e.target.closest('.violation-toggle')?.dataset.error;
                this.trackToggleExpansion(errorId);
            }
        });

        // Track audio plays
        document.addEventListener('play', (e) => {
            if (e.target.tagName === 'AUDIO') {
                this.trackAudioPlay(e.target.id);
            }
        }, true);

        // Track audio completion
        document.addEventListener('ended', (e) => {
            if (e.target.tagName === 'AUDIO') {
                this.trackAudioCompletion(e.target.id);
            }
        }, true);

        // Track citation views
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('citation-popup-btn')) {
                const citationId = e.target.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                this.trackCitationView(citationId);
            }
        });

        // Track scroll depth
        this.setupScrollTracking();

        // Track time on sections
        this.setupSectionTimeTracking();
    }

    trackToggleExpansion(errorId) {
        const event = {
            type: 'toggle_expansion',
            timestamp: Date.now(),
            errorId: errorId,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    trackAudioPlay(audioId) {
        const event = {
            type: 'audio_play',
            timestamp: Date.now(),
            audioId: audioId,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);

        // Track play duration
        const audio = document.getElementById(audioId);
        if (audio) {
            const startTime = Date.now();
            const playTracker = () => {
                if (!audio.paused) {
                    setTimeout(playTracker, 1000);
                } else {
                    const duration = Date.now() - startTime;
                    this.trackAudioDuration(audioId, duration);
                }
            };
            playTracker();
        }
    }

    trackAudioCompletion(audioId) {
        const event = {
            type: 'audio_completion',
            timestamp: Date.now(),
            audioId: audioId,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    trackAudioDuration(audioId, duration) {
        const event = {
            type: 'audio_duration',
            timestamp: Date.now(),
            audioId: audioId,
            duration: duration,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    trackCitationView(citationId) {
        const event = {
            type: 'citation_view',
            timestamp: Date.now(),
            citationId: citationId,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    setupScrollTracking() {
        let maxScroll = 0;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.trackScrollDepth(maxScroll);
                }, 500);
            }
        });
    }

    trackScrollDepth(percentage) {
        const event = {
            type: 'scroll_depth',
            timestamp: Date.now(),
            percentage: percentage,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    setupSectionTimeTracking() {
        const sections = document.querySelectorAll('.violation-content');
        const sectionTimes = new Map();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                
                if (entry.isIntersecting) {
                    sectionTimes.set(sectionId, Date.now());
                } else if (sectionTimes.has(sectionId)) {
                    const timeSpent = Date.now() - sectionTimes.get(sectionId);
                    this.trackSectionTime(sectionId, timeSpent);
                    sectionTimes.delete(sectionId);
                }
            });
        }, {
            threshold: 0.5
        });

        sections.forEach(section => observer.observe(section));
    }

    trackSectionTime(sectionId, timeSpent) {
        const event = {
            type: 'section_time',
            timestamp: Date.now(),
            sectionId: sectionId,
            timeSpent: timeSpent,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    trackUserBehavior() {
        // Track mouse movement patterns (privacy-friendly)
        let mouseMovements = 0;
        document.addEventListener('mousemove', () => {
            mouseMovements++;
        });

        // Track clicks
        let totalClicks = 0;
        document.addEventListener('click', () => {
            totalClicks++;
        });

        // Track keyboard usage
        let keyPresses = 0;
        document.addEventListener('keydown', () => {
            keyPresses++;
        });

        // Report engagement metrics every 30 seconds
        setInterval(() => {
            const event = {
                type: 'engagement_metrics',
                timestamp: Date.now(),
                mouseMovements: mouseMovements,
                clicks: totalClicks,
                keyPresses: keyPresses,
                sessionId: this.sessionId
            };
            
            this.recordEvent(event);
            
            // Reset counters
            mouseMovements = 0;
            totalClicks = 0;
            keyPresses = 0;
        }, 30000);
    }

    startSessionTracking() {
        // Track session duration
        setInterval(() => {
            const sessionDuration = Date.now() - this.startTime;
            this.trackSessionDuration(sessionDuration);
        }, 60000); // Every minute

        // Track when user leaves
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - this.startTime;
            this.trackSessionEnd(sessionDuration);
        });

        // Track visibility changes
        document.addEventListener('visibilitychange', () => {
            const event = {
                type: 'visibility_change',
                timestamp: Date.now(),
                hidden: document.hidden,
                sessionId: this.sessionId
            };
            
            this.recordEvent(event);
        });
    }

    trackSessionDuration(duration) {
        const event = {
            type: 'session_duration',
            timestamp: Date.now(),
            duration: duration,
            sessionId: this.sessionId
        };
        
        this.recordEvent(event);
    }

    trackSessionEnd(duration) {
        const event = {
            type: 'session_end',
            timestamp: Date.now(),
            totalDuration: duration,
            sessionId: this.sessionId,
            totalEvents: this.events.length
        };
        
        this.recordEvent(event);
        this.sendAnalytics();
    }

    recordEvent(event) {
        this.events.push(event);
        
        // Send events in batches to prevent overwhelming the server
        if (this.events.length >= 10) {
            this.sendAnalytics();
        }
    }

    sendAnalytics() {
        if (this.events.length === 0) return;

        // In a real implementation, this would send to your analytics server
        // For now, we'll store in localStorage for demo purposes
        const existingData = JSON.parse(localStorage.getItem('justice-minds-analytics') || '[]');
        existingData.push(...this.events);
        
        // Keep only last 1000 events to prevent storage overflow
        const recentEvents = existingData.slice(-1000);
        localStorage.setItem('justice-minds-analytics', JSON.stringify(recentEvents));
        
        // Clear sent events
        this.events = [];
        
        // In production, you would send to your server:
        // fetch('/analytics/track', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(this.events)
        // });
    }

    // Public API for manual tracking
    trackCustomEvent(eventType, data = {}) {
        const event = {
            type: eventType,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            ...data
        };
        
        this.recordEvent(event);
    }

    // Generate shareable link with tracking
    generateTrackingLink(purpose, recipient) {
        const linkId = this.generateLinkId();
        const trackingData = {
            id: linkId,
            purpose: purpose,
            recipient: recipient,
            created: Date.now(),
            createdBy: this.sessionId
        };
        
        // Store link data
        const existingLinks = JSON.parse(localStorage.getItem('justice-minds-links') || '{}');
        existingLinks[linkId] = trackingData;
        localStorage.setItem('justice-minds-links', JSON.stringify(existingLinks));
        
        // Return clean URL
        const baseUrl = window.location.origin + window.location.pathname;
        return `${baseUrl}?ref=${linkId}`;
    }

    generateLinkId() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Check if current visit is from a tracked link
    checkTrackingLink() {
        const urlParams = new URLSearchParams(window.location.search);
        const refId = urlParams.get('ref');
        
        if (refId) {
            const existingLinks = JSON.parse(localStorage.getItem('justice-minds-links') || '{}');
            if (existingLinks[refId]) {
                this.trackCustomEvent('link_visit', {
                    linkId: refId,
                    linkData: existingLinks[refId]
                });
                
                // Update link statistics
                existingLinks[refId].visits = (existingLinks[refId].visits || 0) + 1;
                existingLinks[refId].lastVisit = Date.now();
                localStorage.setItem('justice-minds-links', JSON.stringify(existingLinks));
            }
        }
    }

    // Get analytics summary for dashboard
    getAnalyticsSummary() {
        const events = JSON.parse(localStorage.getItem('justice-minds-analytics') || '[]');
        const links = JSON.parse(localStorage.getItem('justice-minds-links') || '{}');
        
        const summary = {
            totalViews: events.filter(e => e.type === 'page_view').length,
            audioPlays: events.filter(e => e.type === 'audio_play').length,
            toggleExpansions: events.filter(e => e.type === 'toggle_expansion').length,
            citationViews: events.filter(e => e.type === 'citation_view').length,
            averageSessionDuration: this.calculateAverageSessionDuration(events),
            totalLinks: Object.keys(links).length,
            linkVisits: Object.values(links).reduce((sum, link) => sum + (link.visits || 0), 0)
        };
        
        return summary;
    }

    calculateAverageSessionDuration(events) {
        const sessionEvents = events.filter(e => e.type === 'session_end');
        if (sessionEvents.length === 0) return 0;
        
        const totalDuration = sessionEvents.reduce((sum, event) => sum + event.totalDuration, 0);
        return Math.round(totalDuration / sessionEvents.length / 1000 / 60 * 10) / 10; // minutes, 1 decimal
    }
}

// Initialize tracking system
window.addEventListener('load', () => {
    window.linkTracker = new LinkTrackingSystem();
    window.linkTracker.checkTrackingLink();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LinkTrackingSystem;
}