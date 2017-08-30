// @flow

/* eslint-disable */
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessagesForChannel } from '../Actions/index';
import Message from './Message';
import owl from '../images/avatars/owl.png';
import type { Dispatch, OwnProps, State } from '../FlowTypes/';

import injectWidgetId from '../Utils/utils';

export class MessageList extends Component {
  props: {
    selectedChannel: ?string,
    messages: {},
    fetchMessagesForChannel: Function,
  };

  render() {
    let { messages, selectedChannel, fetchMessagesForChannel } = this.props;

    if (!messages) {
      if (selectedChannel) {
        fetchMessagesForChannel(selectedChannel);
      }
      messages = {};
    }

    const messageIds = Object.keys(messages);

    // TODO: Specific user info needs to be added to Message: user_name, first_name, last_Name, avatar_img, status_emoji, etc.
    // TODO: Specific message info needs to be added to Message: text, timestamp
    // NOTE: The above TODOs will come from the store and fetched from DB routes that have not been fully built out in the API
    return (
      <List celled>
        {messageIds.map(msgId => {
          const { userMapId, message, messageTimestamp, rawTs } = messages[msgId];
          return (
            <Message
              key={rawTs}
              avatarImage={owl}
              name={userMapId}
              text={`${userMapId} says: ${message}`}
              timestamp={messageTimestamp}
            />
          );
        })}
      </List>
    );
  }
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  let id = ownProps.widgetId;
  const selectedChannel = state.widgets.byId[id].selectedChannel;
  const messages = state.widgets.byId[id].channelData[selectedChannel];
  return {
    selectedChannel,
    messages,
    // currentScore,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchMessagesForChannel }, dispatch);

export default injectWidgetId(connect(mapStateToProps, mapDispatchToProps)(MessageList));
