interface IPokemonData {
  abilities: IAbilityObject[];
  location_area_encounters_URL: string;
  moves: IMovesObject[];
  species: {
    name: string;
  };
  sprites: ISpritesObject;
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
  front_default: string;
  front_shiny: string;
  version: {
    "generation-v": {
      "black-white": {
        animated: {
          front_default: string;
        };
      };
    };
  };
}

export {};
