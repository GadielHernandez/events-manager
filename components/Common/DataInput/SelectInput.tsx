import React from 'react'

type SelectInputProps = {
    legend?: string
    label?: string
    placeholder?: string
    prepend?: React.ReactNode
    append?: React.ReactNode
    required?: boolean
    name: string
    items: Record<string, string>[]
} & React.InputHTMLAttributes<HTMLInputElement>

const SelectInput = ({
    legend,
    label,
    items = [],
    name,
    required,
}: SelectInputProps) => {
    return (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">{legend}</legend>
            <select
                name={name} // ✅ necesario para capturarlo con formData[name]
                required={required}
                defaultValue=""
                className="select w-full"
            >
                <option disabled value="">
                    {label}
                </option>
                {items.map(({ text, value }) => (
                    <option key={value} value={value}>
                        {text}
                    </option>
                ))}
            </select>
        </fieldset>
    )
}

export default SelectInput
