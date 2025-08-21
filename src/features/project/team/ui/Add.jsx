export function Add({ type }) {
    return (
        <button className="relative bg-primary-5 flex flex-row rounded-lg justify-center items-center px-3 py-3 hover:bg-primary-10 transition-colors duration-150 w-25 mt-3">
            <span className="text-primary-100 text-body-s text-center">{type} 추가 +</span>
        </button>
    )
}