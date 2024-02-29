# Serve files

`npm run dev`

# `TextField`, custom variants don't work
As specified in [the docs](https://mui.com/material-ui/api/text-field/#text-field-prop-variant), `variant` can only be one of the predefined values.

Otherwise, it throws [an error](https://github.com/mui/material-ui/issues/31204).

# `signup`, `signin`, `signout`: omitting sagas
For `signup`, I don't need to store the operation status and error globally. 

Let's consider a problematic case if doing that. Let's suppose, we have a single `error` field in our slice.

The user sends invalid signup information and the server responds with an error which gets stored in the `error` field in the slice. Then, the user navigates to `signin` for some reason.

Now, `signin` will display the errors, associated with the previous `signup` attempt.

To mitigate this, one thing I could do is unset the `error` by dispatching an action on component unmount. But if I wanted to display both `signup` and `signin` components simultaneously, this wouldn't solve the problem. Another way would be to have separate fields in the slice for `signup` error and for `signin` error.

Both solutions don't seem elegant or scalable.

Likewise, I need feedback from the server to explicitly know when the operation succeeded, because I need to navigate to a different route in such a case.

So I will additionally need fields in the slice for that, e.g., a `status` field for `signup` and `signin`. And I will have to manually unset them too, from my components, if I want them to work properly, because, for example, if I sign up successfully and then refresh the page and will sign up successfully as another user, `useEffect` won't fire on the selected `status` field, because it will have the same value as previously. So I will need to manually reset the value to, e.g., `'idle'`, right after the effect on `'success'` has been fired.

So the solution is to use hooks and keep the status and error info locally in the hooks while only keeping the token in the slice.