import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

export default function PageTitle({ title, icon }: { title: string, icon?: IconProp }) {
    return (
        <div className="rounded-l-lg shadow w-fit py-4 px-8 flex gap-8 items-center bg-secondary-400 text-secondary-100">
            {icon && <FontAwesomeIcon size='3x' icon={icon} />}
            <span className="text-5xl font-bold mt-1">{title}</span>
        </div>
    );
}