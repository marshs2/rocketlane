import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Server } from "miragejs"
import Model from './api/Model';
import { UserDataModel } from './api/Model';
import RoutesWrap from './Routes';

new Server({
  routes() {
    this.namespace = "/reps"
    this.get("/list", () => Model())
    this.get("/users", () => UserDataModel())
  },
})

ReactDOM.render(
  <React.StrictMode>
    <RoutesWrap />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
