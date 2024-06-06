const Greet = (props) => {
    return (
        <div>
            <h1 className="foo bar" onClick={() => console.log(getName(props.name))}>Hello, This is { getName(props.name) }</h1>
            { props.children ? <p>{ props.children }</p> : 'Hello' }
        </div>
    ) 
}
const getName = (name) => `${name} Anum`

export default Greet