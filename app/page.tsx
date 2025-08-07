"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { CoachDashboard } from "@/components/coach-dashboard";
import { Sidebar } from '@/components/sidebar';

export default function Home() {
  const { profile, loading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push('/login');
      } else if (profile) {
        if (profile.role === 'trainee') {
          router.push('/client/dashboard');
        }
        // If the role is 'coach', they stay on this page.
      }
    }
  }, [loading, session, profile, router]);

  if (loading || !session || profile?.role !== 'coach') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // Coach View
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="lg:pl-64">
         <div className="p-6 lg:p-8">
            <CoachDashboard
                onCorrectVideo={(videoId) => {
                    // This will be replaced with the new analysis page link
                    router.push(`/analysis/coach-id/${profile.id}/${videoId}/exercise-name`);
                }}
            />
         </div>
      </main>
    </div>
  );
}
