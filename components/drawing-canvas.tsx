"use client"

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
}

interface DrawingPath {
  points: Point[]
  tool: string
  color: string
  width: number
}

interface AngleMeasurement {
  id: string
  points: [Point, Point, Point]
  angle: number
}

interface DrawingCanvasProps {
  activeTool: string | null
  className?: string
}

export const DrawingCanvas = forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  ({ activeTool, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [paths, setPaths] = useState<DrawingPath[]>([])
    const [currentPath, setCurrentPath] = useState<Point[]>([])
    const [angles, setAngles] = useState<AngleMeasurement[]>([])
    const [anglePoints, setAnglePoints] = useState<Point[]>([])

    useImperativeHandle(ref, () => canvasRef.current!)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        redrawCanvas()
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)
      return () => window.removeEventListener("resize", resizeCanvas)
    }, [])

    const redrawCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw paths
      paths.forEach((path) => {
        if (path.points.length < 2) return

        ctx.beginPath()
        ctx.strokeStyle = path.color
        ctx.lineWidth = path.width
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.moveTo(path.points[0].x, path.points[0].y)
        path.points.forEach((point) => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
      })

      // Draw current path
      if (currentPath.length > 1) {
        ctx.beginPath()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.moveTo(currentPath[0].x, currentPath[0].y)
        currentPath.forEach((point) => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
      }

      // Draw angles
      angles.forEach((angle) => {
        drawAngle(ctx, angle)
      })

      // Draw angle points being selected
      anglePoints.forEach((point, index) => {
        ctx.beginPath()
        ctx.fillStyle = index === 1 ? "#ffffff" : "#ffffff"
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI)
        ctx.fill()
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    const drawAngle = (ctx: CanvasRenderingContext2D, angle: AngleMeasurement) => {
      const [p1, vertex, p2] = angle.points

      // Draw lines
      ctx.beginPath()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.moveTo(vertex.x, vertex.y)
      ctx.lineTo(p1.x, p1.y)
      ctx.moveTo(vertex.x, vertex.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()

      // Draw arc
      const radius = 40
      const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x)
      const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x)

      ctx.beginPath()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1
      ctx.arc(vertex.x, vertex.y, radius, angle1, angle2)
      ctx.stroke()

      // Draw angle text
      const midAngle = (angle1 + angle2) / 2
      const textX = vertex.x + Math.cos(midAngle) * (radius + 20)
      const textY = vertex.y + Math.sin(midAngle) * (radius + 20)

      ctx.fillStyle = "#ffffff"
      ctx.font = "14px -apple-system, BlinkMacSystemFont, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${angle.angle.toFixed(1)}°`, textX, textY)
    }

    const calculateAngle = (p1: Point, vertex: Point, p2: Point): number => {
      const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x)
      const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x)
      let angle = Math.abs(angle1 - angle2) * (180 / Math.PI)
      return angle > 180 ? 360 - angle : angle
    }

    const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current!
      const rect = canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const getTouchPos = (e: React.TouchEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current!
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }

    const handleStart = (point: Point) => {
      if (!activeTool) return

      if (activeTool === "angle") {
        const newPoints = [...anglePoints, point]
        setAnglePoints(newPoints)

        if (newPoints.length === 3) {
          const angle = calculateAngle(newPoints[0], newPoints[1], newPoints[2])
          const newAngle: AngleMeasurement = {
            id: Date.now().toString(),
            points: [newPoints[0], newPoints[1], newPoints[2]],
            angle,
          }
          setAngles((prev) => [...prev, newAngle])
          setAnglePoints([])
        }
      } else if (activeTool === "draw") {
        setIsDrawing(true)
        setCurrentPath([point])
      } else if (activeTool === "erase") {
        // Find and remove path at this point
        setPaths((prev) => prev.filter((path) => {
          return !path.points.some((p) => 
            Math.abs(p.x - point.x) < 20 && Math.abs(p.y - point.y) < 20
          )
        }))
        // Remove angles near this point
        setAngles((prev) => prev.filter((angle) => {
          return !angle.points.some((p) => 
            Math.abs(p.x - point.x) < 20 && Math.abs(p.y - point.y) < 20
          )
        }))
      }
    }

    const handleMove = (point: Point) => {
      if (!isDrawing || activeTool !== "draw") return
      setCurrentPath((prev) => [...prev, point])
    }

    const handleEnd = () => {
      if (isDrawing && activeTool === "draw" && currentPath.length > 1) {
        const newPath: DrawingPath = {
          points: currentPath,
          tool: activeTool,
          color: "#ffffff",
          width: 2,
        }
        setPaths((prev) => [...prev, newPath])
        setCurrentPath([])
      }
      setIsDrawing(false)
    }

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      handleStart(getMousePos(e))
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      handleMove(getMousePos(e))
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      handleEnd()
    }

    // Touch events
    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      handleStart(getTouchPos(e))
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      if (e.touches.length === 1) {
        handleMove(getTouchPos(e))
      }
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      handleEnd()
    }

    useEffect(() => {
      redrawCanvas()
    }, [paths, currentPath, angles, anglePoints])

    return (
      <canvas
        ref={canvasRef}
        className={cn("absolute inset-0 cursor-crosshair", className)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      />
    )
  }
)

DrawingCanvas.displayName = "DrawingCanvas"
