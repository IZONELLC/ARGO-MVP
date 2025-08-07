"use client"

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for now
const mockCorrections = [
    { id: 1, exercise_name: 'Sentadilla', date: '2024-07-28', status: 'Corregido' },
    { id: 2, exercise_name: 'Press de Banca', date: '2024-07-27', status: 'Corregido' },
    { id: 3, exercise_name: 'Peso Muerto', date: '2024-07-25', status: 'Corregido' },
];

export default function CorrectionsPage() {
    const { user } = useAuth();
    const [corrections, setCorrections] = useState<any[]>(mockCorrections);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchCorrections = async () => {
    //         if (!user) return;
    //         setLoading(true);
    //         const { data, error } = await supabase
    //             .from('videos')
    //             .select(`
    //                 id,
    //                 created_at,
    //                 status,
    //                 exercises ( name )
    //             `)
    //             .eq('client_id', user.id)
    //             .eq('status', 'corrected');

    //         if (error) {
    //             console.error('Error fetching corrections:', error);
    //         } else {
    //             setCorrections(data);
    //         }
    //         setLoading(false);
    //     };
    //     fetchCorrections();
    // }, [user]);

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Mis Correcciones</h1>
                    <p className="text-zinc-400">Aquí puedes ver el feedback de tu coach para cada ejercicio.</p>
                </header>

                <main className="space-y-4">
                    {loading ? (
                        <p>Cargando correcciones...</p>
                    ) : corrections.length === 0 ? (
                        <p>Aún no tienes videos corregidos.</p>
                    ) : (
                        corrections.map(correction => (
                            <Card key={correction.id} className="bg-zinc-800 border-zinc-700">
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold text-lg">{correction.exercise_name}</h3>
                                        <p className="text-sm text-zinc-400">Corregido el: {new Date(correction.date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={correction.status === 'Corregido' ? 'default' : 'secondary'}>{correction.status}</Badge>
                                        <Link href={`/analysis/view/${correction.id}`}>
                                            <Button>Ver Feedback</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </main>
            </div>
        </div>
    );
}
