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
  const [time, setTime] = useState("");
  const [arr, setArr] = useState([]);
  const timeoutRef = useRef(null);
  const realValue = useRef({ x: 0, y: 0, x: 0 });
  function validate() {
    setArr((prevState) => [...prevState, realValue.current].slice(-10));
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    let interval = 6000;
    let speed = 100;
    for (let i = 0; i < interval; i++) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        validate();
      }, i * speed);
    }
  }, []);

  useEffect(() => {
    realValue.current = value;
  }, [value]);

  return (
    <div>
      <h1>{time}</h1>
      <ResponsiveContainer width={"100%"} height={140}>
        <LineChart data={arr} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis domain={range} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x" stroke="#B20D30" />
          <Line type="monotone" dataKey="y" stroke="#3F84E5" />
          <Line type="monotone" dataKey="z" stroke="#E59124" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
