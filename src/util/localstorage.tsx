

export const lsWrite = <T,>(key: string, value: T) => {
  const str = JSON.stringify(value);
  window.localStorage.setItem(key, str);
}

export const lsRead = <T,>(key: string) => {
  const str = window.localStorage.getItem(key);
  return JSON.parse(str) as T;
}
