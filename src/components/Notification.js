export const showNotification = (message, type = 'info', duration = 3000) => {
    const container = document.getElementById('notification-container');
    if (!container) {
        console.error('Notification container #notification-container not found!');
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = '';
    if (type === 'success') icon = '✔'; 
    else if (type === 'error') icon = '✖';
    else if (type === 'info') icon = 'ℹ';

    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">✕</button>
    `;

    container.appendChild(notification);

    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });

    // Auto-hide
    if (duration > 0) {
        setTimeout(() => {
            hideNotification(notification);
        }, duration);
    }
};

const hideNotification = (notificationElement) => {
    notificationElement.classList.add('fade-out');
    notificationElement.addEventListener('animationend', () => {
        notificationElement.remove();
    }, { once: true });
};