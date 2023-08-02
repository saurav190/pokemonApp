import React from "react";
import { useSelector } from "react-redux";
import bug from "../../assets/types/bug.png";
import dark from "../../assets/types/dark.png";
import dragon from "../../assets/types/dragon.png";
import electric from "../../assets/types/electric.png";
import fairy from "../../assets/types/fairy.png";
import fighting from "../../assets/types/fighting.png";
import fire from "../../assets/types/fire.png";
import flying from "../../assets/types/flying.png";
import ghost from "../../assets/types/ghost.png";
import grass from "../../assets/types/grass.png";
import ground from "../../assets/types/ground.png";
import ice from "../../assets/types/ice.png";
import normal from "../../assets/types/normal.png";
import poison from "../../assets/types/poison.png";
import psychic from "../../assets/types/psychic.png";
import rock from "../../assets/types/rock.png";
import steel from "../../assets/types/steel.png";
import water from "../../assets/types/water.png";
import { RootState } from "../../redux/store";
import ClipLoader from "react-spinners/ClipLoader";

const typeImages: any = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const Description: React.FC = () => {
  const pokemonDetails: any = useSelector(
    (state: RootState) => state.pokemonDetails.pokemonDetailsData
  );

  const pokemonData = [pokemonDetails];

  const loading: any = useSelector(
    (state: RootState) => state.pokemonDetails.loading
  );

  return (
    <section className="container py-20 bg-gray-100  ">
      <div className="grid grid-cols-1">
        <div className="">
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
              {pokemonData?.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="p-5 rounded shadow-md hover:border-lime-500 border-2"
                >
                  <img
                    src={pokemon?.sprites?.other?.home?.front_shiny}
                    alt="img"
                    className="object-contain w-full h-80 animate-pulse"
                  />
                  <p className="border-t-2 border-t-green-500 text-2xl font-semibold uppercase text-center">
                    {pokemon?.species?.name}{" "}
                  </p>
                  <div className="flex items-center gap-3 justify-center">
                    <p className="text-2xl font-semibold uppercase text-center">
                      Types:{" "}
                    </p>
                    <div className="rounded-full flex items-center justify-center gap-2">
                      {pokemon?.types?.map((type: { type: { name: any } }) => (
                        <div
                          key={type.type.name}
                          className="rounded-full flex items-center justify-center"
                        >
                          <img
                            src={typeImages[type.type.name]}
                            className="w-10"
                            alt={type.type.name}
                            title={type.type.name}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col font-semibold items-center justify-center">
                    <p className="text-xl uppercase">
                      Experience: {pokemon?.base_experience}
                    </p>
                    <p className="text-xl uppercase">
                      Height: {pokemon?.height}
                    </p>
                    <p className="text-xl uppercase">
                      weight: {pokemon?.weight}
                    </p>
                  </div>

                  <div className="flex flex-col font-medium gap-2">
                    <p className="uppercase text-xl flex items-center gap-3">
                      HP: {pokemon?.stats[0]?.base_stat}
                      <meter
                        value={pokemon?.stats[0]?.base_stat}
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </p>
                    <p className="uppercase text-xl flex items-center gap-3">
                      attack: {pokemon?.stats[1]?.base_stat}
                      <meter
                        value={pokemon?.stats[1]?.base_stat}
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </p>
                    <p className="uppercase text-xl flex items-center gap-3">
                      defense: {pokemon?.stats[2]?.base_stat}
                      <meter
                        value={pokemon?.stats[2]?.base_stat}
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </p>
                    <p className="uppercase text-xl flex items-center gap-3">
                      Special-attack: {pokemon?.stats[3]?.base_stat}{" "}
                      <meter
                        value={pokemon?.stats[3]?.base_stat}
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </p>
                    <p className="uppercase text-xl flex items-center gap-3">
                      Special-defense: {pokemon?.stats[4]?.base_stat}{" "}
                      <meter
                        value={pokemon?.stats[4]?.base_stat}
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </p>
                    <p className="uppercase text-xl flex items-center gap-3">
                      Speed: {pokemon?.stats[5]?.base_stat}
                      <meter
                        value={pokemon?.stats[5]?.base_stat}
                        max={100}
                        min={0}
                        className="w-full"
                      />
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Description;
