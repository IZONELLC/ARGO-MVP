"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Video,
  Clock,
  Target,
  Award,
  Activity,
  CheckCircle,
} from "lucide-react"

// Mock analytics data
const analyticsData = {
  overview: {
    totalClients: 12,
    activeClients: 8,
    totalVideos: 156,
    videosAnalyzed: 134,
    avgResponseTime: "2.3 horas",
    clientSatisfaction: 4.7,
  },
  weeklyStats: [
    { week: "Sem 1", videos: 23, analyzed: 21, avgScore: 78 },
    { week: "Sem 2", videos: 28, analyzed: 26, avgScore: 82 },
    { week: "Sem 3", videos: 31, analyzed: 29, avgScore: 85 },
    { week: "Sem 4", videos: 26, analyzed: 24, avgScore: 87 },
  ],
  clientProgress: [
    {
      id: 1,
      name: "Carlos Rodriguez",
      totalVideos: 24,
      analyzedVideos: 22,
      avgTechnicalScore: 85,
      improvement: +12,
      lastSession: "2024-01-22",
      status: "excellent",
      exercises: ["Sentadilla", "Press Banca", "Peso Muerto"],
    },
    {
      id: 2,
      name: "Ana Martinez",
      totalVideos: 18,
      analyzedVideos: 16,
      avgTechnicalScore: 78,
      improvement: +8,
      lastSession: "2024-01-21",
      status: "good",
      exercises: ["Sentadilla", "Hip Thrust", "Remo"],
    },
    {
      id: 3,
      name: "Miguel Santos",
      totalVideos: 32,
      analyzedVideos: 30,
      avgTechnicalScore: 92,
      improvement: +5,
      lastSession: "2024-01-20",
      status: "excellent",
      exercises: ["Press Banca", "Dominadas", "Peso Muerto"],
    },
    {
      id: 4,
      name: "Laura Fernandez",
      totalVideos: 15,
      analyzedVideos: 12,
      avgTechnicalScore: 72,
      improvement: -3,
      lastSession: "2024-01-19",
      status: "needs-attention",
      exercises: ["Sentadilla", "Press Militar"],
    },
  ],
  exerciseStats: [
    { exercise: "Sentadilla", totalAnalyses: 45, avgScore: 82, improvement: +7 },
    { exercise: "Press de Banca", totalAnalyses: 38, avgScore: 79, improvement: +4 },
    { exercise: "Peso Muerto", totalAnalyses: 32, avgScore: 86, improvement: +9 },
    { exercise: "Hip Thrust", totalAnalyses: 28, avgScore: 88, improvement: +6 },
    { exercise: "Remo con Barra", totalAnalyses: 25, avgScore: 75, improvement: +3 },
  ],
}

export function CoachAnalytics() {
  const [timeRange, setTimeRange] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("technical-score")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-400 bg-green-900/20 border-green-700"
      case "good":
        return "text-blue-400 bg-blue-900/20 border-blue-700"
      case "needs-attention":
        return "text-orange-400 bg-orange-900/20 border-orange-700"
      default:
        return "text-slate-400 bg-slate-900/20 border-slate-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excellent":
        return "Excelente"
      case "good":
        return "Bueno"
      case "needs-attention":
        return "Requiere Atención"
      default:
        return "Sin Datos"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Análisis del Coach</h1>
          <p className="text-slate-400 mt-1">Estadísticas de uso y progreso de clientes</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analyticsData.overview.totalClients}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 este mes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Clientes Activos</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analyticsData.overview.activeClients}</div>
            <p className="text-xs text-slate-400 mt-1">
              {((analyticsData.overview.activeClients / analyticsData.overview.totalClients) * 100).toFixed(0)}% del
              total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Videos Totales</CardTitle>
            <Video className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analyticsData.overview.totalVideos}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18 esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Videos Analizados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analyticsData.overview.videosAnalyzed}</div>
            <p className="text-xs text-slate-400 mt-1">
              {((analyticsData.overview.videosAnalyzed / analyticsData.overview.totalVideos) * 100).toFixed(0)}%
              completado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Tiempo Respuesta</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analyticsData.overview.avgResponseTime}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.5h vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Satisfacción</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analyticsData.overview.clientSatisfaction}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.2 vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Performance Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Rendimiento Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.weeklyStats.map((week, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{week.week}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-white">{week.videos} videos</span>
                      <span className="text-green-400">{week.avgScore}% técnica</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Progress value={(week.analyzed / week.videos) * 100} className="h-2" />
                    </div>
                    <div className="w-20">
                      <Progress value={week.avgScore} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exercise Performance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              Rendimiento por Ejercicio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.exerciseStats.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{exercise.exercise}</h4>
                    <p className="text-sm text-slate-400">{exercise.totalAnalyses} análisis</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{exercise.avgScore}%</div>
                    <div
                      className={`text-sm flex items-center ${
                        exercise.improvement > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {exercise.improvement > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {exercise.improvement > 0 ? "+" : ""}
                      {exercise.improvement}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Progress Summary */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5" />
            Resumen de Progreso de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Cliente</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Videos</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Puntuación Técnica</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Mejora</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Última Sesión</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.clientProgress.map((client) => (
                  <tr key={client.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-white">{client.name}</div>
                        <div className="text-sm text-slate-400">
                          {client.exercises.slice(0, 2).join(", ")}
                          {client.exercises.length > 2 && ` +${client.exercises.length - 2}`}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white">
                        {client.analyzedVideos}/{client.totalVideos}
                      </div>
                      <Progress value={(client.analyzedVideos / client.totalVideos) * 100} className="w-16 h-1 mt-1" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-lg font-bold text-white">{client.avgTechnicalScore}%</div>
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`flex items-center ${client.improvement > 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {client.improvement > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {client.improvement > 0 ? "+" : ""}
                        {client.improvement}%
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={getStatusColor(client.status)}>
                        {getStatusLabel(client.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-slate-400 text-sm">{client.lastSession}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
