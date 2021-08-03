import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export enum Themes {
  dark = 'dark',
  light = 'light',
}

interface IThemeContext {
  setThemeName: React.Dispatch<React.SetStateAction<Themes>> | null;
}

export const CustomThemeContext = React.createContext({
    setThemeName: null,
  } as IThemeContext,
);

CustomThemeContext.displayName = 'CustomThemeContext';

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState(Themes.dark);

  const theme = createTheme({
    palette: {
      type: themeName,
    }
  });

  const contextValue = {
    setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider;
