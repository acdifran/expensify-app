import uuid from "uuid";
import moment from "moment";
import database from "../firebase/firebase";

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = moment()
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    const expenseWithMillisTime = {
      ...expense,
      createdAt: createdAt.valueOf()
    };
    return database
      .ref("expenses")
      .push(expenseWithMillisTime)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id
});

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
