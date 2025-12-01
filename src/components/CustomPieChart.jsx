import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CustomPieChart = ({ data = [], label = "Expense Breakdown", totalAmount, colors = [], showTextAnchor = false }) => {
  const COLORS = colors.length > 0 ? colors : data.map(item => item.color);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-black text-sm drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl border border-yellow-400/30">
          <p className="font-black text-white tracking-tight">{payload[0].name}</p>
          <p className="text-sm text-gray-300 font-semibold">
            ₱{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + (item.amount || item.value || 0), 0);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-black text-white tracking-tight mb-2">{label}</h2>
        <p className="text-gray-300 font-semibold">{totalAmount || `₱${total.toLocaleString()}`}</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-2/3">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="amount"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="space-y-3">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl hover:bg-slate-700/40 transition-all border border-white/5 hover:border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg"
                    style={{ 
                      backgroundColor: COLORS[index % COLORS.length],
                      boxShadow: `0 0 10px ${COLORS[index % COLORS.length]}40`
                    }}
                  />
                  <span className="font-semibold text-white">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">₱{(item.amount || item.value || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400 font-medium">
                    {(((item.amount || item.value || 0) / total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPieChart;
