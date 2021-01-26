export const onDeviceMotion = (
  e,
  { setAcceleration, setAccelerationIncludingGravity, setRotationRate }
) => {
  setAcceleration((prev) =>
    Object.assign({}, prev, {
      x: e.acceleration.x || 0,
      y: e.acceleration.y || 0,
      z: e.acceleration.z || 0,
    })
  );
  setAccelerationIncludingGravity((prev) =>
    Object.assign({}, prev, {
      x: e.accelerationIncludingGravity.x || 0,
      y: e.accelerationIncludingGravity.y || 0,
      z: e.accelerationIncludingGravity.z || 0,
    })
  );
  setRotationRate((prev) =>
    Object.assign({}, prev, {
      alpha: e.rotationRate.alpha || 0,
      beta: e.rotationRate.beta || 0,
      gamma: e.rotationRate.gamma || 0,
    })
  );
};
