export const validate = async (schema, values) => {
  const errors = {}
  let schemaErrors = null

  try {
    await schema.validate(values, { abortEarly: false, stripUnknown: true })
  } catch (e) {
    schemaErrors = e
  }

  if (!schemaErrors) return errors

  for (const e of schemaErrors.inner) {
    if (errors[e.path]) continue

    errors[e.path] = e.errors[0]
  }

  return errors
}
