// Service Worker for Caching and Performance
const CACHE_NAME = 'legal-dashboard-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index-optimized.html',
    '/css/critical.css',
    '/css/components.css',
    '/css/audio.css',
    '/js/audio-manager.js',
    '/js/ui-components.js',
    '/js/performance.js',
    '/js/content-loader.js',
    '/favicon.ico'
];

// Audio files for dynamic caching
const AUDIO_PATTERNS = [
    /.*\.mp3$/,
    /.*\.wav$/,
    /.*\.m4a$/
];

// External resources to cache
const EXTERNAL_RESOURCES = [
    'https://www.gov.uk/assets/govuk-frontend/govuk-frontend-5.4.1.min.css',
    'https://www.gov.uk/assets/govuk-frontend/govuk-frontend-5.4.1.min.js'
];

// Install event - Cache static resources
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static files
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            }),
            // Cache external resources
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Service Worker: Caching external resources');
                return cache.addAll(EXTERNAL_RESOURCES);
            })
        ]).then(() => {
            console.log('Service Worker: Installation complete');
            self.skipWaiting();
        }).catch(error => {
            console.error('Service Worker: Installation failed', error);
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch event - Serve cached content with network fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests
    if (isStaticAsset(request.url)) {
        event.respondWith(handleStaticAsset(request));
    } else if (isAudioFile(request.url)) {
        event.respondWith(handleAudioFile(request));
    } else if (isExternalResource(request.url)) {
        event.respondWith(handleExternalResource(request));
    } else {
        event.respondWith(handleDynamicContent(request));
    }
});

// Check if request is for static asset
function isStaticAsset(url) {
    return STATIC_FILES.some(file => url.includes(file)) || 
           url.includes('.css') || 
           url.includes('.js') || 
           url.includes('.ico');
}

// Check if request is for audio file
function isAudioFile(url) {
    return AUDIO_PATTERNS.some(pattern => pattern.test(url));
}

// Check if request is for external resource
function isExternalResource(url) {
    return EXTERNAL_RESOURCES.some(resource => url.includes(resource.split('/').pop()));
}

// Handle static assets (cache first)
async function handleStaticAsset(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving static asset from cache', request.url);
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
        
        console.log('Service Worker: Caching static asset', request.url);
        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Failed to fetch static asset', request.url, error);
        return new Response('Offline - Asset unavailable', { status: 503 });
    }
}

// Handle audio files (cache with expiration)
async function handleAudioFile(request) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('Service Worker: Serving audio file from cache', request.url);
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        // Only cache successful responses
        if (networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
            console.log('Service Worker: Caching audio file', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Failed to fetch audio file', request.url, error);
        return new Response('Offline - Audio unavailable', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// Handle external resources (network first with cache fallback)
async function handleExternalResource(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.status === 200) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
            console.log('Service Worker: Updated external resource cache', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Service Worker: Network failed, trying cache for external resource', request.url);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        console.error('Service Worker: External resource unavailable', request.url, error);
        return new Response('Offline - Resource unavailable', { status: 503 });
    }
}

// Handle dynamic content (network first)
async function handleDynamicContent(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful HTML responses
        if (networkResponse.status === 200 && 
            request.headers.get('accept')?.includes('text/html')) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving dynamic content from cache', request.url);
            return cachedResponse;
        }
        
        console.error('Service Worker: Dynamic content unavailable', request.url, error);
        return new Response('Offline - Page unavailable', { 
            status: 503,
            headers: { 'Content-Type': 'text/html' }
        });
    }
}

// Background sync for failed audio uploads (if needed)
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync-audio') {
        event.waitUntil(syncAudioData());
    }
});

async function syncAudioData() {
    // Implement background sync logic if needed
    console.log('Service Worker: Background sync triggered');
}

// Push notifications (if needed for updates)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            actions: data.actions || []
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Clean up old caches periodically
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CLEANUP_CACHE') {
        event.waitUntil(cleanupOldCaches());
    }
});

async function cleanupOldCaches() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        // Remove cached items older than 24 hours
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const now = Date.now();
        
        for (const request of requests) {
            const response = await cache.match(request);
            const dateHeader = response.headers.get('date');
            
            if (dateHeader) {
                const cacheTime = new Date(dateHeader).getTime();
                if (now - cacheTime > maxAge) {
                    await cache.delete(request);
                    console.log('Service Worker: Removed old cache entry', request.url);
                }
            }
        }
    } catch (error) {
        console.error('Service Worker: Cache cleanup failed', error);
    }
}