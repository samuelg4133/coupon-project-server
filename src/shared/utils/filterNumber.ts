export function filterNumbers(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export function filterNumbersAndConvertToString(value: string) {
  const num = value.replace(/[^0-9]/g, "");

  return parseInt(num);
}
