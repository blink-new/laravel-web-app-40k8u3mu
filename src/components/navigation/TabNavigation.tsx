import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dashboard } from '../dashboard/Dashboard'
import { UsersTable } from '../users/UsersTable'

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="users">Usuarios</TabsTrigger>
        <TabsTrigger value="settings">Configuración</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      
      <TabsContent value="users">
        <UsersTable />
      </TabsContent>
      

      <TabsContent value="settings">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Configuración</h2>
          <p className="text-gray-600">Panel de configuración próximamente...</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}