export const calculatePercentageDone = (
  currentCount: number,
  requiredCount: number
) => {
  if (requiredCount <= 0) {
    return 0; // Avoid division by zero
  }
  const percentageDone = (currentCount / requiredCount) * 100;
  return Math.floor(percentageDone); // Return percentage as a whole number
};
