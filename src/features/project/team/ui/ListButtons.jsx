import { ListButton } from "@/shared/project/team";

export function ListButtons() {
    return (
        <div className="flex flex-row gap-4" role="tablist" aria-label="팀 관리 메뉴">
            <ListButton list="팀 리스트" />
            <ListButton list="학생 리스트" />
        </div>
    );
}