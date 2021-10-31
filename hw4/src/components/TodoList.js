import React from "react";
import x_png from "../img/x.png"
function TodoList({todos, setTodos, setCurrentActive, setCurrentComplete, listType}) {

    var currentTodos = [...todos];
    if(listType === 1) currentTodos = todos.filter(ele => ele.checked === false);
    else if(listType === 2) currentTodos = todos.filter(ele => ele.checked === true);

    function handleCheck(e) {
        if(listType === 1) {
            var confirmDelete = window.confirm(
                "Do you want to delete this active todo? If so, this todo will disapper from Active list. You can still check the todo at All list or Completed list."
            );
            if(!confirmDelete) return;
        }
        else if(listType === 2) {
            var confirmUncheck = window.confirm("Do you want to restart this completed todo? If so, this todo will disapper from Completed list. You can check the todo in All list or Active list.");
            if(!confirmUncheck) return;
        }
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
        // if(JSON.stringify(todos) !== JSON.stringify(currentTodos)) {
        //   alert("If you want to delete todos, please click All and perform actions there. Otherwise it will cause some error ><");
        //   return;
        // }
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
        return
    }

    return (
        currentTodos.map(item => 
            <li className="todo-app__item" key = {item.id}>
                <div className="todo-app__checkbox">
                <input type="checkbox" id={item.id} checked={item.checked} onChange={(e) => handleCheck(e)}/>
                <label htmlFor={item.id} />
                </div>
                <h1 className={"todo-app__item-detail" + (item.checked ? " complete":" none")}>{item.itemDetail}</h1>
                <img alt="delete icon" id={item.id} src= {x_png} className="todo-app__item-x" onClick={(e) => handleDelete(e)}/>
            </li>
        )
    )
}

export default TodoList;
