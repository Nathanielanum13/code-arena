export const Form = (props) => {
    const handleChange = ({target}, name) => props.onFormValueChange(target.value, name)
    return (
        <form>
            { props.fields 
                ? props.fields.map(field => <input type={field.type} name={field.name} value={field.value} placeholder={field.placeholder} key={field.placeholder} onChange={(event) => handleChange(event, field.name)} />) 
                : props.children }
        </form>
    )
}