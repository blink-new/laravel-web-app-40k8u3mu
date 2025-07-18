import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Clock, CheckCircle, XCircle, Eye, Calendar, User, Building } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

// Mock data - en una app real esto vendría de una API
const mockRequest = {
  id: '1',
  title: 'Solicitud de Acceso VPN',
  description: 'Necesito acceso VPN para trabajar desde casa de manera segura. Requiero acceso a los servidores de desarrollo y producción para poder realizar mis tareas diarias.',
  requester: 'Juan Pérez',
  requesterEmail: 'juan.perez@empresa.com',
  department: 'IT',
  priority: 'high',
  status: 'pending',
  type: 'access',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T14:20:00Z',
  dueDate: '2024-01-20T23:59:59Z',
  assignedTo: 'María García',
  assignedToEmail: 'maria.garcia@empresa.com',
  comments: [
    {
      id: '1',
      author: 'María García',
      content: 'Solicitud recibida, revisando los permisos necesarios.',
      createdAt: '2024-01-15T11:00:00Z'
    },
    {
      id: '2',
      author: 'Juan Pérez',
      content: 'Gracias, necesito acceso urgente para el proyecto del cliente ABC.',
      createdAt: '2024-01-15T14:20:00Z'
    }
  ],
  attachments: [
    {
      id: '1',
      name: 'justificacion_vpn.pdf',
      size: '245 KB',
      uploadedAt: '2024-01-15T10:30:00Z'
    }
  ]
}

export function RequestDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // En una app real, aquí harías fetch de los datos basado en el ID
  const request = mockRequest

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobada'
      case 'rejected': return 'Rechazada'
      case 'pending': return 'Pendiente'
      case 'in_review': return 'En Revisión'
      default: return status
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta'
      case 'medium': return 'Media'
      case 'low': return 'Baja'
      default: return priority
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-5 h-5" />
      case 'rejected': return <XCircle className="w-5 h-5" />
      case 'pending': return <Clock className="w-5 h-5" />
      case 'in_review': return <Eye className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/requests')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{request.title}</h1>
            <p className="text-gray-600 mt-1">Solicitud #{request.id}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/requests/${id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Comentarios ({request.comments.length})</CardTitle>
              <CardDescription>Historial de comentarios de la solicitud</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {request.comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString('es-ES')}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Attachments */}
          {request.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Archivos Adjuntos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {request.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">PDF</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{attachment.name}</p>
                          <p className="text-sm text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Solicitud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(request.status)}
                <Badge className={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Solicitante</p>
                    <p className="text-sm text-gray-600">{request.requester}</p>
                    <p className="text-xs text-gray-500">{request.requesterEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Departamento</p>
                    <p className="text-sm text-gray-600">{request.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha Límite</p>
                    <p className="text-sm text-gray-600">
                      {new Date(request.dueDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Card */}
          <Card>
            <CardHeader>
              <CardTitle>Prioridad</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getPriorityColor(request.priority)}>
                {getPriorityText(request.priority)}
              </Badge>
            </CardContent>
          </Card>

          {/* Assignment Card */}
          <Card>
            <CardHeader>
              <CardTitle>Asignación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">Asignado a:</p>
                <p className="text-sm text-gray-600">{request.assignedTo}</p>
                <p className="text-xs text-gray-500">{request.assignedToEmail}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle>Cronología</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Creada</p>
                  <p className="text-gray-500">
                    {new Date(request.createdAt).toLocaleString('es-ES')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Última actualización</p>
                  <p className="text-gray-500">
                    {new Date(request.updatedAt).toLocaleString('es-ES')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}