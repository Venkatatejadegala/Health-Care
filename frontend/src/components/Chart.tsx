import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartProps {
  data: number[];
  labels: string[];
  title: string;
  type?: 'line' | 'bar';
  color?: string;
  showTrend?: boolean;
}

const Chart: React.FC<ChartProps> = ({ 
  data, 
  labels, 
  title, 
  type = 'bar', 
  color = 'blue',
  showTrend = true 
}) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const trend = data[data.length - 1] - data[0];
  const trendPercentage = ((data[data.length - 1] - data[0]) / data[0]) * 100;

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'from-blue-500 to-blue-400',
      green: 'from-green-500 to-green-400',
      purple: 'from-purple-500 to-purple-400',
      orange: 'from-orange-500 to-orange-400',
      red: 'from-red-500 to-red-400'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showTrend && (
          <div className={`flex items-center space-x-1 ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(trendPercentage).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="h-48 flex items-end justify-between space-x-1">
        {data.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex justify-center">
                {type === 'bar' ? (
                  <div
                    className={`w-full bg-gradient-to-t ${getColorClasses(color)} rounded-t-lg transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${height}%` }}
                    title={`${labels[index]}: ${value}`}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <div
                      className={`absolute bottom-0 w-2 h-2 bg-${color}-500 rounded-full`}
                      style={{ 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        bottom: `${height}%`
                      }}
                    />
                    {index < data.length - 1 && (
                      <div
                        className={`absolute w-full h-0.5 bg-${color}-300`}
                        style={{
                          bottom: `${height}%`,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '100%'
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                {labels[index]}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{data[data.length - 1]}</div>
          <div className="text-sm text-gray-500">Current</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{maxValue}</div>
          <div className="text-sm text-gray-500">Peak</div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
