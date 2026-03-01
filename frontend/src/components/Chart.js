import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, TrendingDown } from 'lucide-react';
const Chart = ({ data, labels, title, type = 'bar', color = 'blue', showTrend = true }) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const trend = data[data.length - 1] - data[0];
    const trendPercentage = ((data[data.length - 1] - data[0]) / data[0]) * 100;
    const getColorClasses = (color) => {
        const colorMap = {
            blue: 'from-blue-500 to-blue-400',
            green: 'from-green-500 to-green-400',
            purple: 'from-purple-500 to-purple-400',
            orange: 'from-orange-500 to-orange-400',
            red: 'from-red-500 to-red-400'
        };
        return colorMap[color] || colorMap.blue;
    };
    return (_jsxs("div", { className: "bg-white rounded-xl p-6 shadow-sm border border-gray-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title }), showTrend && (_jsxs("div", { className: `flex items-center space-x-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`, children: [trend >= 0 ? (_jsx(TrendingUp, { className: "w-4 h-4" })) : (_jsx(TrendingDown, { className: "w-4 h-4" })), _jsxs("span", { className: "text-sm font-medium", children: [Math.abs(trendPercentage).toFixed(1), "%"] })] }))] }), _jsx("div", { className: "h-48 flex items-end justify-between space-x-1", children: data.map((value, index) => {
                    const height = (value / maxValue) * 100;
                    return (_jsxs("div", { className: "flex flex-col items-center flex-1", children: [_jsx("div", { className: "relative w-full flex justify-center", children: type === 'bar' ? (_jsx("div", { className: `w-full bg-gradient-to-t ${getColorClasses(color)} rounded-t-lg transition-all duration-300 hover:opacity-80`, style: { height: `${height}%` }, title: `${labels[index]}: ${value}` })) : (_jsxs("div", { className: "relative w-full h-full", children: [_jsx("div", { className: `absolute bottom-0 w-2 h-2 bg-${color}-500 rounded-full`, style: {
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                bottom: `${height}%`
                                            } }), index < data.length - 1 && (_jsx("div", { className: `absolute w-full h-0.5 bg-${color}-300`, style: {
                                                bottom: `${height}%`,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '100%'
                                            } }))] })) }), _jsx("div", { className: "mt-2 text-xs text-gray-500 text-center", children: labels[index] })] }, index));
                }) }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: data[data.length - 1] }), _jsx("div", { className: "text-sm text-gray-500", children: "Current" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-600", children: maxValue }), _jsx("div", { className: "text-sm text-gray-500", children: "Peak" })] })] })] }));
};
export default Chart;
