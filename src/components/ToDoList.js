import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loadData, removeItem, checkDone, update } from "../store/action";
import { useHistory } from "react-router-dom";

const ToDoList = () => {
  const [editItem, setEditItem] = useState({});
  const data = useSelector((state) => state.todoItems);
  const dispatch = useDispatch();
  const { todoList, setToDoList } = data;
  const history = useHistory();
  useEffect(() => {
    if (todoList.length === 0) {
      getToDoList();
    }
  }, []);

  const getToDoList = async () => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    try {
      await axios.get(url).then((response) => {
        dispatch(
          loadData(response.data.sort((a, b) => a.title.localeCompare(b.title)))
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleOnClickEdit(todo) {
    if (editItem && editItem.length > 0) {
      let listTodosCopy = [...todoList];

      let objIndex = listTodosCopy.findIndex((item) => item.id === todo.id);
      listTodosCopy[objIndex].title = editItem.title;
      setEditItem({});
    } else {
      setEditItem(todo);
    }
  }

  function handleOnchangeEditTodo(event) {
    let editTodoCopy = { ...editItem };
    editTodoCopy.title = event.target.value;
    setEditItem(editTodoCopy);
  }

  function handleOnBlurTodo() {
    dispatch(update(editItem));
    setEditItem({});
  }

  function handleOnClickDone(id) {
    dispatch(checkDone(id));
  }

  function handleOnClickDelete(id) {
    dispatch(removeItem(id));
  }

  function handleOnClickAdd() {
    history.push("/add");
  }

  if (todoList.length > 0) {
    let listTodos = todoList[0]?.filter((item) => !item.completed).slice(0, 10);
    let listDone = todoList[0]?.filter((item) => item.completed).slice(0, 10);
    return (
      <div className="box-content">
        <div className="content-top">
          <button className="btn-add" onClick={() => handleOnClickAdd()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>

        <div className="list-todo-content">
          <h3> ToDo</h3>
          {listTodos &&
            listTodos.length > 0 &&
            listTodos.map((item, index) => {
              return (
                <div className="todo-child" key={item.id}>
                  {editItem && editItem.id === item.id ? (
                    <input
                      className="input-plan"
                      value={editItem.title}
                      onChange={(event) => handleOnchangeEditTodo(event)}
                      onBlur={(event) => handleOnBlurTodo(event)}
                    ></input>
                  ) : (
                    <span className="text">
                      {index + 1} - {item.title}
                    </span>
                  )}

                  <button
                    className="btn-done"
                    onClick={() => handleOnClickDone(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-all"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                    </svg>
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => handleOnClickEdit(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleOnClickDelete(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
        </div>
        <div className="list-todo-content">
          <h3>DONE</h3>
          {listDone &&
            listDone.length > 0 &&
            listDone.map((item, index) => {
              return (
                <div className="todo-child" key={item.id}>
                  <span className="text">
                    {index + 1} - {item.title}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};
export default ToDoList;
