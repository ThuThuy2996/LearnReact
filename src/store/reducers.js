import { ADD_TODO, LOAD_TODOLIST, UPDATE_TODO, REMOVE_TODO, CHECK_DONE } from "../utility/constants";

export const reducers = (state = { todoList: [], repeat: false }, action) => {
    switch (action.type) {
        case LOAD_TODOLIST:
            return loadToDoList(state, action);
        case CHECK_DONE:
            return checkItemDone(state, action);
        case REMOVE_TODO:
            return removeToDoList(state, action);
        case UPDATE_TODO:
            return updateItem(state, action);
        case ADD_TODO:          
            return addItem(state, action);
        default:
            return state;
    }
};


const loadToDoList = (state, action) => {
    return {
        state,
        repeat: false,
        todoList: [action.payload],
    };
};

const removeToDoList = (state, action) => {
    return {
        state,
        todoList: [state.todoList[0].filter((x) => x.id !== action.payload)], 
    };
};


const checkItemDone = (state, action) => {
    const update = state.todoList[0].map((item) => {
        if (item.id === action.payload) {
            return { ...item, completed: true };
        } else {
            return item;
        }
    });
    return {
        state,
        todoList: [update]
    }
};

const updateItem = (state, action) => {
    return {
        state,
        todoList: [state.todoList[0].map((x) => x.id === action.payload.id ? action.payload : x)] 
    }
};

const addItem = (state, action) => {
   
    const newList = action.payload;    
    return {
        state,
        repeat: false,
        todoList: [[...state.todoList[0], newList]],
      };
};