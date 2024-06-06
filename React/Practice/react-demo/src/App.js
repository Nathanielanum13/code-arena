import { useState } from 'react';
import './App.css';
import { Form } from './components/Form';

function App() {
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [password, setPassword] = useState('')
  const [date, setDate] = useState('')
  const [color, setColor] = useState('')
  const fields = [
    {
      type: 'text',
      placeholder: 'Username',
      value: username,
      name: 'username'
    },
    {
      type: 'text',
      placeholder: 'Firstname',
      value: firstname,
      name: 'firstname'
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      name: 'password'
    },
    {
      type: 'date',
      placeholder: 'Date',
      value: date,
      name: 'date'
    },
    {
      type: 'color',
      placeholder: 'Color',
      value: color,
      name: 'color'
    }
  ]

  const updateFormFields = (newValue, fieldName) => {
    if (fieldName === 'username') setUsername(newValue)
    if (fieldName === 'password') setPassword(newValue)
    if (fieldName === 'date') setDate(newValue)
    if (fieldName === 'color') setColor(newValue)
    if (fieldName === 'firstname') setFirstname(newValue)
  }

  return (
    <div className="App">
      <Form fields={fields} onFormValueChange={updateFormFields} />
    </div>
  );
}

export default App;
