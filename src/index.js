import { io } from 'socket.io-client';
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

const socket = io('http://localhost:3001/');

socket.on('connect', () => {
    // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
