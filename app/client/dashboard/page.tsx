"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { VideoUploadDialog } from "@/components/client/video-upload-dialog"

const mockTrainingPlan = {
  mesociclos: [
    {
      id: 1,
      name: "Mesociclo 1: Acumulación",
      microciclos: [
        {
          id: 1,
          name: "Microciclo 1",
          sesiones: [
            { id: 1, name: "Sesión 1: Empuje" },
            { id: 2, name: "Sesión 2: Tirón" },
            { id: 3, name: "Sesión 3: Pierna" },
          ]
        },
        {
          id: 2,
          name: "Microciclo 2",
          sesiones: [
            { id: 4, name: "Sesión 4: Empuje" },
            { id: 5, name: "Sesión 5: Tirón" },
            { id: 6, name: "Sesión 6: Pierna" },
          ]
        }
      ]
    }
  ]
}

export default function ClientDashboardPage() {
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <>
    <VideoUploadDialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen} />
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mi Plan de Entrenamiento</h1>
          <Button className="bg-[#FAFAFA] text-[#0F0F0F] hover:bg-zinc-300" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Subir Video
          </Button>
        </header>

        <main>
          <Accordion type="single" collapsible className="w-full">
            {mockTrainingPlan.mesociclos.map(meso => (
              <AccordionItem key={meso.id} value={`meso-${meso.id}`}>
                <AccordionTrigger className="text-xl font-semibold">{meso.name}</AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible className="w-full pl-4">
                     {meso.microciclos.map(micro => (
                        <AccordionItem key={micro.id} value={`micro-${micro.id}`}>
                           <AccordionTrigger>{micro.name}</AccordionTrigger>
                           <AccordionContent>
                              <ul className="space-y-2 pl-4">
                                {micro.sesiones.map(sesion => (
                                  <li key={sesion.id} className="flex justify-between items-center p-2 bg-zinc-800 rounded-md">
                                    <span>{sesion.name}</span>
                                    <Button variant="ghost" size="sm">Ver Ejercicios</Button>
                                  </li>
                                ))}
                              </ul>
                           </AccordionContent>
                        </AccordionItem>
                     ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </main>
      </div>
    </div>
  );
}
