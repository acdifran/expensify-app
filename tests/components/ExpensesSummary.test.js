import React from "react";
import { ExpensesSummary } from "../../src/components/ExpensesSummary";
import expenses from "../fixtures/expenses";
import { shallow } from "enzyme";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ExpensesSummary expenses={[]} />);
});

test("should render properly for no expenses", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render properly for one expense", () => {
  wrapper.setProps({ expenses: [expenses[0]] });
  expect(wrapper).toMatchSnapshot();
});

test("should render properly for multiple expenses", () => {
  wrapper.setProps({ expenses });
  expect(wrapper).toMatchSnapshot();
});
