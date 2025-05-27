

export const AboutAndFAQPage = () => {
    const pageContent = document.createElement('div');
    pageContent.className = 'about-page container';

    pageContent.innerHTML = `
        <h2>Tentang MediVize & FAQ</h2>

        <div class="about-section">
            <h3>Tentang Proyek Kami</h3>
            <p>MediVize adalah sebuah aplikasi inovatif yang dirancang untuk membantu masyarakat mendapatkan informasi akurat tentang obat-obatan hanya dengan memindai kemasan. Proyek ini dibangun dengan tujuan meningkatkan kesadaran dan pemahaman pengguna tentang obat yang mereka konsumsi, mulai dari kegunaan, dosis, efek samping, hingga cara penggunaan yang benar.</p>
            <p>Kami memanfaatkan teknologi klasifikasi gambar untuk mengenali kemasan obat dan menyajikan data yang relevan secara cepat. Namun, perlu diingat bahwa aplikasi ini adalah alat bantu dan tidak menggantikan konsultasi dengan dokter atau apoteker.</p>
            <h4>Batasan Proyek:</h4>
            <ul>
                <li>Pengenalan obat hanya melalui kemasan, tidak mencakup bentuk fisik pil/tablet.</li>
                <li>Jumlah obat yang dikenali terbatas pada sekitar 100 jenis dari dataset yang tersedia.</li>
                <li>Sistem tidak menggantikan konsultasi dokter/apoteker, hanya sebagai alat bantu.</li>
                <li>Tidak mencakup validasi keaslian obat secara kimiawi.</li>
                <li>Tidak terintegrasi dengan rekam medis elektronik atau sistem farmasi nasional.</li>
            </ul>
            <p>Kami berharap MediVize dapat menjadi sumber informasi yang bermanfaat bagi Anda.</p>
        </div>

        <div class="about-section">
            <h3>Pertanyaan Umum (FAQ)</h3>
            <div class="faq-list">
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Bagaimana cara menggunakan aplikasi Medivize?</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="faq-answer">
                        <p>Anda bisa mengambil foto kemasan obat langsung dari kamera ponsel Anda atau mengunggah gambar yang sudah ada di galeri. Setelah itu, sistem akan mencoba mengidentifikasi obat dan menampilkan informasinya.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Apakah aplikasi ini bisa mengidentifikasi pil atau tablet secara fisik?</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="faq-answer">
                        <p>Saat ini, MediVize hanya dapat mengklasifikasikan obat melalui kemasannya, bukan bentuk fisik pil atau tablet. Fokus kami adalah pada pengenalan visual kemasan.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Seberapa akurat hasil klasifikasi obat?</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="faq-answer">
                        <p>Akurasi klasifikasi bergantung pada kualitas gambar dan kejelasan kemasan. Sistem kami memberikan "confidence score" untuk menunjukkan seberapa yakin model dalam klasifikasinya. Kami terus berupaya meningkatkan akurasi model.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Apakah informasi obat di aplikasi ini dapat menggantikan saran dokter?</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="faq-answer">
                        <p><strong>Tidak.</strong> Aplikasi MediVize adalah alat bantu informasi, bukan pengganti konsultasi medis profesional. Selalu konsultasikan kondisi kesehatan dan penggunaan obat Anda dengan dokter atau apoteker.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Bagaimana jika obat yang saya cari tidak ditemukan?</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="faq-answer">
                        <p>Jika klasifikasi gagal, Anda dapat mencoba fitur pencarian berbasis teks dengan mengetikkan nama obat atau kategorinya. Jumlah obat yang dikenali saat ini terbatas pada dataset yang tersedia.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Bagaimana saya bisa menghubungi pengembang?</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="faq-answer">
                        <p>Anda dapat menghubungi kami melalui email di: <a href="mailto:support@obatpintar.com">support@obatpintar.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Logic untuk FAQ accordion
    const faqItems = pageContent.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Tutup semua item FAQ lain yang terbuka
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
            // Toggle item yang diklik
            item.classList.toggle('open');
        });
    });

    return pageContent;
};