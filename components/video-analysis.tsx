"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { DrawingCanvas } from "@/components/drawing-canvas"
import { CommentSystem } from "@/components/comment-system"
import { AnalysisTools } from "@/components/analysis-tools"
import { VideoComparison } from "@/components/video-comparison"
import { Sidebar } from "@/components/sidebar"
import { Play, Pause, RotateCcw, Volume2, Maximize, ChevronLeft, ChevronRight, Pencil, Eraser, Ruler, Type, Mic, MessageSquare, BarChart3, GitCompare, User, Calendar, Dumbbell, Weight, RotateCw, Target } from 'lucide-react'

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
}

const mockVideoData: VideoData = {
  id: "1",
  title: "Sentadilla - Análisis Biomecánico",
  client: "Carlos Rodriguez",
  exercise: "Sentadilla",
  date: "2024-01-22",
  duration: "1:12",
  weight: "100kg",
  reps: "6",
  angle: "Sagital",
  url: "https://www.youtube.com/embed/ultWZbUMPL8",
}

export function VideoAnalysis() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(72)
  const [volume, setVolume] = useState(50)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [activeTab, setActiveTab] = useState<"analysis" | "comments" | "comparison">("analysis")
  const [activeTool, setActiveTool] = useState<"draw" | "erase" | "angle" | "text" | null>(null)
  const [showComments, setShowComments] = useState(false)
  
  const videoRef = useRef<HTMLIFrameElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const tools = [
    { id: "draw", icon: Pencil, label: "Dibujar", color: "text-foreground" },
    { id: "erase", icon: Eraser, label: "Borrar", color: "text-foreground" },
    { id: "angle", icon: Ruler, label: "Ángulo", color: "text-foreground" },
    { id: "text", icon: Type, label: "Texto", color: "text-foreground" },
  ]

  const handleToolSelect = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId as any)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-accent rounded-2xl"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{mockVideoData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {mockVideoData.client}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {mockVideoData.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="h-4 w-4" />
                    {mockVideoData.exercise}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-border text-foreground">
                {mockVideoData.angle}
              </Badge>
              <Badge variant="outline" className="border-border text-foreground">
                {mockVideoData.weight} x {mockVideoData.reps}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Video Player */}
            <div className="xl:col-span-3">
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black">
                    {/* Video Container */}
                    <div className="absolute inset-0">
                      <iframe
                        ref={videoRef}
                        src={`${mockVideoData.url}?enablejsapi=1&controls=0&modestbranding=1&rel=0`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    {/* Drawing Canvas Overlay */}
                    <DrawingCanvas
                      ref={canvasRef}
                      activeTool={activeTool}
                      className="absolute inset-0 z-10 pointer-events-auto"
                    />

                    {/* Biomechanical Tools */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="flex flex-col gap-2">
                        {tools.map((tool) => {
                          const Icon = tool.icon
                          return (
                            <Button
                              key={tool.id}
                              variant={activeTool === tool.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToolSelect(tool.id)}
                              className={`w-12 h-12 rounded-2xl border-border ${
                                activeTool === tool.id
                                  ? "bg-foreground text-background"
                                  : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent"
                              }`}
                              title={tool.label}
                            >
                              <Icon className="h-4 w-4" />
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Comment Toggle */}
                    <div className="absolute top-4 right-4 z-20">
                      <Button
                        variant={showComments ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowComments(!showComments)}
                        className={`rounded-2xl border-border ${
                          showComments
                            ? "bg-foreground text-background"
                            : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent"
                        }`}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comentarios
                      </Button>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="p-4 bg-card border-t border-border">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="border-border text-foreground hover:bg-accent rounded-2xl"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>

                      <div className="flex-1">
                        <Slider
                          value={[currentTime]}
                          max={duration}
                          step={1}
                          onValueChange={(value) => setCurrentTime(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          value={[volume]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setVolume(value[0])}
                          className="w-20"
                        />
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border text-foreground hover:bg-accent rounded-2xl"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              <div className="mt-6">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={activeTab === "analysis" ? "default" : "outline"}
                    onClick={() => setActiveTab("analysis")}
                    className={`rounded-2xl font-medium ${
                      activeTab === "analysis"
                        ? "bg-foreground text-background"
                        : "border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Análisis
                  </Button>
                  <Button
                    variant={activeTab === "comments" ? "default" : "outline"}
                    onClick={() => setActiveTab("comments")}
                    className={`rounded-2xl font-medium ${
                      activeTab === "comments"
                        ? "bg-foreground text-background"
                        : "border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comentarios
                  </Button>
                  <Button
                    variant={activeTab === "comparison" ? "default" : "outline"}
                    onClick={() => setActiveTab("comparison")}
                    className={`rounded-2xl font-medium ${
                      activeTab === "comparison"
                        ? "bg-foreground text-background"
                        : "border-border text-foreground hover:bg-accent"
                    }`}
                  >
                    <GitCompare className="h-4 w-4 mr-2" />
                    Comparación
                  </Button>
                </div>

                {activeTab === "analysis" && (
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Análisis Biomecánico</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Target className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium text-foreground">Técnica</h4>
                          <p className="text-2xl font-bold text-foreground mt-1">85%</p>
                          <p className="text-sm text-muted-foreground">Buena ejecución</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Weight className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium text-foreground">Profundidad</h4>
                          <p className="text-2xl font-bold text-foreground mt-1">92%</p>
                          <p className="text-sm text-muted-foreground">Excelente</p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <RotateCw className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium text-foreground">Estabilidad</h4>
                          <p className="text-2xl font-bold text-foreground mt-1">78%</p>
                          <p className="text-sm text-muted-foreground">Mejorable</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "comments" && (
                  <CommentSystem videoId={mockVideoData.id} />
                )}

                {activeTab === "comparison" && (
                  <VideoComparison currentVideo={mockVideoData} />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <AnalysisTools />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
