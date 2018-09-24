import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpenses from "../selectors/selectExpenses";
import expensesTotal from "../selectors/expensesTotal";

export const ExpensesSummary = props => {
  const expenseWord = props.expenses.length === 1 ? "expense" : "expenses";
  const totalExpenseValue = numeral(expensesTotal(props.expenses) / 100).format(
    "$0,0.00"
  );
  return (
    <div className="page-header">
      <div className="content-container">
        {props.expenses.length > 0 && (
          <h1 className="page-header__title">
            Showing <span>{props.expenses.length}</span> {expenseWord} totalling{" "}
            <span>{totalExpenseValue}</span>
          </h1>
        )}
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);
