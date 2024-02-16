import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import slice from './store/slice'

import Form from './components/Form'
import Controls from './components/Controls'
import Items from './components/Items'

import classes from './App.module.css'

export default function App() {
  const error = useSelector(state => slice.selectors.selectError({ [slice.reducerPath]: state }))

  if (error) {
    alert(error.message)
  }

  return (
    <div className={classes.root}>
      <Heading variant="h1">todo list</Heading>
      <Form />
      <Controls />
      <Items />
    </div>
  )
}

const Heading = styled(Typography)`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 800;
  margin: 30px 0;
`
