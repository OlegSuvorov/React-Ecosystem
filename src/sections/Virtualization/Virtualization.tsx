import React from 'react';
import TabsPanel from '../../components/TabPanel';
import Code from '../../components/Code';
import { codeString } from './constants';
import Example from './Example';
import Implementation from "../../components/ImplementationWrapper";

const Virtualization: React.FC = () => (
  <TabsPanel>
    <Code codeString={codeString} />
    <Implementation isConsoleOpen component={Example} />
  </TabsPanel>
);

export default Virtualization;
