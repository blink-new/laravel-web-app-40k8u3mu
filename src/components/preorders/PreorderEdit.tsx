import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { DatePicker } from '../ui/date-picker'

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
  estimatedDelivery: new Date('2024-02-15'),
  shippingStreet: 'Calle Mayor 123',
  shippingCity: 'Madrid',
  shippingPostalCode: '28001',
  shippingCountry: 'España',
  notes: 'Cliente prefiere entrega por la mañana. Llamar antes de entregar.'
}

export function PreorderEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // En una app real, aquí harías fetch de los datos basado en el ID
  const [formData, setFormData] = useState(mockPreorder)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Recalcular total
    const newTotal = formData.unitPrice * formData.quantity
    setFormData(prev => ({ ...prev, totalAmount: newTotal }))
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    navigate(`/preorders/${id}`)
  }

  const handleCancel = () => {
    navigate(`/preorders/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/preorders/${id}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Prepedido</h1>
            <p className="text-gray-600 mt-1">{formData.orderNumber}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>Datos de contacto del cliente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customer">Nombre del Cliente</Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => handleInputChange('customer', e.target.value)}
                    placeholder="Nombre completo del cliente"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      placeholder="email@cliente.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Teléfono</Label>
                    <Input
                      id="customerPhone"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="+34 666 123 456"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Producto</CardTitle>
                <CardDescription>Detalles del producto pedido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product">Producto</Label>
                  <Input
                    id="product"
                    value={formData.product}
                    onChange={(e) => handleInputChange('product', e.target.value)}
                    placeholder="Nombre del producto"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="productSku">SKU del Producto</Label>
                  <Input
                    id="productSku"
                    value={formData.productSku}
                    onChange={(e) => handleInputChange('productSku', e.target.value)}
                    placeholder="Código SKU"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="unitPrice">Precio Unitario (€)</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.unitPrice}
                      onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="totalAmount">Total (€)</Label>
                    <Input
                      id="totalAmount"
                      type="number"
                      step="0.01"
                      value={formData.unitPrice * formData.quantity}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección de Envío</CardTitle>
                <CardDescription>Dirección donde se entregará el pedido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shippingStreet">Dirección</Label>
                  <Input
                    id="shippingStreet"
                    value={formData.shippingStreet}
                    onChange={(e) => handleInputChange('shippingStreet', e.target.value)}
                    placeholder="Calle y número"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="shippingCity">Ciudad</Label>
                    <Input
                      id="shippingCity"
                      value={formData.shippingCity}
                      onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                      placeholder="Ciudad"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingPostalCode">Código Postal</Label>
                    <Input
                      id="shippingPostalCode"
                      value={formData.shippingPostalCode}
                      onChange={(e) => handleInputChange('shippingPostalCode', e.target.value)}
                      placeholder="28001"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingCountry">País</Label>
                    <Input
                      id="shippingCountry"
                      value={formData.shippingCountry}
                      onChange={(e) => handleInputChange('shippingCountry', e.target.value)}
                      placeholder="España"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notas</CardTitle>
                <CardDescription>Información adicional sobre el pedido</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Notas adicionales sobre el pedido..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="processing">Procesando</SelectItem>
                      <SelectItem value="shipped">Enviado</SelectItem>
                      <SelectItem value="delivered">Entregado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="paymentStatus">Estado del Pago</Label>
                  <Select value={formData.paymentStatus} onValueChange={(value) => handleInputChange('paymentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado del pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="paid">Pagado</SelectItem>
                      <SelectItem value="failed">Fallido</SelectItem>
                      <SelectItem value="refunded">Reembolsado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="paymentMethod">Método de Pago</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="debit_card">Tarjeta de Débito</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank_transfer">Transferencia</SelectItem>
                      <SelectItem value="cash">Efectivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Delivery */}
            <Card>
              <CardHeader>
                <CardTitle>Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="estimatedDelivery">Fecha Estimada de Entrega</Label>
                  <DatePicker
                    date={formData.estimatedDelivery}
                    onDateChange={(date) => handleInputChange('estimatedDelivery', date)}
                    placeholder="Seleccionar fecha de entrega"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}