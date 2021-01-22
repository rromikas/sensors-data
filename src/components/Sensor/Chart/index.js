import { useEffect, useRef } from "react";
import { renderChart, updateData } from "./sandbox";

function Chart({ value, range, sendSensorData, id }) {
  const interval = 6000;
  const timeoutRef = useRef(null);
  const realValue = useRef({ x: 0, y: 0, x: 0 });

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    let speed = 100;
    for (let i = 0; i < interval; i++) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        updateData(id, realValue.current);
        //sendSensorData(realValue.current);
      }, i * speed);
    }
  }, []);

  useEffect(() => {
    realValue.current = value;
  }, [value]);

  useEffect(() => {
    renderChart(id, range);
  }, []);

  return (
    <div style={{ height: 170, width: "100%" }}>
      <canvas id={id}></canvas>
    </div>
  );
}

export default Chart;
