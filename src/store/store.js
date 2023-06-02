import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';

const reducer = combineReducers({
  todoItems: reducers,
});
const todoItemsFromStorage = localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : [];
  const initialState = {
    todoItems: { todoList: todoItemsFromStorage },
  };
  console.log(initialState,'todoItems')
const store = createStore(reducer,
                              initialState
                            ,composeWithDevTools(applyMiddleware(thunk))
);
export default store;
