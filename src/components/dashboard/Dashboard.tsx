import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const stats = [
  {
    title: 'Total Usuarios',
    value: '2,543',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Posts Publicados',
    value: '1,234',
    change: '+8%',
    changeType: 'positive' as const,
    icon: FileText,
    color: 'bg-green-500'
  },
  {
    title: 'Visitas Mensuales',
    value: '45,678',
    change: '+23%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    title: 'Ingresos',
    value: '$12,345',
    change: '-2%',
    changeType: 'negative' as const,
    icon: DollarSign,
    color: 'bg-orange-500'
  }
]

const recentActivity = [
  { id: 1, user: 'Juan Pérez', action: 'creó un nuevo post', time: 'hace 2 minutos', type: 'create' },
  { id: 2, user: 'María García', action: 'actualizó su perfil', time: 'hace 5 minutos', type: 'update' },
  { id: 3, user: 'Carlos López', action: 'eliminó un comentario', time: 'hace 10 minutos', type: 'delete' },
  { id: 4, user: 'Ana Martín', action: 'se registró en la plataforma', time: 'hace 15 minutos', type: 'create' },
  { id: 5, user: 'Pedro Ruiz', action: 'cambió su contraseña', time: 'hace 20 minutos', type: 'update' }
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Bienvenido de vuelta, aquí tienes un resumen de tu aplicación</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Crear Nuevo
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-1">
                <Badge 
                  variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-gray-500 ml-2">desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones realizadas en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'create' ? 'bg-green-500' :
                    activity.type === 'update' ? 'bg-blue-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Tareas comunes del administrador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Gestionar Usuarios
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Crear Post
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Ver Reportes
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              Configurar Pagos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>Estado del Sistema</CardTitle>
          <CardDescription>
            Información sobre el rendimiento y estado de la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <p className="text-sm text-gray-600">Tiempo de Actividad</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <p className="text-sm text-gray-600">Tiempo de Respuesta</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">45GB</div>
              <p className="text-sm text-gray-600">Almacenamiento Usado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}