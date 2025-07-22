import React from 'react'

type TabItemProps = {
    name: string
    title: string
    defaultChecked?: boolean
} & React.HtmlHTMLAttributes<HTMLDivElement>

const TabItem = ({
    name,
    title,
    className,
    children,
    ...htmlProps
}: TabItemProps) => {
    return (
        <>
            <input
                type="radio"
                name={name}
                className="tab rounded-xl text-2xl font-semibold p-3 h-auto"
                aria-label={title}
            />
            <div
                className={`tab-content bg-base-100 border-base-300 p-6 ${className}`}
                {...htmlProps}
            >
                {children}
            </div>
        </>
    )
}

export default TabItem
