
export const Modal = ({ title, content, onClose, onSubmit = null, showSubmit = false, submitText = 'OK' }) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content card';

    modalContent.innerHTML = `
        <div class="modal-header">
            <h3>${title}</h3>
            <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
            ${typeof content === 'string' ? content : ''}
        </div>
        <div class="modal-footer">
            ${showSubmit ? `<button class="btn btn-primary modal-submit-btn">${submitText}</button>` : ''}
            <button class="btn btn-secondary modal-cancel-btn">Tutup</button>
        </div>
    `;

    // Jika konten adalah elemen DOM, tambahkan ke modal-body
    const modalBody = modalContent.querySelector('.modal-body');
    if (typeof content !== 'string') {
        modalBody.appendChild(content);
    }

    const closeButton = modalContent.querySelector('.modal-close-btn');
    const cancelButton = modalContent.querySelector('.modal-cancel-btn');
    const submitButton = modalContent.querySelector('.modal-submit-btn');

    const closeModal = () => {
        modalOverlay.classList.remove('open');
        modalOverlay.addEventListener('transitionend', () => {
            modalOverlay.remove();
        }, { once: true });
        if (onClose) onClose();
    };

    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    if (showSubmit && submitButton) {
        submitButton.addEventListener('click', () => {
            if (onSubmit) onSubmit();
            closeModal(); // Tutup modal setelah submit
        });
    }

    document.body.appendChild(modalOverlay);
    // Trigger transition after adding to DOM
    requestAnimationFrame(() => {
        modalOverlay.classList.add('open');
    });

    return modalOverlay;
};

