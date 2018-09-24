import moment from 'moment';
import database from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = moment()
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    const expenseWithMillisTime = {
      ...expense,
      createdAt: createdAt.valueOf()
    };
    return database
      .ref(`users/${uid}/expenses`)
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
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = id => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(id));
      });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const updatesWithMillisTime = {
      ...updates,
      ...(!!updates.createdAt && { createdAt: updates.createdAt.valueOf() })
    };
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update({ ...updatesWithMillisTime })
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then(snapshot => {
        const expenses = [];
        snapshot.forEach(expense => {
          expenses.push({
            id: expense.key,
            ...expense.val(),
            createdAt: moment(expense.val().createdAt)
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
