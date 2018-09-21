import expensesReducer from "../../src/reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment";
import { stat } from "fs";

test("should setup default expenses state", () => {
  const action = { type: "@@INIT" };
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expenses if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "123456789",
    description: "car",
    note: "",
    amount: 1000,
    createdAt: moment()
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should edit expense by id", () => {
  const updates = {
    note: "changed payment",
    amount: 100
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    expenses[0],
    { ...expenses[1], ...updates },
    expenses[2]
  ]);
});

test("should not edit expenses if id not found", () => {
  const updates = {
    note: "changed payment",
    amount: 100
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const startingExpenses = [
    {
      ...expenses[0],
      description: "starting expense 1"
    },
    {
      ...expenses[1],
      description: "starting expense 2"
    }
  ];
  const action = {
    type: "SET_EXPENSES",
    expenses
  };
  const state = expensesReducer(startingExpenses, action);
  expect(state).toEqual(expenses);
});
