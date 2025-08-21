export function ToDoStatus({ status }) {
    return (
        <div className={`w-17 px-2 py-1 my-1 bg-secondary-3 rounded-md flex items-center justify-center`}>
            <p className={`text-secondary-70 text-body-s text-center`}>{status}</p>
        </div>
    );
}