
/* 
 * template provided by Interviewer
 * In new version of create react app 'render' is deprecated 
 * but we can still use it, so it is working
*/
import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./components/TodoApp";
import './App.css';
ReactDOM.render(
  <TodoApp />,
  document.getElementById("root")
);