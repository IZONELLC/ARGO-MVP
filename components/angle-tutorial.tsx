"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, User } from 'lucide-react'

interface AngleTutorialProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const angles = [
  {
    name: "Sagital",
    description: "Vista lateral del movimiento",
    instructions: "Coloca la cámara al lado del atleta, perpendicular al plano de movimiento",
    bestFor: ["Sentadilla", "Peso Muerto", "Press de Banca"],
    tips: "Asegúrate de capturar todo el rango de movimiento desde el perfil",
  },
  {
    name: "Frontal",
    description: "Vista frontal del movimiento",
    instructions: "Coloca la cámara frente al atleta, a la altura del pecho",
    bestFor: ["Press Militar", "Curl de Bíceps", "Sentadilla"],
    tips: "Mantén la cámara centrada y a una distancia que capture todo el cuerpo",
  },
  {
    name: "Coronal",
    description: "Vista posterior del movimiento",
    instructions: "Coloca la cámara detrás del atleta, observando la espalda",
    bestFor: ["Remo con Barra", "Dominadas", "Peso Muerto"],
    tips: "Útil para analizar la activación de músculos posteriores",
  },
  {
    name: "Oblicuo",
    description: "Vista diagonal del movimiento",
    instructions: "Coloca la cámara en un ángulo de 45° respecto al atleta",
    bestFor: ["Ejercicios unilaterales", "Movimientos complejos"],
    tips: "Combina información de múltiples planos de movimiento",
  },
  {
    name: "Superior",
    description: "Vista desde arriba",
    instructions: "Coloca la cámara por encima del atleta, mirando hacia abajo",
    bestFor: ["Ejercicios en el suelo", "Análisis de trayectorias"],
    tips: "Útil para ejercicios como hip thrust o análisis de simetría",
  },
]

export function AngleTutorial({ open, onOpenChange }: AngleTutorialProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border text-foreground max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Guía de Ángulos de Grabación
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-muted border border-border rounded-2xl p-4">
            <h3 className="font-medium text-foreground mb-2">Consejos Generales:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Mantén la cámara estable durante toda la grabación</li>
              <li>• Asegúrate de tener buena iluminación</li>
              <li>• Graba al menos 3-5 repeticiones completas</li>
              <li>• Mantén al atleta completamente visible en el encuadre</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {angles.map((angle, index) => (
              <Card key={index} className="bg-muted border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{angle.name}</h3>
                      <p className="text-muted-foreground text-sm">{angle.description}</p>
                    </div>
                    <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Instrucciones:</h4>
                      <p className="text-sm text-foreground">{angle.instructions}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Mejor para:</h4>
                      <div className="flex flex-wrap gap-1">
                        {angle.bestFor.map((exercise, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-border text-muted-foreground rounded-full">
                            {exercise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-background rounded-2xl p-3">
                      <h4 className="font-medium text-sm text-foreground mb-1">💡 Consejo:</h4>
                      <p className="text-xs text-muted-foreground">{angle.tips}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted border border-border rounded-2xl p-4">
            <h3 className="font-medium text-foreground mb-2">Validación Automática:</h3>
            <p className="text-sm text-muted-foreground">
              El sistema verificará automáticamente la calidad del video (resolución mínima, duración, formato) antes de
              permitir la subida. Los videos que no cumplan los criterios serán rechazados con sugerencias de mejora.
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)} className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl">
              Entendido
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
