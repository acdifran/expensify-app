import expensesTotal from '../../src/selectors/expensesTotal';
import expenses, { expensesTotalValue } from '../fixtures/expenses';

test('should return 0 if there are no expenses', () => {
  expect(expensesTotal([])).toBe(0);
});

test('should correctly add a single expense', () => {
  expect(expensesTotal([expenses[1]])).toBe(expenses[1].amount);
});

test('should correctly add up multiple expenses', () => {
  expect(expensesTotal(expenses)).toBe(expensesTotalValue);
});
