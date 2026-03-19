"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useAuth } from "@/entities/auth";
import dashboard from "@/assets/icons/dashboard.png";
import dashboardBlue from "@/assets/icons/dashboard-blue.png";
import team from "@/assets/icons/team.png";
import teamBlue from "@/assets/icons/team-blue.png";
import chart from "@/assets/icons/chart.png";
import chartBlue from "@/assets/icons/chart-blue.png";
import notice from "@/assets/icons/notice.png";
import noticeBlue from "@/assets/icons/notice-blue.png";
import assignment from "@/assets/icons/assignment.png";
import assignmentBlue from "@/assets/icons/assignment-blue.png";
import workspace from "@/assets/icons/workspace.png";
import workspaceBlue from "@/assets/icons/workspace.png"; // 이거 바꿔야댐
import { Option } from "@/shared/ui/project/layout";
import type { StaticImageData } from "next/image";

interface OptionItem {
    img: StaticImageData;
    imgHover: StaticImageData;
    title: string;
    key: string;
    path: string;
}

const MANAGER_OPTIONS: OptionItem[] = [
    { img: dashboard, imgHover: dashboardBlue, title: "대시보드", key: "dashboard", path: "dashboard" },
    { img: team, imgHover: teamBlue, title: "팀 관리", key: "team", path: "team" },
    { img: chart, imgHover: chartBlue, title: "참여도", key: "participation", path: "participation" },
    { img: notice, imgHover: noticeBlue, title: "메시지/공지", key: "notice", path: "notice" },
    { img: assignment, imgHover: assignmentBlue, title: "과제 확인", key: "assignment", path: "assignment"}
];

const PARTICIPANT_OPTIONS: OptionItem[] = [
    { img: dashboard, imgHover: dashboardBlue, title: "대시보드", key: "dashboard", path: "dashboard" },
    { img: notice, imgHover: noticeBlue, title: "채팅/공지", key: "notice", path: "notice" },
    { img: assignment, imgHover: assignmentBlue, title: "과제 제출", key: "assignment", path: "assignment"},
    { img: chart, imgHover: chartBlue, title: "참여도", key: "participation", path: "participation" },
    { img: workspace, imgHover: workspaceBlue, title: "워크스페이스", key: "workspace", path: "workspace" }
];

interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function Options({ activeTab, setActiveTab }: Props) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const projectId = params.id;
    const { user, isLoading } = useAuth();

    // 클라이언트에서만 렌더링
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const optionItems = useMemo(
        () => user?.role === 'PARTICIPANT' ? PARTICIPANT_OPTIONS : MANAGER_OPTIONS,
        [user?.role]
    );

    useEffect(() => {
        if (!isMounted) return;

        if (pathname === `/projects/${projectId}`) {
            setActiveTab("dashboard");
        } else {
            const matchedItem = optionItems.find(item => pathname.includes(`/${item.path}`));
            if (matchedItem) {
                setActiveTab(matchedItem.key);
            }
        }
    }, [pathname, projectId, setActiveTab, isMounted, optionItems]);

    const handleOptionClick = (item: OptionItem) => {
        setActiveTab(item.key);

        const targetPath = `/projects/${projectId}/${item.path}`;
        router.push(targetPath);
    };

    // 로딩 중이거나 마운트 안됨
    if (!isMounted || isLoading) {
        return (
            <nav className="flex flex-row gap-10 ml-5">
                <div className="h-12" /> {/* 빈 공간 유지 */}
            </nav>
        );
    }

    return (
        <nav className="flex flex-row gap-10 ml-5">
            {optionItems.map((item, index) => (
                <Option
                    key={index}
                    img={hoveredIndex === index || activeTab === item.key ? item.imgHover : item.img}
                    title={item.title}
                    isHovered={hoveredIndex === index}
                    isActive={activeTab === item.key}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleOptionClick(item)}
                />
            ))}
        </nav>
    );
}
