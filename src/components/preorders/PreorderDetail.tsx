import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Package, Truck, CheckCircle, Clock, User, CreditCard, Calendar, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

// Mock data - en una app real esto vendría de una API
const mockPreorder = {
  id: '1',
  orderNumber: 'PRE-2024-001',
  customer: 'Juan Pérez',
  customerEmail: 'juan.perez@email.com',
  customerPhone: '+34 666 123 456',
  product: 'iPhone 15 Pro Max',
  productSku: 'IPH15PM-256-TIT',
  quantity: 2,
  unitPrice: 1199.00,
  totalAmount: 2398.00,
  status: 'confirmed',
  paymentStatus: 'paid',
  paymentMethod: 'credit_card',
  estimatedDelivery: '2024-02-15T00:00:00Z',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-16T09:15:00Z',
  shippingAddress: {
    street: 'Calle Mayor 123',
    city: 'Madrid',
    postalCode: '28001',
    country: 'España'
  },
  notes: 'Cliente prefiere entrega por la mañana. Llamar antes de entregar.',
  timeline: [
    {
      id: '1',
      status: 'created',
      description: 'Prepedido creado',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      status: 'payment_received',
      description: 'Pago recibido y confirmado',
      timestamp: '2024-01-15T11:00:00Z'
    },
    {
      id: '3',
      status: 'confirmed',
      description: 'Prepedido confirmado',
      timestamp: '2024-01-16T09:15:00Z'
    }
  ]
}

export function PreorderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // En una app real, aquí harías fetch de los datos basado en el ID
  const preorder = mockPreorder

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
      case 'confirmed': return <CheckCircle className="w-5 h-5" />
      case 'pending': return <Clock className="w-5 h-5" />
      case 'processing': return <Package className="w-5 h-5" />
      case 'shipped': return <Truck className="w-5 h-5" />
      case 'delivered': return <CheckCircle className="w-5 h-5" />
      case 'cancelled': return <Clock className="w-5 h-5" />
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
            onClick={() => navigate('/preorders')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{preorder.orderNumber}</h1>
            <p className="text-gray-600 mt-1">Prepedido para {preorder.customer}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/preorders/${id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{preorder.product}</h3>
                    <p className="text-sm text-gray-500">SKU: {preorder.productSku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">€{preorder.unitPrice.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">por unidad</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cantidad:</span>
                  <span className="font-medium">{preorder.quantity} unidades</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">€{(preorder.unitPrice * preorder.quantity).toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-primary">€{preorder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Datos de Contacto</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{preorder.customer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{preorder.customerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{preorder.customerPhone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Dirección de Envío</h4>
                  <div className="space-y-1">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        <p>{preorder.shippingAddress.street}</p>
                        <p>{preorder.shippingAddress.postalCode} {preorder.shippingAddress.city}</p>
                        <p>{preorder.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {preorder.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{preorder.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Historial del Pedido</CardTitle>
              <CardDescription>Cronología de eventos del prepedido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preorder.timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      index === 0 ? 'bg-primary' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleString('es-ES')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Estado del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(preorder.status)}
                <Badge className={getStatusColor(preorder.status)}>
                  {getStatusText(preorder.status)}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Entrega Estimada</p>
                    <p className="text-sm text-gray-600">
                      {new Date(preorder.estimatedDelivery).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <Badge className={getPaymentStatusColor(preorder.paymentStatus)}>
                  {getPaymentStatusText(preorder.paymentStatus)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Método:</span>
                  <span className="text-sm font-medium">Tarjeta de Crédito</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-sm font-medium">€{preorder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                Enviar Actualización al Cliente
              </Button>
              <Button variant="outline" className="w-full">
                Generar Factura
              </Button>
              <Button variant="outline" className="w-full">
                Imprimir Etiqueta de Envío
              </Button>
            </CardContent>
          </Card>

          {/* Dates Card */}
          <Card>
            <CardHeader>
              <CardTitle>Fechas Importantes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Creado</p>
                  <p className="text-gray-500">
                    {new Date(preorder.createdAt).toLocaleString('es-ES')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Última actualización</p>
                  <p className="text-gray-500">
                    {new Date(preorder.updatedAt).toLocaleString('es-ES')}
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