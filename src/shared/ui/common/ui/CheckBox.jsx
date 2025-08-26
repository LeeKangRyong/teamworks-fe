export function CheckBox({ 
    checked = false, 
    indeterminate = false, 
    onChange, 
    size = "default", // "sm" | "default" | "lg"
    className = "" 
}) {
    const sizeClasses = {
        sm: "w-3 h-3",
        default: "w-3.5 h-3.5", 
        lg: "w-4 h-4"
    };

    const iconSizeClasses = {
        sm: "w-1.5 h-1.5",
        default: "w-2.5 h-2.5",
        lg: "w-3 h-3"
    };

    const handleClick = () => {
        onChange?.(!checked);
    };

    return (
        <div 
            className={`${sizeClasses[size]} rounded transition-all duration-200 flex items-center justify-center cursor-pointer ${
                checked || indeterminate
                    ? 'bg-primary-80' 
                    : 'bg-secondary-5'
            } ${className}`}
            onClick={handleClick}
        >
            {checked && !indeterminate && (
                <svg 
                    className={`${iconSizeClasses[size]} text-gray-0`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2.5} 
                        d="M4 12l5 5L20 7" 
                    />
                </svg>
            )}
            {indeterminate && (
                <div className="w-2 h-0.5 bg-gray-0 rounded"></div>
            )}
        </div>
    );
}