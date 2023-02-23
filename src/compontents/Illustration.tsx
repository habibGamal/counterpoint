import React from 'react'

const Illustration = ({ src, desc }: { src: string; desc: string }) => {
    return (
      <div className="rounded-xl my-4 text-xl shadow-lg bg-[#DBF8FD] border border-sky-900 text-sky-900 font-medium overflow-hidden">
        <img className="w-full border-b-2 border-sky-900" src={src} />
        <p className="p-4">{desc}</p>
      </div>
    );
  };

export default Illustration