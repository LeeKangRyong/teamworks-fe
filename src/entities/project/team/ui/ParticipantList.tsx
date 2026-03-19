import { Participant } from "@/shared/ui/project/team";

interface ParticipantData {
    student_id: number;
    name: string;
    email: string;
}

interface Props {
    participants: ParticipantData[];
    selectedIds: number[];
    onCheck: (studentId: number) => void;
}

export function ParticipantList({ participants, selectedIds, onCheck }: Props) {
    return (
        <div className="space-y-0">
            {participants.map(participant => (
                <Participant
                    key={participant.student_id}
                    participant={participant}
                    isSelected={selectedIds.includes(participant.student_id)}
                    onCheck={onCheck}
                />
            ))}
        </div>
    );
}
