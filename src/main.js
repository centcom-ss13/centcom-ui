import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import RootContainer from "./rootContainer";
import configureStore, { history } from './store'
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

const store = configureStore({});

export default class Main extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div id="app">
            <RootContainer/>
          </div>
          </ConnectedRouter>
        </Provider>
    );
  }
}