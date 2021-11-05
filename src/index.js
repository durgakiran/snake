import './css/common.css';
import navigate from './scripts/navigation';

export default function navigateToGame() {
    navigate('game.html');
}

const playButton = document.getElementById('play');

playButton.addEventListener('click', navigateToGame);

window.onunload = () => {
    playButton.removeEventListener('click', navigateToGame);
};
