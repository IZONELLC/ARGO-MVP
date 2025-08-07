"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Users, Dumbbell } from 'lucide-react'

interface RoleSelectionProps {
    onRoleChange: (role: 'coach' | 'trainee') => void;
}

export function RoleSelection({ onRoleChange }: RoleSelectionProps) {
  return (
    <ToggleGroup
        type="single"
        className="grid grid-cols-2 gap-2"
        onValueChange={(value: 'coach' | 'trainee') => {
            if (value) onRoleChange(value);
        }}
    >
      <ToggleGroupItem value="coach" aria-label="Select Coach" className="h-auto flex flex-col gap-2 p-4 data-[state=on]:bg-zinc-700 data-[state=on]:text-white">
        <Users className="h-6 w-6" />
        <span className="text-sm font-medium">Coach</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="trainee" aria-label="Select Trainee" className="h-auto flex flex-col gap-2 p-4 data-[state=on]:bg-zinc-700 data-[state=on]:text-white">
        <Dumbbell className="h-6 w-6" />
        <span className="text-sm font-medium">Trainee</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
