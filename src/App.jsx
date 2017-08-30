// @flow

/* eslint-disable */

/* eslint-disable import/no-named-as-default */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginView from './Components/LoginView';
import MessageList from './Components/MessageList';
import injectWidgetId from './Utils/utils';
import Toolbar from './Components/Toolbar';
import type { DefaultProps, OwnProps, State } from './FlowTypes/';
import { WIDGET_ID } from './Constants/';
import './App.css';
import { WIDGET_ID } from './Constants/';

const PropTypes = require('prop-types');


class App extends Component<DefaultProps, OwnProps, State> {
  state: State;

  getChildContext() {
    return { widgetId: this.props.widgetId };
  }

  props: {
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
  channelData: { '#redux': {} },
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

export default connect(mapStateToProps)(App);
