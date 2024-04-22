"use client";
import "./App.css";
import PokePageComponent from "./Components/PokePageComponent";
import { useEffect, useState } from "react";

import pokeBall from "./Assets/pokeball.png";
import heartOutline from "./Assets/heartoutline.png";
import heartFill from "./Assets/icons8-heart-64.png";
import favIcon from "./Assets/icons8-heart-96 (1).png";
import magnifyingGlass from "./Assets/icons8-magnifying-glass-128.png";
import random from "./Assets/icons8-random-100.png";
import arrow from "./Assets/ArrowRight.png"
import shinySquirtle from "./Assets/shiny squirtle.png";

import {
    GetEvolutionData,
    GetEvolutionImg,
    GetFlavorText,
    GetPokemonColor,
    GetPokemonData,
    GetPokemonLocationData,
} from "./Data/DataService";
import {
    IEvolutions,
    IFlavorText,
    IPokeColor,
    IPokemonData,
    PokeLocationData,
} from "./Interfaces/Interfaces";
import { GetEvolutionArray } from "./Utils/HandleEvolutions";

import { evolutionDataDefault, pokeDataDefault, pokeFlavorDefault, pokeLocationDataDefault } from "./Utils/Defaults";

function App() {

    const [count, setCount] = useState<number>(0);
    const [heartBool, setHeartBool] = useState<boolean>(false);
    const [shinyPokeBool, setShinyPokeBool] = useState<boolean>(false);
    const [heartSrc, setHeartSrc] = useState<string>(heartOutline);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [pokeData, setPokeData] = useState<IPokemonData>(pokeDataDefault);
    const [pokeFlavor, setPokeFlavor] = useState<IFlavorText>(pokeFlavorDefault);
    const [pokeLocationData, setPokeLocationData] = useState<PokeLocationData>(pokeLocationDataDefault);
    const [searchName, setSearchName] = useState<string | number>("1");
    const [currPokemon, setCurrPokemon] = useState<string | number>("1");
    const [evolutionData, setEvolutionData] = useState<IEvolutions>();
    const [evolImgArray, setEvolImgArray] = useState<string[]>([]);
    const [favPokeImg, setFavPokeImg] = useState<string>("");
    const [pokeFavs, setPokeFavs] = useState<string[]>([]);
    const [pokeColor, setPokeColor] = useState<string>("");
    const [firstLoad, setFistLoad] = useState<boolean>(true);

    const getLocal = () => {
        const storedData = localStorage.getItem("pokemonFavs");
        return storedData === null ? [] : JSON.parse(storedData);
    }

    const saveLocal = (pokemon: string | number) => {
        let storage = getLocal();
        if (!storage.includes(pokemon)) {
            storage.push(pokemon);
            localStorage.setItem("pokemonFavs", JSON.stringify(storage))
        }
        setPokeFavs(getLocal());
    }

    const deleteLocal = (pokemon: string | number) => {
        let storage = getLocal();
        let index = storage.indexOf(pokemon);
        storage.splice(index, 1);
        localStorage.setItem("pokemonFavs", JSON.stringify(storage));
    }

    const handleCount = async () => {
        setCurrPokemon(searchName);
        console.log(evolImgArray);
    };

    const handleRandomClick = async () => {
        let num = Math.floor(Math.random() * 649) + 1;
        setSearchName(num);
        setCurrPokemon(num);
        InitPokeFetch(num);
    };

    const handleHeartBoolChange = () => {
        heartBool ? setHeartBool(false) : setHeartBool(true);
        !heartBool ? saveLocal(currPokemon) : deleteLocal(currPokemon);
    };

    const handleShinyBoolChange = () => {
        setShinyPokeBool(!shinyPokeBool);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.target.value)
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setCurrPokemon(searchName);
            InitPokeFetch(searchName);
        }
    };

    const InitPokeFetch = async (value: string | number) => {
        setEvolutionData(await GetEvolutionData(value));
        setEvolImgArray(await GetEvolutionArray(value));
        setPokeLocationData(await GetPokemonLocationData(value));
        setPokeFlavor(await GetFlavorText(value));
        setFavPokeImg(await GetEvolutionImg(value));
        setPokeColor(await GetPokemonColor(value));
        setPokeData(await GetPokemonData(value));
        if (getLocal().includes(currPokemon)) {
            setHeartBool(true);
        } else {
            setHeartBool(false);
        }
    };

    useEffect(() => {
        if (firstLoad) {
            setPokeFavs(getLocal());
            setFistLoad(false);
            try {
                InitPokeFetch(searchName);
            } catch (error) {
                alert("Something went wrong")
            }
        } else {
            try {
                InitPokeFetch(searchName);
            } catch (error) {
                alert("Something went wrong")
            }
        }


    }, [currPokemon]);

    return (
        <>
            <PokePageComponent pokeData={pokeData!} pokeLocationData={pokeLocationData!} pokeFlavor={pokeFlavor} evolutionData={evolutionData!} favPokeImg={favPokeImg!} evolImgArray={evolImgArray!} pokeFavs={pokeFavs} handleKeyDown={handleKeyDown} handleChange={handleChange} handleShinyBool={handleShinyBoolChange} handleHeartBoolChange={handleHeartBoolChange} handleRandomClick={handleRandomClick} handleCount={handleCount} shinyPokeBool={shinyPokeBool} handleShinyBoolChange={handleShinyBoolChange} heartBool={heartBool} pokeColor={pokeColor} />
        </>
    );
}

export default App;
