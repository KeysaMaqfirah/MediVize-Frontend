import { navigateTo } from '../utils/router';

export const Header = () => {
    const headerElement = document.createElement('header');
    headerElement.className = 'header';
    headerElement.innerHTML = `
        <div class="container header-content">
            <a href="/" class="logo">
                <img src="/assets/images/medicine1.png" alt="medivize">
                MediVize
            </a>
            <nav>
                <ul class="nav-menu">
                    <li><a href="/" data-path="/">Beranda</a></li>
                    <li><a href="/classify" data-path="/classify">Klasifikasi</a></li>
                    <li><a href="/history" data-path="/history">Riwayat</a></li>
                    <li><a href="/search" data-path="/search">Cari Obat</a></li>
                    <li><a href="/guide" data-path="/guide">Panduan</a></li>
                    <li><a href="/about" data-path="/about">Tentang & FAQ</a></li>
                </ul>
            </nav>
            <div class="hamburger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    const navMenu = headerElement.querySelector('.nav-menu');
    const hamburger = headerElement.querySelector('.hamburger-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    headerElement.addEventListener('click', (e) => {
        if (e.target.matches('[data-path]')) {
            e.preventDefault();
            navigateTo(e.target.dataset.path);
            navMenu.classList.remove('open'); 
            updateActiveLink(e.target.dataset.path);
        }
    });

    const updateActiveLink = (currentPath) => {
        headerElement.querySelectorAll('.nav-menu a').forEach(link => {
            if (link.dataset.path === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    
    window.addEventListener('popstate', () => updateActiveLink(window.location.pathname));
    updateActiveLink(window.location.pathname);

    return headerElement;
};