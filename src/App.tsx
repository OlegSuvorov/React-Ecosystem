import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline
} from "@material-ui/core";
import Main from './components/Main';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </BrowserRouter>
  );
};


export default App;
