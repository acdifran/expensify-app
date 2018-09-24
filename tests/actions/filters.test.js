import {
  setStartDate,
  setEndDate,
  sortByDate,
  sortByAmount,
  setTextFilter
} from "../../src/actions/filters";
import moment from "moment";

test("should set up set start date action object", () => {
  const result = setStartDate(moment(0));
  expect(result).toEqual({
    type: "SET_START_DATE",
    date: moment(0)
  });
});

test("should set up set end date action object", () => {
  const result = setEndDate(moment(0));
  expect(result).toEqual({
    type: "SET_END_DATE",
    date: moment(0)
  });
});

test("should set up sort by amount action object", () => {
  const result = sortByAmount();
  expect(result).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("should set up sort by date action object", () => {
  const result = sortByDate();
  expect(result).toEqual({
    type: "SORT_BY_DATE"
  });
});

test("should set up set text filter action object with provided value", () => {
  const text = "some text";
  const result = setTextFilter(text);
  expect(result).toEqual({
    type: "SET_TEXT_FILTER",
    text
  });
});

test("should set up set text filter action object with provided value", () => {
  const result = setTextFilter();
  expect(result).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});
