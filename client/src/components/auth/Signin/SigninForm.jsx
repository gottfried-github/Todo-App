import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'
import TextField from '@mui/material/TextField'
import { Button } from '../Signup/SignupForm'
import AuthForm from '../AuthForm'

import { signin as actionSignin } from '../../../store/actions/auth'
import sliceAuth from '../../../store/store/slice-auth'

export default function Signin() {
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

  const submitCb = values => {
    console.log('submitCb, values:', values)
    // ev.preventDefault()
    // if (validators.identifier(identifier) || validators.password(password)) return
    // dispatch(
    //   actionSignin({
    //     identifier,
    //     password,
    //   })
    // )
  }

  return (
    <Form
      onSubmit={submitCb}
      initialValues={{
        identifier: '',
        password: '',
      }}
      validate={values => {
        console.log('Form, validate, values:', values)

        const errors = {}

        if (!values.identifier) {
          errors.identifier = 'this field is required'
        }

        if (values.identifier?.length < 2) {
          errors.identifier = 'user name must have at least two characters'
        }

        if (!values.password) {
          errors.password = 'this field is required'
        }

        if (values.password?.length < 8) {
          errors.password = 'password must have at least 8 characters'
        }

        console.log('Form, validate, errors:', errors)

        return errors
      }}
      render={({ handleSubmit }) => {
        return (
          <AuthForm onSubmit={handleSubmit}>
            <Field
              name="identifier"
              render={({ input, meta }) => {
                console.log('Field, identifier, meta.touched:', meta.touched)
                return (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Username or Email"
                    placeholder={'ed@mail'}
                    name={input.name}
                    value={input.value}
                    error={!!error?.errors?.identifier || (meta.touched && !!meta.error)}
                    helperText={
                      error?.errors?.identifier?.message || (meta.touched && meta.error) || null
                    }
                    onChange={ev => {
                      if (error) {
                        dispatch(sliceAuth.actions.unsetErrorSignin())
                      }

                      input.onChange(ev)
                    }}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                  />
                )
              }}
            />
            <Field
              name="password"
              render={({ input, meta }) => {
                return (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                    name={input.name}
                    value={input.value}
                    error={!!error?.errors?.password || (meta.touched && !!meta.error)}
                    helperText={
                      error?.errors?.password?.message || (meta.touched && meta.error) || null
                    }
                    onChange={ev => {
                      if (error) {
                        dispatch(sliceAuth.actions.unsetErrorSignin())
                      }

                      input.onChange(ev)
                    }}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus}
                  />
                )
              }}
            />

            <Button type="submit" variant="contained">
              sign in
            </Button>
          </AuthForm>
        )
      }}
    ></Form>
  )
}
