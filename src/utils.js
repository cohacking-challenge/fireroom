export function JSONDeepCopy(x) {
  return x ? JSON.parse(JSON.stringify(x)) : {};
}
