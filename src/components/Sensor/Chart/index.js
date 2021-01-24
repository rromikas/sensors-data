import { useEffect, useRef, useState } from "react";
import { destroyChart, renderChart, updateData } from "./sandbox";

function RealTimeChart({ value, range, sendSensorData, id, active }) {
  const interval = 6000;
  const speed = 100;
  const timeoutRef = useRef(null);
  const realValue = useRef({ x: 0, y: 0, x: 0 });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (active) {
      timeoutRef.current = setTimeout(() => {
        updateData(id, realValue.current);
        setRefresh(!refresh);
        //sendSensorData(realValue.current);
      }, speed);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [refresh, active]);

  useEffect(() => {
    realValue.current = value;
  }, [value]);

  useEffect(() => {
    renderChart(id, range);

    return () => destroyChart(id);
  }, []);

  return (
    <div style={{ height: 170, width: "100%" }}>
      <canvas id={id}></canvas>
    </div>
  );
}

export default RealTimeChart;
