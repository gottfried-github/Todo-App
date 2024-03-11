import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { create } from '../../store/actions/todo'

export default function Form() {
  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const handleInputChange = ev => {
    setName(ev.target.value)
  }

  const handleSubmit = ev => {
    ev.preventDefault()

    dispatch(create(name))

    setName('')
  }

  return (
    <FormEl onSubmit={handleSubmit}>
      <TextFieldStyled
        type="text"
        variant="outlined"
        fullWidth
        placeholder="What needs to be done?"
        value={name}
        onChange={handleInputChange}
      />
      <Button variant="main" onClick={handleSubmit}>
        submit
      </Button>
    </FormEl>
  )
}

const FormEl = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 16px;

  margin-bottom: 8px;
`

const TextFieldStyled = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 25px;
  }
`

export { TextFieldStyled as TextField }
