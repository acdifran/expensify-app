import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../src/components/ExpensesSummary';
import expenses from '../fixtures/expenses';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ExpensesSummary expenses={[]} />);
});

test('should render properly for no expenses', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render properly for one expense', () => {
  wrapper.setProps({ expenses: [expenses[0]] });
  expect(wrapper).toMatchSnapshot();
});

test('should render properly for multiple expenses', () => {
  wrapper.setProps({ expenses });
  expect(wrapper).toMatchSnapshot();
});
