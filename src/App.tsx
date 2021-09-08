import React from 'react';
import { store } from './sections/ReduxToolkit/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  CssBaseline
} from "@material-ui/core";
import Main from './components/Main';
import CustomThemeProvider from "./sections/Context/Example";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomThemeProvider>
          <CssBaseline />
          <Main />
        </CustomThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};


export default App;
