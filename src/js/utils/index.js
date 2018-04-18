// reference: https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
export const getViewport = () => {
  let element = window;
  let propPrefix = "inner";
  if (!("innerWidth" in window)) {
    propPrefix = "client";
    element = document.documentElement || document.body;
  }
  return {
    width: element[`${propPrefix}Width`],
    height: element[`${propPrefix}Height`]
  };
};
