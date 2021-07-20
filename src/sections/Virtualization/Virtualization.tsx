import React from 'react';
import TabsPanel from '../../components/TabPanel';
import Code from '../../components/Code';
import Description from '../../components/Description';
import { codeString, description } from './constants';
import InteractiveInstance from './InteractiveInstance';
import Implementation from '../../components/ImplementationWrapper';

const Virtualization: React.FC = () => (
  <TabsPanel>
    <Code codeString={codeString} >
      <Implementation component={InteractiveInstance} />
    </Code>
    <Description description={description} />
  </TabsPanel>
);

export default Virtualization;
