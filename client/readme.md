# Serve files

`npm run dev`

# `TextField`, custom variants don't work
As specified in [the docs](https://mui.com/material-ui/api/text-field/#text-field-prop-variant), `variant` can only be one of the predefined values.

Otherwise, it throws [an error](https://github.com/mui/material-ui/issues/31204).

# Typescript with `redux-actions`'s `handleActions`
When payload in different reducers is of different types, the thing renders invalid.

The first argument to `handleActions` has this type: 

```typescript
interface ReducerMap<State, Payload> {
    [actionType: string]: (state: State, action: Action<Payload>) => State;
}
```

This means that `Payload` must be the same in all the reducers.

`State` and `Payload` from above can be passed to `ReducerMap` via this:

```typescript
handleActions<State, Payload>({
  // my reducers
})
```

Let's say, I have two reducers in my slice, each having a different type of `Payload`.

I can try this:

```typescript
handleActions<State, Payload1 | Payload2>({
  ['ACTION1']: (state: State, { payload }: { payload: Payload1 }) => {
    return { ...state, field1: payload }
  },
  ['ACTION2']: (state: State, { payload }: { payload: Payload2 }) => {
    return { ...state, field2: payload }
  }
})
```

This will give the error that *`Action<Payload1 | Payload2>` doesn't match type `Payload1`*.

The solution is to pass this:

```typescript
handleActions<State, any>(
  // my reducers here
)
```

