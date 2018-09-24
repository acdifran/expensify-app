import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    const { setStartDate, setEndDate } = this.props;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  onTextChange = e => {
    const { setTextFilter } = this.props;
    setTextFilter(e.target.value);
  };

  onSortChange = e => {
    const { sortByAmount, sortByDate } = this.props;
    if (e.target.value === 'amount') {
      sortByAmount();
    } else if (e.target.value === 'date') {
      sortByDate();
    }
  };

  render() {
    const { filters } = this.props;
    const { calendarFocused } = this.state;
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              placeholder="Search Expenses"
              type="text"
              value={filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: date => dispatch(setStartDate(date)),
  setEndDate: date => dispatch(setEndDate(date))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
