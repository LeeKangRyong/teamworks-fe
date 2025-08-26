
import { Participant } from "@/shared/ui/project/team";

export function ParticipantList({ participants, selectedIds, onCheck }) {
    return (
        <div className="space-y-0">
            {participants.map(participant => (
                <Participant 
                    key={participant.id}
                    participant={participant}
                    isSelected={selectedIds.includes(participant.id)}
                    onCheck={onCheck}
                />
            ))}
        </div>
    );
}