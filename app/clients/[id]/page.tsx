import { ClientProfile } from "@/components/client-profile"

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  return <ClientProfile clientId={params.id} />
}
