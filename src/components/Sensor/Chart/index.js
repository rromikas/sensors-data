import { useState, useEffect, useRef } from "react";
import { LineChart, CartesianGrid, YAxis, Legend, Line, ResponsiveContainer } from "recharts";

function Chart({ value, range, sendSensorData }) {
  const interval = 6000;
  const [arr, setArr] = useState([]);
  const timeoutRef = useRef(null);
  const realValue = useRef({ x: 0, y: 0, x: 0 });
  function validate() {
    setArr((prevState) => [...prevState, realValue.current].slice(-50));
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    let speed = 100;
    for (let i = 0; i < interval; i++) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        validate();
        //sendSensorData(realValue.current);
      }, i * speed);
    }
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
