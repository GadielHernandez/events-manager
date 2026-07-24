'use client'
import React, { useState } from 'react'

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = [0, 15, 30, 45]
const pad = (n: number) => String(n).padStart(2, '0')

type TimeSelectProps = {
    name: string
    legend?: string
    required?: boolean
    defaultHour?: number
    defaultMinute?: number
}

const TimeSelect = ({
    name,
    legend,
    required = false,
    defaultHour = 18,
    defaultMinute = 0,
}: TimeSelectProps) => {
    const [hour, setHour] = useState(defaultHour)
    const [minute, setMinute] = useState(defaultMinute)

    return (
        <fieldset className="fieldset">
            {legend && (
                <legend className="fieldset-legend">
                    {legend}{' '}
                    {required && <span className="text-red-500">*</span>}
                </legend>
            )}
            <div className="flex items-center gap-1">
                <select
                    className="select w-full"
                    value={hour}
                    onChange={(e) => setHour(Number(e.target.value))}
                >
                    {HOURS.map((h) => (
                        <option key={h} value={h}>
                            {pad(h)}
                        </option>
                    ))}
                </select>
                <span className="font-bold text-base px-1">:</span>
                <select
                    className="select w-full"
                    value={minute}
                    onChange={(e) => setMinute(Number(e.target.value))}
                >
                    {MINUTES.map((m) => (
                        <option key={m} value={m}>
                            {pad(m)}
                        </option>
                    ))}
                </select>
            </div>
            <input type="hidden" name={name} value={`${pad(hour)}:${pad(minute)}`} />
        </fieldset>
    )
}

export default TimeSelect
