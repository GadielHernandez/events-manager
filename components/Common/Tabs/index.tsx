import React from 'react'

type TabsProps = {} & React.HtmlHTMLAttributes<HTMLDivElement>

const Tabs = ({ className, children }: TabsProps) => {
    return <div className={`tabs tabs-lift ${className}`}>{children}</div>
}

export default Tabs
