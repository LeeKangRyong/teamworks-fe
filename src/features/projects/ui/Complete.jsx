export function Complete({ isValid = false }) {
    return (
        <button 
            className={`rounded-md px-3 py-1 ${
                isValid 
                    ? 'bg-white hover:bg-primary-10' 
                    : 'bg-white group hover:bg-gray-5'
            }`}
        >
            <span 
                className={`text-body-s text-center ${
                    isValid 
                        ? 'text-primary-100' 
                        : 'text-secondary-30 group-hover:text-secondary-60'
                }`}
            >
                완료
            </span>
        </button>
    );
}