import moment from 'moment';
import filtersReducer from '../../src/reducers/filters';

test('should setup default filter value', () => {
  const action = { type: '@@INIT' };
  const state = filtersReducer(undefined, action);
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const action = { type: 'SORT_BY_AMOUNT' };
  const state = filtersReducer(undefined, action);
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const action = { type: 'SORT_BY_DATE' };
  const initState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const state = filtersReducer(initState, action);
  expect(state.sortBy).toBe('date');
});

test('should set textFilter', () => {
  const text = 'some text';
  const action = { type: 'SET_TEXT_FILTER', text };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

test('should set startDate', () => {
  const date = moment();
  const action = { type: 'SET_START_DATE', date };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(date);
});

test('should set endDate', () => {
  const date = moment();
  const action = { type: 'SET_END_DATE', date };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(date);
});
