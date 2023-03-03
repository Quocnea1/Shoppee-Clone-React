export const ProcessLongText = ({ string, limit = 40 }) => {
  let _string = string.trim();
  if (_string.length <= limit) return _string;
  _string = _string.substring(0, limit);
  return _string.substring(0, _string.lastIndexOf(" ")) + "...";
};

export const TextToCurrency = ({ number }) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const ShortNumFormatter = ({ number }) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
};
