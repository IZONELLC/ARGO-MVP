"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Folder, Video, Calendar, Search, Play, MoreHorizontal, Eye, User } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"

// Mock data for video organization
const videoStructure = {
  "Carlos Rodriguez": {
    weeks: {
      "Semana 1": {
        days: {
          "Día 1": {
            session: "Sesión A - Tren Superior",
            videos: [
              {
                id: 1,
                exercise: "Press de Banca",
                angle: "sagital",
                duration: "0:45",
                size: "12.3 MB",
                status: "pending",
                uploadDate: "2024-01-15",
                weight: "80kg",
                reps: "8",
                rir: "2",
              },
              {
                id: 2,
                exercise: "Remo con Barra",
                angle: "frontal",
                duration: "0:52",
                size: "15.1 MB",
                status: "analyzed",
                uploadDate: "2024-01-15",
                weight: "70kg",
                reps: "10",
                rir: "1",
              },
            ],
          },
          "Día 3": {
            session: "Sesión B - Tren Inferior",
            videos: [
              {
                id: 3,
                exercise: "Sentadilla",
                angle: "sagital",
                duration: "1:12",
                size: "18.7 MB",
                status: "corrected",
                uploadDate: "2024-01-17",
                weight: "100kg",
                reps: "6",
                rir: "3",
              },
            ],
          },
        },
      },
      "Semana 2": {
        days: {
          "Día 1": {
            session: "Sesión A - Tren Superior",
            videos: [
              {
                id: 4,
                exercise: "Press de Banca",
                angle: "sagital",
                duration: "0:48",
                size: "13.2 MB",
                status: "pending",
                uploadDate: "2024-01-22",
                weight: "82.5kg",
                reps: "8",
                rir: "2",
              },
            ],
          },
        },
      },
    },
  },
}

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-muted-foreground", textColor: "text-muted-foreground" },
  analyzed: { label: "Analizado", color: "bg-foreground", textColor: "text-foreground" },
  corrected: { label: "Corregido", color: "bg-foreground", textColor: "text-foreground" },
}

export function VideoManagement() {
  const [selectedClient, setSelectedClient] = useState("Carlos Rodriguez")
  const [selectedWeek, setSelectedWeek] = useState("Semana 1")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const clientData = videoStructure[selectedClient as keyof typeof videoStructure]
  const weekData = clientData?.weeks[selectedWeek as keyof typeof clientData.weeks]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Header Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Videos</h1>
              <p className="text-muted-foreground">Organización por semanas y sesiones de entrenamiento</p>
            </div>

            <div className="flex gap-3">
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-48 bg-card border-border rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {Object.keys(videoStructure).map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-32 bg-card border-border rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {clientData &&
                    Object.keys(clientData.weeks).map((week) => (
                      <SelectItem key={week} value={week}>
                        {week}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por ejercicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border rounded-2xl"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-card border-border rounded-2xl">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="analyzed">Analizados</SelectItem>
                <SelectItem value="corrected">Corregidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Video Organization */}
          {weekData && (
            <div className="space-y-6">
              {Object.entries(weekData.days).map(([dayName, dayData]) => (
                <Card key={dayName} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-foreground">{dayName}</CardTitle>
                          <p className="text-muted-foreground text-sm">{dayData.session}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-border text-muted-foreground rounded-full">
                        {dayData.videos.length} videos
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dayData.videos
                        .filter(
                          (video) =>
                            video.exercise.toLowerCase().includes(searchTerm.toLowerCase()) &&
                            (filterStatus === "all" || video.status === filterStatus),
                        )
                        .map((video) => {
                          const status = statusConfig[video.status as keyof typeof statusConfig]

                          return (
                            <Card
                              key={video.id}
                              className="bg-muted border-border hover:border-muted-foreground transition-colors"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                                      <Video className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-foreground text-sm">{video.exercise}</h4>
                                      <p className="text-xs text-muted-foreground">Ángulo {video.angle}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </div>

                                <div className="space-y-2 mb-3">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Duración:</span>
                                    <span className="text-foreground">{video.duration}</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Peso:</span>
                                    <span className="text-foreground">
                                      {video.weight} x {video.reps} (RIR {video.rir})
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Tamaño:</span>
                                    <span className="text-foreground">{video.size}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs border-0 ${status.color} ${status.textColor} rounded-full`}
                                  >
                                    {status.label}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{video.uploadDate}</span>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 border-border text-foreground hover:bg-accent bg-transparent rounded-2xl"
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Ver
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-border text-foreground hover:bg-accent bg-transparent rounded-2xl"
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                    </div>

                    {dayData.videos.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Folder className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No hay videos para este día</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
