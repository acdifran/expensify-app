import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/selectExpenses";
import moment from "moment";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(
  addExpense({
    description: "Rent Bill",
    amount: 1000,
    createdAt: moment(1536609867985)
  })
);
store.dispatch(
  addExpense({
    description: "Water Bill",
    amount: 100,
    createdAt: moment(10000000000000)
  })
);
store.dispatch(
  addExpense({ description: "Gas Bill", amount: 100, createdAt: moment(2000) })
);

const { expenses, filters } = store.getState();
console.log(getVisibleExpenses(expenses, filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
