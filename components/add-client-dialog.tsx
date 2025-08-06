'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface AddClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddClientDialog({ open, onOpenChange }: AddClientDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sport: '',
    level: '',
    goals: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el cliente
    console.log('Nuevo cliente:', formData)
    onOpenChange(false)
    setFormData({ name: '', email: '', sport: '', level: '', goals: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-white">Agregar Nuevo Cliente</DialogTitle>
          <DialogDescription className="text-gray-400">
            Completa la información del nuevo cliente para comenzar su seguimiento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-300">
                Nombre
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sport" className="text-right text-gray-300">
                Deporte
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, sport: value })}>
                <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Selecciona un deporte" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="atletismo">Atletismo</SelectItem>
                  <SelectItem value="futbol">Fútbol</SelectItem>
                  <SelectItem value="natacion">Natación</SelectItem>
                  <SelectItem value="baloncesto">Baloncesto</SelectItem>
                  <SelectItem value="tenis">Tenis</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="level" className="text-right text-gray-300">
                Nivel
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Selecciona el nivel" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="principiante">Principiante</SelectItem>
                  <SelectItem value="intermedio">Intermedio</SelectItem>
                  <SelectItem value="avanzado">Avanzado</SelectItem>
                  <SelectItem value="profesional">Profesional</SelectItem>
                </SelectContent>
              </Select>
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
              className="bg-white text-black hover:bg-gray-200"
            >
              Agregar Cliente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
