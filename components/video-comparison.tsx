"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GitCompare, Play, Calendar, User, Dumbbell } from 'lucide-react'

interface VideoData {
  id: string
  title: string
  client: string
  exercise: string
  date: string
  duration: string
  weight: string
  reps: string
  angle: string
  url: string
  technicalScore: number
}

interface VideoComparisonProps {
  currentVideo: VideoData
}

const comparisonVideos: VideoData[] = [
  {
    id: "2",
    title: "Sentadilla - Semana 1",
    client: "Carlos Rodriguez",
    exercise: "Sentadilla",
    date: "2024-01-08",
    duration: "1:05",
    weight: "95kg",
    reps: "8",
    angle: "Sagital",
    url: "https://www.youtube.com/embed/gcNh17Ckjgg",
    technicalScore: 75,
  },
  {
    id: "3",
    title: "Sentadilla - Semana 3",
    client: "Carlos Rodriguez",
    exercise: "Sentadilla",
    date: "2024-02-05",
    duration: "1:18",
    weight: "105kg",
    reps: "6",
    angle: "Sagital",
    url: "https://www.youtube.com/embed/MVMNk0HiTMg",
    technicalScore: 88,
  },
  {
    id: "4",
    title: "Sentadilla - Ana Martinez",
    client: "Ana Martinez",
    exercise: "Sentadilla",
    date: "2024-01-20",
    duration: "0:58",
    weight: "70kg",
    reps: "10",
    angle: "Sagital",
    url: "https://www.youtube.com/embed/Dy28eq2PjcM",
    technicalScore: 92,
  },
]

export function VideoComparison({ currentVideo }: VideoComparisonProps) {
  const [selectedComparison, setSelectedComparison] = useState<string>("")
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "overlay">("side-by-side")

  const comparisonVideo = comparisonVideos.find(v => v.id === selectedComparison)

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GitCompare className="h-5 w-5" />
          Comparación de Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comparison Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select value={selectedComparison} onValueChange={setSelectedComparison}>
              <SelectTrigger className="bg-muted border-border rounded-2xl">
                <SelectValue placeholder="Seleccionar video para comparar" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {comparisonVideos.map((video) => (
                  <SelectItem key={video.id} value={video.id}>
                    <div className="flex items-center gap-2">
                      <span>{video.title}</span>
                      <Badge variant="outline" className="text-xs border-border">
                        {video.technicalScore}%
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant={comparisonMode === "side-by-side" ? "default" : "outline"}
              onClick={() => setComparisonMode("side-by-side")}
              className={`rounded-2xl ${
                comparisonMode === "side-by-side"
                  ? "bg-foreground text-background"
                  : "border-border text-foreground hover:bg-accent"
              }`}
            >
              Lado a Lado
            </Button>
            <Button
              variant={comparisonMode === "overlay" ? "default" : "outline"}
              onClick={() => setComparisonMode("overlay")}
              className={`rounded-2xl ${
                comparisonMode === "overlay"
                  ? "bg-foreground text-background"
                  : "border-border text-foreground hover:bg-accent"
              }`}
            >
              Superpuesto
            </Button>
          </div>
        </div>

        {/* Video Comparison */}
        {comparisonVideo && (
          <div className="space-y-4">
            {comparisonMode === "side-by-side" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Current Video */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Video Actual</h4>
                    <Badge variant="outline" className="border-border text-foreground rounded-full">
                      {currentVideo.technicalScore}%
                    </Badge>
                  </div>
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                    <iframe
                      src={currentVideo.url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      {currentVideo.client}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {currentVideo.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Dumbbell className="h-4 w-4" />
                      {currentVideo.weight} x {currentVideo.reps}
                    </div>
                  </div>
                </div>

                {/* Comparison Video */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Video Comparación</h4>
                    <Badge variant="outline" className="border-border text-foreground rounded-full">
                      {comparisonVideo.technicalScore}%
                    </Badge>
                  </div>
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                    <iframe
                      src={comparisonVideo.url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      {comparisonVideo.client}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {comparisonVideo.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Dumbbell className="h-4 w-4" />
                      {comparisonVideo.weight} x {comparisonVideo.reps}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
                  <iframe
                    src={currentVideo.url}
                    className="w-full h-full absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <iframe
                    src={comparisonVideo.url}
                    className="w-1/2 h-1/2 absolute top-4 right-4 opacity-75 rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Comparison Analysis */}
            <Card className="bg-muted border-border">
              <CardContent className="p-4">
                <h4 className="font-medium text-foreground mb-3">Análisis Comparativo</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">Diferencia Técnica</p>
                    <p className="text-lg font-bold text-foreground">
                      {Math.abs(currentVideo.technicalScore - comparisonVideo.technicalScore)}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentVideo.technicalScore > comparisonVideo.technicalScore ? "Mejor" : "Peor"}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">Progreso de Peso</p>
                    <p className="text-lg font-bold text-foreground">
                      {parseFloat(currentVideo.weight) - parseFloat(comparisonVideo.weight)}kg
                    </p>
                    <p className="text-xs text-muted-foreground">Diferencia</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">Tiempo Transcurrido</p>
                    <p className="text-lg font-bold text-foreground">
                      {Math.abs(new Date(currentVideo.date).getTime() - new Date(comparisonVideo.date).getTime()) / (1000 * 60 * 60 * 24)}
                    </p>
                    <p className="text-xs text-muted-foreground">días</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!comparisonVideo && (
          <div className="text-center py-8 text-muted-foreground">
            <GitCompare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Selecciona un video para comparar</p>
            <p className="text-sm">Analiza el progreso y diferencias técnicas</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
