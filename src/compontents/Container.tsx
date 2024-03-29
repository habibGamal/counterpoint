import React from "react";

const Container = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return <div className="w-[90%] mx-auto">{children}</div>;
};

export default Container;
