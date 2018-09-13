import moment from "moment";

export default [
  {
    id: 1,
    description: "car",
    note: "",
    amount: 10000,
    createdAt: moment(0)
  },
  {
    id: 2,
    description: "rent",
    note: "first of the month",
    amount: 1000,
    createdAt: moment(0).subtract(4, "days")
  },
  {
    id: 3,
    description: "coffee",
    note: "",
    amount: 10,
    createdAt: moment(0).add(4, "days")
  }
];
