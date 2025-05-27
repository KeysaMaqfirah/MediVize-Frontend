

export const Footer = () => {
    const footerElement = document.createElement('footer');
    footerElement.className = 'app-footer';

    footerElement.innerHTML = `
        <div class="container">
            <nav class="footer-nav">
                <ul>
                    <li><a href="/about" data-path="/about">Tentang Kami</a></li>
                    <li><a href="/guide" data-path="/guide">Panduan</a></li>
                    <li><a href="/history" data-path="/history">Riwayat</a></li>
                    <li><a href="/search" data-path="/search">Pencarian</a></li>
                </ul>
            </nav>
        </div>
        <div class="footer-copy">
            <p>&copy; 2025 MediVize </p>
        </div>
    `;

    return footerElement;
};
