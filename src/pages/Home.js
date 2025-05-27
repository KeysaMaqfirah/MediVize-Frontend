import { navigateTo } from '../utils/router';

export const HomePage = () => {
    const pageContent = document.createElement('div');
    pageContent.className = 'home-page'; 

    pageContent.innerHTML = `
        <section class="hero-section">
            <div class="container hero-content">
                <h1>Temukan Informasi Obat Dengan Cepat & Akurat</h1>
                <p>Cukup pindai kemasan obat atau unggah gambar, dan dapatkan detail lengkap tentang kegunaan, dosis, efek samping, dan lainnya.</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" data-path="/classify">
                        <img src="/assets/icons/camera.png" alt="Camera Icon" class="btn-icon">
                        Mulai Pindai/Upload
                    </button>
                    <button class="btn btn-secondary" data-path="/guide">
                        <img src="/assets/icons/info.png" alt="Info Icon" class="btn-icon">
                        Panduan Penggunaan
                    </button>
                </div>
            </div>
        </section>

        <section class="home-section">
            <div class="container">
                <h2>Fitur Unggulan Obat Pintar</h2>
                <div class="features-grid">
                    <div class="feature-item">
                        <span class="icon">📸</span>
                        <h3>Klasifikasi Cepat</h3>
                        <p>Identifikasi obat instan melalui kamera atau gambar dari galeri.</p>
                    </div>
                    <div class="feature-item">
                        <span class="icon">📄</span>
                        <h3>Informasi Lengkap</h3>
                        <p>Dapatkan detail obat seperti kegunaan, dosis, efek samping, dan peringatan.</p>
                    </div>
                    <div class="feature-item">
                        <span class="icon">📜</span>
                        <h3>Riwayat Pencarian</h3>
                        <p>Lihat kembali daftar obat yang pernah Anda identifikasi sebelumnya.</p>
                    </div>
                    <div class="feature-item">
                        <span class="icon">🔍</span>
                        <h3>Pencarian Teks</h3>
                        <p>Cari obat berdasarkan nama atau kategori jika pemindaian tidak berhasil.</p>
                    </div>
                </div>
            </div>
        </section>

        `;

    return pageContent;
};