import React from "react";
import RealTimeChart from "./Chart";
import Figure from "./Figure";
import styled from "styled-components";

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: ${(props) => props.theme.main};
  margin-bottom: 10px;
`;

const markStyle = (color) => {
  return { width: 20, height: 7, borderRadius: 5, background: color, marginRight: 5 };
};

const Sensor = ({
  value,
  subject,
  units,
  range,
  sendSensorData,
  id,
  graphView,
  labels = ["X-axis", "Y-axis", "Z-axis"],
  active,
}) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        background: "white",
        padding: "1.5rem",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <Title>{subject}</Title>
      {graphView && (
        <div style={{ display: "flex", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", marginRight: 5 }}>
            <div style={markStyle("deeppink")}></div>
            <div style={{ marginRight: 4, lineHeight: "14px" }}>x</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginRight: 5 }}>
            <div style={markStyle("deepskyblue")}></div>
            <div style={{ marginRight: 4, lineHeight: "14px" }}>y</div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={markStyle("rebeccapurple")}></div>
            <div style={{ marginRight: 4, lineHeight: "14px" }}>z</div>
          </div>
        </div>
      )}

      {graphView ? (
        <RealTimeChart
          id={id}
          sendSensorData={sendSensorData}
          value={value}
          range={range}
          subject={subject}
          active={active}
        ></RealTimeChart>
      ) : (
        <Figure value={value} labels={labels} units={units}></Figure>
      )}
    </div>
  );
};

export default Sensor;
