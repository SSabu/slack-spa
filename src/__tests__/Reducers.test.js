import { Reducer } from 'redux-testkit';
import { storeReducer } from '../Reducers/index';
import { processNewScores, processNewMessages } from '../Actions/index';

const initialState = {
  isShowingScores: false,
  isConnectedWithSlack: false,
  channelData: {},
  scoreData: {},
  selectedChannel: null,
};

describe('storeReducer', () => {
  it('should not do anything when action is unknown', () => {
    expect(storeReducer({ foo: 'bar' }, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ foo: 'bar' });
  });

  it('should have initial state', () => {
    expect(storeReducer(initialState, {})).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(storeReducer).withState(initialState).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
  });

  it('should store boolean for slack connection', () => {
    const action = { type: 'CONNECTED_WITH_SLACK' };
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, isConnectedWithSlack: true });
  });

  it('should store selected channel', () => {
    const existingState = { ...initialState, selectedChannel: 1 };
    const action = { type: 'SELECT_CHANNEL', channel: 2 };
    Reducer(storeReducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, selectedChannel: 2 });
  });

  it('should store boolean indicating score presence', () => {
    const action = { type: 'SHOW_SCORE' };
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, isShowingScores: true });
  });

  it('should store score for recent messages', () => {
    const action = processNewScores({ Ch1: 0.2 });
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, isShowingScores: true, scoreData: { Ch1: 0.2 } });
  });

  it('should store new message', () => {
    const newMessageData = {
      1: {
        1: 'This is a message',
      },
      2: {
        2: 'Here is another new message',
      },
    };
    const action = processNewMessages(newMessageData);
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, channelData: newMessageData });
  });
});
