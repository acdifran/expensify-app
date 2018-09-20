import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,
  editExpense,
  removeExpense
} from "../../src/actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../src/firebase/firebase";
import moment from "moment";

const createMockStore = configureMockStore([thunk]);

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
  const result = addExpense(expenses[0]);
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const { id, ...expenseData } = expenses[0];

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      const databaseExpense = {
        ...expenseData,
        createdAt: expenseData.createdAt.valueOf()
      };
      expect(snapshot.val()).toEqual(databaseExpense);
      done();
    });
});

test("should add expense to database and store with defaults", done => {
  const store = createMockStore({});
  const expenseData = {};
  const defaultData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: moment()
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      const databaseExpense = {
        ...defaultData,
        createdAt: defaultData.createdAt.valueOf()
      };
      expect(snapshot.val()).toEqual(databaseExpense);
      done();
    });
});
