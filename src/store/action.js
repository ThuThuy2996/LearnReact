import { ADD_TODO,UPDATE_TODO, LOAD_TODOLIST ,REMOVE_TODO, CHECK_DONE} from "../utility/constants";

  export const loadData = (values) => async (dispatch, getState) => {
    dispatch({
      type: LOAD_TODOLIST,
      payload: values
    });   
    sessionStorage.setItem('todoList', JSON.stringify(getState().todoItems.todoList))
  };

  export const removeItem = (values) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_TODO,
      payload: values
    });   
    sessionStorage.setItem('todoList', JSON.stringify(getState().todoItems.todoList))
  };

  export const checkDone = (values) => async (dispatch, getState) => {
    dispatch({
      type: CHECK_DONE,
      payload: values
    });   
    sessionStorage.setItem('todoList', JSON.stringify(getState().todoItems.todoList))
  };

  export const update = (values) => async (dispatch, getState) => {
    dispatch({
      type: UPDATE_TODO,
      payload: values
    });   
    sessionStorage.setItem('todoList', JSON.stringify(getState().todoItems.todoList))
  };
  export const add = (values) => async (dispatch, getState) => {
    console.log(values.id,'val add')
    dispatch({
      type: ADD_TODO,
      payload: {
        id: values.id,
        userId: values.userId,
        title: values.title,
        completed: values.completed
      }
    });   
    sessionStorage.setItem('todoList', JSON.stringify(getState().todoItems.todoList))
  };