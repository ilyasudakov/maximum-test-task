export function formatNumber(
  value: number,
  options: {
    maximumFractionDigits: number;
    minimumFractionDigits: number;
  } = { maximumFractionDigits: 2, minimumFractionDigits: 1 }
) {
  return value.toLocaleString("RU", {
    maximumFractionDigits: options.maximumFractionDigits,
    minimumFractionDigits: options.minimumFractionDigits,
  });
}
