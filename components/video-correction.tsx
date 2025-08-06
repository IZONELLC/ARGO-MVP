"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Play, Pause, Mic, MicOff, Type, Save, CheckCircle, AlertTriangle } from 'lucide-react'

interface VideoCorrectionProps {
  videoId: string | null
  onBack: () => void
}

export function VideoCorrection({ videoId, onBack }: VideoCorrectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(120)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [correctionStatus, setCorrectionStatus] = useState<"correct" | "needs_improvement" | null>(null)
  const [allowDatabase, setAllowDatabase] = useState<boolean | null>(null)
  const [correctionNotes, setCorrectionNotes] = useState("")
  const [correctionTime, setCorrectionTime] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const startTime = useRef<number>(Date.now())

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (value: number[]) => {
    const time = value[0]
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      
      // Simulate recording
      setTimeout(() => {
        setIsRecording(false)
        stream.getTracks().forEach(track => track.stop())
      }, 5000)
    } catch (error) {
      alert("No se pudo acceder al micrófono")
    }
  }

  const handleSaveCorrection = () => {
    if (!correctionStatus) {
      alert("Por favor selecciona el estado de la técnica")
      return
    }

    const totalTime = Math.floor((Date.now() - startTime.current) / 1000 / 60)
    setCorrectionTime(totalTime)

    // Save correction data
    const correctionData = {
      videoId,
      status: correctionStatus,
      allowDatabase,
      notes: correctionNotes,
      correctionTimeMinutes: totalTime,
      timestamp: new Date().toISOString()
    }

    console.log("Correction saved:", correctionData)
    alert(`Corrección guardada. Tiempo: ${totalTime} minutos`)
    onBack()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} size="mobile">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div className="text-sm text-gray-600">
          Video ID: {videoId}
        </div>
      </div>

      {/* Video Player - Simplified */}
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black rounded-t-lg">
            {/* Placeholder video */}
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Video Player</p>
                <p className="text-sm opacity-75">Ejercicio: Sentadilla • Sagital</p>
              </div>
            </div>
            
            {/* Simple Tool Palette */}
            <div className="absolute top-4 left-4 space-y-2">
              <Button
                variant={activeTool === "draw" ? "default" : "outline"}
                size="icon"
                onClick={() => setActiveTool(activeTool === "draw" ? null : "draw")}
                className="bg-white/90"
              >
                <Type className="h-4 w-4" />
              </Button>
              
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={isRecording ? () => setIsRecording(false) : startRecording}
                className="bg-white/90"
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm">Grabando</span>
                </div>
              </div>
            )}
          </div>

          {/* Simple Controls */}
          <div className="p-4 space-y-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              
              <Button
                variant="default"
                size="icon"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="text-sm text-gray-600">
                1x
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Correction Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evaluación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Technique Status */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Estado de la Técnica *</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={correctionStatus === "correct" ? "default" : "outline"}
                onClick={() => setCorrectionStatus("correct")}
                size="mobile"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Correcta
              </Button>
              <Button
                variant={correctionStatus === "needs_improvement" ? "destructive" : "outline"}
                onClick={() => setCorrectionStatus("needs_improvement")}
                size="mobile"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Mejorar
              </Button>
            </div>
          </div>

          {/* Database Permission */}
          <div className="space-y-3">
            <label className="text-sm font-medium">¿Autorizar subida a base de datos?</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={allowDatabase === true ? "default" : "outline"}
                onClick={() => setAllowDatabase(true)}
                size="mobile"
              >
                Sí
              </Button>
              <Button
                variant={allowDatabase === false ? "secondary" : "outline"}
                onClick={() => setAllowDatabase(false)}
                size="mobile"
              >
                No
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Notas Internas</label>
            <Textarea
              placeholder="Observaciones sobre la técnica..."
              value={correctionNotes}
              onChange={(e) => setCorrectionNotes(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <Button 
        onClick={handleSaveCorrection}
        size="mobile"
        disabled={!correctionStatus}
        className="w-full"
      >
        <Save className="h-4 w-4 mr-2" />
        Guardar Corrección
      </Button>
    </div>
  )
}
