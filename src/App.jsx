import React, { useRef, useEffect, useState } from 'react';
import './tailwind.output.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './redux/store'

import HomePage from './HomePage'
import AdvancedPage from './AdvancedPage';


function App() {
  
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/advanced">
          <AdvancedPage/>
        </Route>
      </Switch>
      <div className="w-full h-28 bg-gray-300"></div>
    </Router>
    </Provider>
  );
}

export default App;
