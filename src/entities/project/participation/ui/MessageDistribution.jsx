"use client";

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export function MessageDistribution({ chartData }) {
    const data = {
        labels: [
            '단순 동의/리액션',
            '자료 공유', 
            '아이디어/의견 제시',
            '정리/중재',
            '피드백'
        ],
        datasets: [
            {
                label: '메시지 유형별 비율',
                data: chartData?.map(item => item.percentage) || [85, 75, 60, 45, 70],
                backgroundColor: 'rgba(95, 146, 251, 0.2)',
                borderColor: 'rgba(95, 146, 251, 0.8)',
                borderWidth: 1,
                pointRadius: 0,
                pointHoverRadius: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 20,
                    display: false
                },
                grid: {
                    color: 'rgba(148, 163, 184, 0.2)'
                },
                pointLabels: {
                    font: {
                        size: 12,
                    },
                    color: '#6C7892',
                    padding: 20,
                },
                angleLines: {
                    color: 'rgba(148, 163, 184, 0.2)'
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        }
    };

    return (
        <article className="w-full border-gray-10 border-1 rounded-lg px-3 py-4 items-center h-115">
            <h3 className="text-secondary-80 text-heading-m pt-4 pl-3">메시지 유형 분포 그래프</h3>
            <div className="flex justify-center mt-5">
                <div className="rounded-lg h-90 w-100 p-4">
                    <Radar data={data} options={options} />
                </div>
            </div>
        </article>
    );
}