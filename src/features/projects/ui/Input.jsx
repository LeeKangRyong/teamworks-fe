export function Input() {
    return (
        <div className="bg-secondary-3 rounded-lg p-3 border border-transparent focus-within:border-secondary-50 transition-colors">
            <input
                type="text" 
                placeholder="30자 이내로 작성해주세요"
                className="bg-transparent outline-none border-none text-body-s text-secondary-80 placeholder:text-secondary-30 flex-1 w-100"
            /> 
        </div>
    );
}