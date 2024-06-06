import { useState } from "react"
import Button from "./Button"

const Counter = () => {
    const [counter, setCounter] = useState(0)
    const [counterHistory, setCounterHistory] = useState([])
    return (
        <div>
            <h1>{ counter }</h1>
            <fieldset>
                { counterHistory.length && counterHistory.map(history => <span key={history}>{ history } | </span>) }
            </fieldset>
            <br/>
            <Button onClick={() => setCounter(counter + 1)}>Increase</Button>
            <Button onClick={() => setCounter(counter - 1)}>Reduce</Button>
            <Button onClick={() => setCounterHistory([...counterHistory, counter])}>Save</Button>
            <Button onClick={() => setCounterHistory([])}>Reset</Button>
        </div>
    )
}

export default Counter