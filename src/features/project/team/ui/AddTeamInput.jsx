export function AddTeamInput({ value = "", onChange, placeholder = "000", hasError = false, onFocus, onBlur, type }) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`bg-secondary-3 rounded-lg p-3 transition-colors flex flex-row gap-2 w-full ${
            hasError 
                ? 'border border-warning-100 focus-within:border-warning-100' 
                : 'border border-transparent focus-within:border-secondary-50'
        }`}>
            <input
                type="text" 
                value={value}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                className="bg-transparent outline-none border-none text-body-s text-secondary-80 placeholder:text-secondary-30 flex-1 min-w-0"
            />
            <p className="text-secondary-80 text-body-s flex-shrink-0">{type}</p>
        </div>
    );
}