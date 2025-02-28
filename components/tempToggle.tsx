"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Thermometer } from "lucide-react"
import { useEffect, useState } from "react"

export default function TempToggle() {
  const [tempUnit, setTempUnitState] = useState("C")

  useEffect(() => {
    const savedUnit = localStorage.getItem('tempUnit')
    if (savedUnit) {
      setTempUnitState(savedUnit)
    }
  }, [])

  const setTempUnit = (unit: string) => {
    setTempUnitState(unit)
    localStorage.setItem('tempUnit', unit)
    // Disparar evento de storage manualmente para componentes na mesma janela
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='rounded-l-full absolute top-6 border-none focus-visible:outline-none focus-visible:border-none focus:outline-none bg-[#e4e8ed] dark:bg-neutral-500/60 right-[60px]'>
          <Thermometer className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle temperature unit</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTempUnit("C")}>
          Celsius
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTempUnit("F")}>
          Fahrenheit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 