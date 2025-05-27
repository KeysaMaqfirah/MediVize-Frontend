import { showNotification } from '../components/Notification';
import { classifyImage } from '../utils/api';
import { navigateTo } from '../utils/router';
import { addHistoryItem } from './SearchHistory';

export const ClassificationResultPage = (params = {}) => {
    const pageContent = document.createElement('div');
    pageContent.className = 'classification-page';

    const drugId = params.id;
    let currentView = drugId ? 'result' : 'upload';
    let selectedFile = null;

    const renderUploadForm = () => {
        return `
            <div class="card upload-section">
                <h2>Klasifikasi Obat</h2>
                <p>Ambil foto kemasan obat atau unggah gambar dari galeri Anda.</p>
                <div class="upload-area">
                    <input type="file" id="imageUpload" accept="image/*" capture="environment" style="display: none;">
                    <button class="btn btn-primary" id="openCameraButton">
                        <img src="/assets/icons/camera.png" alt="Camera Icon" class="btn-icon">
                        Ambil Foto
                    </button>
                    <button class="btn btn-secondary" id="openUploadButton">
                        <img src="/assets/icons/upload1.png" alt="Upload Icon" class="btn-icon">
                        Unggah Gambar
                    </button>
                    <div id="imagePreview" class="image-preview"></div>
                </div>
                <button class="btn btn-primary" id="processImageButton" style="margin-top: 20px; display: none;">
                    Proses Gambar
                </button>
            </div>
        `;
    };

    const renderClassificationResult = (drugData) => {
        if (!drugData) {
            return `
                <div class="card result-section">
                    <h2>Hasil Klasifikasi</h2>
                    <p>Obat tidak ditemukan atau terjadi kesalahan.</p>
                    <button class="btn btn-primary" data-path="/classify">Coba Lagi</button>
                    <button class="btn btn-secondary" data-path="/search">Cari Manual</button>
                </div>
            `;
        }

        return `
            <div class="card result-section">
                <h2>Hasil Klasifikasi Obat</h2>
                <div class="result-details">
                    <img src="${drugData.imageUrl || '/assets/images/placeholder.png'}" alt="Kemasan Obat" class="drug-image">
                    <h3>${drugData.name}</h3>
                    <p><strong>Confidence Score:</strong> ${drugData.confidence}%</p>
                    <div class="visual-confirmation">
                        <p>Apakah ini obat yang Anda maksud?</p>
                        <button class="btn btn-primary" id="confirmYesBtn">Ya, Benar</button>
                        <button class="btn btn-secondary" id="tryAgainBtn">Bukan, Coba Lagi</button>
                    </div>
                    <button class="btn btn-primary" data-path="/drug/${drugData.id}" style="margin-top: 20px;">Lihat Detail Obat</button>
                </div>
            </div>
        `;
    };

    const loadAndRenderContent = async () => {
        pageContent.innerHTML = '';

        if (currentView === 'upload') {
            pageContent.innerHTML = renderUploadForm();
            const imageUpload = pageContent.querySelector('#imageUpload');
            const openCameraButton = pageContent.querySelector('#openCameraButton');
            const openUploadButton = pageContent.querySelector('#openUploadButton');
            const imagePreview = pageContent.querySelector('#imagePreview');
            const processImageButton = pageContent.querySelector('#processImageButton');

            openCameraButton.addEventListener('click', () => {
                openCameraView();
            });

            openUploadButton.addEventListener('click', () => {
                imageUpload.removeAttribute('capture');
                imageUpload.click();
            });

            imageUpload.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    selectedFile = file;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; height: auto; border-radius: 8px;">`;
                        processImageButton.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                } else {
                    imagePreview.innerHTML = '';
                    processImageButton.style.display = 'none';
                    selectedFile = null;
                }
            });

            processImageButton.addEventListener('click', async () => {
                if (selectedFile) {
                    showNotification('Memproses gambar...', 'info');
                    try {
                        const simulatedDrugData = await simulateClassificationAPI(selectedFile);
                        if (simulatedDrugData) {
                            showNotification('Klasifikasi berhasil!', 'success');
                            currentView = 'result';
                            loadAndRenderContent();
                        } else {
                            showNotification('Gagal mengklasifikasi obat.', 'error');
                        }
                    } catch (error) {
                        showNotification('Terjadi kesalahan saat memproses gambar.', 'error');
                    }
                } else {
                    showNotification('Mohon pilih gambar terlebih dahulu.', 'info');
                }
            });

        } else if (currentView === 'result') {
            const simulatedDrugData = await fetchSimulatedDrugData(drugId);
            pageContent.innerHTML = renderClassificationResult(simulatedDrugData);

            // 🔥 Tambahkan listener untuk tombol konfirmasi
            const yesBtn = pageContent.querySelector('#confirmYesBtn');
            const tryAgainBtn = pageContent.querySelector('#tryAgainBtn');

            yesBtn?.addEventListener('click', () => {
                showNotification('Obat dikonfirmasi.', 'success');
                navigateTo(`/drug/${simulatedDrugData.id}`);
            });

            tryAgainBtn?.addEventListener('click', () => {
                currentView = 'upload';
                loadAndRenderContent();
            });
        }
    };

    const simulateClassificationAPI = (file) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const success = Math.random() > 0.3;
                if (success) {
                    resolve({
                        id: 'drug-123',
                        name: 'Paracetamol 500mg',
                        confidence: 92,
                        imageUrl: URL.createObjectURL(file)
                    });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    };

    const fetchSimulatedDrugData = async (id) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            id: 'drug-123',
            name: 'Paracetamol 500mg',
            confidence: 92,
            imageUrl: '/assets/images/paracetamol.jpg',
            genericName: 'Paracetamol',
            usage: 'Meredakan demam dan nyeri ringan.',
            dosage: 'Dewasa: 1-2 tablet setiap 4-6 jam.',
            sideEffects: 'Reaksi alergi, kerusakan hati.',
            warnings: 'Jangan melebihi dosis.',
            howToUse: 'Dapat diminum sebelum/sesudah makan.'
        };
    };

    const openCameraView = () => {
        const cameraOverlay = document.createElement('div');
        cameraOverlay.style.position = 'fixed';
        cameraOverlay.style.top = '0';
        cameraOverlay.style.left = '0';
        cameraOverlay.style.width = '100vw';
        cameraOverlay.style.height = '100vh';
        cameraOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
        cameraOverlay.style.display = 'flex';
        cameraOverlay.style.flexDirection = 'column';
        cameraOverlay.style.alignItems = 'center';
        cameraOverlay.style.justifyContent = 'center';
        cameraOverlay.style.zIndex = '10000';

        const video = document.createElement('video');
        video.autoplay = true;
        video.style.maxWidth = '80vw';
        video.style.maxHeight = '80vh';
        video.style.borderRadius = '10px';
        cameraOverlay.appendChild(video);

        const captureButton = document.createElement('button');
        captureButton.textContent = 'Ambil Foto';
        captureButton.className = 'btn btn-primary';
        captureButton.style.marginTop = '20px';
        cameraOverlay.appendChild(captureButton);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Tutup Kamera';
        closeButton.className = 'btn btn-secondary';
        closeButton.style.marginTop = '10px';
        cameraOverlay.appendChild(closeButton);

        document.body.appendChild(cameraOverlay);

        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;

                captureButton.addEventListener('click', () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/png');

                    canvas.toBlob((blob) => {
                        const file = new File([blob], 'captured-image.png', { type: 'image/png' });
                        selectedFile = file;

                        const imagePreview = pageContent.querySelector('#imagePreview');
                        const processImageButton = pageContent.querySelector('#processImageButton');
                        imagePreview.innerHTML = `<img src="${dataUrl}" alt="Preview" style="max-width: 100%; height: auto; border-radius: 8px;">`;
                        processImageButton.style.display = 'block';
                    });

                    stream.getTracks().forEach(track => track.stop());
                    document.body.removeChild(cameraOverlay);
                });

                closeButton.addEventListener('click', () => {
                    stream.getTracks().forEach(track => track.stop());
                    document.body.removeChild(cameraOverlay);
                });
            })
            .catch((err) => {
                showNotification('Tidak dapat mengakses kamera: ' + err.message, 'error');
                document.body.removeChild(cameraOverlay);
            });
    };

    loadAndRenderContent();

    return pageContent;
};
