enum LOCAL_STORAGE_KEY {
  SQUIRDLE_QUERIES = "squirdle_queries",
}

export const useLocalStorage = () => {
  const setItem = (key: LOCAL_STORAGE_KEY, value: string) =>
    localStorage.setItem(key.toString(), value);

  const getItem = (key: LOCAL_STORAGE_KEY) =>
    localStorage.getItem(key.toString());

  const removeItem = (key: LOCAL_STORAGE_KEY) =>
    localStorage.removeItem(key.toString());

  return { setItem, getItem, removeItem, LOCAL_STORAGE_KEY };
};
