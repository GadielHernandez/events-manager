import React from 'react'

type FormProps = React.HTMLAttributes<HTMLFormElement> & {
    children: React.ReactNode
}

const Form = ({ children, className, ...props }: FormProps) => {
    return (
        <form className={`max-w-xl mx-auto ${className}`} {...props}>
            {children}
        </form>
    )
}

export default Form
