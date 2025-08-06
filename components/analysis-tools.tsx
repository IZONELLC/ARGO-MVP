"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, Target, Award } from 'lucide-react'

interface AnalysisToolsProps {
  exerciseData?: {
    exercise: string
    previousSessions: Array<{
      date: string
      weight: string
      reps: string
      technicalScore: number
      improvements: string[]
      issues: string[]
    }>
  }
}

export function AnalysisTools({ exerciseData }: AnalysisToolsProps) {
  const mockData = {
    exercise: "Sentadilla",
    previousSessions: [
      {
        date: "2024-01-08",
        weight: "95kg",
        reps: "8",
        technicalScore: 75,
        improvements: ["Mejor profundidad"],
        issues: ["Rodillas hacia adentro"],
      },
      {
        date: "2024-01-15",
        weight: "100kg",
        reps: "6",
        technicalScore: 82,
        improvements: ["Alineación mejorada", "Torso más erguido"],
        issues: ["Velocidad de descenso"],
      },
      {
        date: "2024-01-22",
        weight: "102.5kg",
        reps: "6",
        technicalScore: 78,
        improvements: ["Fuerza incrementada"],
        issues: ["Pérdida de control", "Compensación lumbar"],
      },
    ],
  }

  const data = exerciseData || mockData
  const latestSession = data.previousSessions[data.previousSessions.length - 1]
  const previousSession = data.previousSessions[data.previousSessions.length - 2]

  const scoreChange = latestSession.technicalScore - (previousSession?.technicalScore || 0)
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-foreground" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-muted-foreground" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <div className="space-y-6">
      {/* Technical Evolution */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2">
            <Target className="h-4 w-4" />
            Evolución Técnica - {data.exercise}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Score */}
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-1">{latestSession.technicalScore}%</div>
            <div className="flex items-center justify-center gap-2 text-sm">
              {getTrendIcon(scoreChange)}
              <span
                className={scoreChange > 0 ? "text-foreground" : scoreChange < 0 ? "text-muted-foreground" : "text-muted-foreground"}
              >
                {scoreChange > 0 ? "+" : ""}
                {scoreChange}% vs sesión anterior
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <Progress value={latestSession.technicalScore} className="h-3" />
          </div>

          {/* Session History */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Historial de Sesiones</h4>
            {data.previousSessions
              .slice(-3)
              .reverse()
              .map((session, index) => (
                <div key={session.date} className="flex items-center justify-between p-2 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? "bg-foreground" : "bg-muted-foreground"}`} />
                    <div>
                      <div className="text-sm text-foreground">{session.date}</div>
                      <div className="text-xs text-muted-foreground">
                        {session.weight} x {session.reps}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{session.technicalScore}%</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest Improvements */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2">
            <Award className="h-4 w-4" />
            Última Sesión
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestSession.improvements.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-foreground mb-2">Mejoras Identificadas:</h4>
              <div className="space-y-1">
                {latestSession.improvements.map((improvement, index) => (
                  <Badge key={index} variant="outline" className="border-border text-foreground text-xs rounded-full">
                    {improvement}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {latestSession.issues.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Áreas de Mejora:</h4>
              <div className="space-y-1">
                {latestSession.issues.map((issue, index) => (
                  <Badge key={index} variant="outline" className="border-border text-muted-foreground text-xs rounded-full">
                    {issue}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-sm">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-foreground text-xs bg-transparent rounded-2xl"
          >
            Ver Progreso Completo
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-foreground text-xs bg-transparent rounded-2xl"
          >
            Comparar con Mes Anterior
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full border-border text-muted-foreground hover:text-foreground text-xs bg-transparent rounded-2xl"
          >
            Generar Reporte
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
