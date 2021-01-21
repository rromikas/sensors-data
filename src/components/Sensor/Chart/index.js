import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import React, { useEffect, useState } from "react";

const RealTimeChart = ({ value }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData((prev) => {
        let arr = [...prev];
        if (arr.length == 10) {
          arr.splice(arr.length - 1, 1);
        }
        return [value, ...arr];
      });
    }, 1);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <ResponsiveContainer width={"100%"} height={140}>
      <LineChart data={data}>
        <Line isAnimationActive={false} type="monotone" dataKey="x" stroke="#B20D30" />
        <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#3F84E5" />
        <Line isAnimationActive={false} type="monotone" dataKey="z" stroke="#E59124" />
        <CartesianGrid stroke="#ccc" />
        <XAxis /> <YAxis />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RealTimeChart;
