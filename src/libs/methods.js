import isSSR from "../config/isSSR";

export function arrayRun(value) {
  let data = [];
  for (let i = 0; i < value.length; i++) {
    data.push(value[i]);
  }
  return data;
}

export function formatPrice(value) {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

export const apiURL = () => {
  return isSSR()
    ? process.env.REACT_APP_API_URL_SERVER
    : process.env.REACT_APP_API_URL;
};

export const getDevice = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

export const scrollTop = (duration) => {
  // cancel if already on top
  if (document.scrollingElement.scrollTop === 0) return;

  const cosParameter = document.scrollingElement.scrollTop / 2;
  let scrollCount = 0,
    oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / duration;
      if (scrollCount >= Math.PI)
        return (document.scrollingElement.scrollTop = 0);
      document.scrollingElement.scrollTop =
        cosParameter + cosParameter * Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
};

export const scrollToElement = (id) => {
  document.getElementById(id).scrollIntoView();
};

export const getParamsUrl = (location, param) => {
  const urlParams = new URLSearchParams(location);
  if (urlParams.has(param)) {
    return urlParams.get(param);
  } else {
    return "";
  }
};
