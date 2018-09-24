import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../src/components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('formError').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'new description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value } });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'new note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', { target: { value } });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount on valid input change', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value } });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on invalid input change', () => {
  const value = '23.507';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value } });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', { preventDefault: () => {} });
  expect(wrapper.state('formError')).toBe(undefined);
  const { id, ...withoutId } = expenses[0];
  expect(onSubmitSpy).toHaveBeenLastCalledWith({ ...withoutId });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendarFocus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});
