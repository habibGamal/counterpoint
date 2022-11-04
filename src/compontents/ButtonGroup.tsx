import React from 'react'

export default function ButtonGroup({ className, children }: { className?: string, children: JSX.Element | JSX.Element[] }) {
    return (
        <div className={`rounded p-4 custom-shadow mt-4 flex gap-6 w-fit ${className}`}>
            {children}
        </div>
    )
}
