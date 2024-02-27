import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useSignup } from '../../hooks/auth'

export default function Signup() {
  const [userName, setUserName] = useState('Ed')
  const [email, setEmail] = useState('ed@mail')
  const [firstName, setFirstName] = useState('Ed')
  const [lastName, setLastName] = useState('Doe')
  const [password, setPassword] = useState('')

  const signup = useSignup()

  useEffect(() => {
    if (signup.status === 'success') {
      // navigate('/user')
    }
  }, [signup])

  const validators = {
    userName: v => (v.length > 2 ? null : 'field must be at least 2 characters long'),
    email: v => (/^\S+@\S+$/.test(v) ? null : 'incorrect email format'),
    firstName: v => (v.length > 2 ? null : 'field must be at least 2 characters long'),
    lastName: v => (v.length > 2 ? null : 'field must be at least 2 characters long'),
    password: v => (v.length > 8 ? null : 'field must be at least 8 characters long'),
  }

  const submitCb = () => {
    ev.preventDefault()

    if (
      validators.userName(userName) ||
      validators.email(email) ||
      validators.firstName(firstName) ||
      validators.lastName(lastName) ||
      validators.password(password)
    )
      return

    signup.send({
      userName,
      email,
      firstName,
      lastName,
      password,
    })
  }

  return (
    <Paper elevation={8}>
      <form onSubmit={submitCb}>
        <TextField
          variant="filled"
          label="Username"
          defaultValue={userName}
          error={signup.error?.errors?.userName || validators.userName(userName)}
          helperText={validators.userName(userName)}
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setUserName(ev.target.value)
          }}
        />
        <TextField
          variant="filled"
          label="Email"
          defaultValue={email}
          error={signup.error?.errors?.email || validators.email(email)}
          helperText={validators.email(email)}
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setEmail(ev.target.value)
          }}
        />
        <TextField
          variant="filled"
          label="First Name"
          defaultValue={firstName}
          error={signup.error?.errors?.firstName || validators.firstName(firstName)}
          helperText={validators.firstName(firstName)}
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setFirstName(ev.target.value)
          }}
        />
        <TextField
          variant="filled"
          label="Last Name"
          defaultValue={lastName}
          error={signup.error?.errors?.lastName || validators.lastName(lastName)}
          helperText={validators.lastName(lastName)}
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setLastName(ev.target.value)
          }}
        />
        <TextField
          variant="filled"
          label="Password"
          type="password"
          defaultValue={password}
          error={signup.error?.errors?.password || validators.password(password)}
          helperText={validators.password(password)}
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setPassword(ev.target.value)
          }}
        />

        <Button>sign up</Button>
      </form>
    </Paper>
  )
}
