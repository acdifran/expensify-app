import React from "react";
import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";

export default () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/dashboard" activeClassName="is-active" exact={true}>
      Home
    </NavLink>
    <NavLink to="/create" activeClassName="is-active" exact={true}>
      Create Expense
    </NavLink>
    <NavLink to="/help" activeClassName="is-active" exact={true}>
      Help
    </NavLink>
    <button onClick={startLogout()}>Logout</button>
  </header>
);
