import type { POKEMON_TYPE } from "./pokemon";

export interface Player {
  name: string;
  gens: Array<number>;
  possibleTypes: Array<POKEMON_TYPE>;
  sureTypes: Array<POKEMON_TYPE>;
  minHeight: number;
  maxHeight: number;
  minWeight: number;
  maxWeight: number;
}
