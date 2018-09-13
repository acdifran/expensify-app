import {
  addExpense,
  editExpense,
  removeExpense
} from "../../src/actions/expenses";

import moment from "moment";

test("should set up remove expense action object", () => {
  const result = removeExpense("123abc");
  expect(result).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should set up edit expense action object", () => {
  const result = editExpense("123abc", {
    description: "new description",
    amount: 100
  });
  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "new description",
      amount: 100
    }
  });
});

test("should set up add expense action object with provided values", () => {
  const newExpense = {
    description: "new description",
    amount: 100,
    note: "new note",
    createdAt: moment()
  };
  const result = addExpense(newExpense);
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...newExpense,
      id: expect.any(String)
    }
  });
});

test("should set up add expense action object with default values", () => {
  const result = addExpense();
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: moment()
    }
  });
});
