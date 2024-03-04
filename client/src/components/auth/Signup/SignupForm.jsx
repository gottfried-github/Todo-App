import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import Button from '../AuthButton'
import TextField from '@mui/material/TextField'
import Form from '../AuthForm'

import { signup as actionSignup } from '../../../store/actions/auth'
import sliceAuth from '../../../store/store/slice-auth'

export default function Signup() {
  const dispatch = useDispatch()
  const error = useSelector(state => sliceAuth.selectors.selectErrorSignup(state))

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(sliceAuth.actions.unsetErrorSignup())
      }
    }
  }, [error, dispatch])

  const validators = {
    userName: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    email: v => (/^\S+@\S+$/.test(v) ? null : 'incorrect email format'),
    firstName: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    lastName: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    password: v => (v.length >= 8 ? null : 'field must be at least 8 characters long'),
  }

  const submitCb = ev => {
    ev.preventDefault()

    if (
      validators.userName(userName) ||
      validators.email(email) ||
      validators.firstName(firstName) ||
      validators.lastName(lastName) ||
      validators.password(password)
    )
      return

    dispatch(
      actionSignup({
        userName,
        email,
        firstName,
        lastName,
        password,
      })
    )
  }

  return (
    <Form onSubmit={submitCb}>
      <TextFieldStyled
        variant="outlined"
        fullWidth
        label="Username"
        placeholder={'Ed'}
        defaultValue={userName || ''}
        error={!!error?.errors?.userName || (userName ? !!validators.userName(userName) : false)}
        helperText={
          error?.errors?.userName?.message || (userName ? validators.userName(userName) : null)
        }
        onInput={ev => {
          if (error) {
            dispatch(sliceAuth.actions.unsetErrorSignup())
          }

          setUserName(ev.target.value)
        }}
      />
      <TextFieldStyled
        variant="outlined"
        fullWidth
        label="Email"
        placeholder="ed@mail"
        defaultValue={email || ''}
        error={!!error?.errors?.email || (email ? !!validators.email(email) : false)}
        helperText={error?.errors?.email?.message || (email ? validators.email(email) : null)}
        onInput={ev => {
          if (error) {
            dispatch(sliceAuth.actions.unsetErrorSignup())
          }

          setEmail(ev.target.value)
        }}
      />
      <TextFieldStyled
        variant="outlined"
        fullWidth
        label="First Name"
        placeholder="Ed"
        defaultValue={firstName || ''}
        error={
          !!error?.errors?.firstName || (firstName ? !!validators.firstName(firstName) : false)
        }
        helperText={
          error?.errors?.firstName?.message || (firstName ? validators.firstName(firstName) : null)
        }
        onInput={ev => {
          if (error) {
            dispatch(sliceAuth.actions.unsetErrorSignup())
          }

          setFirstName(ev.target.value)
        }}
      />
      <TextFieldStyled
        variant="outlined"
        fullWidth
        label="Last Name"
        placeholder="Doe"
        defaultValue={lastName || ''}
        error={!!error?.errors?.lastName || (lastName ? !!validators.lastName(lastName) : false)}
        helperText={
          error?.errors?.lastName?.message || (lastName ? validators.lastName(lastName) : null)
        }
        onInput={ev => {
          if (error) {
            dispatch(sliceAuth.actions.unsetErrorSignup())
          }

          setLastName(ev.target.value)
        }}
      />
      <TextFieldStyled
        variant="outlined"
        fullWidth
        label="Password"
        type="password"
        defaultValue={password || ''}
        error={!!error?.errors?.password || (password ? !!validators.password(password) : false)}
        helperText={
          error?.errors?.password?.message || (password ? validators.password(password) : null)
        }
        onInput={ev => {
          if (error) {
            dispatch(sliceAuth.actions.unsetErrorSignup())
          }

          setPassword(ev.target.value)
        }}
      />

      <Button type="submit" variant="contained">
        sign up
      </Button>
    </Form>
  )
}

const TextFieldStyled = styled(TextField)`
  display: block;
`
