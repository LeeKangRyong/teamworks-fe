interface Props {
    onClick?: () => void;
    disabled?: boolean;
}

export function Save({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 rounded-lg hover:bg-gray-5"
        >
            <span className="text-body-m text-secondary-60">저장</span>
        </button>
    );
}
