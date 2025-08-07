"use client"

import { useState } from "react"
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
import { RoleSelection } from "./role-selection"

export function SignupForm() {
    const [role, setRole] = useState<'coach' | 'trainee' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                }
            }
        });

        if (error) {
            setError(error.message);
        } else if (data.user) {
            setSuccess(true);
        }
        setLoading(false);
    }

    if (success) {
        return (
            <Card className="w-full max-w-sm bg-[#121212] border-zinc-800 text-center">
                <CardHeader>
                    <CardTitle className="text-2xl text-[#FAFAFA]">Revisa tu correo</CardTitle>
                    <CardDescription className="text-[#E0E0E0]">
                        Hemos enviado un enlace de confirmación a tu email. Por favor, haz clic en él para activar tu cuenta.
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    return (
        <form onSubmit={handleSignup}>
            <Card className="w-full max-w-sm bg-[#121212] border-zinc-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-[#FAFAFA]">Crear Cuenta</CardTitle>
                    <CardDescription className="text-[#E0E0E0]">
                        Elige tu rol y comienza a revolucionar el coaching.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <RoleSelection onRoleChange={setRole} />
                    <div className="grid gap-2">
                        <Label htmlFor="fullName"  className="text-[#E0E0E0]">Nombre Completo</Label>
                        <Input id="fullName" type="text" placeholder="John Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email"  className="text-[#E0E0E0]">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password"  className="text-[#E0E0E0]">Contraseña</Label>
                        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white"/>
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" disabled={!role || loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </Button>
                    <p className="text-xs text-center text-gray-400">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className=" underline">
                        Inicia Sesión
                    </a>
                </p>
            </CardFooter>
        </Card>
    )
}
