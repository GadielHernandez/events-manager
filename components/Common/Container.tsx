import React, { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="-mt-6 z-10 shadow-lg bg-base-100 pt-6 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto rounded-t-3xl pb-18">
            {children}
        </div>
    )
}

export default Container
