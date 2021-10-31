import React from "react";

function Footer({currentComplete, setCurrentComplete, currentActive, todos, setTodos, currentTodos, setCurrentTodos, listType, setListType}) {

    const renderClearCompleted = () => {
        return <div className="todo-app__clean" style={{visibility: currentComplete > 0 ? 'visible': 'hidden'}}>
                    <button onClick = {() => clearComplete()}>Clear completed</button>
                </div>
    }

    function clearComplete() {
        setTodos(todos.filter(item => item.checked !== true));
        setCurrentComplete(0);
    };
    
    return (
        <footer className="todo-app__footer" id="todo-footer" style={{ visibility: todos.length > 0 ? 'visible': 'hidden'}}>
            <div className="todo-app__total">{currentActive} left</div>
            <ul className="todo-app__view-buttons">
                <button style={{ border: listType === 0? '1px solid black': ''}} onClick={() => setListType(0)}>All</button>
                <button style={{ border: listType === 1? '1px solid black': ''}} onClick={() => setListType(1)}>Active</button>
                <button style={{ border: listType === 2? '1px solid black': ''}} onClick={() => setListType(2)}>Completed</button>
            </ul>
            {renderClearCompleted()}
        </footer>
    )
}

export default Footer;