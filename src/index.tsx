import "file-loader?name=[name].[ext]!./index.html";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/app';
import Counter from './components/counter';
import SchedulerPage from './components/schedulerRedux/scheduler';

import AppState from './state';
import { Schedule, Todo } from './model/schedule'

import { Provider } from 'react-redux';
import { createStore } from 'redux';



import {Scheduler} from './state';

let appState = new AppState();

//mock state   //////////////////////////////////////////////////////////////////////////////////

let schedule1 = new Schedule();
schedule1.name = 'schedule1';
schedule1.todo = [{ expiration: new Date(), name: 'Todo1', priority: 12 },
{ expiration: new Date(), name: 'Todo2', priority: 88 }]


let schedule2 = new Schedule();
schedule2.name = 'schedule2';
schedule2.todo = [{ expiration: new Date(), name: 'Todo1', priority: 41 },
{ expiration: new Date(), name: 'Todo2', priority: 23 }]

let scheduler = new Scheduler();
scheduler.schedules = [schedule1, schedule2]

appState.scheduler = scheduler
appState.scheduler.selected = appState.scheduler.schedules[0];

//////////////////////////////////////////////////////////////////////////////////

let store = createStore(
  (state, action) => {
    switch (action.type) {
      case 'INCR':
        return { counter: state.counter + action.by };
        case 'CHANGE_SELECTED':
        return { counter: state.counter + action.by };
      default:
        return state;
    }
  },
  { ...appState });


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
      <Route path="/scheduler" component={SchedulerPage} />
      <Route path="/counter" component={Counter} />
    </Router>
  </Provider>,
  document.getElementById('root'));







