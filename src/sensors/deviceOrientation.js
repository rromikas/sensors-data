export const onDeviceOrientation = (e, { setOrientation }) => {
  setOrientation((prev) =>
    Object.assign({}, prev, { alpha: e.alpha || 0, beta: e.beta || 0, gamma: e.gamma || 0 })
  );
};
