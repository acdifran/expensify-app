import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = newExpense => {
    const { startEditExpense, history, expense } = this.props;
    startEditExpense(expense.id, newExpense);
    history.push('/');
  };

  onRemove = () => {
    const { startRemoveExpense, history, expense } = this.props;
    startRemoveExpense(expense.id);
    history.push('/');
  };

  render() {
    const { expense } = this.props;
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={expense} onSubmit={this.onSubmit} />
          <button
            className="button button--secondary"
            type="button"
            onClick={this.onRemove}
          >
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
