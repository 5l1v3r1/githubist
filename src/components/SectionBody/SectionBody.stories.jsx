// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';

import SectionBody from './SectionBody';

storiesOf('SectionBody', module)
  .addDecorator(backgrounds([{ name: 'dark', value: '#2d2e33', default: true }]))
  .add('default', () => (
    <div style={{ backgroundColor: '#fff' }}>
      <SectionBody>
        <div>Section body</div>
      </SectionBody>
    </div>
  ));
