import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    const { expense = {} } = props;
    const {
      description = '',
      note = '',
      amount = '',
      createdAt = moment().valueOf()
    } = expense;
    this.state = {
      description,
      note,
      amount: typeof amount === 'number' ? amount / 100 : '',
      createdAt: moment(createdAt),
      calendarFocused: false,
      formError: undefined
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { description, note, amount, createdAt } = this.state;
    const { onSubmit } = this.props;
    if (!description || !amount) {
      this.setState(() => ({
        formError: 'Please provide description and amount'
      }));
    } else {
      this.setState(() => ({ formError: undefined }));
      onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt,
        note
      });
    }
  };

  render() {
    const {
      calendarFocused,
      formError,
      description,
      amount,
      createdAt,
      note
    } = this.state;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {formError && <p className="form__error">{formError}</p>}
        <input
          className="text-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.onDescriptionChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={createdAt}
          onDateChange={this.onDateChange}
          focused={calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="text-area"
          placeholder="Add a note for your expense (optional)"
          value={note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button" type="submit">
            Save Expense
          </button>
        </div>
      </form>
    );
  }
}
