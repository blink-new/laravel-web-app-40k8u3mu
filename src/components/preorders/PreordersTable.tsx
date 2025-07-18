import { useState, useMemo } from 'react'
import { MoreHorizontal, Edit, Trash2, Eye, Plus, Package, Truck, CheckCircle, Clock, Search, Filter, X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
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
const mockPreorders = [
  {
    id: '1',
    orderNumber: 'PRE-2024-001',
    customer: 'Juan Pérez',
    product: 'iPhone 15 Pro Max',
    quantity: 2,
    totalAmount: 2398.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-02-15',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    orderNumber: 'PRE-2024-002',
    customer: 'María García',
    product: 'MacBook Pro M3',
    quantity: 1,
    totalAmount: 2499.00,
    status: 'pending',
    paymentStatus: 'pending',
    estimatedDelivery: '2024-02-20',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    orderNumber: 'PRE-2024-003',
    customer: 'Carlos López',
    product: 'iPad Air',
    quantity: 3,
    totalAmount: 1797.00,
    status: 'processing',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-02-10',
    createdAt: '2024-01-12'
  },
  {
    id: '4',
    orderNumber: 'PRE-2024-004',
    customer: 'Ana Martín',
    product: 'Apple Watch Series 9',
    quantity: 1,
    totalAmount: 399.00,
    status: 'shipped',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-01-25',
    createdAt: '2024-01-10'
  },
  {
    id: '5',
    orderNumber: 'PRE-2024-005',
    customer: 'Pedro Ruiz',
    product: 'AirPods Pro',
    quantity: 2,
    totalAmount: 498.00,
    status: 'cancelled',
    paymentStatus: 'refunded',
    estimatedDelivery: null,
    createdAt: '2024-01-08'
  },
  {
    id: '6',
    orderNumber: 'PRE-2024-006',
    customer: 'Laura Sánchez',
    product: 'iPad Pro',
    quantity: 1,
    totalAmount: 1299.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-02-18',
    createdAt: '2024-01-07'
  },
  {
    id: '7',
    orderNumber: 'PRE-2024-007',
    customer: 'Miguel Torres',
    product: 'MacBook Air M2',
    quantity: 1,
    totalAmount: 1199.00,
    status: 'processing',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-02-12',
    createdAt: '2024-01-06'
  },
  {
    id: '8',
    orderNumber: 'PRE-2024-008',
    customer: 'Carmen Ruiz',
    product: 'iPhone 15',
    quantity: 1,
    totalAmount: 899.00,
    status: 'shipped',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-01-28',
    createdAt: '2024-01-05'
  },
  {
    id: '9',
    orderNumber: 'PRE-2024-009',
    customer: 'Antonio López',
    product: 'Apple TV 4K',
    quantity: 2,
    totalAmount: 398.00,
    status: 'delivered',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-01-20',
    createdAt: '2024-01-04'
  },
  {
    id: '10',
    orderNumber: 'PRE-2024-010',
    customer: 'Isabel García',
    product: 'HomePod mini',
    quantity: 3,
    totalAmount: 297.00,
    status: 'pending',
    paymentStatus: 'pending',
    estimatedDelivery: '2024-02-22',
    createdAt: '2024-01-03'
  },
  {
    id: '11',
    orderNumber: 'PRE-2024-011',
    customer: 'Roberto Martín',
    product: 'Magic Keyboard',
    quantity: 1,
    totalAmount: 179.00,
    status: 'cancelled',
    paymentStatus: 'refunded',
    estimatedDelivery: null,
    createdAt: '2024-01-02'
  },
  {
    id: '12',
    orderNumber: 'PRE-2024-012',
    customer: 'Elena Fernández',
    product: 'Studio Display',
    quantity: 1,
    totalAmount: 1749.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    estimatedDelivery: '2024-02-25',
    createdAt: '2024-01-01'
  }
]

export function PreordersTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [preorders] = useState(mockPreorders)
  const navigate = useNavigate()

  // Filter and search logic
  const filteredPreorders = useMemo(() => {
    return preorders.filter(preorder => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        preorder.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        preorder.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        preorder.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        preorder.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        preorder.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        preorder.totalAmount.toString().includes(searchTerm)

      // Date range filter
      const preorderDate = new Date(preorder.createdAt)
      const matchesDateFilter = !dateRange?.from || 
        (preorderDate >= dateRange.from && 
         (!dateRange.to || preorderDate <= dateRange.to))

      return matchesSearch && matchesDateFilter
    })
  }, [preorders, searchTerm, dateRange])

  // Pagination logic
  const totalPages = Math.ceil(filteredPreorders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPreorders = filteredPreorders.slice(startIndex, endIndex)

  // Reset pagination when filters change
  useState(() => {
    setCurrentPage(1)
  }, [searchTerm, dateRange])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado'
      case 'pending': return 'Pendiente'
      case 'processing': return 'Procesando'
      case 'shipped': return 'Enviado'
      case 'delivered': return 'Entregado'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagado'
      case 'pending': return 'Pendiente'
      case 'failed': return 'Fallido'
      case 'refunded': return 'Reembolsado'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <Package className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <Trash2 className="w-4 h-4" />
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

  const totalRevenue = preorders
    .filter(p => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + p.totalAmount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prepedidos</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los prepedidos del sistema</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate('/preorders/new')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Prepedido
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {preorders.filter(p => p.status === 'pending').length}
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
                  {preorders.filter(p => p.status === 'confirmed').length}
                </div>
                <p className="text-sm text-gray-600">Confirmados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {preorders.filter(p => p.status === 'processing').length}
                </div>
                <p className="text-sm text-gray-600">Procesando</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {preorders.filter(p => p.status === 'shipped').length}
                </div>
                <p className="text-sm text-gray-600">Enviados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">€</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  €{totalRevenue.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Ingresos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preorders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Prepedidos ({filteredPreorders.length})</CardTitle>
              <CardDescription>
                Todos los prepedidos del sistema
              </CardDescription>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar prepedidos..."
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
                <TableHead>Orden</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Entrega Est.</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPreorders.map((preorder) => (
                <TableRow key={preorder.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{preorder.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(preorder.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {preorder.customer}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{preorder.product}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {preorder.quantity}
                  </TableCell>
                  <TableCell className="font-medium">
                    €{preorder.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(preorder.status)}
                      <Badge className={getStatusColor(preorder.status)}>
                        {getStatusText(preorder.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusColor(preorder.paymentStatus)}>
                      {getPaymentStatusText(preorder.paymentStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {preorder.estimatedDelivery 
                      ? new Date(preorder.estimatedDelivery).toLocaleDateString('es-ES')
                      : 'N/A'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/preorders/${preorder.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/preorders/${preorder.id}/edit`)}>
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
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredPreorders.length)} de {filteredPreorders.length} resultados
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