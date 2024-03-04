import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import Button from '../AuthButton'
import TextField from '@mui/material/TextField'
import Form from '../AuthForm'

import { signin as actionSignin } from '../../../store/actions/auth'
import sliceAuth from '../../../store/store/slice-auth'

export default function Signup() {
  const dispatch = useDispatch()
  const error = useSelector(state => sliceAuth.selectors.selectErrorSignin(state))

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(sliceAuth.actions.unsetErrorSignin())
      }
    }
  }, [error, dispatch])

  const validators = {
    identifier: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    password: v => (v.length >= 8 ? null : 'field must be at least 8 characters long'),
  }

  const submitCb = ev => {
    ev.preventDefault()

    if (validators.identifier(identifier) || validators.password(password)) return

    dispatch(
      actionSignin({
        identifier,
        password,
      })
    )
  }

  return (
    <Form onSubmit={submitCb}>
      <TextFieldStyled
        variant="filled"
        fullWidth
        label="Username or Email"
        placeholder={'ed@mail'}
        defaultValue={identifier || ''}
        error={
          !!error?.errors?.identifier || (identifier ? !!validators.identifier(identifier) : false)
        }
        helperText={
          error?.errors?.identifier?.message ||
          (identifier ? validators.identifier(identifier) : null)
        }
        onInput={ev => {
          if (error) {
            dispatch(sliceAuth.actions.unsetErrorSignin())
          }

          setIdentifier(ev.target.value)
        }}
      />
      <TextFieldStyled
        variant="filled"
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
            dispatch(sliceAuth.actions.unsetErrorSignin())
          }

          setPassword(ev.target.value)
        }}
      />

      <Button type="submit" variant="contained">
        sign in
      </Button>
    </Form>
  )
}

const TextFieldStyled = styled(TextField)`
  display: block;
`
