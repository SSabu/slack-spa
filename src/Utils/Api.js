// @flow

// TODO: Get to work with .env file
const PATH = 'http://localhost:8001';
// const PATH = process.env.SLACK_API_URL;

/* eslint func-names: ["error", "never"] */
function fetchRequest(path) {
  return fetch(path).then(response => response.json()).catch(err => err);
}

export default class SLACK_API {
  static async fetchRequestChannels() {
    const channels = await fetchRequest(`${PATH}/channels`);
    return channels;
  }

  static async fetchRequestMessagesForChannel(channel) {
    const messages = await fetchRequest(`${PATH}/messages/${channel}`);
    return messages;
  }
}
