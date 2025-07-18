import { useState, useMemo } from 'react'
import { MoreHorizontal, Edit, Trash2, Eye, Plus, Clock, CheckCircle, XCircle, Search, Filter, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { DateRangePicker, DateRange } from '../ui/date-range-picker'
import { useNavigate } from 'react-router-dom'

// Mock data
const mockRequests = [
  {
    id: '1',
    title: 'Solicitud de Acceso VPN',
    requester: 'Juan Pérez',
    department: 'IT',
    priority: 'high',
    status: 'pending',
    type: 'access',
    createdAt: '2024-01-15',
    dueDate: '2024-01-20'
  },
  {
    id: '2',
    title: 'Solicitud de Equipo Nuevo',
    requester: 'María García',
    department: 'Marketing',
    priority: 'medium',
    status: 'approved',
    type: 'equipment',
    createdAt: '2024-01-14',
    dueDate: '2024-01-25'
  },
  {
    id: '3',
    title: 'Solicitud de Vacaciones',
    requester: 'Carlos López',
    department: 'Ventas',
    priority: 'low',
    status: 'rejected',
    type: 'leave',
    createdAt: '2024-01-12',
    dueDate: '2024-01-18'
  },
  {
    id: '4',
    title: 'Solicitud de Capacitación',
    requester: 'Ana Martín',
    department: 'RRHH',
    priority: 'medium',
    status: 'in_review',
    type: 'training',
    createdAt: '2024-01-10',
    dueDate: '2024-01-22'
  },
  {
    id: '5',
    title: 'Solicitud de Presupuesto',
    requester: 'Pedro Ruiz',
    department: 'Finanzas',
    priority: 'high',
    status: 'pending',
    type: 'budget',
    createdAt: '2024-01-08',
    dueDate: '2024-01-15'
  },
  {
    id: '6',
    title: 'Solicitud de Mantenimiento',
    requester: 'Laura Sánchez',
    department: 'Operaciones',
    priority: 'medium',
    status: 'approved',
    type: 'maintenance',
    createdAt: '2024-01-07',
    dueDate: '2024-01-14'
  },
  {
    id: '7',
    title: 'Solicitud de Software',
    requester: 'Miguel Torres',
    department: 'IT',
    priority: 'low',
    status: 'in_review',
    type: 'software',
    createdAt: '2024-01-06',
    dueDate: '2024-01-13'
  },
  {
    id: '8',
    title: 'Solicitud de Reunión',
    requester: 'Carmen Ruiz',
    department: 'Dirección',
    priority: 'high',
    status: 'pending',
    type: 'meeting',
    createdAt: '2024-01-05',
    dueDate: '2024-01-12'
  },
  {
    id: '9',
    title: 'Solicitud de Recursos',
    requester: 'Antonio López',
    department: 'Producción',
    priority: 'medium',
    status: 'rejected',
    type: 'resources',
    createdAt: '2024-01-04',
    dueDate: '2024-01-11'
  },
  {
    id: '10',
    title: 'Solicitud de Formación',
    requester: 'Isabel García',
    department: 'RRHH',
    priority: 'low',
    status: 'approved',
    type: 'training',
    createdAt: '2024-01-03',
    dueDate: '2024-01-10'
  },
  {
    id: '11',
    title: 'Solicitud de Viaje',
    requester: 'Roberto Martín',
    department: 'Ventas',
    priority: 'medium',
    status: 'pending',
    type: 'travel',
    createdAt: '2024-01-02',
    dueDate: '2024-01-09'
  },
  {
    id: '12',
    title: 'Solicitud de Compra',
    requester: 'Elena Fernández',
    department: 'Compras',
    priority: 'high',
    status: 'in_review',
    type: 'purchase',
    createdAt: '2024-01-01',
    dueDate: '2024-01-08'
  }
]

export function RequestsTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [requests] = useState(mockRequests)
  const navigate = useNavigate()

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.type.toLowerCase().includes(searchTerm.toLowerCase())

      // Date range filter
      const requestDate = new Date(request.createdAt)
      const matchesDateFilter = !dateRange?.from || 
        (requestDate >= dateRange.from && 
         (!dateRange.to || requestDate <= dateRange.to))

      return matchesSearch && matchesDateFilter
    })
  }, [requests, searchTerm, dateRange])

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRequests = filteredRequests.slice(startIndex, endIndex)

  // Reset pagination when filters change
  useState(() => {
    setCurrentPage(1)
  }, [searchTerm, dateRange])

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
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'in_review': return <Eye className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setDateRange(undefined)
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm !== '' || dateRange?.from !== undefined

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solicitudes</h1>
          <p className="text-gray-600 mt-1">Gestiona todas las solicitudes del sistema</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate('/requests/new')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {requests.filter(r => r.status === 'pending').length}
                </div>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {requests.filter(r => r.status === 'approved').length}
                </div>
                <p className="text-sm text-gray-600">Aprobadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {requests.filter(r => r.status === 'in_review').length}
                </div>
                <p className="text-sm text-gray-600">En Revisión</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {requests.filter(r => r.status === 'rejected').length}
                </div>
                <p className="text-sm text-gray-600">Rechazadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Solicitudes ({filteredRequests.length})</CardTitle>
              <CardDescription>
                Todas las solicitudes del sistema
              </CardDescription>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar solicitudes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                placeholder="Filtrar por fecha"
                className="w-48"
              />
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 pt-4 border-t">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>Búsqueda: "{searchTerm}"</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {dateRange?.from && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime()
                      ? `${dateRange.from.toLocaleDateString('es-ES')} - ${dateRange.to.toLocaleDateString('es-ES')}`
                      : dateRange.from.toLocaleDateString('es-ES')
                    }
                  </span>
                  <button
                    onClick={() => setDateRange(undefined)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Solicitud</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{request.title}</p>
                      <p className="text-sm text-gray-500">ID: {request.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {request.requester}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {request.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(request.priority)}>
                      {getPriorityText(request.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusText(request.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(request.dueDate).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/requests/${request.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/requests/${request.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredRequests.length)} de {filteredRequests.length} resultados
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}