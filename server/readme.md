# Run
You should specify the `.env` file:

`node --env-file .env index.js`

# `validateContentType`: checking for Content-Length
`axios` [removes](https://github.com/axios/axios/issues/1535) `Content-Type` header when payload is empty (and on GET). 

So I only need to generate an error if there's actual content in the body but an incorrect `Content-Type`.