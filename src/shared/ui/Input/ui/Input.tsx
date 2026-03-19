interface Props {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

export function Input({ value = "", onChange, placeholder = "30자 이내로 작성해주세요", hasError = false, onFocus, onBlur, disabled }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`bg-secondary-3 rounded-lg p-3 transition-colors ${
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
                disabled={disabled}
                className="bg-transparent outline-none border-none text-body-s text-secondary-80 placeholder:text-secondary-30 flex-1 w-100"
            />
        </div>
    );
}
