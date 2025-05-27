import './styles/main.css'; 



import { initRouter } from './utils/router';
import { showNotification } from './components/Notification';
import { Header } from './components/Header';
import { Footer } from './pages/Footer';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    if (!appContainer) {
        console.error('App container #app not found!');
        return;
    }

   
    appContainer.prepend(Header());

    
    initRouter(appContainer);

  
    document.body.appendChild(Footer());

 
});


window.showAppNotification = showNotification;
