// @flow
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../images/slack-logo.png';
// import slackConnectHref from '../Constants/';
import slack from '../images/slackIcon.png';
import { connectWithSlack } from '../Actions/index';
import type { Dispatch } from '../FlowTypes/';
import injectWidgetId from '../Utils/utils';

export function LoginView(props: Object) {
  const { connectWithSlack } = props;

  return (
    <div>
      <div className="SlackApp">
        <div className="SlackApp-header">
          <img src={logo} className="SlackApp-logo" alt="slack-logo" />
        </div>
        <div className="connectButton">
          <Button
            size="big"
            color={'teal'}
            // href={slackConnectHref}
            onClick={
              () => connectWithSlack()
            }
          >
            <Image avatar src={slack} />
            Connect with Slack
          </Button>
        </div>
      </div>
    </div>
  );
}

LoginView.defaultProps = {
  connectWithSlack: PropTypes.function,
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ connectWithSlack }, dispatch);

export default injectWidgetId(connect(null, mapDispatchToProps)(LoginView));
