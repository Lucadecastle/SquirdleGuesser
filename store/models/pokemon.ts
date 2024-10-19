export interface Pokemon {
  name: string;
  gen: number;
  type1: POKEMON_TYPE;
  type2: POKEMON_TYPE;
  height: number;
  weight: number;
}

export enum POKEMON_TYPE {
  WATER = "Water",
  FIRE = "Fire",
  GRASS = "Grass",
  ICE = "Ice",
  DARK = "Dark",
  FIGHTING = "Fighting",
  STEEL = "Steel",
  GROUND = "Ground",
  FAIRY = "Fairy",
  DRAGON = "Dragon",
  BUG = "Bug",
  PSYCHIC = "Psychic",
  FLYING = "Flying",
  ROCK = "Rock",
  GHOST = "Ghost",
  NORMAL = "Normal",
  ELECTRIC = "Electric",
  POISON = "Poison",
  NONE = "",
}
