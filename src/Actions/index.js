// @flow
import { WIDGET_ID } from '../Constants/index';
import type { MessageType, Id, Dispatch, GetState, SlackApi } from '../FlowTypes/';
// TODO: Needs to be an environmental variable
// const PATH = 'http://localhost:8001/';

/* eslint func-names: ["error", "never"] */
// TODO: remove after testing with the Slack API
// function fetchRequest(path) {
//   return fetch(path).then(response => response.json());
// }

export function connectWithSlack() {
  return {
    type: 'CONNECTED_WITH_SLACK',
  };
}

export function fetchChannels() {
  return async (dispatch: Dispatch, getState: GetState, { SLACK_API }: SlackApi) => {
    // TODO: remove after testing with the Slack API
    // const response = await fetchRequest(`${PATH}channels`);
    const channels = await SLACK_API.fetchRequestChannels();
    dispatch({
      channels,
      type: 'RECEIVED_CHANNEL_LIST',
    });
  };
}

export function fetchMessagesForChannel(channel: string) {
  return async (dispatch: Dispatch, getState: GetState, { SLACK_API }: SlackApi) => {
    const oldMessages = getState().widgets.byId[WIDGET_ID].channelData[channel];
    const messages = await SLACK_API.fetchRequestMessagesForChannel();
    if (oldMessages) {
      // TODO: remove this after confirming that the current code works with the Slack API
      // const messages = await fetchRequest(`${PATH}messages/${channel}`);
      return;
    }
    dispatch({
      channel,
      messages,
      type: 'RECEIVED_MESSAGES_FOR_CHANNEL',
    });
  };
}

export function processNewMessages(newMessageData: { [string]: ?{ [Id]: { [Id]: MessageType } } }) {
  return {
    messages: newMessageData,
    type: 'RECEIVED_NEW_MESSAGES',
  };
}

export function processNewScores(scoreData: { [string]: number }) {
  return {
    scoreData,
    type: 'RECEIVED_NEW_SCORE',
  };
}

export function selectChannel(channel: string) {
  return {
    channel,
    type: 'SELECT_CHANNEL',
  };
}
