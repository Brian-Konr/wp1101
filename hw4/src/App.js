import React, {useEffect, useState} from 'react';
import './styles.css';
import x_png from './img/x.png';

function App() {
  const[todos, setTodos] = useState([]);
  const[inputVal, setInputVal] = useState("");
  const[totalCount, setTotalCount] = useState(0);
  const[currentActive, setCurrentActive] = useState(0);
  const[currentComplete, setCurrentComplete] = useState(0);
  const[currentTodos, setCurrentTodos] = useState([]);

  useEffect(() => {
    setCurrentTodos([...todos]);
  }, [todos]);

  function handleInput(e) {
    setInputVal(e.target.value);
  }
  function handleEnter(e) {
    if(e.key === 'Enter' && inputVal !== "") {
      setTotalCount(prev => prev + 1);
      setCurrentActive(prev => prev + 1);
      setTodos(oldTodos => [...oldTodos, {id: totalCount, itemDetail: inputVal, checked: false}]);
      setInputVal("");
    }
  }
  function handleCheck(e) {
    let newTodos = [...todos];
    let indexInTodos = todos.findIndex(ele => ele.id === Number(e.target.id));
    newTodos[indexInTodos].checked = e.target.checked;
    setTodos([...newTodos]);
    if(e.target.checked) {
      setCurrentComplete(prev => prev + 1);
      setCurrentActive(prev => prev - 1);
    }
    else {
      setCurrentActive(prev => prev + 1);
      setCurrentComplete(prev => prev - 1);
    }
  }
  
  
  function handleDelete(e) {
    if(JSON.stringify(todos) !== JSON.stringify(currentTodos)) {
      alert("If you want to delete todos, please click All and perform actions there. Otherwise it will cause some error ><");
      return;
    }
    var index = Number(e.target.id);
    var checkedStatus = todos.find(ele => ele.id === index).checked;
    console.log(checkedStatus);
    setTodos(todos.filter(item => item.id !== index));
    
    if(checkedStatus) {
      setCurrentComplete(prev => prev - 1);
      console.log("delete completed missions");
    }
    else {
      console.log("delete active missions");
      setCurrentActive(prev => prev - 1);
    }
  }
  
  function clearComplete() {
    if(JSON.stringify(todos) !== JSON.stringify(currentTodos)) {
      alert("If you want to clear completed todos, please click All and perform actions there. Otherwise it will cause some error ><");
      return;
    }
    setTodos(todos.filter(item => item.checked !== true));
    setCurrentComplete(0);
  };

  const renderClearCompleted = () => {
    if(currentComplete > 0) {
      return <div className="todo-app__clean">
                <button onClick = {clearComplete}>Clear completed</button>
            </div>
    }
  }
  const renderFooter = () => {
    if(todos.length > 0) {
      return <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{currentActive} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={() => setCurrentTodos(todos)}>All</button>
                    <button onClick={() => setCurrentTodos(todos.filter(ele => ele.checked === false))}>Active</button>
                    <button onClick={() => setCurrentTodos(todos.filter(ele => ele.checked === true))}>Completed</button>
                </ul>
                {renderClearCompleted()}
            </footer>
    }
  }
  const renderTodos = (curList) => {
    
    if(curList.length > 0) {
      return curList.map(item => 
            <li className="todo-app__item">
              <div className="todo-app__checkbox">
                <input type="checkbox" id={item.id} checked={item.checked} onChange={handleCheck}/>
                <label htmlFor={item.id} />
              </div>
              <h1 className="todo-app__item-detail">{item.itemDetail}</h1>
              <img alt="delete icon" id={item.id} src= {x_png} className="todo-app__item-x" onClick={handleDelete}/>
            </li>
      )
    }
  }
  return(
    <div id="root" className="todo-app__root">
      <header className="todo-app__header">
        <h1 className="todo-app__title">todos</h1>
      </header>
      <section className="todo-app__main">
        <input className="todo-app__input" id="todo-input" placeholder="what needs to be done?" value = {inputVal} onKeyPress={handleEnter} onChange={handleInput}/>
        <ul className="todo-app__list" id="todo-list">
          {renderTodos(currentTodos)}
        </ul>
      </section>
      {renderFooter()}
    </div>
  )
}

export default App;
