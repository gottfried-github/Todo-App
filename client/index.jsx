import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import store from './store/store'
import theme from './components/theme'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('main')
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  )
})
