// @flow

import React from 'react';
import { Image, List } from 'semantic-ui-react';
import type { MessageType } from '../FlowTypes/';

// NOTE: props passed to Message need to be updated (see MessageList.js)
export default function Message({ avatarImage, name, text, timestamp }: MessageType) {
  return (
    <List.Item className="listItem">
      <Image avatar src={avatarImage} />
      <List.Content>
        <List.Header>
          {`${name}, ${timestamp}`}
          <List.Description>
            {text}
          </List.Description>
        </List.Header>
      </List.Content>
    </List.Item>
  );
}
