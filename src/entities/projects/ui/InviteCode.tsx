interface Props {
    code: string;
}

export function InviteCode({ code }: Props) {
    return (
        <div className="bg-secondary-3 w-70 py-2 rounded">
            <p className="text-secondary-80 text-body-s text-left ml-4">{code}</p>
        </div>
    );
}
