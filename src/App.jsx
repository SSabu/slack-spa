// @flow

/* eslint-disable */

/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { processNewMessages, processNewScores } from './Actions/index';

import LoginView from './Components/LoginView';
import MessageList from './Components/MessageList';
import injectWidgetId from './Utils/utils';
import Toolbar from './Components/Toolbar';
import type { DefaultProps, OwnProps, State } from './FlowTypes/';
import { WIDGET_ID } from './Constants/';
import './App.css';


class App extends Component<DefaultProps, OwnProps, State> {
  state: State;

  componentWillMount() {
    const socket = io.connect(process.env.REACT_APP_SLACK_API_URL);
    socket.on('messages', messages => {
      this.props.processNewMessages(messages);
    });

    socket.on('score', scoreData => {
      this.props.processNewScores(scoreData);
    });
  }

  componentWillUnmount() {
    socket.disconnect();
    console.dir('Disconnecting Socket as component will unmount');
  }

  getChildContext() {
    return { widgetId: this.props.widgetId };
  }

  props: {
    processNewMessages: mixed,
    processNewScores: mixed,
    isConnectedWithSlack: boolean,
    selectedChannel: mixed,
    widgetId: string,
  };

  render() {
    const { isConnectedWithSlack, selectedChannel } = this.props;

    if (!isConnectedWithSlack) {
      return <LoginView />;
    }

    return (
      <div>
        <div>
          <Toolbar />
        </div>
        <div className="listColor">
          <MessageList selectedChannel={selectedChannel} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  widgetId: PropTypes.string.isRequired,
};

App.defaultProps = {
  widgetId: WIDGET_ID,
  isShowingScores: false, // will need this later
  isConnectedWithSlack: false,
  channelData: { redux: {} },
  scoreData: { score: 0.01 },
  selectedChannel: null,
};

App.childContextTypes = {
  widgetId: PropTypes.string,
};

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const id = ownProps.widgetId;

  const currentScore = state.widgets.byId[id].scoreData[state.widgets.byId[id].selectedChannel];
  const messages = state.widgets.byId[id].channelData[state.widgets.byId[id].selectedChannel];

  const isConnectedWithSlack = state.widgets.byId[id].isConnectedWithSlack;
  const selectedChannel = state.widgets.byId[id].selectedChannel;
  const score = state.widgets.byId[id].score;
  const isShowingScores = state.widgets.byId[id].isShowingScores;

  return {
    isShowingScores,
    messages,
    score,
    selectedChannel,
    isConnectedWithSlack,
    // slackSession: state.slackSession,
    currentScore,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      processNewMessages,
      processNewScores,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps)(App);
