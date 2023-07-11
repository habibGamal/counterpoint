import React from "react";

const AvatarTitle = ({ title, avatar }: { title: string; avatar: string }) => {
  return (
    <div className="rounded-xl p-8 py-8 2xl:py-16 mb-12 mt-32 bg-[#0E3069] text-white flex relative shadow-lg">
      <h2 className="font-bold text-2xl max-w-[80%]">{title}</h2>
      <img
        src={avatar}
        className="absolute bottom-0 left-6 w-48 2xl:left-24 2xl:w-64"
      />
    </div>
  );
};

export default AvatarTitle;
