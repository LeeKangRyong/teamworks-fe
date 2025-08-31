import React from 'react';
import { Bar } from 'react-chartjs-2';

export function NextSubmit({ chartData }) {
    const charts = {
        labels: chartData?.map(row => `${row.title}\n(${row.date.slice(3)})`) || [],
        datasets: [
            {
                label: '제출률',
                data: chartData?.map(row => row.submit_p * 100) || [],
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    
                    if (!chartArea) {
                        return '#E6E8ED';
                    }
                    
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, 'rgba(230, 232, 237, 0.2)');
                    gradient.addColorStop(1, 'rgba(230, 232, 237, 1.0)');
                    
                    return gradient;
                },
                hoverBackgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    
                    if (!chartArea) {
                        return '#5F92FB';
                    }
                    
                    const hoverGradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    hoverGradient.addColorStop(0, 'rgba(95, 146, 251, 0.5)');
                    hoverGradient.addColorStop(1, 'rgba(95, 146, 251, 1.0)'); 
                    
                    return hoverGradient;
                },
                borderRadius: 8,
                borderSkipped: false,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            // 커스텀 플러그인으로 상단 라벨 표시
            datalabels: false,
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6B7280',
                    maxRotation: 0,
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: '#F3F4F6',
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 12
                    },
                    color: '#374151',
                }
            }
        },
        animation: {
            duration: 3000,
            delay: (context) => context.dataIndex * 100,
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    // 커스텀 플러그인: 막대 상단에 백분율 표시
    const customLabelsPlugin = {
        id: 'customLabels',
        afterDatasetsDraw: function(chart) {
            const ctx = chart.ctx;
            
            const dataWithIndex = chartData.map((item, index) => ({
                ...item,
                originalIndex: index
            }));
            const sortedData = [...dataWithIndex].sort((a, b) => b.submit_p - a.submit_p);
            const top2Indices = [sortedData[0]?.originalIndex, sortedData[1]?.originalIndex];
            
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                
                meta.data.forEach((element, index) => {
                    const submitP = chartData[index].submit_p;
                    const percentage = Math.round(submitP * 100) + '%';
                    const isTop2 = top2Indices.includes(index);
                    const isHovered = element.active;
                    
                    if (isHovered) {
                        const x = element.x;
                        let y = element.y - 35;
                        let boxX = x - 35;
                        const isMovedRight = y < 20;
                        
                        if (isMovedRight) { 
                            boxX = x + 60;
                            y = element.y + 20;
                        }
                        
                        ctx.save();
                        
                        const boxWidth = 70;
                        const boxHeight = 30;
                        ctx.fillStyle = isTop2 ? '#5F92FB' : '#F3F4F6';
                        ctx.fillRect(boxX, y - 15, boxWidth, boxHeight);
                        
                        // 삼각형 위치 조정
                        ctx.beginPath();
                        if (isMovedRight) {
                            ctx.moveTo(boxX + 1, y - 3);      // 삼각형 위쪽
                            ctx.lineTo(boxX + 1, y + 7);     // 삼각형 아래쪽
                            ctx.lineTo(boxX - 6, y + 2);    // 삼각형 왼쪽 끝
                        } else {
                            ctx.moveTo(boxX + boxWidth/2 - 5, y + 15);
                            ctx.lineTo(boxX + boxWidth/2 + 5, y + 15);
                            ctx.lineTo(boxX + boxWidth/2, y + 22);
                        }
                        ctx.closePath();
                        ctx.fill();
                        
                        ctx.fillStyle = isTop2 ? '#FFFFFF' : '#6C7892';
                        ctx.font = 'bold 18px';
                        ctx.textAlign = 'center';
                        ctx.fillText(percentage, boxX + boxWidth/2, y + 2);
                        
                        ctx.restore();
                    }
                });
            });
        }
    };

    return (
        <article className="pt-5 w-full h-110 border border-gray-200 rounded-lg bg-white">
            <h3 className="text-gray-700 text-sm px-5 font-bold mb-4">회차별 제출률 추이</h3>
            
            <div className="px-5" style={{ height: '300px' }}>
                <Bar 
                    data={charts} 
                    options={chartOptions}
                    plugins={[customLabelsPlugin]}
                />
            </div>
        </article>
    );
}