import { Badge } from "@/components/ui/badge"
import { Clock, User, Video, BarChart3 } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: "analysis",
    description: "Análisis completado para María González",
    time: "Hace 2 horas",
    icon: BarChart3,
    color: "text-green-400"
  },
  {
    id: 2,
    type: "video",
    description: "Nuevo video subido - Técnica de salto",
    time: "Hace 4 horas",
    icon: Video,
    color: "text-blue-400"
  },
  {
    id: 3,
    type: "client",
    description: "Cliente nuevo registrado: Carlos Ruiz",
    time: "Hace 1 día",
    icon: User,
    color: "text-purple-400"
  },
  {
    id: 4,
    type: "analysis",
    description: "Reporte generado para Ana Martín",
    time: "Hace 2 días",
    icon: BarChart3,
    color: "text-green-400"
  }
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <activity.icon className={`h-4 w-4 ${activity.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">
              {activity.description}
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
