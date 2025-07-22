import React from 'react'

type InputFieldProps = {
    legend?: string
    label?: string
    placeholder?: string
    prepend?: React.ReactNode
    append?: React.ReactNode
    required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const InputField = ({
    legend,
    label,
    placeholder,
    prepend,
    append,
    required = false,
    ...inputProps
}: InputFieldProps) => {
    const inputElement = (
        <input
            type="text"
            className="input w-full"
            placeholder={placeholder}
            required={required}
            {...inputProps}
        />
    )

    return (
        <fieldset className="fieldset">
            {legend && (
                <legend className="fieldset-legend">
                    {legend}{' '}
                    {required && <span className="text-red-500">*</span>}
                </legend>
            )}

            {prepend || append ? (
                <label className="input w-full">
                    {prepend}
                    {inputElement}
                    {append}
                </label>
            ) : (
                inputElement
            )}

            {label && <p className="label">{label}</p>}
        </fieldset>
    )
}

export default InputField
