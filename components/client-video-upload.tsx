"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Video, Camera, CheckCircle } from 'lucide-react'

interface VideoUpload {
  id: string
  exercise: string
  angle: string
  country: string
  city: string
  gym: string
  comment: string
  file?: File
  uploadDate: string
  status: "uploading" | "uploaded"
}

export function ClientVideoUpload() {
  const [uploads, setUploads] = useState<VideoUpload[]>([])
  const [currentUpload, setCurrentUpload] = useState<Partial<VideoUpload>>({
    exercise: "",
    angle: "",
    country: "",
    city: "",
    gym: "",
    comment: ""
  })

  // Simplified lists for MVP
  const exercises = [
    "Sentadilla",
    "Press de Banca", 
    "Peso Muerto",
    "Remo con Barra",
    "Press Militar"
  ]

  const angles = [
    { value: "sagital", label: "Sagital (Lateral)" },
    { value: "frontal", label: "Frontal (Frente)" },
    { value: "coronal", label: "Coronal (Posterior)" },
    { value: "oblicuo", label: "Oblicuo (45°)" },
    { value: "libre", label: "Libre" }
  ]

  const countries = [
    "Colombia",
    "México", 
    "Argentina",
    "Chile",
    "Perú"
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCurrentUpload(prev => ({ ...prev, file }))
    }
  }

  const handleUpload = () => {
    if (!currentUpload.file || !currentUpload.exercise || !currentUpload.angle) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    const newUpload: VideoUpload = {
      id: Date.now().toString(),
      exercise: currentUpload.exercise!,
      angle: currentUpload.angle!,
      country: currentUpload.country || "",
      city: currentUpload.city || "",
      gym: currentUpload.gym || "",
      comment: currentUpload.comment || "",
      file: currentUpload.file,
      uploadDate: new Date().toISOString(),
      status: "uploading"
    }

    setUploads(prev => [newUpload, ...prev])
    
    // Simulate upload
    setTimeout(() => {
      setUploads(prev => prev.map(upload => 
        upload.id === newUpload.id 
          ? { ...upload, status: "uploaded" }
          : upload
      ))
    }, 2000)

    // Reset form
    setCurrentUpload({
      exercise: "",
      angle: "",
      country: "",
      city: "",
      gym: "",
      comment: ""
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subir Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="video-file">Video *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="video-file"
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label htmlFor="video-file" className="cursor-pointer">
                <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {currentUpload.file ? currentUpload.file.name : "Toca para seleccionar video"}
                </p>
              </label>
            </div>
          </div>

          {/* Exercise */}
          <div className="space-y-2">
            <Label>Ejercicio *</Label>
            <Select value={currentUpload.exercise} onValueChange={(value) => setCurrentUpload(prev => ({ ...prev, exercise: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el ejercicio" />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((exercise) => (
                  <SelectItem key={exercise} value={exercise}>
                    {exercise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Angle */}
          <div className="space-y-2">
            <Label>Ángulo del Video *</Label>
            <Select value={currentUpload.angle} onValueChange={(value) => setCurrentUpload(prev => ({ ...prev, angle: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el ángulo" />
              </SelectTrigger>
              <SelectContent>
                {angles.map((angle) => (
                  <SelectItem key={angle.value} value={angle.value}>
                    {angle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location - Simplified */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>País</Label>
              <Select value={currentUpload.country} onValueChange={(value) => setCurrentUpload(prev => ({ ...prev, country: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ciudad</Label>
              <Input
                placeholder="Ciudad"
                value={currentUpload.city}
                onChange={(e) => setCurrentUpload(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
          </div>

          {/* Gym */}
          <div className="space-y-2">
            <Label>Gimnasio</Label>
            <Input
              placeholder="Nombre del gimnasio"
              value={currentUpload.gym}
              onChange={(e) => setCurrentUpload(prev => ({ ...prev, gym: e.target.value }))}
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label>Comentario</Label>
            <Textarea
              placeholder="Agrega cualquier comentario..."
              value={currentUpload.comment}
              onChange={(e) => setCurrentUpload(prev => ({ ...prev, comment: e.target.value }))}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleUpload}
            className="w-full"
            size="mobile"
            disabled={!currentUpload.file || !currentUpload.exercise || !currentUpload.angle}
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir Video
          </Button>
        </CardContent>
      </Card>

      {/* Upload History */}
      {uploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Videos Subidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{upload.exercise}</div>
                    <div className="text-sm text-gray-600">
                      {upload.angle} • {new Date(upload.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant={upload.status === "uploaded" ? "success" : "warning"}>
                    {upload.status === "uploaded" ? "Subido" : "Subiendo..."}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
