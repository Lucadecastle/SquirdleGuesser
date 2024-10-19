import type { Player } from "~/store/models/player";
import { POKEMON_TYPE } from "~/store/models/pokemon";

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
            name: name,
            gens: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            possibleTypes: Object.values(POKEMON_TYPE),
            sureTypes: [],
            minHeight: 0.0,
            maxHeight: 99999.99,
            minWeight: 0.0,
            maxWeight: 99999.99,
          },
        ])
      );
    } else if (
      previousValue &&
      !previousValue.some((entry: any) => entry.name === name)
    ) {
      const newValue = previousValue;

      newValue.push({
        name: name,
        gens: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        possibleTypes: Object.values(POKEMON_TYPE),
        sureTypes: [],
        minHeight: 0.0,
        maxHeight: 99999.99,
        minWeight: 0.0,
        maxWeight: 99999.99,
      });

      setItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES, JSON.stringify(newValue));
    }
  };

  const updatePlayer = (player: Player) => {
    const localValue = getItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES);
    const previousValue = localValue ? JSON.parse(localValue) : localValue;

    if (!previousValue) {
      setItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES, JSON.stringify([player]));
    } else {
      const index = (previousValue as Array<Player>).findIndex(
        (entry: any) => entry.name === player.name
      );

      let newValue = previousValue;

      if (index >= 0) {
        newValue[index] = player;
      }

      setItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES, JSON.stringify(newValue));
    }
  };

  const getPlayers = () => {
    const localValue = getItem(LOCAL_STORAGE_KEY.SQUIRDLE_QUERIES);
    const previousValues: any = localValue
      ? JSON.parse(localValue)
      : localValue;

    return previousValues.map((previousValue: any) => {
      return {
        ...previousValue,
        possibleTypes: (previousValue.possibleTypes as Array<string>).map(
          (type: string) => type as POKEMON_TYPE
        ),
        sureTypes: (previousValue.sureTypes as Array<string>).map(
          (type: string) => type as POKEMON_TYPE
        ),
      };
    });
  };

  return { addNewPlayer, updatePlayer, getPlayers };
};
