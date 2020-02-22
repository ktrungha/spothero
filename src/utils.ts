export function totallyValid(validation: any) {
  const values = Object.values(validation);
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (!value) {
      continue;
    }
    if (typeof value === 'string') {
      return false;
    }
    const subValid = totallyValid(value);
    if (!subValid) {
      return false;
    }
  }
  return true;
}