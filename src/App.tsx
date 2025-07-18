import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AdminLayout } from './components/layout/AdminLayout'
import { AppRouter } from './components/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AdminLayout>
          <AppRouter />
        </AdminLayout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App