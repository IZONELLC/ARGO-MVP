"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud } from "lucide-react"

export function VideoUploadDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const { user } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [step, setStep] = useState(1);
    const [exercise, setExercise] = useState('');
    const [weight, setWeight] = useState('');
    const [rir, setRir] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file || !user) return;

        setLoading(true);
        setError(null);

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('videos')
            .upload(filePath, file);

        if (uploadError) {
            setError(uploadError.message);
            setLoading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('videos')
            .getPublicUrl(filePath);

        // This is a placeholder for exercise_id. In a real app, you'd get this from a search/select input.
        const placeholderExerciseId = 1;

        const { error: dbError } = await supabase
            .from('videos')
            .insert({
                client_id: user.id,
                video_url: publicUrl,
                exercise_id: placeholderExerciseId,
                weight: Number(weight),
                rir: Number(rir),
                // You can add mesociclo, etc. here if you pass them to the dialog
            });

        if (dbError) {
            setError(dbError.message);
        } else {
            onOpenChange(false); // Close dialog on success
            // Optionally, trigger a refresh of the dashboard data
        }
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-[#121212] border-zinc-800 text-white">
                <DialogHeader>
                    <DialogTitle>Subir Video de Ejercicio</DialogTitle>
                    <DialogDescription>
                        Sigue los pasos para subir tu video para corrección.
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div className="grid gap-4 py-4">
                        <Label htmlFor="video-file" className="text-center p-8 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-800">
                            <UploadCloud className="mx-auto h-12 w-12 text-zinc-500" />
                            <span className="mt-2 block text-sm font-semibold">
                                {file ? file.name : "Haz clic para seleccionar un video"}
                            </span>
                        </Label>
                        <Input id="video-file" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                    </div>
                )}

                {step === 2 && (
                     <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                           <Label htmlFor="exercise">Ejercicio</Label>
                           <Input id="exercise" placeholder="Ej: Sentadilla Libre" value={exercise} onChange={e => setExercise(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="weight">Peso (kg)</Label>
                                <Input id="weight" type="number" placeholder="100" value={weight} onChange={e => setWeight(e.target.value)} />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="rir">RIR</Label>
                                <Input id="rir" type="number" placeholder="2" value={rir} onChange={e => setRir(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <DialogFooter>
                    {step > 1 && <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={loading}>Anterior</Button>}
                    {step < 2 ? (
                        <Button onClick={() => setStep(step + 1)} disabled={!file || loading}>Siguiente</Button>
                    ) : (
                        <Button type="submit" onClick={handleUpload} disabled={loading}>
                            {loading ? 'Subiendo...' : 'Subir Video'}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
