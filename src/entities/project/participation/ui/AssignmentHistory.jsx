import { participantSubmitsData } from "@/shared/mock";

export function AssignmentHistory() {
    const sortedSubmits = [...participantSubmitsData].sort((a, b) => {
        const [dateA, timeA] = a.submit_time.split(' ');
        const [dateB, timeB] = b.submit_time.split(' ');
        
        const [yearA, monthA, dayA] = dateA.split('/').map(Number);
        const [yearB, monthB, dayB] = dateB.split('/').map(Number);
        
        const fullDateA = new Date(2000 + yearA, monthA - 1, dayA, ...timeA.split(':').map(Number));
        const fullDateB = new Date(2000 + yearB, monthB - 1, dayB, ...timeB.split(':').map(Number));
        
        return fullDateB - fullDateA;
    });

    // 최근 5개만 표시
    const recentSubmits = sortedSubmits.slice(0, 5);

    const formatDate = (dateTimeString) => {
        const [date] = dateTimeString.split(' ');
        const [year, month, day] = date.split('/');
        return `20${year}/${month}/${day}`;
    };

    return (
        <article className="w-full border-gray-10 border-1 rounded-lg px-6 py-6">
            <h3 className="text-secondary-80 text-body-l font-bold mb-6">과제 제출 히스토리</h3>
            
            <div className="flex justify-between items-center pb-3 border-b border-gray-10">
                <p className="text-body-s text-secondary-50">파일명</p>
                <p className="text-body-s text-secondary-50">제출 날짜</p>
            </div>
            
            <div className="space-y-0">
                {recentSubmits.map((submit, index) => (
                    <div 
                        key={submit.submit_id} 
                        className={`flex justify-between items-center py-4 ${
                            index !== recentSubmits.length - 1 ? 'border-b border-gray-10' : ''
                        }`}
                    >
                        <p className="text-body-m text-secondary-80">
                            {submit.file_name}
                        </p>
                        <p className="text-body-s text-secondary-60">
                            {formatDate(submit.submit_time)}
                        </p>
                    </div>
                ))}
            </div>
        </article>
    );
}