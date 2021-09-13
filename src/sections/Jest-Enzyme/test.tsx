import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Example from '../ReduxToolkit/Example';
import { store } from '../ReduxToolkit/store';


const setup = (store: Store) => {
  return mount(
    <Provider store={store}>
      <Example />
  </Provider>,
  );
};

describe('Redux component', () => {
  const wrapper = setup(store);

  it('renders with initial redux state', () => {
    expect(wrapper).toBeDefined();
  });
});
