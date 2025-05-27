

import { showNotification } from '../components/Notification';

// Dummy data untuk simulasi API
const dummyDrugs = [
    {
        id: 'drug-123',
        name: 'Paracetamol 500mg',
        genericName: 'Paracetamol',
        category: 'Analgesik, Antipiretik',
        description: 'Meredakan demam dan nyeri ringan.',
        imageUrl: '/assets/images/paracetamol.jpg',
        usage: 'Meredakan demam dan nyeri ringan hingga sedang, sakit kepala, sakit gigi, nyeri otot dan sendi, serta mengurangi demam akibat flu dan pilek.',
        dosage: 'Dewasa: 1-2 tablet (500-1000 mg) setiap 4-6 jam, maksimal 4000 mg dalam 24 jam. Anak-anak: dosis disesuaikan dengan berat badan dan usia, konsultasi dengan dokter atau apoteker.',
        sideEffects: 'Reaksi alergi (ruam kulit, gatal), trombositopenia, leukopenia, agranulositosis, kerusakan hati (terutama pada dosis tinggi atau penggunaan jangka panjang).',
        warnings: 'Jangan melebihi dosis yang dianjurkan. Hati-hati penggunaan pada penderita gangguan fungsi hati dan ginjal. Konsultasikan dengan dokter jika gejala tidak mereda atau memburuk.',
        howToUse: 'Dapat diminum sebelum atau sesudah makan. Telan utuh dengan air. Untuk sediaan sirup, gunakan sendok takar yang tersedia.',
        storage: 'Simpan pada suhu ruangan (20-25°C), jauhkan dari cahaya langsung dan kelembaban. Jauhkan dari jangkauan anak-anak.',
        missedDose: 'Jika Anda lupa dosis, minum sesegera mungkin. Namun, jika sudah mendekati waktu dosis berikutnya, lewati dosis yang terlewat dan lanjutkan jadwal dosis reguler Anda. Jangan menggandakan dosis.'
    },
    {
        id: 'drug-124',
        name: 'Amoxicillin 250mg',
        genericName: 'Amoxicillin',
        category: 'Antibiotik',
        description: 'Antibiotik untuk infeksi bakteri.',
        imageUrl: '/assets/images/amoxicillin.jpg',
        usage: 'Mengatasi berbagai infeksi bakteri seperti infeksi saluran pernapasan, infeksi telinga, tenggorokan, saluran kemih, dan kulit.',
        dosage: 'Dosis bervariasi tergantung jenis dan berat infeksi. Umumnya 250-500 mg setiap 8 jam. Harus sesuai resep dokter.',
        sideEffects: 'Mual, muntah, diare, ruam kulit. Reaksi alergi serius (anafilaksis) jarang terjadi.',
        warnings: 'Tidak untuk infeksi virus. Jangan menghentikan pengobatan sebelum waktunya meskipun gejala membaik.',
        howToUse: 'Dapat diminum sebelum atau sesudah makan. Habiskan seluruh dosis yang diresepkan.',
        storage: 'Simpan pada suhu ruangan, jauhkan dari kelembaban.',
        missedDose: 'Minum segera. Jika dekat dosis berikutnya, lewati yang terlewat.'
    },
    {
        id: 'drug-125',
        name: 'Ibuprofen 400mg',
        genericName: 'Ibuprofen',
        category: 'Antiinflamasi Non-Steroid (OAINS)',
        description: 'Meredakan nyeri dan peradangan.',
        imageUrl: '/assets/images/ibuprofen.jpg',
        usage: 'Meredakan nyeri ringan hingga sedang (sakit kepala, sakit gigi, nyeri otot), nyeri haid, dan mengurangi demam serta peradangan.',
        dosage: 'Dewasa: 200-400 mg setiap 4-6 jam sesuai kebutuhan, maksimal 1200 mg per hari. Diminum setelah makan.',
        sideEffects: 'Gangguan pencernaan (mual, muntah, nyeri perut), diare, sembelit, pusing. Penggunaan jangka panjang dapat menyebabkan ulkus lambung.',
        warnings: 'Tidak dianjurkan untuk penderita asma, tukak lambung, gangguan ginjal/hati, atau alergi aspirin.',
        howToUse: 'Diminum setelah makan untuk mengurangi risiko gangguan pencernaan.',
        storage: 'Simpan di tempat kering pada suhu ruangan.',
        missedDose: 'Minum segera. Jika dekat dosis berikutnya, lewati yang terlewat.'
    }
];

/**
 * Simulates fetching drug information by ID.
 * @param {string} id - The ID of the drug.
 * @returns {Promise<object|null>} A promise that resolves with drug data or null if not found.
 */
export const fetchDrugById = async (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const drug = dummyDrugs.find(d => d.id === id);
            resolve(drug || null);
        }, 500); // Simulate network delay
    });
};

/**
 * Simulates searching for drugs by name or category.
 * @param {string} query - The search query.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of matching drugs.
 */
export const fetchDrugsByNameOrCategory = async (query) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const lowerCaseQuery = query.toLowerCase();
            const results = dummyDrugs.filter(drug =>
                drug.name.toLowerCase().includes(lowerCaseQuery) ||
                drug.category.toLowerCase().includes(lowerCaseQuery) ||
                drug.genericName.toLowerCase().includes(lowerCaseQuery)
            );
            resolve(results);
        }, 800); // Simulate network delay
    });
};

/**
 * Simulates an image classification API call.
 * @param {File} imageFile - The image file to classify.
 * @returns {Promise<object|null>} A promise that resolves with classification result or null.
 */
export const classifyImage = async (imageFile) => {
    showNotification('Memproses gambar...', 'info', 1500);
    return new Promise(resolve => {
        setTimeout(() => {
            // Simulate success/failure and return dummy data
            const success = Math.random() > 0.2; // 80% success rate
            if (success) {
                // Pick a random dummy drug for the result
                const randomIndex = Math.floor(Math.random() * dummyDrugs.length);
                const recognizedDrug = dummyDrugs[randomIndex];

                resolve({
                    id: recognizedDrug.id,
                    name: recognizedDrug.name,
                    confidence: (Math.random() * 20 + 75).toFixed(2), // 75-95% confidence
                    imageUrl: URL.createObjectURL(imageFile) // Use the uploaded image for preview
                });
            } else {
                resolve(null); // Classification failed
            }
        }, 2500); // Simulate API processing time
    });
};

// Pastikan untuk mengimpor fungsi-fungsi ini di file yang membutuhkannya (misalnya ClassificationResult.js, DrugInfo.js, SearchPage.js)