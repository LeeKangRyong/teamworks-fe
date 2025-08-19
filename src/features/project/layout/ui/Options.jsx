"use client";
import Image from "next/image";
import { useState } from "react";
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
import { Option } from "@/shared/project/layout";

export function Options({ activeTab, setActiveTab }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const optionItems = [
        { img: dashboard, imgHover: dashboardBlue, title: "대시보드", key: "dashboard" },
        { img: team, imgHover: teamBlue, title: "팀 관리", key: "team" },
        { img: chart, imgHover: chartBlue, title: "참여도", key: "participation" },
        { img: notice, imgHover: noticeBlue, title: "메시지/공지", key: "notice" },
        { img: assignment, imgHover: assignmentBlue, title: "과제 확인", key: "assignment"}
    ];

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
                    onClick={() => setActiveTab(item.key)}
                />
            ))}
        </nav>
    );
}