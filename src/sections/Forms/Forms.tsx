import React from 'react';
import TabsPanel from '../../components/TabPanel';
import Code from '../../components/Code';
import { codeString } from './constants';
import Implementation from '../../components/ImplementationWrapper';
import Example from './Example';

const Forms: React.FC = () => (
  <TabsPanel>
    <Code codeString={codeString} />
    <Implementation isConsoleOpen component={Example} />
  </TabsPanel>
);

export default Forms;
