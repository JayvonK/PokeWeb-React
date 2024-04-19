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
    const [searchName, setSearchName] = useState<string | number>("7");
    const [currPokemon, setCurrPokemon] = useState<string | number>("7");
    const [evolutionData, setEvolutionData] = useState<IEvolutions>(evolutionDataDefault);
    const [evolImgArray, setEvolImgArray] = useState<string[]>([]);
    const [favPokeImg, setFavPokeImg] = useState<string>("");
    const [pokeFavs, setPokeFavs] = useState<string[]>([]);
    const [pokeColor, setPokeColor] = useState<string>("");

    const getLocal = () => {
        const storedData = localStorage.getItem("pokemonFavs");
        return storedData === null ? [] : JSON.parse(storedData);
    }

    const saveLocal = (pokemon: string | number) => {
        let storage = getLocal()
        if (!storage.includes(pokemon)) {
            localStorage.setItem("pokemonFavs", JSON.stringify(pokeFavs))
        }
        setPokeFavs(getLocal());
    }

    const handleCount = async () => {
        setCount(count + 1);
        setCurrPokemon(searchName);
        setEvolImgArray(await GetEvolutionArray(searchName));
        console.log(evolImgArray);
    };

    const handleRandomClick = async () => {
        let num = Math.floor(Math.random() * 649) + 1;
        setSearchName(num);
        setCurrPokemon(num);
        setEvolImgArray(await GetEvolutionArray(num));

    };

    const handleHeartBoolChange = () => {
        heartBool ? setHeartBool(false) : setHeartBool(true);
        saveLocal(currPokemon);
    };

    const handleShinyBoolChange = () => {
        setShinyPokeBool(!shinyPokeBool);
    };

    const handleChange = (value: string | number) => {
        setSearchName(value)
    };

    const handleKeyDown = (value: string) => {
        if (value === "Enter") {
            setCurrPokemon(searchName);
        }
    };


    useEffect(() => {
        setPokeFavs(getLocal());
        try {
            const InitPokeFetch = async (value: string | number) => {
                setPokeData(await GetPokemonData(value));
                setPokeLocationData(await GetPokemonLocationData(value));
                setPokeFlavor(await GetFlavorText(value));
                setEvolutionData(await GetEvolutionData(value));
                setFavPokeImg(await GetEvolutionImg(value));
                setEvolImgArray(await GetEvolutionArray(value))
                setPokeColor(await GetPokemonColor(value))
            };

            InitPokeFetch(searchName);
        } catch (error) {
            alert("Something went wrong")
        }

    }, [currPokemon]);

    return (
        <>
            <PokePageComponent pokeData={pokeData} pokeLocationData={pokeLocationData} pokeFlavor={pokeFlavor} evolutionData={evolutionData} favPokeImg={favPokeImg} evolImgArray={evolImgArray} pokeFavs={pokeFavs} handleKeyDown={handleKeyDown} handleChange={handleChange} handleShinyBool={handleShinyBoolChange} handleHeartBoolChange={handleHeartBoolChange} handleRandomClick={handleRandomClick} handleCount={handleCount} shinyPokeBool={shinyPokeBool} handleShinyBoolChange={handleShinyBoolChange} heartBool={heartBool} pokeColor={pokeColor} />
        </>

    );
}

export default App;
