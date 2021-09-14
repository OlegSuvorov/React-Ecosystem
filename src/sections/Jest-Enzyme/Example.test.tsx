import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Example from '../ReduxToolkit/Example';
import { store } from '../ReduxToolkit/store';
import {ListItem} from "@material-ui/core";

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

  it('adds tool after add button click', () => {
    const expectedResult = store.getState().tools?.length + 1;
    const button = wrapper.find('[data-test="add-btn"]');
    button.first().simulate('click');
    const listItems = wrapper.find(ListItem);
    expect(listItems.length).toBe(expectedResult);
  });

  it('removes tool after remove button click', () => {
    const expectedResult = store.getState().tools?.length;
    const addButton = wrapper.find('[data-test="add-btn"]');
    addButton.first().simulate('click');
    const removeButton = wrapper.find('[data-test="remove-btn"]');
    removeButton.first().simulate('click');
    const listItems = wrapper.find(ListItem);
    expect(listItems.length).toBe(expectedResult);
  });
});
