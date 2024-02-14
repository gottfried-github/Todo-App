import { useState } from 'react'
import { useDispatch } from 'react-redux'

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
      <input
        className="add"
        type="text"
        placeholder="What needs to be done?"
        value={name}
        onChange={handleInputChange}
      />
      <button className="add-btn" onClick={handleSubmit}>
        submit
      </button>
    </form>
  )
}
