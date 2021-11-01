import React, {useState} from 'react';

function Buttons({currentValue, setCurrentValue, setExpression, expression, equal, setEqual, result, setResult}) {


    const operatorList = ["+", "-", "*", "/"];
    
    const [operator, setOperator] = useState(0); //0 means the current action is not operator, 1 otherwise.
    function C() {
        setCurrentValue("0");
        setEqual(0);
        setExpression("");
    }

    function inputNum(num) {
        if(operator === 1) {
            setCurrentValue(num);
            setOperator(0);
        }
        else {
            if(currentValue !== "0" && currentValue !== "") setCurrentValue(prev => prev + num);
            else setCurrentValue(num);
        }
        setExpression(prev => prev + num);
    }

    function inputOperator(oper) {
        var lastChar = expression[expression.length - 1];
        var exist = operatorList.find(ele => ele === lastChar);
        if(exist === undefined) {
            // console.log(result, currentValue);
            setOperator(1);
            if(equal === 1) {
                setEqual(0);
                setCurrentValue("");
                setExpression(result + oper);
            }
            if(expression !== "") {
                setExpression(prev => prev + oper);
            }
        }
    }
    
    function calculate() {
        setResult("" + eval(expression));
        setEqual(1);
        setExpression("");
    }

    return(
        <>
            <div className="btn light-gray" onClick = {() => C()}>C</div>
            <div className="btn light-gray" onClick = {() => inputOperator("*1/100")}>%</div>
            <div className="btn light-gray" onClick = {() => inputOperator("*(-1)")}>+/-</div>
            <div className="btn orange" onClick = {() => inputOperator("/")}>&#247;</div>

            <div className="btn" onClick = {() => inputNum("7")}>7</div>
            <div className="btn" onClick = {() => inputNum("8")}>8</div>
            <div className="btn" onClick = {() => inputNum("9")}>9</div>
            <div className="btn orange" onClick = {() => inputOperator("*")}>X</div>

            <div className="btn" onClick = {() => inputNum("4")}>4</div>
            <div className="btn" onClick = {() => inputNum("5")}>5</div>
            <div className="btn" onClick = {() => inputNum("6")}>6</div>
            <div className="btn orange" onClick = {() => inputOperator("-")}>-</div>

            <div className="btn" onClick = {() => inputNum("1")}>1</div>
            <div className="btn" onClick = {() => inputNum("2")}>2</div>
            <div className="btn" onClick = {() => inputNum("3")}>3</div>
            <div className="btn orange" onClick = {() => inputOperator("+")}>+</div>

            <div className="btn zero" onClick = {() => inputNum("0")}>0</div>
            <div className="btn" onClick = {() => inputOperator("*0.1")}>.</div>
            <div className="btn orange" onClick = {() => calculate()}>=</div>
        </>
    )
}

export default Buttons;