import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ClipLoader from "react-spinners/ClipLoader";

const Evolution = () => {
  const pokemonDetails:any = useSelector(
    (state: RootState) => state.pokemonDetails.pokemonDetailsData
  );
  const pokemonData = [pokemonDetails];
  console.log(pokemonData);
  const loading:any = useSelector((state: RootState) => state.pokemonDetails.loading);
  return (
    <>
      <section>
        <div className="container py-20 flex items-center justify-center">
          <div className="grid grid-cols-1">
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
            <div className=" p-5 w-full rounded shadow-md h-full hover:border-lime-500 border-2">
              <img
                src={pokemonData[0].sprites.other.home.front_shiny}
                alt="img"
                className="object-contain w-full h-80  animate-pulse"
              />
            </div>
            <div className=" p-5 w-full rounded shadow-md h-full hover:border-lime-500 border-2">
              <img
                src={pokemonData[0].sprites.back_shiny}
                alt="img"
                className="object-contain w-full   animate-pulse"
              />
            </div>
            </>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Evolution;
