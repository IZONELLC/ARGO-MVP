"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Video, Clock, Play } from 'lucide-react'

interface Client {
  id: string
  name: string
  weeklyProgress: number
  pendingVideos: number
  correctedVideos: number
}

interface VideoData {
  id: string
  clientId: string
  clientName: string
  exercise: string
  angle: string
  uploadDate: string
  status: "pending" | "corrected" | "needs_improvement"
  week: number
  day: number
}

interface CoachDashboardProps {
  onCorrectVideo: (videoId: string) => void
}

export function CoachDashboard({ onCorrectVideo }: CoachDashboardProps) {
  // Mock data - minimal for MVP
  const clients: Client[] = [
    {
      id: "1",
      name: "Carlos Rodriguez",
      weeklyProgress: 75,
      pendingVideos: 3,
      correctedVideos: 9
    },
    {
      id: "2", 
      name: "María González",
      weeklyProgress: 60,
      pendingVideos: 2,
      correctedVideos: 5
    }
  ]

  const pendingVideos: VideoData[] = [
    {
      id: "v1",
      clientId: "1",
      clientName: "Carlos Rodriguez",
      exercise: "Sentadilla",
      angle: "sagital",
      uploadDate: "2024-01-22",
      status: "pending",
      week: 1,
      day: 1
    },
    {
      id: "v2",
      clientId: "2",
      clientName: "María González", 
      exercise: "Press de Banca",
      angle: "frontal",
      uploadDate: "2024-01-22",
      status: "pending",
      week: 1,
      day: 2
    }
  ]

  const totalPending = clients.reduce((acc, client) => acc + client.pendingVideos, 0)

  return (
    <div className="space-y-6">
      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{clients.length}</div>
            <div className="text-sm text-gray-600">Clientes</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{totalPending}</div>
            <div className="text-sm text-gray-600">Por Corregir</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">8.5</div>
            <div className="text-sm text-gray-600">Min/Video</div>
          </CardContent>
        </Card>
      </div>

      {/* Videos Pending Correction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Videos por Corregir</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingVideos.map((video) => (
            <div key={video.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{video.clientName}</div>
                <div className="text-sm text-gray-600">
                  {video.exercise} • {video.angle} • Semana {video.week}, Día {video.day}
                </div>
              </div>
              <Button
                size="mobile"
                onClick={() => onCorrectVideo(video.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Corregir
              </Button>
            </div>
          ))}
          
          {pendingVideos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No hay videos pendientes</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-sm text-gray-600">
                    {client.weeklyProgress}% progreso semanal
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">
                  <span className="text-orange-600 font-medium">{client.pendingVideos}</span> pendientes
                </div>
                <div className="text-sm text-gray-600">
                  {client.correctedVideos} corregidos
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
