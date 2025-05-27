import { navigateTo } from '../utils/router';

export const NotFoundPage = () => {
    const pageContent = document.createElement('div');
    pageContent.className = 'not-found-page';
    pageContent.innerHTML = `
        <h1>404</h1>
        <h2>Halaman Tidak Ditemukan</h2>
        <p>Maaf, halaman yang Anda cari tidak ada. Mungkin Anda salah mengetik alamat atau halaman tersebut telah dihapus.</p>
        <button class="btn btn-primary" data-path="/">Kembali ke Beranda</button>
    `;

    return pageContent;
};