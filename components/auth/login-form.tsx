"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/'); // Redirect to a dashboard page on successful login
            router.refresh();
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleLogin}>
            <Card className="w-full max-w-sm bg-[#121212] border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-[#FAFAFA]">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-[#E0E0E0]">
                        Bienvenido de vuelta a Argo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email"  className="text-[#E0E0E0]">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password"  className="text-[#E0E0E0]">Contraseña</Label>
                        <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white"/>
                    </div>
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </Button>
                    <div className="text-center text-sm">
                    <a href="#" className="text-xs text-gray-400 underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                 <p className="text-xs text-center text-gray-400">
                    ¿No tienes una cuenta?{" "}
                    <a href="/signup" className=" underline">
                        Regístrate
                    </a>
                </p>
            </CardFooter>
        </Card>
    )
}
