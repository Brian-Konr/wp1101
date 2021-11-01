import React, {useState} from 'react'
import Buttons from './components/Buttons';
import "./styles.css";

function App() {

    const [currentValue, setCurrentValue] = useState("");
    const [result, setResult] = useState("");
    const [expression, setExpression] = useState("");
    const [equal, setEqual] = useState(0); // 0 is current, 1 is click equal
    return(
        <div className="container">
            <div className="wrapper">
                <div className="expression">{expression}</div>
                <div className="screen">{equal === 1 ? result : currentValue}</div>
                <Buttons 
                    currentValue = {currentValue}
                    setCurrentValue = {setCurrentValue}
                    setExpression = {setExpression}
                    expression = {expression}
                    equal = {equal}
                    setEqual = {setEqual}
                    result = {result}
                    setResult = {setResult}
                />
            </div>
            <br />
        </div>
    )
}

export default App;