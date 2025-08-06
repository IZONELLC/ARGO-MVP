"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DatabaseIcon,
  Search,
  Filter,
  Download,
  Upload,
  Users,
  Video,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"

// Mock database data
const clients = [
  {
    id: 1,
    name: "Alonso Valdiviezo",
    email: "Avaldiviezo111@email.com",
    gym: "Bioritmo",
    city: "Lima,
    joinDate: "2025-08-02",
    status: "active",
    totalVideos: 2,
    lastActivity: "2025-08-05",
  },
  {
    id: 2,
    name: "Ana Martinez",
    email: "ana@email.com",
    gym: "FitCenter Pro",
    city: "Barcelona",
    joinDate: "2024-01-12",
    status: "active",
    totalVideos: 18,
    lastActivity: "2024-01-21",
  },
  {
    id: 3,
    name: "Miguel Santos",
    email: "miguel@email.com",
    gym: "Iron Temple",
    city: "Valencia",
    joinDate: "2024-01-08",
    status: "inactive",
    totalVideos: 32,
    lastActivity: "2024-01-15",
  },
]

const videos = [
  {
    id: 1,
    clientName: "Carlos Rodriguez",
    exercise: "Sentadilla",
    uploadDate: "2024-01-22",
    duration: "0:45",
    size: "12.3 MB",
    status: "analyzed",
    technicalScore: 88,
  },
  {
    id: 2,
    clientName: "Ana Martinez",
    exercise: "Press de Banca",
    uploadDate: "2024-01-21",
    duration: "0:52",
    size: "15.1 MB",
    status: "pending",
    technicalScore: null,
  },
  {
    id: 3,
    clientName: "Miguel Santos",
    exercise: "Peso Muerto",
    uploadDate: "2024-01-20",
    duration: "1:12",
    size: "18.7 MB",
    status: "corrected",
    technicalScore: 92,
  },
]

const exercises = [
  {
    id: 1,
    name: "Sentadilla",
    category: "Tren Inferior",
    totalAnalyses: 45,
    avgScore: 82,
    lastUsed: "2024-01-22",
  },
  {
    id: 2,
    name: "Press de Banca",
    category: "Tren Superior",
    totalAnalyses: 38,
    avgScore: 79,
    lastUsed: "2024-01-21",
  },
  {
    id: 3,
    name: "Peso Muerto",
    category: "Tren Inferior",
    totalAnalyses: 32,
    avgScore: 86,
    lastUsed: "2024-01-20",
  },
]

export function Database() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedTab, setSelectedTab] = useState("clients")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-900/20 border-green-700"
      case "inactive":
        return "text-red-400 bg-red-900/20 border-red-700"
      case "analyzed":
        return "text-blue-400 bg-blue-900/20 border-blue-700"
      case "pending":
        return "text-orange-400 bg-orange-900/20 border-orange-700"
      case "corrected":
        return "text-green-400 bg-green-900/20 border-green-700"
      default:
        return "text-slate-400 bg-slate-900/20 border-slate-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "analyzed":
        return "Analizado"
      case "pending":
        return "Pendiente"
      case "corrected":
        return "Corregido"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
            <DatabaseIcon className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-purple-400">Base de Datos</h1>
            <p className="text-slate-400">Gestión completa de datos del sistema</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Registro
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Buscar en la base de datos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40 bg-slate-800 border-slate-600">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filtros Avanzados
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="clients" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Clientes ({clients.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-slate-700">
            <Video className="h-4 w-4 mr-2" />
            Videos ({videos.length})
          </TabsTrigger>
          <TabsTrigger value="exercises" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Ejercicios ({exercises.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Registro de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Cliente</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Ubicación</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Videos</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Última Actividad</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients
                      .filter(
                        (client) =>
                          client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                          (filterStatus === "all" || client.status === filterStatus),
                      )
                      .map((client) => (
                        <tr key={client.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-white">{client.name}</div>
                              <div className="text-sm text-slate-400">{client.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="text-white">{client.gym}</div>
                              <div className="text-sm text-slate-400">{client.city}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className={getStatusColor(client.status)}>
                              {getStatusLabel(client.status)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white">{client.totalVideos}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-slate-400 text-sm">{client.lastActivity}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Registro de Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Video</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Cliente</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Puntuación</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Fecha</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos
                      .filter(
                        (video) =>
                          video.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.exercise.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((video) => (
                        <tr key={video.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-white">{video.exercise}</div>
                              <div className="text-sm text-slate-400">
                                {video.duration} • {video.size}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white">{video.clientName}</div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className={getStatusColor(video.status)}>
                              {getStatusLabel(video.status)}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white">{video.technicalScore ? `${video.technicalScore}%` : "-"}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-slate-400 text-sm">{video.uploadDate}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Registro de Ejercicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Ejercicio</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Categoría</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Análisis</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Puntuación Promedio</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Último Uso</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises
                      .filter(
                        (exercise) =>
                          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exercise.category.toLowerCase().includes(searchTerm.toLowerCase()),
                      )
                      .map((exercise) => (
                        <tr key={exercise.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                          <td className="py-4 px-4">
                            <div className="font-medium text-white">{exercise.name}</div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {exercise.category}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white">{exercise.totalAnalyses}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white">{exercise.avgScore}%</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-slate-400 text-sm">{exercise.lastUsed}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
