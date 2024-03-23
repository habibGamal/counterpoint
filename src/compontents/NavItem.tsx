const NavItem = ({
    icon,
    text,
    active,
    onClick,
}: {
    icon: JSX.Element;
    text: string;
    active?: boolean;
    onClick: () => void;
}) => {
    const activeClass = active ? "nav-item-active" : "";
    return (
        <li
            onClick={onClick}
            className={`nav-item flex gap-4 pr-10 ml-10 p-2 2xl:p-4 rounded-l-lg cursor-pointer hover:scale-105 transition ${activeClass}`}
        >
            <span className="icon">{icon}</span>
            <span className="text-xl">{text}</span>
        </li>
    );
};

export default NavItem;
