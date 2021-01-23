import React from "react";

const Figure = ({ value, labels, units }) => {
  const { x, y, z } = value;
  return (
    <div>
      <div style={{ maxWidth: "100px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 4 }}>{labels[0]}:</div>
          <div>
            {x.toFixed(1)}
            {units}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 4 }}>{labels[1]}:</div>
          <div>
            {y.toFixed(1)}
            {units}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 4 }}>{labels[2]}:</div>
          <div>
            {z.toFixed(1)}
            {units}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Figure;
