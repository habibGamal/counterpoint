import React from 'react'

export default function ButtonGroup({ className, children }: { className?: string, children: JSX.Element | JSX.Element[]|React.ReactNode }) {
    return (
        <div className={`rounded p-4 custom-shadow flex gap-6 w-fit ${className}`}>
            {children}
        </div>
    )
}
