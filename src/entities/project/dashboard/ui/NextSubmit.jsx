import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

export function NextSubmit({ chartData }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const handleMouseEnter = (index) => {
        setIsTransitioning(false);
        setHoveredIndex(index);
    };
    
    const handleMouseLeave = () => {
        setIsTransitioning(true);
        setHoveredIndex(null);
    };
    
    // Recharts용 데이터 변환
    const data = chartData?.map((row, index) => ({
        name: `${row.title}|(${row.date.slice(3)})`, // | 를 구분자로 사용
        value: row.submit_p * 100,
        originalIndex: index
    })) || [];
    
    // 상위 2개
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const top2Indices = [sortedData[0]?.originalIndex, sortedData[1]?.originalIndex];
    
    const getBarColor = (index) => {
        if (hoveredIndex === index) {
            return 'url(#hoverGradient)';
        }
        return 'url(#normalGradient)';
    };
    
    const CustomTick = (props) => {
        const { x, y, payload } = props;
        const lines = payload.value.split('|');
        
        return (
            <g transform={`translate(${x},${y})`}>
                {lines.map((line, index) => (
                    <text
                        key={index}
                        x={0}
                        y={0}
                        dy={16 + index * 14}
                        textAnchor="middle"
                        fill="#6B7280"
                        fontSize={12}
                    >
                        {line}
                    </text>
                ))}
            </g>
        );
    };
    
    const CustomLabel = (props) => {
        const { x, y, width, value, index } = props;
        
        if (hoveredIndex !== index) return null;
        
        const isTop2 = top2Indices.includes(index);
        const percentage = Math.round(value) + '%';
        
        const boxWidth = 70;
        const boxHeight = 30;
        let boxX = x + width / 2 - boxWidth / 2;
        let boxY = y - 35;
        let isMovedRight = boxY < 20;
        
        if (isMovedRight) {
            boxX = x + width + 20;
            boxY = y + 20;
        }
        
        return (
            <g>
                {/* 툴팁 박스 */}
                <rect
                    x={boxX}
                    y={boxY - 15}
                    width={boxWidth}
                    height={boxHeight}
                    fill={isTop2 ? '#5F92FB' : '#F3F4F6'}
                    rx={4}
                />
                
                <path
                    d={
                        isMovedRight
                            ? `M ${boxX + 1} ${boxY - 3} L ${boxX + 1} ${boxY + 7} L ${boxX - 6} ${boxY + 2} Z`
                            : `M ${boxX + boxWidth / 2 - 5} ${boxY + 15} L ${boxX + boxWidth / 2 + 5} ${boxY + 15} L ${boxX + boxWidth / 2} ${boxY + 22} Z`
                    }
                    fill={isTop2 ? '#5F92FB' : '#F3F4F6'}
                />
                
                <text
                    x={boxX + boxWidth / 2}
                    y={boxY + 2}
                    textAnchor="middle"
                    fill={isTop2 ? '#FFFFFF' : '#6C7892'}
                    fontWeight="bold"
                    fontSize="12"
                >
                    {percentage}
                </text>
            </g>
        );
    };

    return (
        <article className="border-1 border-gray-10 rounded-lg w-full pb-5 overflow-hidden">
            <div className="flex justify-between -mx-1">
                <h3 className="text-secondary-80 text-body-m p-5">
                    <b>회차별 제출률 추이</b>
                </h3>
            </div>
            <div className="px-3 max-w-full">
                <div className="w-full" style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        >
                            <defs>
                                <linearGradient id="normalGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="rgba(230, 232, 237, 0.2)" />
                                    <stop offset="100%" stopColor="rgba(230, 232, 237, 1.0)" />
                                </linearGradient>
                                <linearGradient id="hoverGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="rgba(95, 146, 251, 0.5)" />
                                    <stop offset="100%" stopColor="rgba(95, 146, 251, 1.0)" />
                                </linearGradient>
                            </defs>
                            
                            <CartesianGrid 
                                strokeDasharray="0" 
                                stroke="#F3F4F6" 
                                vertical={false}
                            />
                            
                            <XAxis 
                                dataKey="name" 
                                tick={<CustomTick />}
                                tickLine={false}
                                axisLine={false}
                                interval={0}
                                height={60}
                            />
                            
                            <YAxis 
                                domain={[0, 100]}
                                ticks={[0, 20, 40, 60, 80, 100]}
                                tick={{ fontSize: 12, fill: '#374151' }}
                                tickLine={false}
                                axisLine={false}
                            />
                            
                            <Bar 
                                dataKey="value" 
                                radius={[8, 8, 0, 0]}
                                label={<CustomLabel />}
                                animationDuration={0}
                                isAnimationActive={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={getBarColor(index)}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ transition: 'fill 0.1s ease' }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </article>
    );
}

export default NextSubmit;