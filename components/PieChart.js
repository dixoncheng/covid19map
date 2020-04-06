import { PieChart, Pie, Cell } from "recharts";
import styled, { css, createGlobalStyle } from "styled-components";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartWrap = ({ data }) => {
  // console.log(data);
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="percent"
        // isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        // label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {/* <Tooltip /> */}
    </PieChart>
  );
};

export default PieChartWrap;

const StyledPopup = styled.div``;
