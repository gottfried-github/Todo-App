import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { creators as actionCreators } from '../../store/actions/sagas/todo'
import selectors from '../../store/store/selectors-todo'

import Form from './Form'
import Controls from './Controls'
import Items from './Items'

export default function App() {
  const dispatch = useDispatch()

  const filter = useSelector(state => selectors.selectFilter(state))
  const counters = useSelector(state => selectors.selectCounters(state))

  useEffect(() => {
    dispatch(actionCreators.getItems())
  }, [dispatch, filter])

  const error = useSelector(state => selectors.selectError(state))

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
  height: calc(100vh - 65px);

  margin: 0 auto;
  padding: 0 45px;
  padding-bottom: 16px;

  font-size: 0.875rem;
`
