import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { object, string } from 'yup'
import { Form, Field } from 'react-final-form'
import TextField from '@mui/material/TextField'
import { Button } from '../Signup/SignupForm'
import AuthForm from '../AuthForm'

import { signin as actionSignin } from '../../../store/actions/auth'
import sliceAuth from '../../../store/store/slice-auth'

const schema = object({
  identifier: string().trim().required().min(2).max(300),
  password: string().trim().required().min(8).max(300),
})

export default function Signin() {
  const dispatch = useDispatch()
  const error = useSelector(state => sliceAuth.selectors.selectErrorSignin(state))

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(sliceAuth.actions.unsetErrorSignin())
      }
    }
  }, [error, dispatch])

  const submitCb = values => {
    dispatch(actionSignin(values))
  }

  return (
    <Form
      onSubmit={submitCb}
      initialValues={{
        identifier: '',
        password: '',
      }}
      validate={values => {
        const errors = {}
        let schemaErrors = null

        try {
          schema.validateSync(values, { abortEarly: false, stripUnknown: true })
        } catch (e) {
          schemaErrors = e
        }

        if (!schemaErrors) return errors

        for (const e of schemaErrors.inner) {
          if (errors[e.path]) continue

          errors[e.path] = e.errors[0]
        }

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
