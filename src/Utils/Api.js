// @flow

// const PATH = 'https://databraid.localtunnel.me';
const PATH = 'http://localhost:4000/';

/* eslint func-names: ["error", "never"] */
function fetchRequest(path) {
  return fetch(path);
}

export default class SLACK_API {

  static async fetchRequestChannels() {
    const response = await fetchRequest(`${PATH}channels`);
    const channels = await response.json();
    return channels;
  };

  static async fetchRequestMessagesForChannel() {
    const response = await fetchRequest(`${PATH}messages`);
    const messages = await response.json();
    return messages;
  }

}
