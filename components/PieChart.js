import { PieChart as RePieChart, Pie, Sector, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const PieChart = ({ size, data }) => {
  // console.log(data);

  let pieData = [];
  data.forEach(location => {
    location.cases.forEach(item => {
      const n = pieData.find(x => item.age === x.age);
      if (n) {
        n.numCases++;
      } else {
        pieData.push({ age: item.age.trim(), numCases: 1 });
      }
    });
  });
  // console.log(pieData);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        fontSize={14}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {pieData[index].age} - {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <RePieChart width={size} height={size}>
      <Pie
        data={pieData}
        cx={size / 2}
        cy={size / 2}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={120}
        fill="#8884d8"
        dataKey="numCases"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </RePieChart>
  );
};
export default PieChart;
