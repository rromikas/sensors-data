import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

function Chart({ value, range }) {
  const [arr, setArr] = useState([]);
  const intervalRef = useRef(null);
  const realValue = useRef({ x: 0, y: 0, x: 0 });
  function validate() {
    setArr((prevState) => [...prevState, realValue.current].slice(-10));
  }

  useEffect(() => {
    if (intervalRef.current !== null) {
      clearTimeout(intervalRef.current);
    }
    let speed = 100;
    intervalRef.current = setInterval(() => {
      intervalRef.current = null;
      validate();
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    realValue.current = value;
  }, [value]);

  return (
    <div>
      <ResponsiveContainer width={"100%"} height={140}>
        <LineChart data={arr}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis domain={range} />
          <Legend align="right" verticalAlign="top" wrapperStyle={{ height: 0, top: -30 }} />
          <Line type="monotone" dataKey="x" stroke="#B20D30" />
          <Line type="monotone" dataKey="y" stroke="#3F84E5" />
          <Line type="monotone" dataKey="z" stroke="#E59124" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
