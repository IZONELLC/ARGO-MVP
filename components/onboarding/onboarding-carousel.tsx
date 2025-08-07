"use client"

import { useState } from "react";
import Image from "next/image";
import { DottedProgress } from "./dotted-progress";

const onboardingSteps = [
  {
    image: "/placeholder.svg",
    title: "Bienvenido a Argo",
    description: "La plataforma definitiva para el análisis biomecánico y seguimiento de atletas.",
  },
  {
    image: "/placeholder.svg",
    title: "Sube y Analiza",
    description: "Los atletas suben sus videos, los coaches analizan con herramientas de precisión.",
  },
  {
    image: "/placeholder.svg",
    title: "Feedback Detallado",
    description: "Proporciona correcciones claras con anotaciones de video, audio y texto.",
  },
  {
    image: "/placeholder.svg",
    title: "Construye una Base de Datos Global",
    description: "Contribuye a la base de datos de ejercicios más grande del mundo.",
  },
];

export function OnboardingCarousel() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle navigation to the next page (e.g., signup/login)
      console.log("Onboarding finished");
    }
  };

  const step = onboardingSteps[currentStep];

  return (
    <div
      className="flex flex-col items-center justify-between h-screen w-full bg-[#121212] text-[#E0E0E0] p-8"
      onClick={handleNextStep}
    >
      <div className="w-full">
        <DottedProgress totalSteps={onboardingSteps.length} currentStep={currentStep} />
      </div>

      <div className="flex flex-col items-center text-center">
        <Image
          src={step.image}
          alt={step.title}
          width={250}
          height={250}
          className="mb-8"
        />
        <h1 className="text-2xl font-bold mb-4">{step.title}</h1>
        <p className="text-base max-w-sm">{step.description}</p>
      </div>

      <div className="h-10">
        {/* Placeholder for bottom content or to maintain layout */}
      </div>
    </div>
  );
}
