export function SubmitItem({ fileName, name, team, submitTime, children, onClick }) {
    return (
        <div
            className="flex flex-row items-center py-1 hover:bg-gray-10 px-3 border-b-1 border-gray-10"
            onClick={onClick}    
        >
            <div className="w-90 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left truncate">{fileName}</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{name}</p>
            </div>
            <div className="w-35 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">팀 {team}</p>
            </div>
            <div className="w-40 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{submitTime}</p>
            </div>
            <div className="flex gap-8 -ml-8">
                {children}
            </div>
        </div>
    );
}