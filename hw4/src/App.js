import React, {useState} from 'react';
import './styles.css';
import Todo from './components/todo';


function App({task}) {
  console.log(task.length);
  const[totalCount, setTotalCount] = useState(0);

  function incrementTotalCount() {
    setTotalCount(prevTotalCount => prevTotalCount + 1);
  }

  function decrementTotalCount() {
    setTotalCount(prevTotalCount => prevTotalCount - 1);
  }

  function handleEnter(e) {
    if(e.key === 'Enter') {
      incrementTotalCount();
    }
  }

  console.log("taskArr:", task);
  const taskList = task.map(ele => (
    <Todo 
      id= {ele.id}
      itemDetail = {ele.itemDetail}
      checked = {ele.checked}
      key = {ele.id} 
    />
  ));
  console.log(taskList);
  return(
    <div id="root" className="todo-app__root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className="todo-app__main">
        <input className="todo-app__input" id="todo-input" placeholder="what needs to be done?" onKeyPress={handleEnter}/>
        <ul className="todo-app__list" id="todo-list">
          {taskList}
          {/* <Todo itemDetail="first" id="1" checked={true}/>
          <Todo itemDetail="second" id="2" checked={true}/> */}
        </ul>
      </section>
      <footer className="todo-app__footer" id="todo-footer">
          <div className="todo-app__total">{totalCount} left</div>
          <ul className="todo-app__view-buttons">
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
          </ul>
          <div className="todo-app__clean">
              <button>Clear completed</button>
          </div>
      </footer>
    </div>
  )
}

export default App;
