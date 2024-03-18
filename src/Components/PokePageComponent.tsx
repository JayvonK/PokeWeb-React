"use client";
import React, { useEffect } from "react";
import "../App.css";
import { Modal } from "flowbite-react";
import { useState } from "react";
import {
    GetEvolutionData,
    GetEvolutionImg,
    GetFlavorText,
    GetPokemonData,
    GetPokemonLocationData,
} from "../Data/DataService";
import {
    IEvolutions,
    IFlavorText,
    IPokemonData,
    PokeLocationData,
} from "../Interfaces/Interfaces";
import { GetEvolutionArray } from "../Utils/HandleEvolutions";

import pokeBall from "../Assets/pokeball.png";
import heartOutline from "../Assets/heartoutline.png";
import heartFill from "../Assets/icons8-heart-64.png";
import favIcon from "../Assets/icons8-heart-96 (1).png";
import magnifyingGlass from "../Assets/icons8-magnifying-glass-128.png";
import random from "../Assets/icons8-random-100.png";
import arrow from "../Assets/ArrowRight.png"
import shinySquirtle from "../Assets/shiny squirtle.png";
import { idFormat, moveFormat, nameFormat } from "../Utils/HandleFormats";
import { AddType, BodyColor } from "../Utils/HandleClassNames";

