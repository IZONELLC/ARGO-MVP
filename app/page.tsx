"use client"

import { useState } from "react"
import { CoachDashboard } from "@/components/coach-dashboard"
import { ClientVideoUpload } from "@/components/client-video-upload"
import { VideoCorrection } from "@/components/video-correction"
import { Button } from "@/components/ui/button"
import { User, Video } from 'lucide-react'

export default function Home() {
  const [activeView, setActiveView] = useState<"coach" | "client" | "correction">("coach")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-black">ARGO</h1>
          <div className="flex space-x-2">
            <Button
              variant={activeView === "coach" ? "default" : "outline"}
              size="mobile"
              onClick={() => setActiveView("coach")}
            >
              <User className="h-4 w-4 mr-2" />
              Coach
            </Button>
            <Button
              variant={activeView === "client" ? "default" : "outline"}
              size="mobile"
              onClick={() => setActiveView("client")}
            >
              <Video className="h-4 w-4 mr-2" />
              Cliente
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {activeView === "coach" && (
          <CoachDashboard 
            onCorrectVideo={(videoId) => {
              setSelectedVideo(videoId)
              setActiveView("correction")
            }} 
          />
        )}
        {activeView === "client" && <ClientVideoUpload />}
        {activeView === "correction" && (
          <VideoCorrection 
            videoId={selectedVideo}
            onBack={() => setActiveView("coach")} 
          />
        )}
      </div>
    </div>
  )
}
