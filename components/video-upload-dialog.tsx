'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, X } from 'lucide-react'

interface VideoUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VideoUploadDialog({ open, onOpenChange }: VideoUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '',
    description: ''
  })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para subir el video
    console.log('Subir video:', { file: selectedFile, ...formData })
    onOpenChange(false)
    setSelectedFile(null)
    setFormData({ title: '', client: '', category: '', description: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-white">Subir Nuevo Video</DialogTitle>
          <DialogDescription className="text-gray-400">
            Sube un video para análisis biomecánico.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Archivo de Video</Label>
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center">
                {selectedFile ? (
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedFile(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm mb-2">
                      Arrastra un archivo aquí o haz clic para seleccionar
                    </p>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="video-upload"
                    />
                    <Label
                      htmlFor="video-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700"
                    >
                      Seleccionar Archivo
                    </Label>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Cliente</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, client: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="maria">María González</SelectItem>
                    <SelectItem value="carlos">Carlos Ruiz</SelectItem>
                    <SelectItem value="ana">Ana Martín</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Categoría</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="tecnica">Análisis de Técnica</SelectItem>
                  <SelectItem value="fuerza">Entrenamiento de Fuerza</SelectItem>
                  <SelectItem value="velocidad">Análisis de Velocidad</SelectItem>
                  <SelectItem value="rehabilitacion">Rehabilitación</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={!selectedFile}
              className="bg-white text-black hover:bg-gray-200"
            >
              Subir Video
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
