import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ChevronLeft,
  Shield,
  BarChart3,
  ClipboardList,
  Package
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ClipboardList, label: 'Solicitudes', href: '/requests' },
  { icon: Package, label: 'Prepedidos', href: '/preorders' },
  { icon: BarChart3, label: 'Reportes', href: '/reports' },
]

const adminMenuItems = [
  { icon: Users, label: 'Usuarios', href: '/users' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center space-x-3", !isOpen && "justify-center")}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-sidebar-foreground font-semibold text-lg">Admin Panel</h1>
              <p className="text-sidebar-foreground/60 text-xs">Panel de Control</p>
            </div>
          )}
        </div>
        
        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors",
            !isOpen && "hidden"
          )}
        >
          <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-6">
        {/* Main Menu */}
        <div className="space-y-2">
          {mainMenuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70"
                )} />
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Admin Section */}
        <div className="space-y-2">
          {isOpen && (
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                Administración
              </h3>
            </div>
          )}
          {adminMenuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70"
                )} />
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <p className="text-sidebar-accent-foreground text-sm font-medium">Admin v1.0</p>
            <p className="text-sidebar-accent-foreground/60 text-xs">Powered by Blink</p>
          </div>
        </div>
      )}
    </div>
  )
}