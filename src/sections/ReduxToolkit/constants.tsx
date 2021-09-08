export const codeString =
` // Redux — библиотека для JavaScript с открытым исходным кодом, предназначенная для управления состоянием 
 // приложения.
 // Чаще всего используется в связке с React для разработки клиентской части. Содержит ряд инструментов, 
 // позволяющих значительно упростить передачу данных хранилища через контекст.
 //
 // Redux Toolkit - это пакет, облегчающий работу с Redux. Он был разработан для решения трех главных проблем:
 // - Слишком сложная настройка хранилища (store)
 // - Для того, чтобы заставить Redux делать что-то полезное, приходится использовать дополнительные пакеты
 // - Слишком много шаблонного кода (boilerplate)
 // 
 // Redux Toolkit предоставляет инструменты для настройки хранилища и выполнения наиболее распространенных 
 // операций, а также содержит полезные утилиты, позволяющие упростить код.
 
 // ------ Создаем slice ------
 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: string[] = [];

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) =>
      state.filter(tool => action.payload !== tool),
  },
})

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
