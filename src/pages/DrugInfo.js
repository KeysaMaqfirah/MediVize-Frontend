
import { fetchDrugById } from '../utils/api'; // Menggunakan API dummy
import { showNotification } from '../components/Notification';

export const DrugInfoPage = (params) => {
    const pageContent = document.createElement('div');
    pageContent.className = 'drug-info-page container';

    const drugId = params.id;
    let drugData = null; 

    const renderDrugInfo = (drug) => {
        if (!drug) {
            return `
                <div class="card">
                    <h2>Obat Tidak Ditemukan</h2>
                    <p>Informasi obat dengan ID "${drugId}" tidak tersedia.</p>
                    <button class="btn btn-primary" data-path="/search">Cari Obat Lain</button>
                </div>
            `;
        }

        return `
            <div class="card">
                <h2>Informasi Detail Obat: ${drug.name}</h2>
                <p><strong>Nama Generik:</strong> ${drug.genericName}</p>

                <div class="info-section">
                    <h3>Kegunaan</h3>
                    <p>${drug.usage}</p>
                </div>

                <div class="info-section">
                    <h3>Dosis</h3>
                    <p>${drug.dosage}</p>
                </div>

                <div class="info-section">
                    <h3>Efek Samping</h3>
                    <p>${drug.sideEffects}</p>
                </div>

                <div class="info-section">
                    <h3>Peringatan</h3>
                    <p>${drug.warnings}</p>
                </div>

                <div class="info-section">
                    <h3>Cara Penggunaan</h3>
                    <p>${drug.howToUse}</p>
                </div>

                <div class="info-section">
                    <h3>Penyimpanan</h3>
                    <p>${drug.storage}</p>
                </div>

                <div class="info-section">
                    <h3>Jika Dosis Terlewat</h3>
                    <p>${drug.missedDose}</p>
                </div>

                <button class="btn btn-secondary" style="margin-top: 20px;" onclick="window.history.back()">Kembali</button>
            </div>
        `;
    };

    const loadDrugData = async () => {
        pageContent.innerHTML = '<div class="card" style="text-align: center; padding: 50px;">Loading informasi obat...</div>';
        try {
            drugData = await fetchDrugById(drugId);
            pageContent.innerHTML = renderDrugInfo(drugData);
        } catch (error) {
            console.error('Error fetching drug data:', error);
            showNotification('Gagal memuat informasi obat.', 'error');
            pageContent.innerHTML = renderDrugInfo(null); // Tampilkan pesan error
        }
    };

    loadDrugData(); 

    return pageContent;
};