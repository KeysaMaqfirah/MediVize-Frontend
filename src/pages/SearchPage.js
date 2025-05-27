// src/pages/SearchPage.js
import { navigateTo } from '../utils/router';
import { showNotification } from '../components/Notification';
import { fetchDrugsByNameOrCategory } from '../utils/api'; // Menggunakan API dummy

export const SearchPage = () => {
    const pageContent = document.createElement('div');
    pageContent.className = 'search-page container';

    pageContent.innerHTML = `
        <h2>Cari Obat</h2>
        <div class="search-input-group">
            <input type="text" id="searchInput" placeholder="Cari berdasarkan nama atau kategori obat...">
            <button class="btn btn-primary" id="searchButton">
                <img src="/assets/icons/search.png" alt="Search Icon" class="btn-icon">
                Cari
            </button>
        </div>
        <div id="searchResults" class="search-results-list">
            </div>
        <div id="noResults" class="no-results" style="display: none;">
            <p>Tidak ada hasil untuk pencarian Anda.</p>
        </div>
    `;

    const searchInput = pageContent.querySelector('#searchInput');
    const searchButton = pageContent.querySelector('#searchButton');
    const searchResultsDiv = pageContent.querySelector('#searchResults');
    const noResultsDiv = pageContent.querySelector('#noResults');

    const performSearch = async () => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            showNotification('Masukkan minimal 2 karakter untuk pencarian.', 'info');
            searchResultsDiv.innerHTML = '';
            noResultsDiv.style.display = 'none';
            return;
        }

        showNotification('Mencari obat...', 'info', 1500);
        searchResultsDiv.innerHTML = '';
        noResultsDiv.style.display = 'none';

        try {
            const results = await fetchDrugsByNameOrCategory(query); // Panggil API dummy
            if (results.length > 0) {
                const resultsHtml = results.map(drug => `
                    <div class="search-result-item card">
                        <h3>${drug.name}</h3>
                        <p>${drug.description}</p>
                        <button class="btn btn-secondary" data-path="/drug/${drug.id}">Detail</button>
                    </div>
                `).join('');
                searchResultsDiv.innerHTML = resultsHtml;
            } else {
                noResultsDiv.style.display = 'block';
            }
        } catch (error) {
            console.error('Search failed:', error);
            showNotification('Terjadi kesalahan saat melakukan pencarian.', 'error');
            noResultsDiv.style.display = 'block';
            noResultsDiv.querySelector('p').textContent = 'Terjadi kesalahan saat mencari. Silakan coba lagi.';
        }
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Event listener untuk tombol "Detail" pada hasil pencarian
    pageContent.addEventListener('click', (e) => {
        if (e.target.matches('[data-path^="/drug/"]')) {
            e.preventDefault();
            navigateTo(e.target.dataset.path);
        }
    });

    return pageContent;
};