import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Paper from '../AuthPaper'
import Button from '../AuthButton'
import TextField from '../AuthTextField'
import Form from '../AuthForm'

import { useSignin } from '../../../hooks/auth'

export default function Signup() {
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const signin = useSignin()

  useEffect(() => {
    console.log('useEffect on signin, signin:', signin)
    if (signin.status === 'success') {
      navigate('/cabinet')
    }
  }, [navigate, signin])

  const validators = {
    identifier: v => (v.length >= 2 ? null : 'field must be at least 2 characters long'),
    password: v => (v.length >= 8 ? null : 'field must be at least 8 characters long'),
  }

  const submitCb = ev => {
    ev.preventDefault()

    if (validators.identifier(identifier) || validators.password(password)) return

    signin.send({
      identifier,
      password,
    })
  }

  return (
    <Paper elevation={8}>
      <Form onSubmit={submitCb}>
        <TextFieldStyled
          variant="filled"
          label="Username or Email"
          placeholder={'ed@mail'}
          defaultValue={identifier || ''}
          error={
            !!signin.error?.errors?.identifier ||
            (identifier ? !!validators.identifier(identifier) : false)
          }
          helperText={
            signin.error?.errors?.identifier?.message ||
            (identifier ? validators.identifier(identifier) : null)
          }
          onInput={ev => {
            if (signin.status === 'error') {
              signin.reset()
            }

            setIdentifier(ev.target.value)
          }}
        />
        <TextFieldStyled
          variant="filled"
          label="Password"
          type="password"
          defaultValue={password || ''}
          error={
            !!signin.error?.errors?.password || (password ? !!validators.password(password) : false)
          }
          helperText={
            signin.error?.errors?.password?.message ||
            (password ? validators.password(password) : null)
          }
          onInput={ev => {
            if (signin.status === 'error') {
              signin.reset()
            }

            setPassword(ev.target.value)
          }}
        />

        <Button type="submit" variant="contained">
          sign in
        </Button>
      </Form>
    </Paper>
  )
}

const TextFieldStyled = styled(TextField)`
  display: block;
`
