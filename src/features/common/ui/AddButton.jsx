export function AddButton({ onClick, title }) {
    return (
        <button
            className="w-22 mt-3 bg-primary-5 rounded flex items-center justify-center p-2 hover:bg-primary-10"
            onClick={onClick}
        >
            <span className="text-body-s text-primary-100 text-center">{title}</span>
        </button>
    )
}