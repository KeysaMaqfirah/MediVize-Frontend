
export const UsageGuidePage = () => {
    const pageContent = document.createElement('div');
    pageContent.className = 'guide-page container';

    pageContent.innerHTML = `
        <h2>Panduan Penggunaan Obat</h2>

        <div class="guide-section">
            <h3>1. Cara Konsumsi Obat</h3>
            <div class="guide-step">
                <span class="step-number">1</span>
                <div class="step-content">
                    <h4>Baca Label dengan Seksama</h4>
                    <p>Selalu baca dan pahami petunjuk penggunaan yang tertera pada kemasan atau resep.</p>
                </div>
                <img src="/assets/images/guide-read-label.jpg" alt="Baca Label" class="guide-image">
            </div>
            <div class="guide-step">
                <span class="step-number">2</span>
                <div class="step-content">
                    <h4>Ikuti Dosis yang Direkomendasikan</h4>
                    <p>Gunakan dosis yang tepat sesuai anjuran dokter atau petunjuk pada kemasan. Jangan melebihi dosis.</p>
                </div>
                 <img src="/assets/images/guide-dosage.jpg" alt="Dosis" class="guide-image">
            </div>
             <div class="guide-step">
                <span class="step-number">3</span>
                <div class="step-content">
                    <h4>Perhatikan Waktu Minum</h4>
                    <p>Beberapa obat perlu diminum saat makan, sebelum makan, atau sesudah makan. Patuhi instruksi ini.</p>
                </div>
                 <img src="/assets/images/guide-time.jpg" alt="Waktu Minum" class="guide-image">
            </div>
        </div>

        <div class="guide-section">
            <h3>2. Cara Penyimpanan Obat</h3>
            <div class="guide-step">
                <span class="step-number">1</span>
                <div class="step-content">
                    <h4>Simpan di Tempat yang Tepat</h4>
                    <p>Umumnya, simpan obat di tempat sejuk, kering, dan jauh dari cahaya langsung atau kelembaban ekstrem.</p>
                </div>
                <img src="/assets/images/guide-storage.jpg" alt="Penyimpanan" class="guide-image">
            </div>
            <div class="guide-step">
                <span class="step-number">2</span>
                <div class="step-content">
                    <h4>Jauhkan dari Anak-anak</h4>
                    <p>Pastikan obat tidak dapat dijangkau oleh anak-anak untuk mencegah keracunan yang tidak disengaja.</p>
                </div>
                <img src="/assets/images/guide-children.jpg" alt="Anak-anak" class="guide-image">
            </div>
            <div class="guide-step">
                <span class="step-number">3</span>
                <div class="step-content">
                    <h4>Perhatikan Tanggal Kadaluarsa</h4>
                    <p>Jangan gunakan obat yang sudah melewati tanggal kadaluarsa.</p>
                </div>
                <img src="/assets/images/guide-expired.jpg" alt="Kadaluarsa" class="guide-image">
            </div>
        </div>

        <div class="guide-section">
            <h3>3. Jika Dosis Terlewat</h3>
            <div class="guide-step">
                <span class="step-number">1</span>
                <div class="step-content">
                    <h4>Minum Segera</h4>
                    <p>Jika Anda ingat dan belum terlalu jauh dari jadwal, minum dosis yang terlewat sesegera mungkin.</p>
                </div>
            </div>
            <div class="guide-step">
                <span class="step-number">2</span>
                <div class="step-content">
                    <h4>Jangan Gandakan Dosis</h4>
                    <p>Jika sudah mendekati jadwal dosis berikutnya, lewati dosis yang terlewat dan lanjutkan jadwal biasa. Jangan minum dua dosis sekaligus.</p>
                </div>
            </div>
             <div class="guide-step">
                <span class="step-number">3</span>
                <div class="step-content">
                    <h4>Konsultasi Dokter/Apoteker</h4>
                    <p>Jika Anda tidak yakin atau sering lupa, konsultasikan dengan dokter atau apoteker Anda.</p>
                </div>
            </div>
        </div>

        <p style="text-align: center; margin-top: 40px; color: var(--light-text-color);">
            <em>Informasi ini hanya sebagai panduan umum. Selalu konsultasikan dengan profesional kesehatan Anda untuk saran medis pribadi.</em>
        </p>
    `;

    return pageContent;
};