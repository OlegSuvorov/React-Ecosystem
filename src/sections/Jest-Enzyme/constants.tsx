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

configure({ adapter: new Adapter() });

 // ------ В файле package.json прописываем скрипты test и coverage (если нужно) ------
 // При запуске скрипта test или coverage Jest будет искать и запускать файлы:
 // 1) Файлы с .js суффиксом в __tests__ папках.
 // 2) Файлы с .test.js суффиксом.
 // 3) Файлы с .spec.js суффиксом.
 
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "coverage": "npm test -- --coverage",
    "eject": "react-scripts eject"
  },
  
 // ------ Пример файла example.test.tsx ------
  
import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { ListItem } from '@material-ui/core';
import Example from '../ReduxToolkit/Example';
import { store } from '../ReduxToolkit/store';
import { reduxTools } from './Example';

const setup = (store: Store) => {
  return mount(
    <Provider store={store}>
      <Example />
  </Provider>,
  );
};

describe('Example component', () => {
  const wrapper = setup(store);

  it('renders with initial redux state', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders tools list with expected length', () => {
    const expectedResult = store.getState().tools?.length;
    const listItems = wrapper.find(ListItem);
    expect(listItems.length).toBe(expectedResult);
  });

  it('should not render addButton if max list length reached', () => {
    const initialAddButton = wrapper.find('[data-test="add-btn"]');
    reduxTools.forEach(() => initialAddButton.first().simulate('click'))
    const currentAddButton = wrapper.find('[data-test="add-btn"]');
    expect(currentAddButton.length).toBe(0);
  });

  it('should not render removeButton if list length === 0', () => {
    const initialRemoveButton = wrapper.find('[data-test="remove-btn"]');
    reduxTools.forEach(() => initialRemoveButton.first().simulate('click'))
    const currentRemoveButton = wrapper.find('[data-test="remove-btn"]');
    expect(currentRemoveButton.length).toBe(0);
  });

  it('adds tool after addButton click', () => {
    const expectedResult = store.getState().tools?.length + 1;
    const button = wrapper.find('[data-test="add-btn"]');
    button.first().simulate('click');
    const listItems = wrapper.find(ListItem);
    expect(listItems.length).toBe(expectedResult);
  });

  it('removes tool after removeButton click', () => {
    const expectedResult = store.getState().tools?.length;
    const addButton = wrapper.find('[data-test="add-btn"]');
    addButton.first().simulate('click');
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    removeButton.first().simulate('click');
    const listItems = wrapper.find(ListItem);
    expect(listItems.length).toBe(expectedResult);
  });
});


`;

export const testMessage = [
  'PASS  src/sections/Jest-Enzyme/Example.test.tsx (9.452s)',
  'Example component',
  ' √ renders with initial redux state (4ms)',
  ' √ renders tools list with expected length (42ms)',
  ' √ should not render add button if max list length reached (147ms)',
  ' √ should not render remove button if list length === 0 (73ms)',
  ' √ adds tool after add button click (56ms)',
  ' √ removes tool after remove button click (53ms)',
  'Test Suites: 1 passed, 1 total',
  'Tests:       6 passed, 6 total',
  'Snapshots:   0 total',
  'Time:        10.962s',
  'Ran all test suites related to changed files.',
  'Watch Usage',
  ' › Press a to run all tests.',
  ' › Press f to run only failed tests.',
  ' › Press q to quit watch mode.',
  ' › Press p to filter by a filename regex pattern.',
  ' › Press t to filter by a test name regex pattern.',
  ' › Press Enter to trigger a test run.'
];
