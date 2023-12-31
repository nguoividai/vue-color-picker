import tinycolor from "./tinycolor";

export function includes(el, child) {
  if (el) {
    return el === child || el.contains(child);
  } else {
    return false;
  }
}

export function contains(el, child) {
  return el !== child && el.contains(child);
}

/**
 * tinyColor生成基础颜色对象
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const getTinyColor = (value) => {
  const color = tinycolor(value);
  const isValid = color.isValid();
  if (isValid) {
    let { h, s, v } = color.toHsv();
    const { r, g, b } = color.toRgb();
    h = Math.round(h);
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return {
      rgb: { r, g, b },
      hsv: { h, s, v },
      hex: color.toHexString(),
      alpha: color.getAlpha()
    };
  } else {
    console.warn("WARN: value is not valid");
    return {
      rgb: { r: 255, g: 0, b: 0, a: 1 },
      hsv: { h: 0, s: 100, v: 100, a: 1 },
      hex: "#f00",
      alpha: 1
    };
  }
};

export const getElSizePosition = (el) => {
  // compatiable ie 8+
  return {
    width: el.clientWidth,
    height: el.clientHeight,
    left: el.getBoundingClientRect().left + document.body.scrollLeft,
    top: el.getBoundingClientRect().top + document.body.scrollTop
  };
};

export const getValInRange = (val, min, max) => {
  if (typeof val === "number") {
    return val < min ? min : val > max ? max : val;
  } else {
    return min;
  }
};

export const throttle = (fn, threshhold, scope) => {
  threshhold || (threshhold = 250);
  let last;
  let deferTimer;
  return (...args) => {
    const context = scope || this;
    const now = Date.now();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};
