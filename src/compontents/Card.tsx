import React from "react";

const Card = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div className="rounded-xl my-4 text-xl shadow-lg bg-[#DBF8FD] border border-[#0E3069] text-[#0E3069] font-medium p-8">
      {children}
    </div>
  );
};

export default Card;
