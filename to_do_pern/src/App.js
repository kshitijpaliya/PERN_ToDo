import React, { Fragment } from 'react';
import './App.css';

// components
import ListToDo from './components/ListToDo';
import InputToDo from './components/InputToDo';
function App() {
  return (
    <Fragment>
      <div className="container">
        <InputToDo />
        <ListToDo />
      </div>
    </Fragment>
  );
}

export default App;
