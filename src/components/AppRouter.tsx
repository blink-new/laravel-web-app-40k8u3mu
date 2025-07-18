import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './dashboard/Dashboard'
import { UsersTable } from './users/UsersTable'
import { RequestsTable } from './requests/RequestsTable'
import { RequestDetail } from './requests/RequestDetail'
import { RequestEdit } from './requests/RequestEdit'
import { PreordersTable } from './preorders/PreordersTable'
import { PreorderDetail } from './preorders/PreorderDetail'
import { PreorderEdit } from './preorders/PreorderEdit'

export function AppRouter() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />
      
      {/* Users */}
      <Route path="/users" element={<UsersTable />} />
      

      {/* Requests */}
      <Route path="/requests" element={<RequestsTable />} />
      <Route path="/requests/:id" element={<RequestDetail />} />
      <Route path="/requests/:id/edit" element={<RequestEdit />} />
      
      {/* Preorders */}
      <Route path="/preorders" element={<PreordersTable />} />
      <Route path="/preorders/:id" element={<PreorderDetail />} />
      <Route path="/preorders/:id/edit" element={<PreorderEdit />} />
      
      {/* Placeholder routes */}

      <Route path="/reports" element={
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Reportes</h2>
          <p className="text-gray-600">Panel de reportes próximamente...</p>
        </div>
      } />
      
      <Route path="/settings" element={
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Configuración</h2>
          <p className="text-gray-600">Panel de configuración próximamente...</p>
        </div>
      } />
    </Routes>
  )
}