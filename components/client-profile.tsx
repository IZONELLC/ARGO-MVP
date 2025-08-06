"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  TrendingUp,
  Video,
  Award,
  Edit,
  Save,
  X,
  Activity,
  BarChart3,
} from "lucide-react"

interface ClientProfileProps {
  clientId: string
}

const mockClientData = {
  id: "carlos-rodriguez",
  name: "Carlos Rodriguez",
  email: "carlos.rodriguez@email.com",
  phone: "+34 612 345 678",
  age: 28,
  height: "1.78m",
  weight: "82kg",
  gym: "PowerGym Elite",
  city: "Madrid",
  country: "España",
  joinDate: "2024-01-10",
  status: "active",
  avatar: "/placeholder.svg?height=120&width=120&text=CR",
  goals: "Mejorar técnica de sentadilla y aumentar fuerza en press de banca",
  medicalNotes: "Sin lesiones previas. Ligera molestia en rodilla izquierda ocasional.",
  stats: {
    totalVideos: 24,
    analyzedVideos: 22,
    avgTechnicalScore: 85,
    improvement: 12,
    sessionsCompleted: 18,
    currentStreak: 5,
  },
  exercises: [
    { name: "Sentadilla", sessions: 8, avgScore: 87, lastWeight: "100kg", improvement: 15 },
    { name: "Press de Banca", sessions: 6, avgScore: 82, lastWeight: "80kg", improvement: 8 },
    { name: "Peso Muerto", sessions: 4, avgScore: 90, lastWeight: "120kg", improvement: 12 },
  ],
  recentSessions: [
    {
      date: "2024-01-22",
      exercise: "Sentadilla",
      weight: "102.5kg",
      reps: "6",
      score: 88,
      status: "completed",
    },
    {
      date: "2024-01-20",
      exercise: "Press de Banca",
      weight: "82.5kg",
      reps: "8",
      score: 85,
      status: "completed",
    },
    {
      date: "2024-01-18",
      exercise: "Peso Muerto",
      weight: "125kg",
      reps: "5",
      score: 92,
      status: "completed",
    },
  ],
}

export function ClientProfile({ clientId }: ClientProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [clientData, setClientData] = useState(mockClientData)

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
    console.log("Saving client data:", clientData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data
    setClientData(mockClientData)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-400">{clientData.name}</h1>
            <div className="flex items-center gap-4 text-slate-400 mt-1">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {clientData.gym}, {clientData.city}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Desde {clientData.joinDate}</span>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-400">
                {clientData.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-slate-600 text-slate-300 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="border-blue-600 text-blue-400">
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Videos Analizados</CardTitle>
            <Video className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{clientData.stats.analyzedVideos}</div>
            <p className="text-xs text-slate-400">de {clientData.stats.totalVideos} totales</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Puntuación Técnica</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{clientData.stats.avgTechnicalScore}%</div>
            <p className="text-xs text-green-400">+{clientData.stats.improvement}% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Sesiones Completadas</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{clientData.stats.sessionsCompleted}</div>
            <p className="text-xs text-slate-400">este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Racha Actual</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{clientData.stats.currentStreak}</div>
            <p className="text-xs text-slate-400">días consecutivos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
            Perfil
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-slate-700">
            Progreso
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-slate-700">
            Sesiones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Nombre</Label>
                    {isEditing ? (
                      <Input
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">{clientData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-slate-300">Edad</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={clientData.age}
                        onChange={(e) => setClientData({ ...clientData, age: Number.parseInt(e.target.value) })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">{clientData.age} años</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Altura</Label>
                    {isEditing ? (
                      <Input
                        value={clientData.height}
                        onChange={(e) => setClientData({ ...clientData, height: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">{clientData.height}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-slate-300">Peso</Label>
                    {isEditing ? (
                      <Input
                        value={clientData.weight}
                        onChange={(e) => setClientData({ ...clientData, weight: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white mt-1">{clientData.weight}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        type="email"
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <span className="text-white">{clientData.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Teléfono</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <span className="text-white">{clientData.phone}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals and Notes */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Objetivos y Notas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Objetivos</Label>
                  {isEditing ? (
                    <Textarea
                      value={clientData.goals}
                      onChange={(e) => setClientData({ ...clientData, goals: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="text-white mt-1">{clientData.goals}</p>
                  )}
                </div>

                <div>
                  <Label className="text-slate-300">Notas Médicas</Label>
                  {isEditing ? (
                    <Textarea
                      value={clientData.medicalNotes}
                      onChange={(e) => setClientData({ ...clientData, medicalNotes: e.target.value })}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="text-white mt-1">{clientData.medicalNotes}</p>
                  )}
                </div>

                <div>
                  <Label className="text-slate-300">Gimnasio</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {isEditing ? (
                      <Input
                        value={clientData.gym}
                        onChange={(e) => setClientData({ ...clientData, gym: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <span className="text-white">{clientData.gym}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Exercise Progress */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Progreso por Ejercicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {clientData.exercises.map((exercise, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{exercise.name}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">{exercise.sessions} sesiones</span>
                        <span className="text-green-400">+{exercise.improvement}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Puntuación:</span>
                        <span className="text-white ml-2">{exercise.avgScore}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Último peso:</span>
                        <span className="text-white ml-2">{exercise.lastWeight}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Mejora:</span>
                        <span className="text-green-400 ml-2">+{exercise.improvement}%</span>
                      </div>
                    </div>
                    <Progress value={exercise.avgScore} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          {/* Recent Sessions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sesiones Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData.recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{session.exercise}</h4>
                        <p className="text-sm text-slate-400">
                          {session.weight} x {session.reps} • {session.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{session.score}%</div>
                      <Badge variant="outline" className="border-green-600 text-green-400 text-xs">
                        Completado
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
