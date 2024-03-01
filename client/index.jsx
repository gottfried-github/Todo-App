import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import Router from './src/router'

import { store, sagaMiddleware } from './src/store/store/store'
import saga from './src/store/sagas/index'

import theme from './src/theme/index'

sagaMiddleware.run(saga)

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('main')
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  )
})
