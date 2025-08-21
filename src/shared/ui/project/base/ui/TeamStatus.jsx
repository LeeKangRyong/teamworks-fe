export function TeamStatus({ status }) {
    const getStatusStyles = (status) => {
        switch (status) {
            case "무임승차":
                return {
                    textColor: "text-support-red-100",
                    bgColor: "bg-support-red-10"
                };
            case "위험":
                return {
                    textColor: "text-support-yellow-100",
                    bgColor: "bg-support-yellow-10"
                };
            case "좋음":
                return {
                    textColor: "text-support-green-100",
                    bgColor: "bg-support-green-10"
                };
            default:
                return {
                    textColor: "text-support-red-100",
                    bgColor: "bg-support-red-10"
                };
        }
    };

    const { textColor, bgColor } = getStatusStyles(status);

    return (
        <div className={`w-17 px-2 py-1 my-1 ${bgColor} rounded-md flex items-center justify-center`}>
            <p className={`${textColor} text-body-s text-center`}>{status}</p>
        </div>
    );
}