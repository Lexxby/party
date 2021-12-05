import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Users from './components/users';

ReactDom.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
  document.getElementById('root')
);
