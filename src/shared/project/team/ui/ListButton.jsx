export function ListButton({ list }) {
    return (
        <button className="bg-white border-gray-20 hover:border-secondary-70 border-1 rounded-lg flex justify-center items-center px-2 py-2 hover:bg-secondary-3 text-body-s text-secondary-50 hover:text-secondary-70 w-25" >
            {list}
        </button>
    );
}