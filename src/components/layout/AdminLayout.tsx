import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Toaster } from '../ui/toaster'
import { TempAuth } from '../auth/TempAuth'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Verificar si ya está autenticado
    const authStatus = localStorage.getItem('temp_auth')
    setIsAuthenticated(authStatus === 'true')
    setLoading(false)
  }, [])

  const handleLogin = (username: string, password: string): boolean => {
    if (username === 'user.pruebas' && password === 'vayatela') {
      localStorage.setItem('temp_auth', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    localStorage.removeItem('temp_auth')
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <TempAuth onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  )
}