export const useSquirdleQueries = () => {
  const { setItem, getItem, LOCAL_STORAGE_KEY } = useLocalStorage();

  const addNewPlayer = (name: string) => {
    const localValue = getItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES);
    const previousValue = localValue ? JSON.parse(localValue) : localValue;

    if (!previousValue) {
      setItem(
        LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES,
        JSON.stringify([
          {
            playerName: name,
            gen: "",
            type: "",
            height: "",
            weight: "",
          },
        ])
      );
    } else if (
      previousValue &&
      !previousValue.some((entry: any) => entry.playerName === name)
    ) {
      const newValue = previousValue;
      console.log(newValue);

      newValue.push({
        playerName: name,
        gen: "",
        type: "",
        height: "",
        weight: "",
      });

      setItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES, JSON.stringify(newValue));
    }
  };

  return { addNewPlayer };
};
