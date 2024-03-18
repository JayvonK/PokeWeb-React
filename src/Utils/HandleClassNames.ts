export const AddType = (type: string) => {
    switch (type) {
        case "normal":
            return "bg-normal rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "water":
            return "bg-water rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "fighting":
            return "bg-fighting rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "flying":
            return "bg-flying rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "poison":
            return "bg-poison rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "ground":
            return "bg-ground rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "rock":
            return "bg-rock rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "bug":
            return "bg-bug rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "ghost":
            return "bg-ghost rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "steel":
            return "bg-steel rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "fire":
            return "bg-fire rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "grass":
            return "bg-grass rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "electric":
            return "bg-electric rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "psychic":
            return "bg-psychic rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "ice":
            return "bg-ice rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "dragon":
            return "bg-dragon rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "dark":
            return "bg-dark rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "fairy":
            return "bg-fairy rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "unknown":
            return "bg-unknown rounded-[50px] drop-shadow-lg mr-3";
            break;
        case "shadow":
            return "bg-shadow rounded-[50px] drop-shadow-lg mr-3";
            break;
        default:
            return "bg-water rounded-[50px] drop-shadow-lg mr-3";
            break;
    }
}

export const BodyColor = (color: string) => {
    switch (color) {
        case "red":
            return "bg-pokeRed";
            break;
        case "blue":
            return "bg-pokeBlue";
            break;
        case "white":
            return "bg-pokeWhite";
            break;
        case "black":
            return "bg-pokeBlack";
            break;
        case "pink":
            return "bg-pokePink";
            break;
        case "purple":
            return "bg-pokePurple";
            break;
        case "green":
            return "bg-pokeGreen";
            break;
        case "gray":
            return "bg-pokeGray";
            break;
        case "brown":
            return "bg-pokeBrown";
            break;
        case "yellow":
            return "bg-pokeYellow";
            break;
        default:
            return "bg-pokeBlue";
            break;
    }
}