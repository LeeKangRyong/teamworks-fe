import { Doughnut } from "react-chartjs-2";

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
        maintainAspectRatio: false,
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
        <div className="relative w-32 h-32 flex flex-col items-center">
            <div className="relative w-32 h-32">
                <Doughnut data={chartData} options={options} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-heading-m text-primary-80">
                        {percentage}%
                    </span>
                </div>
            </div>
            <span className="text-body-s text-secondary-50 mt-1">{label}</span>
        </div>
    );
}