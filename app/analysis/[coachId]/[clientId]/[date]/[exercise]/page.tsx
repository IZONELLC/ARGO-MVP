import { VideoAnalysis } from "@/components/video-analysis"

interface AnalysisPageProps {
  params: {
    coachId: string
    clientId: string
    date: string
    exercise: string
  }
}

export default function AnalysisPage({ params }: AnalysisPageProps) {
  return <VideoAnalysis analysisParams={params} />
}
