import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useSignup } from '../../../hooks/auth'

export default function Signup() {
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const signup = useSignup()

  useEffect(() => {
    console.log('useEffect on signup, signup:', signup)
    if (signup.status === 'success') {
      navigate('/cabinet')
    }
  }, [navigate, signup])

  const validators = {
    userName: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    email: v => (/^\S+@\S+$/.test(v) ? null : 'incorrect email format'),
    firstName: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    lastName: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    password: v => (v.length >= 8 ? null : 'field must be at least 8 characters long'),
  }

  const submitCb = ev => {
    console.log('submitCb')
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
        <TextFieldStyled
          variant="filled"
          label="Username"
          placeholder={'Ed'}
          defaultValue={userName || ''}
          error={
            !!signup.error?.errors?.userName || (userName ? !!validators.userName(userName) : false)
          }
          helperText={
            signup.error?.errors?.userName?.message ||
            (userName ? validators.userName(userName) : null)
          }
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setUserName(ev.target.value)
          }}
        />
        <TextFieldStyled
          variant="filled"
          label="Email"
          placeholder="ed@mail"
          defaultValue={email || ''}
          error={!!signup.error?.errors?.email || (email ? !!validators.email(email) : false)}
          helperText={
            signup.error?.errors?.email?.message || (email ? validators.email(email) : null)
          }
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setEmail(ev.target.value)
          }}
        />
        <TextFieldStyled
          variant="filled"
          label="First Name"
          placeholder="Ed"
          defaultValue={firstName || ''}
          error={
            !!signup.error?.errors?.firstName ||
            (firstName ? !!validators.firstName(firstName) : false)
          }
          helperText={
            signup.error?.errors?.firstName?.message ||
            (firstName ? validators.firstName(firstName) : null)
          }
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setFirstName(ev.target.value)
          }}
        />
        <TextFieldStyled
          variant="filled"
          label="Last Name"
          placeholder="Doe"
          defaultValue={lastName || ''}
          error={
            !!signup.error?.errors?.lastName || (lastName ? !!validators.lastName(lastName) : false)
          }
          helperText={
            signup.error?.errors?.lastName?.message ||
            (lastName ? validators.lastName(lastName) : null)
          }
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setLastName(ev.target.value)
          }}
        />
        <TextFieldStyled
          variant="filled"
          label="Password"
          type="password"
          defaultValue={password || ''}
          error={
            !!signup.error?.errors?.password || (password ? !!validators.password(password) : false)
          }
          helperText={
            signup.error?.errors?.password?.message ||
            (password ? validators.password(password) : null)
          }
          onInput={ev => {
            if (signup.status === 'error') {
              signup.reset()
            }

            setPassword(ev.target.value)
          }}
        />

        <Button type="submit">sign up</Button>
      </form>
    </Paper>
  )
}

const TextFieldStyled = styled(TextField)`
  display: block;
`
