import './App.css';
import React, {useState} from 'react';
import Header from './components/Header';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

import "./styles.css"

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [currentComplete, setCurrentComplete] = useState(0);
  const [listType, setListType] = useState(0); // 0: all, 1: active, 2: completed

  console.log("todos:", todos);
  console.log("currentActive:", currentActive);
  console.log("currentComplete:", currentComplete);
  console.log("listType:", listType);
  return (
    <div className ="todo-app__root">
      <Header title = "todos"/>
      <section className = "todo-app__main">
        <InputField setCurrentActive = {setCurrentActive} setTodos = {setTodos} />
        <ul className = "todo-app__list" id="todo-list">
          <TodoList 
            todos = {todos}
            listType = {listType}
            setTodos = {setTodos} 
            setCurrentActive = {setCurrentActive}
            setCurrentComplete = {setCurrentComplete}
          />
        </ul>
      </section>
      <Footer 
        currentActive = {currentActive}
        currentComplete = {currentComplete}
        setCurrentComplete = {setCurrentComplete}
        currentTodos = {currentTodos}
        todos = {todos}
        setTodos = {setTodos}
        setCurrentTodos = {setCurrentTodos}
        listType = {listType}
        setListType = {setListType}
      />
    </div>
  );
}

export default TodoApp;
