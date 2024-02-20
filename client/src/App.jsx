import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { getItems } from './store/actions'
import slice from './store/slice'

import Form from './components/Form'
import Controls from './components/Controls'
import Items from './components/Items'

export default function App() {
  const dispatch = useDispatch()

  const filter = useSelector(state => slice.selectors.selectFilter({ [slice.reducerPath]: state }))

  useEffect(() => {
    dispatch(getItems({ status: filter }))
  }, [dispatch, filter])

  const error = useSelector(state => slice.selectors.selectError({ [slice.reducerPath]: state }))

  if (error) {
    alert(error.message)
  }

  return (
    <Container>
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
  grid-template-rows: auto auto auto 1fr;

  width: 650px;
  max-height: 650px;

  margin: auto;
  padding: 16px 45px;

  font-size: 0.875rem;

  background-color: ${props => props.theme.palette.backgrounds.main};
  border-radius: 12px;
  box-shadow: 2px 4px 8px 0px ${props => props.theme.palette.util.shadow};
`
