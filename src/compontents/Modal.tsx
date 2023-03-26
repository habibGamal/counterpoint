import React from 'react'
export interface ModalProps {
    state: boolean;
    close: () => void;
    children: React.ReactNode;
}
export default function Modal({ state, close, children }: ModalProps) {
    return (
        state ?
            <div onClick={() => close()} className='fixed top-0 left-0 w-screen h-screen bg-[#3333333c] z-40'>
                <div onClick={e=>e.stopPropagation()} className="z-50 fixed bg-white text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded shadow">
                    {children}
                </div>
            </div>
            : <></>

    )
}
