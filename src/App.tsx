import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  CssBaseline
} from "@material-ui/core";
import Main from './components/Main';
import CustomThemeProvider from "./sections/Context/Example";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <CssBaseline />
        <Main />
      </CustomThemeProvider>
    </BrowserRouter>
  );
};


export default App;
