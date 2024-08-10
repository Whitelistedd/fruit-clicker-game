export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1_000_000)
    return (Math.floor(num / 100) / 10).toFixed(1).replace(/\.0$/, "") + "k";
  if (num < 1_000_000_000)
    return (
      (Math.floor((num / 1_000_000) * 10) / 10).toFixed(1).replace(/\.0$/, "") +
      "m"
    );
  return (
    (Math.floor((num / 1_000_000_000) * 10) / 10)
      .toFixed(1)
      .replace(/\.0$/, "") + "b"
  );
};
