export const codeString =
` //  Контекст предоставляет способ делиться такими данными между компонентами без 
 //  необходимости явно передавать пропсы через каждый уровень дерева.
 //  Контекст разработан для передачи данных, которые можно назвать «глобальными» 
 //  для всего дерева React-компонентов (например, текущий аутентифицированный пользователь, 
 //  UI-тема или выбранный язык).
 
// ------ Создаем контекст ------

import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

interface IThemeContext {
  themeName: Themes;
  setThemeName: React.Dispatch<React.SetStateAction<Themes>> | null;
}

export const CustomThemeContext = React.createContext({
    themeName: Themes.dark,
    setThemeName: null,
  } as IThemeContext,
);

CustomThemeContext.displayName = 'CustomThemeContext';

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState(Themes.dark);

  const theme = createMuiTheme({
    palette: {
      type: themeName,
    }
  });

  const contextValue = {
    themeName,
    setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider;

// ------ Подключаем контекст ------

import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core";
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

// ------ Используем в приложении  ------

import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { CustomThemeContext, Themes } from './Example';

const Switcher = () => {
  const { setThemeName } = useContext(CustomThemeContext);
  const classes = useStyles();

  const handleClick = (theme: Themes) => () => {
    setThemeName?.(theme);
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<WbSunnyIcon />}
          onClick={handleClick(Themes.light)}
        >
          Light
        </Button>
        Switch to light theme
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<Brightness4Icon />}
          onClick={handleClick(Themes.dark)}
        >
          Dark
        </Button>
        Switch to dark theme
      </Grid>
    </div>
  );
};
`;
