// @flow

/* eslint-disable */
import openSocket from 'socket.io-client';
import type { Store } from 'redux';
import { processNewScores, processNewMessages } from '../Actions/index';
import store from '../store';

// TODO: Get the openSocket accept info from .env file
const socket = openSocket('https://databraid.localtunnel.me');
// const socket = openSocket(process.env.SOCKET_URL);

// TODO: needs to be refactored to remove reference to the store.
// Invoke it in the root app under componentWillMount() and use connect
// function for under the hood dispatches

export default function getSockets() {
  socket.on('messages', messages => {
    store.dispatch(processNewMessages(messages));
  });

  socket.on('score', scoreData => {
    store.dispatch(processNewScores(scoreData));
  });
}
