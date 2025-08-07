"use client"

import { VideoAnalysis } from "@/components/video-analysis"

interface CorrectionViewPageProps {
  params: {
    videoId: string
  }
}

export default function CorrectionViewPage({ params }: CorrectionViewPageProps) {
  // The VideoAnalysis component will need to be adapted to fetch video data by its ID
  // and to operate in a "read-only" mode for the client.

  // For now, we pass placeholder params that match the component's expected structure.
  const placeholderParams = {
      coachId: 'coach-id-placeholder',
      clientId: 'client-id-placeholder',
      date: '01012024',
      exercise: 'Exercise-Name'
  }

  return <VideoAnalysis analysisParams={placeholderParams} isReadOnly={true} videoId={params.videoId} />
}
