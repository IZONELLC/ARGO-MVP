import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, User } from 'lucide-react'

interface Client {
  id: number
  name: string
  sport: string
  lastSession: string
  status: 'active' | 'pending' | 'inactive'
  progress: number
}

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl border border-zinc-700">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-gray-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">{client.name}</h4>
          <p className="text-xs text-gray-400">{client.sport}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Badge className={getStatusColor(client.status)}>
          {client.status === 'active' ? 'Activo' : 
           client.status === 'pending' ? 'Pendiente' : 'Inactivo'}
        </Badge>
        <div className="text-right">
          <p className="text-xs text-gray-400">Progreso</p>
          <p className="text-sm font-medium text-white">{client.progress}%</p>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
