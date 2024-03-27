import { useEffect } from 'react'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { useAppDispatch, useAppSelector } from '../../hooks/react-redux'
import { creators as actionCreators } from '../../store/actions/todo'
import selectors from '../../store/selectors/todo'

import Form from './Form'
import Controls from './Controls'
import Items from './Items'

export default function App() {
  const dispatch = useAppDispatch()

  const filter = useAppSelector(state => selectors.selectFilter(state))

  useEffect(() => {
    dispatch(actionCreators.sagaGetItems())
  }, [dispatch, filter])

  const error = useAppSelector(state => selectors.selectError(state))

  if (error) {
    if (typeof error === 'string') {
      alert(error)
    } else {
      alert(error.message)
    }
  }

  return (
    <Container>
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
