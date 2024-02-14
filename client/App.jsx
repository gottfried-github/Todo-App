import { useSelector } from 'react-redux'

import slice from './store/slice'

import Form from './components/Form'
import Controls from './components/Controls'
import Items from './components/Items'

export default function App() {
  const error = useSelector(state => slice.selectors.selectError({ [slice.reducerPath]: state }))

  if (error) {
    alert(error.message)
  }

  return (
    <div className="container">
      <h1 className="heading">todo list</h1>
      <Form />
      <Controls />
      <Items />
    </div>
  )
}
