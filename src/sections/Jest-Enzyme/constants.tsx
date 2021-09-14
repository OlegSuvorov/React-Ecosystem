export const codeString =
` // Jest — это JavaScript-тестер (test runner), то есть библиотека JavaScript для создания, 
 // запуска и структурирования тестов. Jest распространяется в виде пакета NPM, вы можете 
 // установить его в любом проекте JavaScript. Jest — один из самых популярных тестеров в 
 // наши дни, который по умолчанию используется для Create React App.
 //
 // Enzyme — это библиотека, которая сильно упрощает тестирование React-приложений, предоставляя 
 // удобные функции рендеринга компонентов. Enzyme разработан в Airbnb.
 // 
 // Enzyme позволяет рендерить компоненты в коде. Для этого есть несколько удобных функций, 
 // которые выполняют разные варианты рендеринга:
 // - полный рендеринг (как в браузере, full DOM rendering);
 // - упрощенный рендеринг (shallow rendering);
 // - статический рендеринг (static rendering).
 
 // ------ По умолчанию Jest встроен в Create React App ------
 // ------ Для настройки следует отредактировать файл setupTests.ts который автоматически создается в папке src ------
 // ------ Пример настройки Jest для корректной работы с библиотекой Enzyme ------
 
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setup enzyme configuration
configure({ adapter: new Adapter() });

export const { add, remove } = toolsSlice.actions

export const selectTools = (state: RootState) => state.tools;

export default toolsSlice.reducer;
 
 // ------ Создаем store ------

import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './toolsSlice';

export const store = configureStore({
  reducer: {
    tools: toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

 // ------ Подключаем в корневом файле App ------
 
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
 
 // ------ Если используем Typescript можно создать типизированный useDispatch и useSelector ------
 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

 // ------ Используем в компоненте ------
 
import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { selectTools, add, remove } from './toolsSlice';
 
const reduxTools = [
  'Reducer',
  'Action',
  'Store',
  'Dispatch',
  'Middleware',
];

const Example = () => {
  const classes = useStyles();
  const tools = useAppSelector(selectTools);
  const dispatch = useAppDispatch();

  const handleAddTool = () => dispatch(add(reduxTools[tools.length]));

  const handleRemoveTool = () => dispatch(remove(tools[tools.length - 1]));

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h6" className={classes.title}>
            Redux Tools
          </Typography>
          <div className={classes.demo}>
            <List>
              {tools.length > 0 &&
                tools.map(tool => (
                  <ListItem key={tool}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tool}
                    />
                  </ListItem>
                ))}
            </List>
          </div>
        </Grid>
        <Grid
          className={classes.actions}
          item
          xs={12}
          sm={12}
        >
          {tools.length < reduxTools.length &&
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={handleAddTool}
            >
              Add tool
            </Button>}
          {tools.length > 0 &&
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              onClick={handleRemoveTool}
            >
              Remove tool
            </Button>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Example;

`;
