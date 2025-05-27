
import { HomePage } from '../pages/Home';
import { ClassificationResultPage } from '../pages/ClassificationResult';
import { DrugInfoPage } from '../pages/DrugInfo';
import { SearchHistoryPage } from '../pages/SearchHistory';
import { SearchPage } from '../pages/SearchPage';
import { UsageGuidePage } from '../pages/UsageGuide';
import { AboutAndFAQPage } from '../pages/AboutAndFAQ';
import { NotFoundPage } from '../pages/NotFound';
import { footerElement } from '../pages/Footer';

const routes = {
    '/': HomePage,
    '/classify': ClassificationResultPage,
    '/drug/:id': DrugInfoPage,
    '/history': SearchHistoryPage,
    '/search': SearchPage,
    '/guide': UsageGuidePage,
    '/about': AboutAndFAQPage,
    
};

let appRootElement;

export const navigateTo = (path) => {
    window.history.pushState(null, null, path);
    renderPage(path);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const renderPage = (path) => {
    
    const existingMainContent = appRootElement.querySelector('main');
    if (existingMainContent) {
        existingMainContent.remove();
    }

    const pathSegments = path.split('/').filter(Boolean); 
    let ComponentToRender = NotFoundPage; 
    let params = {};
    let foundMatch = false;

    for (const routePath in routes) {
        const routeSegments = routePath.split('/').filter(Boolean);

        if (routeSegments.length === pathSegments.length) {
            let currentMatch = true;
            let currentParams = {};

            for (let i = 0; i < routeSegments.length; i++) {
                if (routeSegments[i].startsWith(':')) {
                    currentParams[routeSegments[i].substring(1)] = pathSegments[i];
                } else if (routeSegments[i] !== pathSegments[i]) {
                    currentMatch = false;
                    break;
                }
            }

            if (currentMatch) {
                ComponentToRender = routes[routePath];
                params = currentParams;
                foundMatch = true;
                break;
            }
        } else if (routePath === path) { 
            foundMatch = true;
            break;
        }
    }

    const newMainContent = document.createElement('main');
    newMainContent.className = 'container'; 
    newMainContent.appendChild(ComponentToRender(params));
    appRootElement.appendChild(newMainContent);
};


export const initRouter = (appRoot) => {
    appRootElement = appRoot;

    
    renderPage(window.location.pathname);

    
    window.addEventListener('popstate', () => {
        renderPage(window.location.pathname);
    });

    
    document.body.addEventListener('click', e => {
        
        const target = e.target.closest('[data-path]');
        if (target) {
            e.preventDefault();
            navigateTo(target.dataset.path);
        }
    });
};