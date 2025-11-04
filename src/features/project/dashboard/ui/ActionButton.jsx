export function ActionButton({ label, onClick }) {
    return (
        <button 
            className="bg-secondary-5 rounded-lg py-4 px-6 flex items-center justify-center gap-2 hover:bg-secondary-10 transition-colors"
            onClick={onClick}
        >
            <span className="text-body-m text-secondary-80">{label}</span>
        </button>
    );
}