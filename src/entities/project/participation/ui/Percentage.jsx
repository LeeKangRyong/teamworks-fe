"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// 🔥 컴포넌트에서 직접 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export function Percentage({ percentage = 75, label = "전체 기간", color = "#4F8EF7" }) {
    const chartData = {
        datasets: [
            {
                data: [100 - percentage, percentage],
                backgroundColor: ["#E5E7EB", color ],
                borderWidth: 0,
                cutout: "75%",
                spacing: -5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            arc: {
                borderRadius: 6,
            },
        },
    };

    return (
        <div className="flex flex-col items-center w-24 sm:w-28 md:w-32">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                <Doughnut data={chartData} options={options} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-body-l sm:text-heading-m text-primary-80">
                        {percentage}%
                    </span>
                </div>
            </div>
            <span className="text-caption-regular sm:text-body-s text-secondary-50 mt-1">
                {label}
            </span>
        </div>
    );
}