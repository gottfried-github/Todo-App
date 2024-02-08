# Run
You should specify the `.env` file:

`node --env-file .env index.js`

# Using `validateContentType` only on routes where payload is expected
`axios` [removes](https://github.com/axios/axios/issues/1535) `Content-Type` header when payload is empty (and on GET).