import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from "../../src/actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../src/firebase/firebase";
import moment from "moment";

const uid = "test_user";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = [];
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = {
      description,
      note,
      amount,
      createdAt: createdAt.valueOf()
    };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should set up remove expense action object", () => {
  const result = removeExpense("123abc");
  expect(result).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should remove expense", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });

      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
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

test("should edit expense in database and store", done => {
  const store = createMockStore(defaultAuthState);
  const { id, ...expenseData } = expenses[0];
  const updates = {
    amount: 1234,
    createdAt: moment()
  };

  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });

      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      const databaseExpense = {
        ...expenseData,
        ...updates
      };
      const expenseWithMillis = {
        ...databaseExpense,
        createdAt: databaseExpense.createdAt.valueOf()
      };
      expect(snapshot.val()).toEqual(expenseWithMillis);
      done();
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
  const store = createMockStore(defaultAuthState);
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

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
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
  const store = createMockStore(defaultAuthState);
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

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
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

test("should set up set expenses action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch expenses from database", done => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
