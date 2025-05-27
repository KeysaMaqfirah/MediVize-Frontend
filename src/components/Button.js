
/**
 * Creates a styled button element.
 * @param {object} options -
 * @param {string} options.text 
 * @param {string} [options.type='primary'] 
 * @param {string} [options.iconSrc] 
 * @param {function} [options.onClick] 
 * @param {string} [options.dataPath] 
 * @param {boolean} [options.isDisabled=false] 
 * @returns {HTMLButtonElement} 
 */
export const Button = ({ text, type = 'primary', iconSrc, onClick, dataPath, isDisabled = false }) => {
    const button = document.createElement('button');
    button.className = `btn btn-${type}`;
    button.textContent = text;
    button.disabled = isDisabled;

    if (iconSrc) {
        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.alt = `${text} Icon`;
        icon.className = 'btn-icon';
        button.prepend(icon); 
    }

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    if (dataPath) {
        button.setAttribute('data-path', dataPath);
    }

    return button;
};