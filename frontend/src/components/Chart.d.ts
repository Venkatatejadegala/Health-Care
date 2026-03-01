import React from 'react';
interface ChartProps {
    data: number[];
    labels: string[];
    title: string;
    type?: 'line' | 'bar';
    color?: string;
    showTrend?: boolean;
}
declare const Chart: React.FC<ChartProps>;
export default Chart;
