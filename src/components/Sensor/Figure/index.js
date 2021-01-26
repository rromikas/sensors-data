import React from "react";
import styled, { withTheme } from "styled-components";

const Label = styled.div`
  margin-right: 4px;
  font-weight: 600;
  white-space: nowrap;
`;

const Figure = ({ value, labels, units, theme, subject, characterValue }) => {
  return (
    <div style={{ color: theme.main }}>
      <div style={{ maxWidth: "100px", width: "100%" }}>
        {Object.values(value).map((x, i) => (
          <div key={`${subject}-figure-${i}`} style={{ display: "flex", alignItems: "center" }}>
            <Label>{labels[i]}:</Label>
            <div style={{ whiteSpace: "nowrap" }}>
              {characterValue ? x : x.toFixed(1)}
              {units}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withTheme(Figure);
