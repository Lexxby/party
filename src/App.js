import React from 'react';
import { Route } from 'react-router-dom';
import Users from './components/users';
import Home from './app/home';
import Login from './app/login';
import NavBar from './app/navBar';

function App() {
  return (
    <div>
      <NavBar />
      <Route path="/login" component={Login} />
      <Route path="/users/:userId?" component={Users} />
      <Route path="/" exact component={Home} />
    </div>
  );
}

export default App;
