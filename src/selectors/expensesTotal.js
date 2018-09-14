export default expenses =>
  expenses.reduce((total, { amount }) => total + amount, 0);
