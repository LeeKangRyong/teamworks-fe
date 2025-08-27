// import { More } from "@/shared/ui/project/dashboard";

// export function NextSubmit() {
//     return (
//         <article className="pt-5 w-full h-110 border-1 border-gray-10 rounded-lg">
//             <h3 className="text-secondary-80 text-body-m px-5 font-bold">다음 과제 제출일</h3>
//             <div className="bg-black w-[90%] h-87 rounded-lg my-5 mx-auto flex items-center justify-center">
//                 <h3 className="text-heading-xl text-gray-0">그래프</h3>
//             </div>
//         </article>
//     );
// }

import React, { useEffect, useRef } from 'react';

export function NextSubmit() {
    const chartRef = useRef(null);
    const animationRef = useRef(null);

    // 샘플 데이터 - 실제 데이터로 교체하세요
    const chartData = [
        { label: '1차 과제 (7/20)', value: 52, percentage: null },
        { label: '2차 과제 (7/27)', value: 98, percentage: '100%' },
        { label: '3차 과제 (8/11)', value: 60, percentage: null },
        { label: '4차 과제 (8/12)', value: 78, percentage: '78%' },
        { label: '5차 과제 (8/11)', value: 28, percentage: null },
        { label: '6차 과제 (8/11)', value: 52, percentage: '46%', highlight: true, increase: '10% 상승' },
        { label: '7차 과제 (8/11)', value: 80, percentage: null }
    ];

    const maxValue = Math.max(...chartData.map(d => d.value));

    useEffect(() => {
        const bars = chartRef.current?.querySelectorAll('.chart-bar');
        if (bars) {
            bars.forEach((bar, index) => {
                // 초기 높이를 0으로 설정
                bar.style.height = '0px';
                bar.style.transform = 'translateY(100%)';
                
                // 지연된 애니메이션 시작
                setTimeout(() => {
                    const targetHeight = (chartData[index].value / maxValue) * 200; // 200px = 최대 높이
                    bar.style.height = `${targetHeight}px`;
                    bar.style.transform = 'translateY(0)';
                }, index * 100); // 각 막대마다 100ms 지연
            });
        }
    }, []);

    return (
        <article className="pt-5 w-full h-110 border border-gray-200 rounded-lg bg-white">
            <h3 className="text-gray-700 text-sm px-5 font-bold mb-4">회차별 제출률 추이</h3>
            
            <div className="px-5 h-80" ref={chartRef}>
                {/* Y축 라벨 */}
                <div className="relative h-64 flex items-end justify-between mb-4">
                    {/* Y축 눈금 */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-black -ml-8">
                        <span>100</span>
                        <span>80</span>
                        <span>60</span>
                        <span>40</span>
                        <span>20</span>
                        <span>0</span>
                    </div>
                    
                    {/* 배경 그리드 라인 */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-full h-px bg-gray-50"></div>
                        ))}
                    </div>
                    
                    {/* 막대 그래프 */}
                    <div className="flex justify-between items-end w-full h-full relative">
                        {chartData.map((data, index) => {
                            const height = (data.value / maxValue) * 500; // 200px = 최대 높이
                            return (
                                <div key={index} className="flex flex-col items-center relative group">
                                    {/* 백분율 라벨 */}
                                    {data.percentage && (
                                        <div className={`mb-2 px-2 py-1 rounded text-xs font-medium ${
                                            data.highlight 
                                                ? 'bg-blue-500 text-white' 
                                                : 'bg-gray-100 text-gray-700'
                                        }`}>
                                            {data.percentage}
                                            {data.increase && (
                                                <div className="text-xs mt-1">
                                                    ▲ {data.increase}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    {/* 막대 */}
                                    <div
                                        className={`chart-bar w-12 rounded-lg transition-all duration-700 ease-out ${
                                            data.highlight 
                                                ? 'bg-blue-500' 
                                                : 'bg-gray-300'
                                        } hover:opacity-80 cursor-pointer`}
                                        style={{
                                            transformOrigin: 'bottom'
                                        }}
                                    ></div>
                                    
                                    {/* 호버 툴팁 */}
                                    <div className="absolute bottom-0 transform translate-y-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                                        {data.value}명
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* X축 라벨 */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    {chartData.map((data, index) => (
                        <div key={index} className="text-center max-w-16">
                            <div className="transform -rotate-45 origin-top-left whitespace-nowrap text-xs">
                                {data.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}