import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from  './containers/App';
import Auth from  './containers/Auth';
import NotFound from  './containers/NotFound';

import initStore from './redux/store';

let store = initStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Auth} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>  
  </Provider>,
  document.getElementById('root')
);