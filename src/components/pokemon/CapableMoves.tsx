import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ClipLoader from "react-spinners/ClipLoader";

const CapableMoves = () => {
  const pokemonDetails: any = useSelector(
    (state: RootState) => state.pokemonDetails.pokemonDetailsData
  );
  const pokemonData = [pokemonDetails];
  const loading:any = useSelector((state: RootState) => state.pokemonDetails.loading);
  return (
    <>
      <section className="h-screen ">
        <div className="container">
          <h3 className="text-base my-2 font-semibold uppercase text-center  px-3">
            Abilities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">

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
          )
              : <>
            {pokemonData?.map((pokemon) => (
              <React.Fragment key={pokemon.id}>
                {pokemon?.abilities?.map((el: any) => (
                  <div
                    key={el?.ability?.name}
                    className="bg-green-500 text-white text-2xl w-full rounded shadow-lg h-full hover:border-lime-500 border-2"
                  >
                    <h3 className="text-base font-semibold text-center">
                      {el?.ability?.name}
                    </h3>
                  </div>
                ))}
              </React.Fragment>
            ))}
            </>}
          </div>

          <h3 className="text-base my-2 font-semibold text-center uppercase px-3">
            Moves
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {pokemonData?.map((pokemon) => (
              <React.Fragment key={pokemon.id}>
                {pokemon?.moves?.map((el: any) => (
                  <div
                    key={el?.move?.name}
                    className=" text-2xl w-full rounded shadow-lg h-full hover:border-lime-500 border-2"
                  >
                    <h3 className="text-base font-semibold text-center">
                      {el?.move?.name}
                    </h3>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CapableMoves;
