const NavItem = ({
  icon,
  text,
  active,
  onClick
}: {
  icon: string;
  text: string;
  active?: boolean;
  onClick:()=>void;
}) => {
  const activeClass = active ? "nav-item-active" : "";
  return (
    <li
      onClick={onClick}
      className={`flex gap-4 pr-10 ml-10 p-2 2xl:p-4 rounded-l-lg cursor-pointer hover:scale-105 transition ${activeClass}`}
    >
      <img className="w-6  icon-white" src={`icons/${icon}.svg`} />
      <span className="text-xl">{text}</span>
    </li>
  );
};

export default NavItem;
