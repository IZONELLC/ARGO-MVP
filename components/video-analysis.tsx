"use client"

"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { DrawingCanvas } from "@/components/drawing-canvas"
import { CommentSystem } from "@/components/comment-system"
import { AnalysisTools } from "@/components/analysis-tools"
import { VideoComparison } from "@/components/video-comparison"
import { Sidebar } from "@/components/sidebar"
import { supabase } from "@/lib/supabase"
import { Play, Pause, RotateCcw, Volume2, Maximize, ChevronLeft, ChevronRight, Pencil, Eraser, Ruler, Type, Mic, MessageSquare, BarChart3, GitCompare, User, Calendar, Dumbbell, Weight, RotateCw, Target } from 'lucide-react'

interface VideoData {
  id: string
  title: string
  client: string
  exercise: string
  date: string;
  duration: string
  weight: string
  reps: string
  angle: string
  url: string
  microciclo: string
}

interface VideoAnalysisProps {
  analysisParams: {
    coachId: string
    clientId: string
    date: string
    exercise: string
  },
  isReadOnly?: boolean;
  videoId?: string;
}

export function VideoAnalysis({ analysisParams, isReadOnly = false, videoId }: VideoAnalysisProps) {
  const router = useRouter();
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!videoId) {
          setLoading(false);
          return;
      };
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select(`*, clients(profiles(full_name)), exercises(name)`)
        .eq('id', videoId)
        .single();

      if (error) {
        console.error("Error fetching video data:", error);
      } else {
        setVideoData(data);
      }
      setLoading(false);
    }
    fetchVideoData();
  }, [videoId]);

  const displayData = videoData ? {
      id: videoData.id,
      title: `${videoData.exercises.name} - Análisis Biomecánico`,
      client: videoData.clients.profiles.full_name,
      exercise: videoData.exercises.name,
      date: new Date(videoData.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      url: videoData.video_url,
      microciclo: `Microciclo ${videoData.microciclo || 'N/A'}`,
      angle: videoData.angle || 'N/A',
      weight: `${videoData.weight || 'N/A'}kg`,
      reps: 'N/A' // Reps not in schema yet
  } : {
      id: "1",
      title: "Cargando...",
      client: "Cargando...",
      exercise: "Cargando...",
      date: "",
      url: "",
      microciclo: "",
      angle: "",
      weight: "",
      reps: ""
  };

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(72)
  const [volume, setVolume] = useState(50)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [activeTab, setActiveTab] = useState<"analysis" | "comments" | "comparison">("analysis")
  const [activeTool, setActiveTool] = useState<"draw" | "erase" | "angle" | "text" | null>(null)
  const [showComments, setShowComments] = useState(false)
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [annotations, setAnnotations] = useState<any[]>([])
  const [currentAnnotationTag, setCurrentAnnotationTag] = useState("")
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const tools = [
    { id: "draw", icon: Pencil, label: "Dibujar", color: "text-foreground" },
    { id: "erase", icon: Eraser, label: "Borrar", color: "text-foreground" },
    { id: "angle", icon: Ruler, label: "Ángulo", color: "text-foreground" },
    { id: "text", icon: Type, label: "Texto", color: "text-foreground" },
  ]

  const handleToolSelect = (toolId: string) => {
    if (isReadOnly) return;
    setActiveTool(activeTool === toolId ? null : toolId as any)
  }

  const handleAnnotationEnd = (type: string) => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    // Here you could store more info about the annotation if needed
    setIsTagDialogOpen(true);
  }

  const handleSaveTag = () => {
    const newAnnotation = {
      time: currentTime,
      tag: currentAnnotationTag,
      // you can add more data here, like the drawing path, etc.
    };
    setAnnotations([...annotations, newAnnotation]);
    setCurrentAnnotationTag("");
    setIsTagDialogOpen(false);
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#121212]">
            <p className="text-white">Cargando Análisis...</p>
        </div>
    )
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
                onClick={() => router.back()}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{displayData.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <Link href={`/clients/${displayData.id}`} className="flex items-center gap-1 hover:text-foreground">
                    <User className="h-4 w-4" />
                    {displayData.client}
                  </Link>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {displayData.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Dumbbell className="h-4 w-4" />
                    {displayData.exercise}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="border-border text-foreground">
                {displayData.microciclo}
              </Badge>
              <Badge variant="outline" className="border-border text-foreground">
                {displayData.angle}
              </Badge>
              <Badge variant="outline" className="border-border text-foreground">
                {displayData.weight} x {displayData.reps}
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
                    <div className="absolute inset-0" onClick={(e) => e.preventDefault()}>
                      <video
                        ref={videoRef}
                        src={displayData.url}
                        className="w-full h-full object-contain"
                        muted
                        onTimeUpdate={() => {
                          if (videoRef.current) {
                            setCurrentTime(videoRef.current.currentTime);
                          }
                        }}
                        onLoadedMetadata={() => {
                          if (videoRef.current) {
                            setDuration(videoRef.current.duration);
                          }
                        }}
                      />
                    </div>

                    {/* Drawing Canvas Overlay */}
                    <DrawingCanvas
                      ref={canvasRef}
                      activeTool={activeTool}
                      videoRef={videoRef}
                      onAnnotationEnd={handleAnnotationEnd}
                      className={`absolute inset-0 z-10 ${isReadOnly ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    />

                    {/* Biomechanical Tools */}
                    {!isReadOnly && (
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
                    )}

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
                    {isReadOnly && (
                        <div className="mb-4 text-center">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                Marcar como Entendido
                            </Button>
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (videoRef.current) {
                            if (isPlaying) {
                              videoRef.current.pause();
                            } else {
                              videoRef.current.play();
                            }
                            setIsPlaying(!isPlaying);
                          }
                        }}
                        className="border-border text-foreground hover:bg-accent rounded-2xl"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>

                      <div className="flex-1">
                        <Slider
                          value={[currentTime]}
                          max={duration}
                          step={0.1}
                          onValueChange={(value) => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = value[0];
                              setCurrentTime(value[0]);
                            }
                          }}
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
                          onValueChange={(value) => {
                            const newVolume = value[0];
                            setVolume(newVolume);
                            if (videoRef.current) {
                              videoRef.current.volume = newVolume / 100;
                              videoRef.current.muted = newVolume === 0;
                            }
                          }}
                          className="w-20"
                        />
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (videoRef.current && document.fullscreenEnabled) {
                            videoRef.current.requestFullscreen();
                          }
                        }}
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
                  <CommentSystem videoId={displayData.id} />
                )}

                {activeTab === "comments" && (
                  <CommentSystem videoId={displayData.id} />
                )}

                {activeTab === "comparison" && (
                  <VideoComparison currentVideo={displayData} />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <AnalysisTools videoId={displayData.id} />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Añadir Etiqueta a la Anotación</DialogTitle>
            <DialogDescription>
              Ponle un título a esta corrección para que tu cliente la identifique rápidamente. Ej: "Pérdida de control".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right">
                Etiqueta
              </Label>
              <Input
                id="tag"
                value={currentAnnotationTag}
                onChange={(e) => setCurrentAnnotationTag(e.target.value)}
                className="col-span-3"
                placeholder="Ej: Más ancho de piernas"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveTag}>Guardar Etiqueta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
