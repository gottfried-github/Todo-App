import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { getItems } from '../../store/actions/todo'
import slice from '../../store/store/slice-todo'

import Form from './Form'
import Controls from './Controls'
import Items from './Items'

export default function App() {
  const dispatch = useDispatch()

  const filter = useSelector(state => slice.selectors.selectFilter(state))
  const counters = useSelector(state => slice.selectors.selectCounters(state))

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch, filter])

  const error = useSelector(state => slice.selectors.selectError({ [slice.reducerPath]: state }))

  if (error) {
    alert(error.message)
  }

  return (
    <Container empty={!counters.all}>
      <Typography variant="title1">todo list</Typography>
      <Form />
      <Controls />
      <Items />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto minmax(150px, 1fr);

  width: 100%;
  height: 100vh;

  margin: auto;
  padding: 16px 45px;
  padding-top: 65px;

  font-size: 0.875rem;
`
