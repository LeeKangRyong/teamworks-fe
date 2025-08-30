export function AssignmentStatus({ status }) {
    const getStatusStyles = () => {
        return {
            textColor: "text-secondary-70",
            bgColor: "bg-secondary-3"
        }
    };

    const { textColor, bgColor } = getStatusStyles(status);

    return (
        <div className={`w-17 px-2 py-1 my-1 ${bgColor} rounded-md flex items-center justify-center`}>
            <p className={`${textColor} text-body-s text-center`}>{status}</p>
        </div>
    );
}