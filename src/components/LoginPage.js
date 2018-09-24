import React from 'react';
import { startLogin } from '../actions/auth';

export default () => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It’s time to get your expenses under control</p>
      <button className="button" type="button" onClick={startLogin()}>
        Login with Google
      </button>
    </div>
  </div>
);
