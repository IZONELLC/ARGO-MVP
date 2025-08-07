"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Video, Play } from 'lucide-react'
import Link from "next/link"

interface CoachDashboardProps {
  onCorrectVideo: (videoId: string) => void
}

export function CoachDashboard({ onCorrectVideo }: CoachDashboardProps) {
  const { user } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [pendingVideos, setPendingVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);

      // Fetch clients of the coach
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select(`*, profiles(full_name)`)
        .eq('coach_id', user.id);

      if (clientError) {
        console.error("Error fetching clients:", clientError);
      } else {
        setClients(clientData || []);
      }

      // Fetch pending videos for those clients
      if (clientData && clientData.length > 0) {
        const clientIds = clientData.map(c => c.id);
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .select(`*, clients(profiles(full_name)), exercises(name)`)
          .in('client_id', clientIds)
          .eq('status', 'pending_correction');

        if (videoError) {
          console.error("Error fetching videos:", videoError);
        } else {
          setPendingVideos(videoData || []);
        }
      }
      setLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{clients.length}</div>
            <div className="text-sm text-gray-600">Clientes</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{pendingVideos.length}</div>
            <div className="text-sm text-gray-600">Por Corregir</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">N/A</div>
            <div className="text-sm text-gray-600">Min/Video</div>
          </CardContent>
        </Card>
      </div>

      {/* Videos Pending Correction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Videos por Corregir</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingVideos.map((video) => (
            <div key={video.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{video.clients.profiles.full_name}</div>
                <div className="text-sm text-gray-600">
                  {video.exercises.name} • {video.angle || 'N/A'} • Semana {video.microciclo || 'N/A'}, Sesion {video.sesion || 'N/A'}
                </div>
              </div>
              <Button
                size="mobile"
                onClick={() => onCorrectVideo(video.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Corregir
              </Button>
            </div>
          ))}
          
          {pendingVideos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No hay videos pendientes</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">{client.profiles.full_name}</div>
                  {/* Placeholder for progress */}
                </div>
              </div>
              {/* Placeholder for stats */}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
