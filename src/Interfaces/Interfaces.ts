export type IPokemonData = {
  abilities: IAbilityObject[];
  id: number;
  location_area_encounters_URL: string;
  moves: IMovesObject[];
  species: {
    name: string;
    url: string;
  };
  sprites: ISpritesObject;
  types: ITypesObject[];
}

interface IAbilityObject {
  ability: {
    name: string;
  };
}

interface IMovesObject {
  move: {
    name: string;
  };
}

interface ITypesObject {
  type: {
    name: string;
  };
}

interface ISpritesObject {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    }
  }
  versions: {
    "generation-v": {
      "black-white": {
        animated: {
          front_default: string;
        };
      };
    };
  };
}

