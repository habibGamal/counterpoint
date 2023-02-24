import React from 'react'

export default function Button({ className,onClick, content }: {className?:string, onClick: () => void, content: React.ReactNode }) {
    return (
        <button onClick={onClick} className={`${className} rounded p-1 px-2 font-medium bg-[#091d32] hover:bg-[#182838] active:scale-95 transition-all text-white`}>{content}</button>
    )
}
