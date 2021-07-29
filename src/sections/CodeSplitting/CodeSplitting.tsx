import React from 'react';
import TabsPanel from '../../components/TabPanel';
import Code from '../../components/Code';
import { codeString } from './constants';

const CodeSplitting: React.FC = () => (
  <TabsPanel>
    <Code codeString={codeString} />
  </TabsPanel>
);

export default CodeSplitting;
