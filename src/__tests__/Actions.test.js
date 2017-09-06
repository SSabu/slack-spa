// import { Thunk } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../Actions/index';

// import {
//   connectWithSlack,
//   processNewMessages,
//   processNewScores,
//   selectChannel,
// } from '../Actions/index';

describe('Actions', () => {
  it('should return an action object from connecting with Slack', () => {
    const action = actions.connectWithSlack();
    expect(action).toEqual({
      type: 'CONNECTED_WITH_SLACK',
    });
  });

  // TODO: fix this test
  xit('should return an action object from fetchChannels', () => {
    const channels = ['random', 'general', 'dev'];
    const mockApiFetchChannels = jest.fn();
    mockApiFetchChannels.mockReturnValue(Promise.resolve({ channels }));

    const extraArgument = {
      Api: {
        fetchChannels: mockApiFetchChannels,
      },
    };

    const initialState = {
      isShowingScores: false,
      isConnectedWithSlack: false,
      channelData: {},
      scoreData: {},
      selectedChannel: null,
    };

    const expectedActions = [
      {
        type: 'RECEIVED_CHANNEL_LIST',
        channels: ['random', 'general', 'dev', 'justforfun'],
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store.dispatch(actions.fetchChannels())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  // TODO: add test for 'RECEIVED_MESSAGES_FOR_CHANNEL' action

  it('should return an action object from processNewMessages', () => {
    const newMessageData = {
      1: {
        1: 'This is a message',
      },
      2: {
        2: 'Here is another new message',
      },
    };
    const expectedAction = {
      messages: newMessageData,
      type: 'RECEIVED_NEW_MESSAGES',
    };
    expect(actions.processNewMessages(newMessageData)).toEqual(expectedAction);
  });

  it('should return an action object from processNewScores', () => {
    const newScoreData = {
      random: 0.2,
    };
    const expectedAction = {
      scoreData: newScoreData,
      type: 'RECEIVED_NEW_SCORE',
    };
    expect(actions.processNewScores(newScoreData)).toEqual(expectedAction);
  });

  it('should return an action object from selectChannel', () => {
    const channel = 'random';
    const expectedAction = {
      channel,
      type: 'SELECT_CHANNEL',
    };
    expect(actions.selectChannel(channel)).toEqual(expectedAction);
  });
});
