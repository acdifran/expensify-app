import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export default () => (
  <header>
    <h1>Expensify</h1>
    <button onClick={startLogin()}>Login</button>
  </header>
);

// const mapDispatchToProps = dispatch => ({
//   startLogin: () => dispatch(startLogin())
// });

// export default connect(
//   undefined,
//   mapDispatchToProps
// )(LoginPage);
