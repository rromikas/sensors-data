import React from "react";
import styled, { withTheme } from "styled-components";

const Label = styled.div`
  margin-right: 4px;
  font-weight: 600;
  white-space: nowrap;
`;

const Figure = ({ value, labels, units, theme }) => {
  const { x, y, z } = value;

  return (
    <div style={{ color: theme.main }}>
      <div style={{ maxWidth: "100px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>{labels[0]}:</Label>
          <div>
            {x.toFixed(1)}
            {units}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>{labels[1]}:</Label>
          <div>
            {y.toFixed(1)}
            {units}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Label>{labels[2]}:</Label>
          <div>
            {z.toFixed(1)}
            {units}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTheme(Figure);
