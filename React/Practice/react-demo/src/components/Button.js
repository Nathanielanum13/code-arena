const Button = (props) => {
    return <button type="button" onClick={() => props.onClick()}>{ props.children ? props.children : props.name }</button>
}

export default Button