import React from "react";
import numeral from "numeral";
import selectExpenses from "../selectors/selectExpenses";
import expensesTotal from "../selectors/expensesTotal";
import { connect } from "react-redux";

export const ExpensesSummary = props => {
  const expenseWord = props.expenses.length === 1 ? "expense" : "expenses";
  const totalExpenseValue = numeral(expensesTotal(props.expenses) / 100).format(
    "$0,0.00"
  );
  return (
    <div>
      {props.expenses.length > 0 && (
        <h3>
          Showing {props.expenses.length} {expenseWord} for {totalExpenseValue}
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpensesSummary);
