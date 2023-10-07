import '../components/Polling/Polling.css';
import Polling from '../components/Polling/Polling';

const pollingContainer = document.querySelector('.polling-container');
const polling = new Polling(process.env.SERVER_URL || 'https://unker-ahj-homeworks-rxjs-server.onrender.com', pollingContainer);
