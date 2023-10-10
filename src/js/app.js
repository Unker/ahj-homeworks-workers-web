import '../components/News/NewsUI.css';
import '../css/placeholderNews.css'
import NewsUI from '../components/News/NewsUI';
import NewsPollingService from '../components/News/NewsPollingService';
import PlaceholderNews from './placeholderNews';


const newsContainer = document.querySelector('.container');
const pollingService = new NewsPollingService(process.env.SERVER_URL
  || 'https://unker-ahj-homeworks-workers-server.onrender.com');

const newsUI = new NewsUI(newsContainer, 'Новости мира кино', pollingService);
const placeholderNews = new PlaceholderNews(newsUI.containerNews);
