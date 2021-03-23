import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App/App';
import 'bootstrap/dist/css/bootstrap.css'
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
