"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { VenetianMask, PersonStanding } from 'lucide-react'; // Using these as placeholders for Male/Female


// Placeholder components for each step
const WelcomeStep = ({ onNext }: { onNext: () => void }) => (
    <Card className="w-full max-w-sm bg-[#121212] border-zinc-800 text-center">
        <CardHeader>
            <CardTitle className="text-2xl text-[#FAFAFA]">Bienvenido a ARGO</CardTitle>
            <CardDescription className="text-[#E0E0E0]">
                Antes de comenzar a usar el sistema de análisis biomecánico, necesitamos algunos datos básicos para configurar tu cuenta.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={onNext} className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300">
                Comenzar configuración
            </Button>
        </CardContent>
    </Card>
);
const SexStep = ({ onNext }: { onNext: () => void }) => {
    const [sex, setSex] = useState<'male' | 'female' | null>(null);
    return (
        <Card className="w-full max-w-sm bg-[#121212] border-zinc-800 text-center">
            <CardHeader>
                <CardTitle className="text-2xl text-[#FAFAFA]">¿Cuál es tu sexo?</CardTitle>
            </CardHeader>
            <CardContent>
                <ToggleGroup
                    type="single"
                    className="grid grid-cols-2 gap-4"
                    value={sex || ""}
                    onValueChange={(value: 'male' | 'female') => {
                        if (value) setSex(value);
                    }}
                >
                    <ToggleGroupItem value="male" aria-label="Select Male" className="h-auto flex flex-col gap-2 p-6 data-[state=on]:bg-zinc-700 data-[state=on]:text-white">
                        <PersonStanding className="h-8 w-8" />
                        <span className="text-base font-medium">♂ Male</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="female" aria-label="Select Female" className="h-auto flex flex-col gap-2 p-6 data-[state=on]:bg-zinc-700 data-[state=on]:text-white">
                        <VenetianMask className="h-8 w-8" />
                        <span className="text-base font-medium">♀ Female</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </CardContent>
            <CardFooter>
                 <Button onClick={onNext} className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" disabled={!sex}>
                    Siguiente
                </Button>
            </CardFooter>
        </Card>
    )
};
const DobStep = ({ onNext }: { onNext: () => void }) => {
    const [day, setDay] = useState<string | null>(null);
    const [month, setMonth] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
         <Card className="w-full max-w-sm bg-[#121212] border-zinc-800 text-center">
            <CardHeader>
                <CardTitle className="text-2xl text-[#FAFAFA]">¿Cuándo naciste?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2">
                <Select onValueChange={setDay}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue placeholder="Día" /></SelectTrigger>
                    <SelectContent>
                        {days.map(d => <SelectItem key={d} value={String(d)}>{d}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select onValueChange={setMonth}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue placeholder="Mes" /></SelectTrigger>
                    <SelectContent>
                         {months.map(m => <SelectItem key={m} value={String(m)}>{m}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select onValueChange={setYear}>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue placeholder="Año" /></SelectTrigger>
                    <SelectContent>
                        {years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter>
                 <Button onClick={onNext} className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" disabled={!day || !month || !year}>
                    Siguiente
                </Button>
            </CardFooter>
        </Card>
    )
};
const FrequencyStep = ({ onNext }: { onNext: () => void }) => {
    const [frequency, setFrequency] = useState<string | null>(null);
    const options = [
        "0 sesiones / semana",
        "1-3 sesiones / semana",
        "4-6 sesiones / semana",
        "7+ sesiones / semana",
    ]
    return (
        <Card className="w-full max-w-sm bg-[#121212] border-zinc-800">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#FAFAFA]">¿Con qué frecuencia entrenas?</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={frequency || ""} onValueChange={setFrequency} className="gap-4">
                    {options.map(option => (
                        <div key={option} className="flex items-center space-x-2 p-4 bg-zinc-800 rounded-md">
                             <RadioGroupItem value={option} id={option} />
                             <label htmlFor={option} className="text-base text-white">{option}</label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter>
                 <Button onClick={onNext} className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" disabled={!frequency}>
                    Siguiente
                </Button>
            </CardFooter>
        </Card>
    )
};
const AccountInfoStep = ({ onNext }: { onNext: () => void }) => {
    // In a real app, this data would come from an API
    const countries = [{ name: 'USA', cities: ['New York', 'Los Angeles'] }, { name: 'Canada', cities: ['Toronto', 'Vancouver'] }];
    const gyms: { [key: string]: string[] } = { 'New York': ['Equinox', 'Planet Fitness'], 'Los Angeles': ['Gold\'s Gym', '24 Hour Fitness'], 'Toronto': ['GoodLife Fitness', 'LA Fitness'], 'Vancouver': ['Steve Nash Fitness', 'Anytime Fitness'] };

    const [country, setCountry] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [gym, setGym] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");


    return (
         <Card className="w-full max-w-sm bg-[#121212] border-zinc-800">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl text-[#FAFAFA]">Información de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm text-white">Nombre</label>
                        <Input id="name" placeholder="John" value={name} onChange={(e) => setName(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="lastname" className="text-sm text-white">Apellido</label>
                        <Input id="lastname" placeholder="Doe" value={lastname} onChange={(e) => setLastname(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
                    </div>
                </div>
                 <div className="grid gap-2">
                    <label htmlFor="country" className="text-sm text-white">País</label>
                    <Select onValueChange={setCountry}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue placeholder="Selecciona tu país" /></SelectTrigger>
                        <SelectContent>
                            {countries.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <label htmlFor="city" className="text-sm text-white">Ciudad</label>
                    <Select onValueChange={setCity} disabled={!country}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue placeholder="Selecciona tu ciudad" /></SelectTrigger>
                        <SelectContent>
                            {country && countries.find(c => c.name === country)?.cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <label htmlFor="gym" className="text-sm text-white">Gimnasio</label>
                    <Select onValueChange={setGym} disabled={!city}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white"><SelectValue placeholder="Selecciona tu gimnasio" /></SelectTrigger>
                        <SelectContent>
                            {city && (gyms as any)[city]?.map((gym: string) => <SelectItem key={gym} value={gym}>{gym}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={onNext} className="w-full bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" disabled={!name || !lastname || !country || !city || !gym}>
                    Continuar
                </Button>
            </CardFooter>
        </Card>
    )
}
const TermsStep = ({ onNext }: { onNext: () => void }) => <div><h2>Terms</h2><button onClick={onNext}>Finish</button></div>;


export function AccountSetupWizard() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);

  const steps = [
    <WelcomeStep key="welcome" onNext={nextStep} />,
    <SexStep key="sex" onNext={nextStep} />,
    <DobStep key="dob" onNext={nextStep} />,
    <FrequencyStep key="frequency" onNext={nextStep} />,
    <AccountInfoStep key="info" onNext={nextStep} />,
    <TermsStep key="terms" onNext={nextStep} />,
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {steps[step]}
    </div>
  );
}
