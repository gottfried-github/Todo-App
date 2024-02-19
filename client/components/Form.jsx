import { useState } from 'react'
import { useDispatch } from 'react-redux'

import TextField from './lib/TextField'
import Button from '@mui/material/Button'

import { create } from '../store/actions'

import classes from './Form.module.css'

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
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
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
