import * as React from "react"
import { format, subDays, subMonths, subYears, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangePickerProps {
  dateRange?: DateRange
  onDateRangeChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const presetRanges = [
  {
    label: "Hoy",
    getValue: () => ({
      from: new Date(),
      to: new Date()
    })
  },
  {
    label: "Ayer",
    getValue: () => {
      const yesterday = subDays(new Date(), 1)
      return {
        from: yesterday,
        to: yesterday
      }
    }
  },
  {
    label: "Últimos 7 días",
    getValue: () => ({
      from: subDays(new Date(), 6),
      to: new Date()
    })
  },
  {
    label: "Últimos 30 días",
    getValue: () => ({
      from: subDays(new Date(), 29),
      to: new Date()
    })
  },
  {
    label: "Este mes",
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  },
  {
    label: "Mes pasado",
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1)
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth)
      }
    }
  },
  {
    label: "Este año",
    getValue: () => ({
      from: startOfYear(new Date()),
      to: endOfYear(new Date())
    })
  },
  {
    label: "Año pasado",
    getValue: () => {
      const lastYear = subYears(new Date(), 1)
      return {
        from: startOfYear(lastYear),
        to: endOfYear(lastYear)
      }
    }
  }
]

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Seleccionar rango de fechas",
  disabled = false,
  className
}: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null)

  const handlePresetClick = (preset: typeof presetRanges[0]) => {
    const range = preset.getValue()
    onDateRangeChange?.(range)
    setSelectedPreset(preset.label)
  }

  const handleCalendarSelect = (range: DateRange | undefined) => {
    onDateRangeChange?.(range)
    setSelectedPreset(null) // Clear preset selection when manually selecting dates
  }

  const formatDateRange = (range: DateRange) => {
    if (!range.from) return placeholder
    
    if (!range.to || format(range.from, "yyyy-MM-dd") === format(range.to, "yyyy-MM-dd")) {
      return format(range.from, "dd/MM/yyyy", { locale: es })
    }
    
    return `${format(range.from, "dd/MM/yyyy", { locale: es })} - ${format(range.to, "dd/MM/yyyy", { locale: es })}`
  }

  const clearSelection = () => {
    onDateRangeChange?.(undefined)
    setSelectedPreset(null)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? formatDateRange(dateRange) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Preset Options */}
          <Card className="w-48 border-r border-gray-200 rounded-r-none">
            <CardContent className="p-3">
              <div className="space-y-1">
                {presetRanges.map((preset) => (
                  <Button
                    key={preset.label}
                    variant={selectedPreset === preset.label ? "default" : "ghost"}
                    className="w-full justify-start text-sm h-8"
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}
                
                {(dateRange?.from || selectedPreset) && (
                  <>
                    <div className="border-t border-gray-200 my-2" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={clearSelection}
                    >
                      Limpiar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              locale={es}
              className="rounded-md"
            />
            
            {/* Selected Range Display */}
            {dateRange?.from && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rango seleccionado:</span>
                  <Badge variant="secondary" className="text-xs">
                    {formatDateRange(dateRange)}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}