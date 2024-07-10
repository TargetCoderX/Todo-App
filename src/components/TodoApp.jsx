import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

function TodoApp() {
  const [todos, settodos] = useState([]);
  const [todoInput, settodoInput] = useState("");
  const createTodo = (e) => {
    if (todoInput !== "") {
      const accessLocalStorageData = localStorage.getItem("todoList");
      const dataToInsert = {
        "task_name": todoInput,
        "is_completed": false,
      }
      if (accessLocalStorageData) {
        const mainData = JSON.parse(accessLocalStorageData)
        let newId = 1;
        if (mainData.length > 0) {
          newId = mainData[mainData.length - 1].id + 1;
        }
        dataToInsert.id = newId;
        localStorage.setItem("todoList", JSON.stringify([...mainData, dataToInsert]))
      } else {
        dataToInsert.id = 1;
        localStorage.setItem("todoList", JSON.stringify([dataToInsert]))
      }
      settodos(JSON.parse(localStorage.getItem("todoList")));
      settodoInput("");
    }
  }

  const deleteTasks = (id) => {
    const mainData = todos;
    const getObjectIndex = mainData.findIndex(element => element.id === id);
    if (getObjectIndex !== -1) {
      mainData.splice(getObjectIndex, 1);
    }
    if (mainData.length > 0)
      settodos([...mainData]);
    else
      settodos([]);
    localStorage.setItem("todoList", JSON.stringify(mainData))
  }

  const updateTaskStatus = (id) => {
    const mainData = todos;
    let data = mainData.map(element => {
      if (element.id === id) {
        return { ...element, is_completed: !element.is_completed };
      }
      return element;
    });
    if (data.length > 0)
      settodos([...data]);
    else
      settodos([]);
    localStorage.setItem("todoList", JSON.stringify(data))
  }

  useEffect(() => {
    settodos(JSON.parse(localStorage.getItem("todoList")));
  }, []);
  return (
    <div className="container" id="page-content">
      <div className="d-flex m-4 justify-content-center">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card px-3">
              <div className="card-body">
                <h4 className="card-title">Awesome Todo list</h4>
                <div className="add-items d-flex">
                  <input type="text" value={todoInput} onKeyUp={(e) => { if (e.key === "Enter") createTodo(e) }} onChange={(e) => { settodoInput(e.target.value) }} className="form-control todo-list-input" placeholder="What do you need to do today?" />
                  <button className="add btn btn-primary font-weight-bold todo-list-add-btn" onClick={(e) => { createTodo(e) }}>Add</button>
                </div>
                <div className="list-wrapper">
                  <ul className="d-flex flex-column-reverse todo-list">
                    <TodoItem todos={todos} deleteTasks={deleteTasks} updateTask={updateTaskStatus} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
