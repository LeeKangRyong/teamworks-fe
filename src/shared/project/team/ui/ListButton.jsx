export function ListButton({ list, isSelected, onClick }) {
    return (
        <button 
            className={`
                border-1 rounded-lg flex justify-center items-center px-2 py-2 text-body-s w-25 transition-all duration-200
                ${isSelected 
                    ? 'bg-secondary-3 border-secondary-70 text-secondary-70' 
                    : 'bg-white border-gray-20 text-secondary-50 hover:border-secondary-70 hover:bg-secondary-3 hover:text-secondary-70'
                }
            `}
            onClick={onClick}
        >
            {list}
        </button>
    );
}