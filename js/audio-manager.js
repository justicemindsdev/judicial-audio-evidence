// Audio Manager - Optimized for performance and mobile
class AudioManager {
    constructor() {
        this.loadedAudio = new Set();
        this.userHasInteracted = false;
        this.audioObserver = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAudio());
        } else {
            this.setupAudio();
        }
    }

    setupAudio() {
        this.trackUserInteraction();
        this.createIntersectionObserver();
        this.observeAudioElements();
    }

    trackUserInteraction() {
        const handleInteraction = () => {
            this.userHasInteracted = true;
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('click', handleInteraction);
        };
        
        document.addEventListener('touchstart', handleInteraction, { passive: true });
        document.addEventListener('click', handleInteraction);
    }

    createIntersectionObserver() {
        this.audioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loadedAudio.has(entry.target)) {
                    this.loadAudioMetadata(entry.target);
                    this.loadedAudio.add(entry.target);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });
    }

    observeAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.preload = 'none';
            this.audioObserver.observe(audio);
        });
    }

    loadAudioMetadata(audio) {
        audio.preload = 'metadata';
        const quoteElement = audio.parentElement.querySelector('.quote-text');
        
        this.attachEventListeners(audio, quoteElement);
        audio.load();
    }

    attachEventListeners(audio, quoteElement) {
        // Metadata loaded
        audio.addEventListener('loadedmetadata', () => {
            if (audio.duration && audio.duration > 0) {
                audio.setAttribute('data-duration', Math.floor(audio.duration));
                audio.removeAttribute('data-loading');
            }
        }, { once: true });

        // Error handling
        audio.addEventListener('error', (e) => this.handleAudioError(audio, e));

        // Playback events
        audio.addEventListener('play', () => this.handleAudioPlay(audio, quoteElement));
        audio.addEventListener('pause', () => this.handleAudioPause(quoteElement));
        audio.addEventListener('ended', () => this.handleAudioEnd(quoteElement));

        // Mobile optimization
        audio.addEventListener('click', (e) => this.handleAudioClick(audio, e));
    }

    handleAudioError(audio, error) {
        console.error('Audio loading failed:', audio.src, error);
        audio.setAttribute('data-error', 'true');
        audio.title = 'Audio loading failed - tap to retry';
        
        const retryHandler = () => {
            audio.load();
            audio.removeAttribute('data-error');
            audio.title = '';
            audio.removeEventListener('click', retryHandler);
        };
        
        audio.addEventListener('click', retryHandler, { once: true });
    }

    handleAudioPlay(audio, quoteElement) {
        // Pause other playing audio
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== audio && !otherAudio.paused) {
                otherAudio.pause();
            }
        });

        if (quoteElement) {
            quoteElement.classList.add('playing');
        }

        // Load full audio on first play
        if (audio.preload !== 'auto') {
            audio.preload = 'auto';
        }
    }

    handleAudioPause(quoteElement) {
        if (quoteElement) {
            quoteElement.classList.remove('playing');
        }
    }

    handleAudioEnd(quoteElement) {
        if (quoteElement) {
            quoteElement.classList.remove('playing');
        }
    }

    handleAudioClick(audio, e) {
        if (!this.userHasInteracted) {
            e.preventDefault();
            return;
        }

        if (audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Auto-play prevented:', error);
                });
            }
        }
    }

    // Public API
    pauseAll() {
        document.querySelectorAll('audio').forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
    }

    preloadVisible() {
        document.querySelectorAll('audio').forEach(audio => {
            const rect = audio.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (!this.loadedAudio.has(audio)) {
                    this.loadAudioMetadata(audio);
                    this.loadedAudio.add(audio);
                }
            }
        });
    }
}

// Initialize when DOM is ready
window.audioManager = new AudioManager();