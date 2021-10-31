import React, {useState} from 'react'

function App() {

    const [count, setCount] = useState(0);
    
    return(
        <div>
            <h1>Hello Count!</h1>
            <p>Current Count is: {count}</p>
            <button onClick = {() => setCount(prev => prev + 1)}>+</button>
            <button onClick = {() => setCount(prev => prev - 1)}>-</button>
        </div>
    )
}

export default App;