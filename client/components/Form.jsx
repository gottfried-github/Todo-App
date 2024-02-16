import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { create } from '../actions'

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
    <form className="add-form">
      <TextFieldStyled
        type="text"
        variant="filled"
        fullWidth
        placeholder="What needs to be done?"
        value={name}
        onChange={handleInputChange}
      />
      <Button variant="main" onClick={handleSubmit}>
        submit
      </Button>
    </form>
  )
}

const TextFieldStyled = styled(TextField)`
  & .MuiFilledInput-root {
    background-color: ${props => props.theme.palette.util.main};
  }

  & .MuiFilledInput-root.Mui-focused {
    background-color: rgba(0, 0, 0, 0.06);
  }
`
