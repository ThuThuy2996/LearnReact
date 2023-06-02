
import React  from 'react';
import ToDoList from './components/ToDoList.js'
import AddToDo from "./components/AddToDo.js";
import './App.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  
  return (   
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ToDoList} />
        <Route exact path="/add" component={AddToDo} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
