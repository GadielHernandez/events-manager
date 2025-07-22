import React from 'react'
import clsx from 'clsx'

type GridProps = {
    cols?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    gap?: number
    className?: string
    children: React.ReactNode
}

const colClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
}

const Grid = ({
    cols = 1,
    sm,
    md,
    lg,
    xl,
    gap = 6,
    className,
    children,
    ...rest
}: GridProps) => {
    const classes = clsx(
        'grid',
        colClasses[cols],
        sm && `sm:${colClasses[sm]}`,
        md && `md:${colClasses[md]}`,
        lg && `lg:${colClasses[lg]}`,
        xl && `xl:${colClasses[xl]}`,
        `gap-${gap}`,
        className
    )

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    )
}

export default Grid
