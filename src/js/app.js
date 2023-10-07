import '../components/News/NewsUI.css';
import NewsUI from '../components/News/NewsUI';
import NewsPollingService from '../components/News/NewsPollingService';


const newsContainer = document.querySelector('.container');
const pollingService = new NewsPollingService(process.env.SERVER_URL
    || 'https://unker-ahj-homeworks-workers-server.onrender.com');
const newsUI = new NewsUI(newsContainer, 'Новости мира кино', pollingService);
