import React, {useState} from "react";


function InputField({setCurrentActive, setTodos}) {

    const [inputVal, setInputVal] = useState("");
    const [incrementId, setIncrementId] = useState(0);

    function handleEnter(e) {
        if(e.key === 'Enter' && inputVal !== "") {
          setIncrementId(prev => prev + 1);
          setCurrentActive(prev => prev + 1);
          setTodos(oldTodos => [...oldTodos, {id: incrementId, itemDetail: inputVal, checked: false}]);
          setInputVal("");
        }
    }

    function handleInput(e) {
        setInputVal(e.target.value);
    }
    return (
        <input 
            className="todo-app__input" 
            id="todo-input" 
            placeholder="what needs to be done?" 
            value = {inputVal} 
            onKeyPress={(e) => handleEnter(e)} 
            onChange={(e) => handleInput(e)}/>
    )
}

export default InputField;