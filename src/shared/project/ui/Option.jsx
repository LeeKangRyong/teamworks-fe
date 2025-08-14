import Image from "next/image";

export function Option({ img, title, isHovered, isActive, onMouseEnter, onMouseLeave, onClick }) {
    return (
        <div 
            className={`flex flex-row gap-1 items-center px-2 cursor-pointer pb-3 transition-all duration-200 ${
                isHovered || isActive ? 'border-b-1 border-primary-90' : 'border-b-1 border-transparent'
            }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <Image src={img} alt={title} className="h-4 w-4" />
            <p className={`text-body-s transition-colors duration-200 ${
                isHovered || isActive ? 'text-primary-90' : 'text-secondary-50'
            }`}>
                {title}
            </p>
        </div>
    );
}