
import { navigateTo } from '../utils/router';
import { showNotification } from '../components/Notification';

// Dummy data untuk riwayat pencarian
let searchHistoryData = [
    { id: 'h1', name: 'Paracetamol 500mg', date: '2025-05-20', time: '14:30' },
    { id: 'h2', name: 'Amoxicillin 250mg', date: '2025-05-19', time: '10:15' },
    { id: 'h3', name: 'Ibuprofen 400mg', date: '2025-05-18', time: '08:00' },
];

export const SearchHistoryPage = () => {
    const pageContent = document.createElement('div');
    pageContent.className = 'history-page container';

    const renderHistory = () => {
        if (searchHistoryData.length === 0) {
            return `
                <div class="card history-empty">
                    <p>Belum ada riwayat pencarian.</p>
                    <button class="btn btn-primary" data-path="/classify" style="margin-top: 20px;">Mulai Klasifikasi</button>
                </div>
            `;
        }

        const historyListHtml = searchHistoryData.map(item => `
            <div class="history-item">
                <span class="history-item-icon">📚</span> <div class="history-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.date} ${item.time}</p>
                </div>
                <button class="btn btn-secondary" data-path="/drug/${item.id}">Detail</button>
            </div>
        `).join('');

        return `
            <h2>Riwayat Pencarian Obat</h2>
            <div class="history-list">
                ${historyListHtml}
            </div>
        `;
    };

    pageContent.innerHTML = renderHistory();

    // Event listener untuk tombol "Detail"
    pageContent.addEventListener('click', (e) => {
        if (e.target.matches('[data-path^="/drug/"]')) {
            e.preventDefault();
            navigateTo(e.target.dataset.path);
        }
    });

    return pageContent;
};

// Fungsi dummy untuk menambah riwayat (bisa dipanggil dari ClassificationResultPage)
export const addHistoryItem = (drugName, drugId) => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    searchHistoryData.unshift({ id: drugId, name: drugName, date, time }); // Tambahkan ke depan
    showNotification('Riwayat berhasil ditambahkan!', 'info');
    // Dalam aplikasi nyata, Anda akan menyimpan ini ke LocalStorage atau database
};