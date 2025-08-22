import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

export default ChartJS;

// 필요한 library만 import + register해서 사용하기! (위에는 임시)
// layout.tsx에서 import 해놓은 상태
// 그냥 바로 import { Line } from 'react-chartjs-2'; 하고 사용하면 됨!