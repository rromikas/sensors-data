import React from "react";
import RealTimeChart from "./Chart";
import Figure from "./Figure";
import styled, { withTheme } from "styled-components";

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
  characterValue,
  characterValueLabels,
  subject,
  units,
  range,
  sendSensorData,
  id,
  graphView,
  graphViewDisabled = false,
  labels = ["X-axis", "Y-axis", "Z-axis"],
  active,
  keys,
  theme,
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
      {graphView && !graphViewDisabled && (
        <div style={{ display: "flex", marginBottom: 15, marginTop: 25, flexWrap: "wrap" }}>
          {keys.map((x, i) => (
            <div
              key={`${subject}-chart-label-${i}`}
              style={{ display: "flex", alignItems: "center", marginRight: 5, marginBottom: 5 }}
            >
              <div style={markStyle(theme.chartColors[i])}></div>
              <div style={{ marginRight: 4, lineHeight: "14px" }}>{x}</div>
            </div>
          ))}
        </div>
      )}

      {graphView && !graphViewDisabled ? (
        <RealTimeChart
          id={id}
          sendSensorData={sendSensorData}
          value={value}
          range={range}
          subject={subject}
          active={active}
          keys={keys}
          theme={theme}
        ></RealTimeChart>
      ) : (
        <Figure value={value} labels={labels} units={units} subject={subject}></Figure>
      )}
      {characterValue && (
        <Figure
          characterValue
          value={characterValue}
          labels={characterValueLabels}
          subject={subject}
        ></Figure>
      )}
    </div>
  );
};

export default withTheme(Sensor);
