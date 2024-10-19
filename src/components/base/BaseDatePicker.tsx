"use client"
import React from 'react';
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import dayjs from 'dayjs'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DateProps = {
    selectDate: Date | undefined,
    onChange: (date: Date) => void
}

export function BaseDatePicker({ selectDate, onChange}: DateProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full pl-3 text-left font-normal",
                        !selectDate && "text-muted-foreground"
                    )}
                >
                    {selectDate ? (
                        format(selectDate, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectDate}
                    onSelect={(e:any) =>onChange(e)}
                    disabled={(selectDate) =>
                        selectDate > new Date() || selectDate < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
