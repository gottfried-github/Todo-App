import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { getItems } from './store/actions/todo'
import slice from './store/store/slice-todo'

import Form from './components/todo/Form'
import Controls from './components/todo/Controls'
import Items from './components/todo/Items'

export default function App() {
  const dispatch = useDispatch()

  const filter = useSelector(state => slice.selectors.selectFilter({ [slice.reducerPath]: state }))
  const counters = useSelector(state =>
    slice.selectors.selectCounters({ [slice.reducerPath]: state })
  )

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch, filter])

  const error = useSelector(state => slice.selectors.selectError({ [slice.reducerPath]: state }))

  if (error) {
    alert(error.message)
  }

  return (
    <Container empty={!counters.all}>
      <Heading variant="h1">todo list</Heading>
      <Form />
      <Controls />
      <Items />
    </Container>
  )
}

const Heading = styled(Typography)`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 800;
  margin: 30px 0;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto minmax(150px, 1fr);

  width: 100%;
  height: 100vh;

  margin: auto;
  padding: 16px 45px;

  font-size: 0.875rem;
`
