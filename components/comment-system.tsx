"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mic, MicOff, Play, Pause, Trash2, Edit, Save, X, Volume2, Type, Send, User, Clock } from 'lucide-react'

interface Comment {
  id: string
  timestamp: number
  text?: string
  audioUrl?: string
  author: string
  type: "text" | "audio"
  createdAt: string
}

interface CommentSystemProps {
  videoId: string
}

export function CommentSystem({ videoId }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      timestamp: 15,
      text: "Excelente profundidad en la sentadilla. Mantén esa posición del torso.",
      author: "Dr. Martinez",
      type: "text",
      createdAt: "2024-01-22 14:30",
    },
    {
      id: "2",
      timestamp: 32,
      text: "Observa cómo las rodillas se desplazan ligeramente hacia adentro. Trabaja en la activación de glúteos.",
      author: "Dr. Martinez",
      type: "text",
      createdAt: "2024-01-22 14:32",
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentTimestamp, setCurrentTimestamp] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAddTextComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      timestamp: currentTimestamp,
      text: newComment,
      author: "Dr. Martinez",
      type: "text",
      createdAt: new Date().toLocaleString(),
    }

    setComments((prev) => [...prev, comment].sort((a, b) => a.timestamp - b.timestamp))
    setNewComment("")
  }

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)

        const comment: Comment = {
          id: Date.now().toString(),
          timestamp: currentTimestamp,
          audioUrl,
          author: "Dr. Martinez",
          type: "audio",
          createdAt: new Date().toLocaleString(),
        }

        setComments((prev) => [...prev, comment].sort((a, b) => a.timestamp - b.timestamp))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setCurrentTimestamp(Date.now())

      recordingIntervalRef.current = setInterval(() => {
        setCurrentTimestamp(Date.now())
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("No se pudo acceder al micrófono. Verifica los permisos.")
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setCurrentTimestamp(0)

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
    }
  }

  const playAudio = (comment: Comment) => {
    if (comment.audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      const audio = new Audio(comment.audioUrl)
      audioRef.current = audio

      audio.onended = () => {}
      audio.play()
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentarios y Notas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Comment */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Tiempo actual: {formatTime(currentTimestamp)}</span>
          </div>
          
          <Textarea
            placeholder="Añadir comentario en este momento del video..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-muted border-border text-foreground rounded-2xl"
            rows={3}
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handleAddTextComment}
              disabled={!newComment.trim()}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl"
            >
              <Send className="h-4 w-4 mr-2" />
              Comentar
            </Button>
            
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              variant="outline"
              className={`border-border rounded-2xl ${
                isRecording 
                  ? "bg-destructive text-destructive-foreground" 
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Detener
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Audio
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-muted rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-background rounded-xl flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-border text-muted-foreground text-xs rounded-full">
                  {formatTime(comment.timestamp)}
                </Badge>
              </div>
              
              {comment.type === "text" && comment.text && (
                <p className="text-sm text-foreground leading-relaxed">{comment.text}</p>
              )}
              
              {comment.type === "audio" && comment.audioUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <Button size="sm" variant="outline" className="border-border text-foreground rounded-2xl" onClick={() => playAudio(comment)}>
                    <Mic className="h-3 w-3 mr-1" />
                    Reproducir
                  </Button>
                  <span className="text-xs text-muted-foreground">Audio comentario</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No hay comentarios aún</p>
            <p className="text-sm">Añade el primer comentario para este video</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
