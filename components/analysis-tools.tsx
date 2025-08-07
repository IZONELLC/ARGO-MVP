"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { History, Star, CheckCircle, XCircle, TrendingUp, TrendingDown, Minus, Target, Award, AlertTriangle, HeartPulse } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


interface AnalysisToolsProps {
  videoId: string;
  exerciseData?: {
    exercise: string
    previousSessions: Array<{
      mesociclo: number;
      microciclo: number;
      feedback: 'perfecta' | 'bien' | 'trabajar';
      rating: number;
      annotationTags: string[];
    }>
  }
}

export function AnalysisTools({ exerciseData }: AnalysisToolsProps) {
  const mockData = {
    exercise: "Sentadilla",
    previousSessions: [
       {
        mesociclo: 1,
        microciclo: 1,
        feedback: 'trabajar',
        rating: 4,
        annotationTags: ["Rodillas hacia adentro"],
      },
      {
        mesociclo: 1,
        microciclo: 2,
        feedback: 'bien',
        rating: 5,
        annotationTags: ["Velocidad de descenso"],
      },
       {
        mesociclo: 1,
        microciclo: 3,
        feedback: 'perfecta',
        rating: 5,
        annotationTags: ["Pérdida de control", "Compensación lumbar"],
      },
    ],
    medicalAlerts: [
      {
        date: "2024-01-21",
        alert: "Ligera molestia en la rodilla izquierda al bajar."
      }
    ]
  }

  const data = exerciseData || mockData
  const latestSession = data.previousSessions[data.previousSessions.length - 1]
  const previousSession = data.previousSessions[data.previousSessions.length - 2]
  const [rir, setRir] = useState(2.5)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"finish" | "re-record" | null>(null)
  const [feedbackOption, setFeedbackOption] = useState<string | null>(null)

  const handleActionClick = (type: "finish" | "re-record") => {
    setActionType(type)
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmAction = async () => {
    if (!actionType) return;

    // 1. Update the video status
    const newStatus = actionType === 'finish' ? 'corrected' : 're_recording_requested';
    const { error: videoError } = await supabase
      .from('videos')
      .update({ status: newStatus })
      .eq('id', videoId);

    if (videoError) {
      console.error("Error updating video status:", videoError);
      // Handle error state
      return;
    }

    // 2. Save the final feedback
    // In a real app, you'd also get the coach's ID from the session
    const { error: feedbackError } = await supabase
        .from('final_feedback')
        .insert({
            video_id: videoId,
            // coach_id: user.id, // from useAuth()
            feedback_option: feedbackOption,
            coach_rir_estimation: rir
        });

    if (feedbackError) {
        console.error("Error saving final feedback:", feedbackError);
        // Handle error state
        return;
    }


    setIsConfirmDialogOpen(false);
    setFeedbackOption(null);
    // Optionally, navigate away or show a success message
  }

  const feedbackOptions = [
    { value: 'trabajar', label: 'Hay que seguir trabajando' },
    { value: 'bien', label: 'Vamos bien' },
    { value: 'perfecta', label: 'Técnica perfecta' },
  ]

  const feedbackColors = {
    perfecta: 'bg-green-500',
    bien: 'bg-yellow-500',
    trabajar: 'bg-red-500',
  };

  return (
    <div className="space-y-6">
      {/* Action History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2">
            <History className="h-4 w-4" />
            Historia de Acciones - {data.exercise}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
           {data.previousSessions
              .slice(-5)
              .reverse()
              .map((session, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                     <div className={`w-3 h-3 rounded-full ${feedbackColors[session.feedback]}`} />
                    <div>
                      <div className="text-sm text-foreground">
                        Mesociclo {session.mesociclo} - Microciclo {session.microciclo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </CardContent>
      </Card>

      {/* Latest Session */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2">
            <Award className="h-4 w-4" />
            Última Sesión Corregida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Puntuación del Cliente</h4>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < latestSession.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
          </div>

          {latestSession.annotationTags.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Anotaciones Clave</h4>
              <div className="flex flex-wrap gap-1">
                {latestSession.annotationTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Medical Alerts */}
      {data.medicalAlerts && data.medicalAlerts.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Alertas Médicas Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.medicalAlerts.map((alert, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded-lg">
                <p className="font-medium text-destructive">{alert.date}</p>
                <p className="text-muted-foreground">{alert.alert}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* RIR Estimation */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2">
            <HeartPulse className="h-4 w-4" />
            Estimación de RIR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">RIR Percibido (Coach)</span>
                <span className="text-lg font-bold text-foreground">{rir.toFixed(1)}</span>
            </div>
            <Slider
                value={[rir]}
                onValueChange={(value) => setRir(value[0])}
                min={0}
                max={5}
                step={0.5}
            />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleActionClick("finish")}
            className="w-full border-border text-foreground hover:bg-accent rounded-2xl"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Terminar Corrección
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleActionClick("re-record")}
            className="w-full rounded-2xl"
          >
             <XCircle className="h-4 w-4 mr-2" />
            Solicitar Regrabación
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Acción: {actionType === 'finish' ? 'Terminar Corrección' : 'Solicitar Regrabación'}</DialogTitle>
            <DialogDescription>
              Selecciona el feedback final para el cliente y confirma el RIR estimado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Feedback General</h4>
              <ToggleGroup
                type="single"
                value={feedbackOption || ""}
                onValueChange={(value) => { if (value) setFeedbackOption(value) }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                {feedbackOptions.map(option => (
                  <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label} className="h-auto">
                    <div className="p-2 text-center">
                      <p className="text-xs">{option.label}</p>
                    </div>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
             <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Confirmar RIR Estimado (Coach)</h4>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">RIR</span>
                    <span className="text-lg font-bold text-foreground">{rir.toFixed(1)}</span>
                </div>
                <Slider
                    value={[rir]}
                    onValueChange={(value) => setRir(value[0])}
                    min={0}
                    max={5}
                    step={0.5}
                />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmAction} disabled={!feedbackOption}>
              Confirmar y Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
