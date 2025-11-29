// API Configuration
    const API_BASE_URL = 'https://versefordevs.vercel.app/api';

    // DOM Elements
    const verseCategory = document.getElementById('verse-category');
    const verseText = document.getElementById('verse-text');
    const verseReference = document.getElementById('verse-reference');
    const devParaphrase = document.getElementById('dev-paraphrase');
    const newVerseBtn = document.getElementById('new-verse-btn');
    const categorySelect = document.getElementById('category-select');
    const loadingSpinner = document.getElementById('loading-spinner');
    const controlsContainer = document.querySelector('.controls-container');

    // API Functions
    async function fetchFromAPI(endpoint) {
        try {
            showLoading(true);
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            showError('Failed to fetch verse. Please try again.');
            return null;
        } finally {
            showLoading(false);
        }
    }

    async function loadCategories() {
        const data = await fetchFromAPI('/categories');
        if (data && data.success) {
            // Add categories to dropdown
            data.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }
    }

    async function getRandomVerse() {
        const data = await fetchFromAPI('/verse/random');
        if (data && data.success) {
            updateVerseDisplay(data.data);
        }
    }

    async function getVerseByCategory(category) {
        if (category === 'random') {
            await getRandomVerse();
            return;
        }
        
        const data = await fetchFromAPI(`/verse/category/${category}`);
        if (data && data.success && data.data.length > 0) {
            // Pick a random verse from the category
            const randomVerse = data.data[Math.floor(Math.random() * data.data.length)];
            updateVerseDisplay(randomVerse);
        } else {
            showError('No verses found for this category.');
        }
    }

    // UI Functions
    function updateVerseDisplay(verse) {
        verseCategory.textContent = verse.category;
        verseText.textContent = `"${verse.text}"`;
        verseReference.textContent = verse.reference;
        devParaphrase.textContent = verse.paraphrase;
        
        // Add smooth transition
        verseCard.style.opacity = '0';
        setTimeout(() => {
            verseCard.style.opacity = '1';
        }, 50);
    }

    function showLoading(show) {
        loadingSpinner.style.display = show ? 'block' : 'none';
        newVerseBtn.disabled = show;
        categorySelect.disabled = show;
    }

    function showError(message) {
        // Simple error display - you could enhance this with a toast notification
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            background: #ef4444;
            color: white;
            padding: 10px;
            border-radius: 8px;
            margin: 10px 0;
            text-align: center;
        `;
        errorDiv.textContent = message;
        
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        errorDiv.className = 'error-message';
        main.insertBefore(errorDiv, controlsContainer.nextSibling);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Event Listeners
    newVerseBtn.addEventListener('click', () => {
        const selectedCategory = categorySelect.value;
        if (selectedCategory) {
            getVerseByCategory(selectedCategory);
        } else {
            getRandomVerse();
        }
    });

    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        if (selectedCategory && selectedCategory !== 'random') {
            getVerseByCategory(selectedCategory);
        }
    });

    // Initialize
    async function init() {
        await loadCategories();
        await getRandomVerse(); // Load initial random verse
        
        // Add API status indicator
        const apiStatus = document.createElement('div');
        apiStatus.className = 'api-status status-connected';
        apiStatus.textContent = '✅ Connected to VerseForDevs API';
        controlsContainer.appendChild(apiStatus);
    }

    // Start the app
    const verseCard = document.querySelector('.verse-card');
    init();

