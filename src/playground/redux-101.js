import { createStore } from "redux";

// Action generators: functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

// const decrementCount = ({ decrementBy = 1} = {}) => ({
//     type: 'DECREMENT',
//     decrementBy
// });

// const setCount = ({ count }) => ({
//     type: 'SET',
//     count
// });

// const incrementCount = (incrementBy = 1) => ({
//     type: 'INCREMENT',
//     incrementBy
// });

const decrementCount = (decrementBy = 1) => ({
  type: "DECREMENT",
  decrementBy
});

const resetCount = () => ({
  type: "RESET"
});

const setCount = count => ({
  type: "SET",
  count
});

// Reducers
// 1. They are pure functions - output only determined by input
// 2. Never change state action directly

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };
    case "RESET":
      return {
        count: 0
      };
    case "SET":
      return {
        count: action.count
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount(5));
store.dispatch(incrementCount());
store.dispatch(decrementCount());
store.dispatch(setCount(100));
store.dispatch(resetCount());
