import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../src/components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />
  );
});

test("should render EditExpensePage", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should should handle form onSubmit", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test("should should handle button click", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
});