function PokePageComponent(props: {pokeData: IPokemonData, pokeLocationData: PokeLocationData, pokeFlavor: IFlavorText, evolutionData: IEvolutions, favPokeImg: string, evolImgArray: string[], pokeFavs: string[], handleKeyDown: (value: string) => void, handleChange: (value: string | number) => void, handleShinyBool: () => void, handleHeartBoolChange: () => void, handleRandomClick: () => void, handleCount: () => void, shinyPokeBool: boolean, handleShinyBoolChange: () => void, heartBool: boolean, pokeColor: string}) {


const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        
        <div className={BodyColor(props.pokeColor) + " transition"}>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="md:text-5xl text-3xl chakra text-gra-900 dark:text-white flext items-center">
                    {" "}
                    Favorites
                </Modal.Header>
                <Modal.Body className="p-4 md:p-5 grid grid-flow-row grid-cols-4">
                    <div className="p-4 md:p-5 grid grid-flow-row grid-cols-4">
                        {props.pokeFavs.map((ele, i) => (
                            <img
                                key={i}
                                className="w-28 transition duration-300 ease-out hover:scale-110"
                                src={props.favPokeImg}
                                alt=""
                            />
                        ))}
                    </div>
                </Modal.Body>
            </Modal>

            <img className="pokeBall opacity-5" src={pokeBall} alt="" />
            <h1 className="md:block verticalWord text-white chakra text-3xl drop-shadow-lg hidden">
                Click the pokemon!
            </h1>
            <div className="grid grid-rows-1 2xl:px-40 lg:px-28 pl-10 md:pt-14">
                <div className="grid 2xl:grid-cols-2 2xl:grid-rows-none grid-rows-2">
                    <div className="2xl:w-[650px] flex items-center">
                        <h1 className="md:text-[128px] md:w-[640px] text-6xl chakraBold text-white drop-shadow-lg">
                            POKEWEB
                        </h1>
                    </div>
                    <div className="md:flex md:items-center">
                        <input
                            className="2xl:w-[405px] xl:w-[800px] md:w-[405px] md:h-[93px] w-[280px] h-[56px] chakra md:text-3xl text-[24px]"
                            type="text"
                            name=""
                            placeholder="Search for Pokemon"
                            onChange={(e) => props.handleChange(e.target.value)}
                            onKeyDown={(e) => props.handleKeyDown(e.key)}
                        />
                        <div className="flex md:justify-around justify-between md:w-full w-[250px] md:mt-0 mt-5">
                            <button
                                type="button"
                                onClick={props.handleCount}
                                className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-24 w-[56px] rounded-3xl"
                            >
                                <img className="p-2" src={magnifyingGlass} alt="" />
                            </button>
                            <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-24 w-[56px] rounded-3xl">
                                <img
                                    onClick={props.handleRandomClick}
                                    className="p-2"
                                    src={random}
                                    alt=""
                                />
                            </button>
                            <button
                                className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-24 w-[56px] rounded-3xl"
                                onClick={() => setOpenModal(true)}
                            >
                                <img className="p-2" src={favIcon} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-rows-1 mt-12">
                <div className="2xl:grid 2xl:grid-cols-2">
                    <div>
                        <div className="2xl:pl-40 2xl:flex 2xl:justify-start flex justify-center">
                            <img
                                className="md:w-[550px] h-auto w-72 cursor-pointer transition duration-300 hover:scale-110"
                                src={
                                    props.shinyPokeBool
                                        ? props.pokeData?.sprites.other["official-artwork"].front_shiny
                                        : props.pokeData?.sprites.other["official-artwork"].front_default
                                }
                                alt=""
                                onClick={props.handleShinyBoolChange}
                            />
                            <img
                                className="md:w-[550px] h-auto w-[330px] transition duration-300 hover:scale-110 hidden"
                                src={shinySquirtle}
                                alt=""
                            />
                        </div>
                        <div className="pl-40 2xl:block hidden w-[80%]">
                            <h2 className="text-4xl chakra text-white drop-shadow-lg">
                                {props.pokeFlavor?.flavor_text_entries[0].flavor_text}
                            </h2>
                        </div>
                    </div>
                    <div className="2xl:grid 2xl:grid-cols-[55%_45%] 2xl:mx-0 lg:mx-60 md:mx-20 mx-10">
                        <div>
                            <h1 className="md:hidden text-2xl chakra text-white text-center mt-3 my-5 drop-shadow-lg">
                                Click the pokemon!
                            </h1>
                            <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-6 drop-shadow-lg">
                                {props.pokeData && idFormat(props.pokeData.id)}
                            </h1>
                            <h1 className="h-auto md:text-6xl text-[40px] chakraBold flex text-white items-center mb-6">
                                <span className="drop-shadow-lg">
                                    {props.pokeData && nameFormat(props.pokeData.species.name) }
                                </span>{" "}
                                <button
                                    type="button"
                                    onClick={props.handleHeartBoolChange}
                                    className="ml-5 transition duration-300 hover:scale-105"
                                >
                                    <img
                                        className="md:w-auto w-[40px]"
                                        src={props.heartBool ? heartFill : heartOutline}
                                        alt="heart outline"
                                    />
                                </button>
                            </h1>
                            <div className="mb-6 text-3xl text-white">
                                {props.pokeData &&
                                    props.pokeData.types.map((t, i) => (
                                        <button
                                            key={i}
                                            className={AddType(t.type.name)}
                                        >
                                            <p className="px-4 py-2 chakraBold md:text-3xl text-2xl">
                                                {nameFormat(t.type.name)}
                                            </p>
                                        </button>
                                    ))}
                            </div>
                            <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-10 drop-shadow-lg">
                                Location:{" "}
                                <span className="chakra">
                                    {(props.pokeLocationData && props.pokeLocationData.names[0].name) ||
                                        (props.pokeLocationData && props.pokeLocationData.location.name)}
                                </span>
                            </h1>
                            <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-10 drop-shadow-lg">
                                Abilities:{" "}
                                <span className="chakra">
                                    {props.pokeData &&
                                        props.pokeData.abilities.map((ab, i) => {
                                            if(i != props.pokeData.abilities.length - 1){
                                                return (moveFormat(ab.ability.name) + ", ")
                                            } else {
                                                return moveFormat(ab.ability.name)
                                            }
                                        })}
                                </span>
                            </h1>
                            <h1 className="md:text-4xl text-[24px] chakraBold text-white mb-10 drop-shadow-lg h-72 overflow-y-auto">
                                Moves:{" "}
                                <span className="chakra">
                                    {props.pokeData && props.pokeData.moves.map((m, i) => {
                                        if(i != props.pokeData.moves.length - 1){
                                            return (moveFormat(m.move.name) + ", ")
                                        } else {
                                            return moveFormat(m.move.name)
                                        }
                                        
                                        })}
                                </span>
                            </h1>
                        </div>
                        <div className="2xl:hidden md:my-24 my-12">
                            <h2 className="md:text-4xl text-[24px] chakra text-white drop-shadow-lg">
                                {props.pokeFlavor?.flavor_text_entries[0].flavor_text}
                            </h2>
                        </div>
                        <div className="2xl:pl-8">
                            <h1 className="md:text-4xl text-[24px] chakraBold text-white drop-shadow-lg md:mb-12 mb-6">
                                Evolutions
                            </h1>
                            <div className="mb-8 2xl:h-[700px] 2xl:overflow-y-auto">
                                    {
                                        props.evolImgArray.map((pokemon, i) => {
                                            console.log("running");
                                            if (i % 2 === 0) {
                                                return (
                                                    <div key={i} className="flex justify-start items-center md:mb-8 mb-4">
                                                        <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center">
                                                            <img
                                                                className="md:w-20 w-12"
                                                                src={props.evolImgArray[i]}
                                                                alt=""
                                                            />
                                                        </button>
                                                        <img
                                                            className="w-12 md:mx-10 mx-5"
                                                            src={arrow}
                                                            alt=""
                                                        />
                                                        <button className="bg-black bg-opacity-50 hover:bg-opacity-25 md:w-28 md:h-28 w-20 h-20 rounded-[50px] flex justify-center items-center">
                                                            <img
                                                                className="md:w-20 w-12"
                                                                src={props.evolImgArray[i + 1]}
                                                                alt=""
                                                            />
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokePageComponent;
