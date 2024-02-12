import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'

import App from './src/App'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('main')
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
