import React from 'react';
import TabsPanel from '../../components/TabPanel';
import Code from '../../components/Code';
import { codeString } from './constants';
import Implementation from "../../components/ImplementationWrapper";
import Switcher from "./Switcher";

const Context: React.FC = () => (
  <TabsPanel>
    <Code codeString={codeString} />
    <Implementation component={Switcher} />
  </TabsPanel>
);

export default Context;
