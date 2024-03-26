import { type ValidationError, type Schema } from 'yup'

export const validate = async (schema: Schema, values: { [key: string]: unknown }) => {
  const errors: { [key: string]: unknown } = {}
  let schemaErrors = null

  try {
    await schema.validate(values, { abortEarly: false, stripUnknown: true })
  } catch (e) {
    schemaErrors = e
  }

  if (!schemaErrors) return errors

  for (const e of (schemaErrors as ValidationError).inner) {
    if (e.path === undefined || errors[e.path]) continue

    errors[e.path] = e.errors[0]
  }

  return errors
}
