export function SearchEmptyState({ searchName, onClearSearch }) {
    return (
        <div className="flex flex-col justify-center items-center py-16">
            <p className="text-body-m text-secondary-60 mb-2">
                '{searchName}'에 대한 검색 결과가 없습니다
            </p>
            <p className="text-body-m text-secondary-60 mb-4">
                다른 이름을 입력해보세요
            </p>
            <button
                onClick={onClearSearch}
                className="px-4 py-2 bg-primary-50 text-white rounded-lg hover:bg-primary-60 transition-colors"
            >
                검색 초기화
            </button>
        </div>
    );
}