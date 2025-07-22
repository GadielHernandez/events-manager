import React from 'react'

type FormElementProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
}

const FormElement = ({ children, className, ...props }: FormElementProps) => {
    return (
        <div className={`mb-3 ${className}`} {...props}>
            {children}
        </div>
    )
}

export default FormElement
