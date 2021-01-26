import { useEffect, useRef, useState } from "react";
import { destroyChart, renderChart, updateData } from "./sandbox";

function RealTimeChart({ value, range, sendSensorData, id, active, keys, theme }) {
  const speed = 100;
  const timeoutRef = useRef(null);
  const realValue = useRef({ x: 0, y: 0, z: 0 });
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
  }, [refresh, active, id]);

  useEffect(() => {
    realValue.current = value;
  }, [value]);

  useEffect(() => {
    renderChart(id, range, keys, theme.chartColors);

    return () => destroyChart(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: 170, width: "100%" }}>
      <canvas id={id}></canvas>
    </div>
  );
}

export default RealTimeChart;
