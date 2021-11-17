import { io } from 'socket.io-client';
import Game from './game';

const socket = io('ws://localhost:3210');

let game = null;

socket.on('connect', () => {
    socket.emit('createRoom', 'Hello');
});

socket.on('createdRoom', (data) => {
    socket.emit('selectName', { gameId: data, name: 'kiran' });
});

socket.on('initialState', (data) => {
    game = new Game(data.users);
    game.draw().then(() => {
        // game.play();
    });
});

socket.on('message', () => {
    // console.log(data);
});
