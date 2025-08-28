export function AddNotice({ onClick }) {
    return (
        <button
            className="w-22 bg-primary-5 flex items-center justify-center p-2 hover:bg-primary-10"
            onClick={onClick}
        >
            <span className="text-body-s text-primary-100 text-center">공지 작성 +</span>
        </button>
    )
}