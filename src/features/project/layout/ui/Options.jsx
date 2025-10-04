"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
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
import { Option } from "@/shared/ui/project/layout";

export function Options({ activeTab, setActiveTab }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const projectId = params.id;

    const optionItems = [
        { img: dashboard, imgHover: dashboardBlue, title: "대시보드", key: "dashboard", path: "dashboard" },
        { img: team, imgHover: teamBlue, title: "팀 관리", key: "team", path: "team" },
        { img: chart, imgHover: chartBlue, title: "참여도", key: "participation", path: "participation" },
        { img: notice, imgHover: noticeBlue, title: "메시지/공지", key: "notice", path: "notice" },
        { img: assignment, imgHover: assignmentBlue, title: "과제 확인", key: "assignment", path: "assignment"}
    ];

    useEffect(() => {
        const pathParts = pathname.split('/');
        
        if (pathname === `/projects/${projectId}`) {
            setActiveTab("dashboard");
        } else {
            const matchedItem = optionItems.find(item => pathname.includes(`/${item.path}`));
            if (matchedItem) {
                setActiveTab(matchedItem.key);
            }
        }
    }, [pathname, projectId, setActiveTab]);

    const handleOptionClick = (item) => {
        setActiveTab(item.key);
        
        const targetPath = `/projects/${projectId}/${item.path}`;        
        router.push(targetPath);
    };

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